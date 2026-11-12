import React from 'react';

export function ZaloIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 1. Base Zalo Blue Background */}
      <rect width="100" height="100" rx="20" fill="#0068FF" />

      {/* 2. Soft Shadow under the Speech Bubble Tail */}
      <path
        d="M 15 82.5 L 34 100 H 100 V 88 C 72 96 42 93 28 80 Z"
        fill="#0050DF"
      />

      {/* 3. Main White Speech Bubble Body */}
      <path
        d="M 28 0 H 100 V 73 C 96 83 85 88 70 88 C 48 88 34 83 28 80 C 25 78 18 82 15 82.5 C 19 76 20 70 19 63 C 17 49 10 25 28 0 Z"
        fill="#FFFFFF"
      />

      {/* 4. Official Zalo Blue Typography */}
      <text
        x="56"
        y="57"
        fill="#0068FF"
        fontSize="33"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        textAnchor="middle"
        letterSpacing="-0.8px"
      >
        Zalo
      </text>
    </svg>
  );
}

export default ZaloIcon;





