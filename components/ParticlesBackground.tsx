'use client';

import React from 'react';

interface Particle {
  id: number;
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
}

// Generate static, deterministic particles using sin-based pseudo-random numbers
// This is 100% pure, prevents hydration mismatches, and has zero runtime state overhead
const PARTICLES: Particle[] = Array.from({ length: 30 }, (_, i) => {
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return {
    id: i,
    left: `${pseudoRandom(i + 1) * 100}%`,
    size: pseudoRandom(i + 2) * 3 + 1,
    delay: `${pseudoRandom(i + 3) * 15}s`,
    duration: `${pseudoRandom(i + 4) * 20 + 15}s`,
    opacity: pseudoRandom(i + 5) * 0.5 + 0.1,
  };
});

export default function ParticlesBackground() {
  return (
    <div className="particles-bg">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}


