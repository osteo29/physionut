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
  title = 'PhysioNutrition',
  subtitle = 'Clinical Recovery',
}: BrandLogoProps) {
  const isLight = textTone === 'light';
  const titleClassName = isLight ? 'text-white' : 'text-slate-900';
  const subtitleClassName = isLight ? 'text-slate-300' : 'text-health-green';

  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <img
        src="/brand-logo.png"
        alt="PhysioNutrition logo"
        className={`h-11 w-11 rounded-full border border-slate-200/80 bg-white object-cover shadow-sm ${imageClassName}`.trim()}
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
