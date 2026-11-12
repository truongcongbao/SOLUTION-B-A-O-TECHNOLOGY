import React, { useRef, useState, useEffect } from 'react';
import { sanitizeHtml } from '../utils/security';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link,
  Image,
  Table,
  Eraser,
  Code,
  Eye,
  Type,
  Palette,
  Sparkles,
  HelpCircle,
  Plus,
  Trash2,
  FileCode
} from 'lucide-react';

interface WordEditorProps {
  value: string;
  onChange: (value: string) => void;
  onAiOptimize?: () => void;
  isAiOptimizing?: boolean;
  placeholder?: string;
}

export default function WordEditor({
  value,
  onChange,
  onAiOptimize,
  isAiOptimizing = false,
  placeholder = 'Nhập nội dung mô tả chi tiết sản phẩm tại đây...'
}: WordEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isCodeView, setIsCodeView] = useState(false);
  const [codeValue, setCodeValue] = useState(value);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [textColor, setTextColor] = useState('#1e293b');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [charCount, setCharCount] = useState(0);
  const [editorToast, setEditorToast] = useState<string | null>(null);

  useEffect(() => {
    if (editorToast) {
      const timer = setTimeout(() => setEditorToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [editorToast]);

  // Load initial value to editor and calculate characters
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      // Avoid overwriting when user is actively editing
      if (document.activeElement !== editorRef.current) {
        editorRef.current.innerHTML = sanitizeHtml(value || '');
      }
    }
    setCodeValue(value || '');
    
    // Update character count
    if (editorRef.current) {
      const text = editorRef.current.innerText || editorRef.current.textContent || '';
      // If it has only HTML formatting but no text content, count should be 0
      setCharCount(text.replace(/\r?\n|\r/g, '').trim() === '' ? 0 : text.length);
    } else {
      const cleanText = (value || '').replace(/<[^>]*>/g, '');
      setCharCount(cleanText.replace(/\r?\n|\r/g, '').trim() === '' ? 0 : cleanText.length);
    }
  }, [value]);

  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
    const html = e.currentTarget.innerHTML;
    onChange(html);
    setCodeValue(html);
    
    // Instantly update character count in real-time
    const text = e.currentTarget.innerText || e.currentTarget.textContent || '';
    setCharCount(text.replace(/\r?\n|\r/g, '').trim() === '' ? 0 : text.length);
    checkActiveFormats();
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCodeValue(val);
    onChange(val);
    
    // Instantly update character count
    const cleanText = val.replace(/<[^>]*>/g, '');
    setCharCount(cleanText.replace(/\r?\n|\r/g, '').trim() === '' ? 0 : cleanText.length);
  };

  // Helper to execute commands and keep focus
  const executeCommand = (command: string, value: string = '') => {
    if (isCodeView) return;
    
    // Focus the editor first
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    document.execCommand(command, false, value);
    
    // Trigger change
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
      setCodeValue(html);
      const text = editorRef.current.innerText || editorRef.current.textContent || '';
      setCharCount(text.replace(/\r?\n|\r/g, '').trim() === '' ? 0 : text.length);
    }
    
    checkActiveFormats();
  };

  // Update button highlights depending on current text selection
  const checkActiveFormats = () => {
    if (isCodeView) return;
    const formats = [];
    if (document.queryCommandState('bold')) formats.push('bold');
    if (document.queryCommandState('italic')) formats.push('italic');
    if (document.queryCommandState('underline')) formats.push('underline');
    if (document.queryCommandState('strikeThrough')) formats.push('strikethrough');
    if (document.queryCommandState('insertUnorderedList')) formats.push('bullet');
    if (document.queryCommandState('insertOrderedList')) formats.push('number');
    
    setActiveFormats(formats);
  };

  // Format selections as Headers or Paragraph
  const handleFormatBlock = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const format = e.target.value;
    if (format) {
      executeCommand('formatBlock', format);
      e.target.value = ''; // Reset select dropdown
    }
  };

  // Color actions
  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setTextColor(color);
    executeCommand('foreColor', color);
  };

  const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setBgColor(color);
    executeCommand('hiliteColor', color); // hiliteColor works in most modern browsers
  };

  // Insert Link helper
  const handleInsertLink = () => {
    const url = prompt('Nhập địa chỉ liên kết (URL):', 'https://');
    if (url && url !== 'https://') {
      executeCommand('createLink', url);
    }
  };

  // Insert Table helper
  const handleInsertTable = () => {
    const rowsInput = prompt('Nhập số dòng:', '3');
    const colsInput = prompt('Nhập số cột:', '3');
    const rows = parseInt(rowsInput || '0', 10);
    const cols = parseInt(colsInput || '0', 10);

    if (rows > 0 && cols > 0) {
      let tableHtml = '<table class="w-full border-collapse border border-slate-300 my-4 text-xs font-sans">';
      
      // Header row
      tableHtml += '<tr class="bg-slate-50">';
      for (let j = 0; j < cols; j++) {
        tableHtml += '<th class="border border-slate-300 p-2 text-left font-bold text-slate-700">Tiêu đề ' + (j + 1) + '</th>';
      }
      tableHtml += '</tr>';

      // Data rows
      for (let i = 0; i < rows; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < cols; j++) {
          tableHtml += '<td class="border border-slate-300 p-2 text-slate-600">Nội dung</td>';
        }
        tableHtml += '</tr>';
      }
      tableHtml += '</table><p><br></p>';

      executeCommand('insertHTML', tableHtml);
    }
  };

  // Insert Image via URL helper
  const handleInsertImageUrl = () => {
    const url = prompt('Nhập đường dẫn hình ảnh (URL):', 'https://images.unsplash.com/');
    if (url && url.trim()) {
      const imgHtml = `<div class="my-4 text-center"><img src="${url.trim()}" alt="Hình ảnh bài viết" class="max-w-full h-auto rounded-xl mx-auto shadow-sm border border-slate-100" style="max-height: 400px; object-fit: contain; display: inline-block;" referrerPolicy="no-referrer" /><p class="text-[10px] text-slate-400 mt-1 italic font-sans">Chú thích ảnh</p></div><p><br></p>`;
      executeCommand('insertHTML', imgHtml);
    }
  };

  // Upload and insert local image file helper
  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setEditorToast('Kích thước ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        const imgHtml = `<div class="my-4 text-center"><img src="${base64Url}" alt="Hình ảnh tải lên" class="max-w-full h-auto rounded-xl mx-auto shadow-sm border border-slate-100" style="max-height: 400px; object-fit: contain; display: inline-block;" /><p class="text-[10px] text-slate-400 mt-1 italic font-sans">Ảnh tải lên thực tế</p></div><p><br></p>`;
        executeCommand('insertHTML', imgHtml);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = ''; // clear input
  };

  // Clear format helper
  const handleClearFormat = () => {
    executeCommand('removeFormat');
  };

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col font-sans transition-all focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
      
      {/* WORD EDITOR TOOLBAR */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1.5 select-none text-slate-600">
        
        {/* Style selection dropdown */}
        <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2 h-8">
          <Type className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
          <select
            onChange={handleFormatBlock}
            disabled={isCodeView}
            className="bg-transparent border-none text-[11px] font-bold text-slate-700 focus:outline-none cursor-pointer pr-1"
            defaultValue=""
          >
            <option value="" disabled>Định dạng</option>
            <option value="<p>">Văn bản (Paragraph)</option>
            <option value="<h1>">Tiêu đề lớn (Heading 1)</option>
            <option value="<h2>">Tiêu đề vừa (Heading 2)</option>
            <option value="<h3>">Tiêu đề nhỏ (Heading 3)</option>
            <option value="<blockquote>">Trích dẫn (Quote)</option>
          </select>
        </div>

        <div className="h-6 w-[1px] bg-slate-200 mx-0.5 shrink-0" />

        {/* Text styling controls */}
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          disabled={isCodeView}
          className={`p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer ${
            activeFormats.includes('bold') ? 'bg-slate-200 text-blue-700 font-extrabold' : ''
          }`}
          title="In đậm (Ctrl+B)"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          disabled={isCodeView}
          className={`p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer ${
            activeFormats.includes('italic') ? 'bg-slate-200 text-blue-700' : ''
          }`}
          title="In nghiêng (Ctrl+I)"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('underline')}
          disabled={isCodeView}
          className={`p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer ${
            activeFormats.includes('underline') ? 'bg-slate-200 text-blue-700' : ''
          }`}
          title="Gạch chân (Ctrl+U)"
        >
          <Underline className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('strikeThrough')}
          disabled={isCodeView}
          className={`p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer ${
            activeFormats.includes('strikethrough') ? 'bg-slate-200 text-blue-700' : ''
          }`}
          title="Gạch ngang"
        >
          <Strikethrough className="w-3.5 h-3.5" />
        </button>

        <div className="h-6 w-[1px] bg-slate-200 mx-0.5 shrink-0" />

        {/* Color picker shortcuts */}
        <div className="flex items-center gap-1">
          {/* Text Color */}
          <div className="relative flex items-center justify-center p-1 hover:bg-slate-200/60 rounded-lg" title="Màu chữ">
            <Palette className="w-3.5 h-3.5" style={{ color: textColor }} />
            <input
              type="color"
              value={textColor}
              disabled={isCodeView}
              onChange={handleTextColorChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>
          {/* Text Highlight Color */}
          <div className="relative flex items-center justify-center p-1 hover:bg-slate-200/60 rounded-lg" title="Tô nền chữ">
            <Palette className="w-3.5 h-3.5 bg-slate-200 rounded-sm" style={{ color: bgColor }} />
            <input
              type="color"
              value={bgColor}
              disabled={isCodeView}
              onChange={handleBgColorChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>
        </div>

        <div className="h-6 w-[1px] bg-slate-200 mx-0.5 shrink-0" />

        {/* Alignment controls */}
        <button
          type="button"
          onClick={() => executeCommand('justifyLeft')}
          disabled={isCodeView}
          className="p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer text-slate-600"
          title="Canh lề trái"
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyCenter')}
          disabled={isCodeView}
          className="p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer text-slate-600"
          title="Canh lề giữa"
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyRight')}
          disabled={isCodeView}
          className="p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer text-slate-600"
          title="Canh lề phải"
        >
          <AlignRight className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyFull')}
          disabled={isCodeView}
          className="p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer text-slate-600"
          title="Canh đều hai bên"
        >
          <AlignJustify className="w-3.5 h-3.5" />
        </button>

        <div className="h-6 w-[1px] bg-slate-200 mx-0.5 shrink-0" />

        {/* List controls */}
        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          disabled={isCodeView}
          className={`p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer ${
            activeFormats.includes('bullet') ? 'bg-slate-200 text-blue-700' : ''
          }`}
          title="Danh sách gạch đầu dòng"
        >
          <List className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          disabled={isCodeView}
          className={`p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer ${
            activeFormats.includes('number') ? 'bg-slate-200 text-blue-700' : ''
          }`}
          title="Danh sách đánh số"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <div className="h-6 w-[1px] bg-slate-200 mx-0.5 shrink-0" />

        {/* Insert media and objects */}
        <button
          type="button"
          onClick={handleInsertLink}
          disabled={isCodeView}
          className="p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer text-slate-600"
          title="Chèn đường dẫn (Link)"
        >
          <Link className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleInsertTable}
          disabled={isCodeView}
          className="p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer text-slate-600"
          title="Chèn bảng biểu (Table)"
        >
          <Table className="w-3.5 h-3.5" />
        </button>

        {/* Image upload triggers */}
        <div className="flex items-center gap-1">
          {/* File Upload image */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isCodeView}
            className="p-1.5 rounded-lg hover:bg-blue-100 bg-blue-50/50 hover:text-blue-700 text-blue-600 transition-all cursor-pointer border border-blue-100"
            title="Đăng hình ảnh tải lên từ máy tính"
          >
            <Image className="w-3.5 h-3.5 mr-0.5 inline-block" />
            <span className="text-[9px] font-black uppercase">Đăng Hình</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLocalImageUpload}
            accept="image/*"
            className="hidden"
          />

          {/* Image from URL */}
          <button
            type="button"
            onClick={handleInsertImageUrl}
            disabled={isCodeView}
            className="p-1.5 rounded-lg hover:bg-slate-200/60 text-slate-500 transition-all cursor-pointer text-[10px]"
            title="Chèn hình ảnh từ link web"
          >
            <Plus className="w-3 h-3 mr-0.5 inline-block" />
            <span>Link ảnh</span>
          </button>
        </div>

        <div className="h-6 w-[1px] bg-slate-200 mx-0.5 shrink-0" />

        {/* Utilities */}
        <button
          type="button"
          onClick={handleClearFormat}
          disabled={isCodeView}
          className="p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer text-red-500 hover:text-red-700"
          title="Xóa định dạng"
        >
          <Eraser className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 min-w-4" />

        {/* AI Writing assistant integration if callback supplied */}
        {onAiOptimize && (
          <button
            type="button"
            disabled={isAiOptimizing}
            onClick={onAiOptimize}
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
          >
            {isAiOptimizing ? (
              <>
                <span className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
                <span>AI đang viết...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-indigo-500 animate-pulse" />
                <span>Viết bằng AI</span>
              </>
            )}
          </button>
        )}

        {/* HTML Code view switcher */}
        <button
          type="button"
          onClick={() => setIsCodeView(!isCodeView)}
          className={`p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer flex items-center gap-1 text-[10px] font-bold ${
            isCodeView ? 'bg-slate-700 text-white hover:bg-slate-800' : 'text-slate-500'
          }`}
          title={isCodeView ? 'Quay về trình soạn thảo trực quan' : 'Xem mã nguồn HTML'}
        >
          {isCodeView ? (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Xem bài viết</span>
            </>
          ) : (
            <>
              <Code className="w-3.5 h-3.5" />
              <span>Sửa HTML</span>
            </>
          )}
        </button>
      </div>

      {/* WORD EDITOR CONTENT AREA */}
      <div className="relative min-h-[300px] flex-1 flex flex-col bg-white">
        {isCodeView ? (
          <textarea
            value={codeValue}
            onChange={handleCodeChange}
            className="w-full flex-1 min-h-[300px] p-4 font-mono text-xs text-slate-800 bg-slate-900 text-slate-200 border-0 focus:outline-none focus:ring-0 leading-relaxed resize-y"
            placeholder="Nhập mã HTML thủ công tại đây..."
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            onKeyUp={checkActiveFormats}
            onMouseUp={checkActiveFormats}
            className="w-full flex-1 min-h-[300px] p-4 text-xs text-slate-700 focus:outline-none overflow-y-auto leading-relaxed border-0 font-sans prose max-w-none prose-slate"
            style={{ minHeight: '300px' }}
          />
        )}
        
        {/* Placeholder overlay */}
        {!isCodeView && !value && (
          <div className="absolute top-4 left-4 text-slate-350 text-[11px] font-medium pointer-events-none select-none italic font-sans">
            {placeholder}
          </div>
        )}
      </div>

      {/* Editor Status / Info Footer */}
      <div className="bg-slate-50 border-t border-slate-200 px-3.5 py-1.5 flex items-center justify-between text-[10px] text-slate-400 font-medium relative">
        {editorToast && (
          <div className="absolute top-[-36px] left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md animate-fade-in z-20">
            {editorToast}
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Trình biên soạn Word Pro sẵn sàng (Hỗ trợ định dạng HTML cao cấp)</span>
        </div>
        <div>
          <span>Độ dài: <strong className="font-bold text-slate-500 font-mono">{charCount}</strong> ký tự</span>
        </div>
      </div>
    </div>
  );
}
