import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/70">Loading 3D…</div>}>
          <Spline scene="https://prod.spline.design/6j6F9dGmL2M9s4Vb/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </Suspense>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-14 text-white">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">LandJav</h1>
        <p className="mt-3 md:mt-4 text-white/80 max-w-xl">
          Global, fast, and resilient — accessible from anywhere, any browser.
        </p>
      </div>
    </section>
  );
}

export default Hero;
