export default function Logo({ size = 40, dark = false, showText = true }: { size?: number; dark?: boolean; showText?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <rect x="2" y="2" width="44" height="44" rx="10" fill="#1769AA" opacity="0.08"/>
        <path d="M24 7L9 18v17a2 2 0 002 2h26a2 2 0 002-2V18L24 7z" fill="#1769AA"/>
        <path d="M24 12l-9 7v13h18V19l-9-7z" fill="#FFFFFF" opacity="0.9"/>
        <path d="M16 30c0-2.2 1.6-4 3.6-4s3.6 1.8 3.6 4" stroke="#13A89E" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        <path d="M25 30c0-2.2 1.6-4 3.6-4s3.6 1.8 3.6 4" stroke="#13A89E" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        <circle cx="24" cy="20" r="2.2" fill="#13A89E"/>
      </svg>
      {showText && (
        <div className={dark ? 'text-white' : 'text-navy'}>
          <div className="font-display font-extrabold text-lg leading-none">ResQHub</div>
          <div className="text-[11px] font-medium opacity-75 leading-none mt-1 tracking-wide">Pakistan</div>
        </div>
      )}
    </div>
  );
}
