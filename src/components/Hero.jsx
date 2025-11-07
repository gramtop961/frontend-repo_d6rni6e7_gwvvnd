import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[56vh] min-h-[420px] w-full overflow-hidden rounded-2xl border border-white/10">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EQgEIs2r5cMbWroZ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="px-6 md:px-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs mb-4 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Online • Без VPN
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
            LandJav — форум, запросы и чат
          </h1>
          <p className="mt-3 text-white/70 max-w-xl">
            Современная платформа для общения и совместной работы: создавайте темы, оставляйте запросы и переписывайтесь в каналах.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black" />
    </section>
  );
}
