import React, { useMemo } from 'react';

export interface BurstParticle {
  id: number;
  symbol: string;
  startX: number; // vw
  startY: number; // vh
  dx: number; // px
  dy: number; // px
  rotate: number;
  scale: number;
}

interface RoyalBackdropProps {
  bursts: BurstParticle[];
}

export const RoyalBackdrop: React.FC<RoyalBackdropProps> = ({ bursts }) => {
  const stars = useMemo(() => {
    const symbols = ['✦', '✧', '·', '⋆'];
    return Array.from({ length: 48 }, (_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      left: `${(i * 19.7 + 7) % 98}%`,
      top: `${(i * 29.3 + 5) % 96}%`,
      size: 9 + (i % 6) * 2.4,
      duration: 2.3 + (i % 5) * 0.85,
      delay: -(i % 7) * 0.7,
    }));
  }, []);

  const petals = useMemo(() => {
    const symbols = ['🌸', '✿', '♡', '💮'];
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      left: `${(i * 17.3 + 4) % 96}%`,
      size: 13 + (i % 5) * 3,
      duration: 10 + (i % 6) * 2.2,
      delay: -(i * 1.4),
      drift: (i % 2 === 0 ? 1 : -1) * (35 + (i % 4) * 18),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Soft radial ambient light glows */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full animate-pulse-glow"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.75) 0%, rgba(245,191,210,0.28) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 -right-28 w-[28rem] h-[28rem] rounded-full animate-pulse-glow"
        style={{
          animationDelay: '-2.2s',
          background:
            'radial-gradient(circle, rgba(238,226,250,0.82) 0%, rgba(213,173,105,0.2) 50%, transparent 72%)',
        }}
      />
      <div
        className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full animate-pulse-glow"
        style={{
          animationDelay: '-1.1s',
          background:
            'radial-gradient(circle, rgba(255,240,229,0.82) 0%, rgba(198,93,136,0.16) 50%, transparent 70%)',
        }}
      />

      {/* Twinkling star field */}
      {stars.map((s) => (
        <span
          key={`star-${s.id}`}
          className="absolute select-none text-white animate-star-twinkle"
          style={
            {
              left: s.left,
              top: s.top,
              fontSize: `${s.size}px`,
              textShadow:
                '0 0 12px rgba(255, 255, 255, 0.95), 0 0 20px rgba(213, 173, 105, 0.55)',
              '--t': `${s.duration}s`,
              '--d': `${s.delay}s`,
            } as React.CSSProperties
          }
        >
          {s.symbol}
        </span>
      ))}

      {/* Drifting cherry blossom petals & hearts */}
      {petals.map((p) => (
        <span
          key={`petal-${p.id}`}
          className="absolute select-none animate-petal-fall"
          style={
            {
              left: p.left,
              top: '-10vh',
              fontSize: `${p.size}px`,
              filter: 'drop-shadow(0 3px 5px rgba(182, 91, 136, 0.22))',
              '--t': `${p.duration}s`,
              '--d': `${p.delay}s`,
              '--drift': `${p.drift}px`,
            } as React.CSSProperties
          }
        >
          {p.symbol}
        </span>
      ))}

      {/* Interactive magic burst particles */}
      {bursts.map((b) => (
        <span
          key={b.id}
          className="fixed select-none z-50 animate-magic-burst"
          style={
            {
              left: `${b.startX}vw`,
              top: `${b.startY}vh`,
              fontSize: '21px',
              filter: 'drop-shadow(0 4px 10px rgba(198, 93, 136, 0.35))',
              '--dx': `${b.dx}px`,
              '--dy': `${b.dy}px`,
              '--rot': `${b.rotate}deg`,
              '--sc': b.scale,
            } as React.CSSProperties
          }
        >
          {b.symbol}
        </span>
      ))}
    </div>
  );
};
