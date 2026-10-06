import Image from "next/image";

// Real App Store screens from the three case studies, tilted and cropped to fill
// the panel. The panel is described as a whole; the tiles are decorative.
const columns: { className: string; tiles: string[] }[] = [
  {
    className: "mt-[6%]",
    tiles: ["/work/bookcargo/pickup-drop.jpg", "/work/myo/menu.jpg", "/work/bookcargo-pilot/earnings.jpg"],
  },
  {
    className: "-mt-[10%]",
    tiles: ["/work/bookcargo-pilot/go-online.jpg", "/work/bookcargo/fare-estimate.jpg", "/work/myo/item.jpg"],
  },
  {
    className: "mt-[10%]",
    tiles: ["/work/bookcargo/start-otp.jpg", "/work/bookcargo-pilot/accept-ride.jpg", "/work/bookcargo/payments.jpg"],
  },
  {
    className: "mt-[4%]",
    tiles: ["/work/myo/item.jpg", "/work/bookcargo-pilot/earnings.jpg", "/work/bookcargo/pickup-drop.jpg"],
  },
];

export function HeroCollage() {
  return (
    <div
      role="img"
      aria-label="Screens from the BookCargo, BookCargo Pilot and MyO apps"
      className="relative isolate mx-auto aspect-[1/1.02] w-full max-w-xl overflow-hidden rounded-[var(--radius-lg)] border border-line bg-[linear-gradient(135deg,#e7e9f5,#f6e9c8)] lg:max-w-none"
    >
      <div className="absolute -inset-x-[22%] -inset-y-[16%] grid -rotate-[9deg] grid-cols-4 gap-2.5">
        {columns.map((column, c) => (
          <div key={c} className={`flex flex-col gap-2.5 ${column.className}`}>
            {column.tiles.map((src, t) => (
              <Image
                key={`${src}-${t}`}
                src={src}
                alt=""
                width={460}
                height={996}
                sizes="(min-width: 1024px) 14vw, 30vw"
                priority={c < 2 && t === 0}
                className="h-auto w-full rounded-[14px] shadow-[0_18px_30px_-20px_rgba(9,17,39,0.5)]"
              />
            ))}
          </div>
        ))}
      </div>

      <div className="absolute bottom-[6%] left-[5%] z-10 max-w-[90%] rounded-xl border border-line bg-paper px-3.5 py-2.5 text-sm leading-snug text-ink shadow-[0_20px_34px_-20px_rgba(9,17,39,0.55)]">
        <span className="mb-0.5 block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
          On the App Store
        </span>
        <span className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-signal" />
        <strong className="font-semibold">BookCargo · BookCargo Pilot · MyO</strong>
      </div>
    </div>
  );
}
