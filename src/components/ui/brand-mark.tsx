// The logo mark as a single-colour shape that takes its colour from the text
// colour (text-paper, text-ink...). It is a CSS mask over the existing logo
// file, so no second asset is needed. Decorative only: hidden from screen readers.
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none block bg-current [-webkit-mask:url(/brand/logo-mark.svg)_center/contain_no-repeat] [mask:url(/brand/logo-mark.svg)_center/contain_no-repeat] ${className}`}
    />
  );
}
