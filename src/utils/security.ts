/**
 * Enterprise Security Utility
 * Bảo vệ toàn diện chống lại các lỗ hổng XSS (Cross-Site Scripting),
 * Protocol Injection và DOM Manipulation nguy hiểm.
 */

// Danh sách các thẻ HTML an toàn được phép hiển thị trong bài viết / rich text
const ALLOWED_TAGS = new Set([
  'p', 'div', 'span', 'br', 'hr',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'del', 'ins', 'mark', 'small', 'sub', 'sup',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
  'figure', 'figcaption',
  'a', 'img'
]);

// Danh sách các thuộc tính an toàn được phép trên từng thẻ
const ALLOWED_GLOBAL_ATTRS = new Set([
  'class', 'style', 'title', 'id', 'dir', 'lang'
]);

const ALLOWED_TAG_SPECIFIC_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'target', 'rel', 'download', 'title']),
  img: new Set(['src', 'alt', 'width', 'height', 'loading', 'decoding', 'referrerpolicy']),
  td: new Set(['colspan', 'rowspan', 'align', 'valign']),
  th: new Set(['colspan', 'rowspan', 'align', 'valign', 'scope']),
  ol: new Set(['start', 'type', 'reversed']),
  li: new Set(['value']),
};

/**
 * Kiểm tra và làm sạch URL để ngăn chặn Protocol-based XSS (ví dụ javascript:..., data:text/html, vbscript:...)
 */
export function sanitizeUrl(url: string | null | undefined, fallback: string = '#'): string {
  if (!url || typeof url !== 'string') return fallback;

  // Loại bỏ khoảng trắng và các ký tự điều khiển ẩn (thường dùng để bypass bộ lọc: j\navascript:)
  const cleanUrl = url.replace(/[\u0000-\u001F\u007F-\u009F\s]+/g, '').trim();
  if (!cleanUrl) return fallback;

  // Cho phép anchor nội bộ (#) hoặc relative URL (/, ./)
  if (cleanUrl.startsWith('#') || cleanUrl.startsWith('/') || cleanUrl.startsWith('./') || cleanUrl.startsWith('../')) {
    return cleanUrl;
  }

  // Phân tích protocol
  try {
    const parsed = new URL(cleanUrl, 'https://dummy-base.local');
    const protocol = parsed.protocol.toLowerCase();

    // Chỉ cho phép các giao thức an toàn
    if (protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:' || protocol === 'tel:') {
      return cleanUrl;
    }

    // Với data URI: Chỉ cho phép ảnh tĩnh an toàn (jpeg, png, gif, webp). CẤM SVG hoặc text/html vì có thể chứa script
    if (protocol === 'data:') {
      if (/^data:image\/(png|jpe?g|gif|webp);base64,[A-Za-z0-9+/=]+$/i.test(cleanUrl)) {
        return cleanUrl;
      }
      return fallback;
    }

    // Các protocol khác (javascript:, vbscript:, file:, etc.) bị chặn tuyệt đối
    return fallback;
  } catch {
    // Nếu URL không parse được và có dấu hiệu javascript:, chặn ngay
    if (/^(javascript|vbscript|data):/i.test(cleanUrl)) {
      return fallback;
    }
    return cleanUrl;
  }
}

/**
 * Làm sạch mã HTML thô nhằm chống Stored XSS & DOM-based XSS
 * Loại bỏ thẻ độc hại (script, iframe, object, embed, style, svg...)
 * và xóa toàn bộ event handlers (onerror, onload, onclick, v.v.)
 */
export function sanitizeHtml(rawHtml: string | null | undefined): string {
  if (!rawHtml || typeof rawHtml !== 'string') return '';

  // Nếu không có môi trường DOM (SSR), escape text cơ bản
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return escapeHtml(rawHtml);
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, 'text/html');
    const body = doc.body;

    // Đệ quy làm sạch từng node trong cây DOM
    cleanNode(body);

    return body.innerHTML;
  } catch (err) {
    console.error('Lỗi khi lọc mã độc HTML:', err);
    return escapeHtml(rawHtml);
  }
}

/**
 * Đệ quy duyệt và làm sạch từng node con
 */
function cleanNode(node: Node): void {
  const children = Array.from(node.childNodes);

  for (const child of children) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      const element = child as HTMLElement;
      const tagName = element.tagName.toLowerCase();

      // 1. Nếu tag không nằm trong danh sách an toàn, xóa bỏ phần tử hoặc unwrap
      if (!ALLOWED_TAGS.has(tagName)) {
        // Nếu là thẻ nguy hiểm chứa script/iframe/style/svg/etc. -> XÓA TOÀN BỘ cả thẻ lẫn nội dung con
        if (['script', 'iframe', 'object', 'embed', 'style', 'svg', 'math', 'base', 'form', 'input', 'button', 'noscript'].includes(tagName)) {
          element.remove();
          continue;
        }

        // Với các tag khác (ví dụ custom tags), unwrap (giữ lại text/nội dung con an toàn)
        const fragment = document.createDocumentFragment();
        while (element.firstChild) {
          fragment.appendChild(element.firstChild);
        }
        element.parentNode?.replaceChild(fragment, element);
        // Tiếp tục clean các node vừa được unwrap
        cleanNode(fragment);
        continue;
      }

      // 2. Làm sạch các thuộc tính (attributes)
      const allowedSpecific = ALLOWED_TAG_SPECIFIC_ATTRS[tagName] || new Set();
      const attributes = Array.from(element.attributes);

      for (const attr of attributes) {
        const attrName = attr.name.toLowerCase();
        const attrVal = attr.value;

        // Xóa tuyệt đối mọi event handler (bắt đầu bằng "on", ví dụ: onerror, onload, onclick, onfocus...)
        if (attrName.startsWith('on')) {
          element.removeAttribute(attr.name);
          continue;
        }

        // Kiểm tra whitelist thuộc tính
        const isAllowedAttr = ALLOWED_GLOBAL_ATTRS.has(attrName) || allowedSpecific.has(attrName);
        if (!isAllowedAttr) {
          element.removeAttribute(attr.name);
          continue;
        }

        // Kiểm tra bảo mật URL trong href và src
        if (attrName === 'href' || attrName === 'src') {
          const safe = sanitizeUrl(attrVal, '');
          if (!safe) {
            element.removeAttribute(attr.name);
          } else {
            element.setAttribute(attr.name, safe);
          }
          continue;
        }

        // Kiểm tra thuộc tính style inline
        if (attrName === 'style') {
          // Ngăn chặn css expressions, behavior, javascript: trong style
          if (/expression|behavior|javascript:|vbscript:/i.test(attrVal)) {
            element.removeAttribute(attr.name);
          }
        }
      }

      // 3. Đối với thẻ <a> có target="_blank", bắt buộc thêm rel="noopener noreferrer" để chống Tabnabbing
      if (tagName === 'a' && element.getAttribute('target') === '_blank') {
        element.setAttribute('rel', 'noopener noreferrer');
      }

      // Đệ quy tiếp vào các node con
      cleanNode(element);
    } else if (child.nodeType === Node.COMMENT_NODE) {
      // Xóa các comment HTML để tránh conditional compilation / mXSS
      child.remove();
    }
  }
}

/**
 * Chuyển đổi ký tự đặc biệt thành HTML entities
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Làm sạch dữ liệu JSON-LD Schema để không thể breakout khỏi thẻ <script type="application/ld+json">
 */
export function safeJsonLd(data: any): string {
  try {
    const json = JSON.stringify(data);
    // Escape ký tự '<', '>', '&' để không thể đóng thẻ </script>
    return json
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  } catch {
    return '{}';
  }
}
