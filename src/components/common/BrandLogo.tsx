type BrandLogoProps = {
  showText?: boolean;
  textTone?: 'light' | 'dark';
  className?: string;
  imageClassName?: string;
  title?: string;
  subtitle?: string;
};

export default function BrandLogo({
  showText = true,
  textTone = 'dark',
  className = '',
  imageClassName = '',
  title = 'ACTIVE REHAB',
  subtitle = 'MOVE BETTER • FEEL BETTER',
}: BrandLogoProps) {
  const isLight = textTone === 'light';
  const titleClassName = isLight ? 'brand-metal-text' : 'text-slate-900';
  const subtitleClassName = isLight ? 'text-amber-100/90' : 'text-health-green';

  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <img
        src="/brand-logo.png"
        alt="Active Rehab logo"
        className={`h-12 w-12 rounded-[1.05rem] border border-amber-200/40 bg-[radial-gradient(circle_at_top,#25201a,#0f0d0a)] object-cover shadow-[0_18px_32px_rgba(15,13,10,0.16)] ${imageClassName}`.trim()}
      />
      {showText ? (
        <div className="flex flex-col text-left">
          <span className={`text-lg font-black leading-none tracking-tight ${titleClassName}`}>
            {title}
          </span>
          <span className={`mt-1 text-[10px] font-bold uppercase tracking-[0.18em] ${subtitleClassName}`}>
            {subtitle}
          </span>
        </div>
      ) : null}
    </div>
  );
}
