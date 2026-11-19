import React, { useState } from 'react';
import { SHAYARI_VERSES } from '../data/storyData';
import { Heart, Sparkles, BookOpen, RotateCcw } from 'lucide-react';

interface RoyalEnvelopeProps {
  isOpen: boolean;
  onToggle: () => void;
  onSparkleBurst: (count?: number) => void;
}

export const RoyalEnvelope: React.FC<RoyalEnvelopeProps> = ({
  isOpen,
  onToggle,
  onSparkleBurst,
}) => {
  const [likedVerses, setLikedVerses] = useState<Record<string, boolean>>({});

  const toggleLikeVerse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedVerses((prev) => ({ ...prev, [id]: !prev[id] }));
    onSparkleBurst(16);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Interactive 3D Wax-Sealed Envelope (extra top margin when flap opens upward) */}
      <div
        className={`relative flex flex-col items-center transition-all duration-500 ${
          isOpen ? 'mt-24 mb-2' : 'my-3'
        }`}
      >
        <button
          type="button"
          id="envelope"
          onClick={onToggle}
          aria-label="Tap to open the friendship letter"
          aria-expanded={isOpen}
          className="group relative w-52 h-36 rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c65d88] focus-visible:ring-offset-4 transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-97"
          style={{
            background: 'linear-gradient(145deg, #f3bfd3 0%, #e7a4be 100%)',
            boxShadow: isOpen
              ? '0 20px 45px rgba(156, 92, 118, 0.28), 0 0 0 1px rgba(255,255,255,0.7) inset'
              : '0 16px 32px rgba(156, 92, 118, 0.25), 0 0 0 1px rgba(255,255,255,0.6) inset',
            perspective: '900px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Inner letter rising out of the envelope pocket */}
          <div
            className="absolute left-3.5 right-3.5 bottom-2.5 h-24 rounded-lg bg-[#fff9f5] border border-[#f2d9e4] shadow-md flex flex-col items-center justify-center px-3 z-10 transition-transform duration-700"
            style={{
              transform: isOpen
                ? 'translateY(-42px) rotate(-1.5deg) scale(1.03)'
                : 'translateY(0px) rotate(0deg) scale(0.96)',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#b57c94]">
              Royal Scroll
            </span>
            <span className="font-serif-royal italic text-2xl text-[#b04e7a] font-semibold mt-0.5">
              For IQRA ♡
            </span>
            <span className="text-[10px] text-[#9e6d82] mt-0.5">
              {isOpen ? 'Scroll opened below ↓' : 'Tap to break seal'}
            </span>
          </div>

          {/* Left & Right Envelope Pocket Folds */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none z-20"
            style={{
              background:
                'linear-gradient(145deg, transparent 48%, #dc92ae 49%) left / 50.5% 100% no-repeat, linear-gradient(215deg, transparent 48%, #e6a6bf 49%) right / 50.5% 100% no-repeat',
            }}
          />

          {/* Bottom Pocket Triangle Fold */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none z-20"
            style={{
              background: '#eab2c7',
              clipPath: 'polygon(0 100%, 50% 48%, 100% 100%)',
              borderTop: '1px solid rgba(255,255,255,0.45)',
            }}
          />

          {/* Top Animated Envelope Flap */}
          <div
            style={{
              transformOrigin: 'top center',
              transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
              clipPath: 'polygon(0 0, 100% 0, 50% 64%)',
              background: 'linear-gradient(180deg, #fad3e0 0%, #f1bdd0 100%)',
              zIndex: isOpen ? 5 : 30,
              transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="absolute inset-0 rounded-t-xl pointer-events-none shadow-sm"
          />

          {/* Royal Gold Wax Seal Emblem on the Flap */}
          <div
            className={`absolute left-1/2 top-[54%] z-30 w-11 h-11 rounded-full flex items-center justify-center shadow-md border border-[#f8e2b8] transition-all duration-500 ${
              !isOpen ? 'animate-wax-pulse' : ''
            }`}
            style={{
              transform: isOpen
                ? 'translate(-50%, -10%) scale(0.76)'
                : 'translate(-50%, -50%) scale(1)',
              opacity: isOpen ? 0.85 : 1,
              background: 'radial-gradient(circle at 35% 30%, #ebd099, #c89b52 70%, #9f7531 100%)',
              boxShadow:
                '0 4px 12px rgba(138, 72, 99, 0.35), inset 0 1px 2px rgba(255,255,255,0.8)',
            }}
          >
            <span className="text-base select-none" aria-hidden="true">
              👑
            </span>
          </div>
        </button>
      </div>

      {/* Prompt or Full Unfolded Royal Friendship Scroll */}
      {!isOpen ? (
        <div
          key="closed-prompt"
          className="text-center mt-2 animate-stagger-rise"
        >
          <h2 className="font-serif-royal text-4xl sm:text-5xl font-semibold text-[#6a2f52] tracking-tight mb-2">
            One last thing…
          </h2>
          <p className="font-serif-royal text-lg sm:text-xl text-[#765166]">
            Tap the envelope, Your Highness.
          </p>
          <p className="text-sm text-[#765a6b] mt-2" id="lastNote">
            Your final message is waiting inside. 💌
            <span className="block text-xs text-[#9b6c83] mt-1 font-medium">
              — Gojo Raze 🖤
            </span>
          </p>

          <button
            type="button"
            onClick={onToggle}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#8f4268] bg-white/85 hover:bg-white border border-[#e7c6d4] shadow-sm transition-all cursor-pointer hover:-translate-y-0.5 whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#c65d88]" />
            <span>Unseal Royal Letter</span>
          </button>
        </div>
      ) : (
        <div
          key="opened-scroll"
          id="lastNote"
          className="w-full mt-3 rounded-2xl bg-white/92 border border-[#ebd2de] shadow-xl p-5 sm:p-7 text-center relative overflow-hidden animate-stagger-rise"
        >
          {/* Subtle ornamental corner borders */}
          <div
            className="absolute top-2.5 left-3 text-[#d5ad69] text-sm select-none"
            aria-hidden="true"
          >
            ✦
          </div>
          <div
            className="absolute top-2.5 right-3 text-[#d5ad69] text-sm select-none"
            aria-hidden="true"
          >
            ✦
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-[#a86482] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#d5ad69]" />
            <span>Royal Friendship Scroll</span>
            <Sparkles className="w-3.5 h-3.5 text-[#d5ad69]" />
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-[#674358] max-w-md mx-auto">
            You are a wonderful friend, <b className="text-[#6a2f52]">Iqra</b>. Keep shining, keep
            laughing, and never lose your beautiful madness. 😌💗
          </p>
          <p className="text-xs font-semibold tracking-wide text-[#793b60] mt-1.5">
            — Gojo Raze 🖤
          </p>

          <hr className="border-0 border-t border-[#ead0dc] my-4 w-3/4 mx-auto" />

          {/* Three Staggered Shayari Verses with Interactive Heart Applause */}
          <div className="space-y-4 text-center">
            {SHAYARI_VERSES.map((verse, idx) => {
              const isLiked = !!likedVerses[verse.id];
              return (
                <div
                  key={verse.id}
                  style={{ animationDelay: `${0.1 + idx * 0.12}s` }}
                  className="group relative rounded-xl bg-[#fff8fa] hover:bg-[#fff3f7] border border-[#f2dde6] px-4 py-3.5 transition-colors animate-stagger-rise"
                >
                  <p className="font-serif-royal italic text-xl sm:text-[22px] leading-relaxed text-[#a84471]">
                    {verse.lines.map((line, lineIdx) => (
                      <React.Fragment key={lineIdx}>
                        {line}
                        {lineIdx < verse.lines.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                  <div className="mt-2 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={(e) => toggleLikeVerse(verse.id, e)}
                      aria-label={`Send royal applause for verse ${idx + 1}`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        isLiked
                          ? 'bg-[#c65d88] text-white shadow-sm'
                          : 'bg-white text-[#96516f] border border-[#ead0dc] hover:border-[#c65d88]'
                      }`}
                    >
                      <Heart
                        className={`w-3 h-3 ${
                          isLiked ? 'fill-white text-white' : 'text-[#c65d88]'
                        }`}
                      />
                      <span>
                        {isLiked ? 'Loved by Your Highness ♡' : 'Tap to applaud verse'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-3 border-t border-[#f0dce5] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#8f5b74]">
            <span className="tracking-wider uppercase font-semibold text-[#793b60]">
              HAPPY PRINCESS DAY, IQRA 👑
            </span>
            <span className="text-[11px] text-[#9b6c83]">
              With friendship &amp; mischief — Gojo Raze 🖤
            </span>
          </div>

          <button
            type="button"
            onClick={onToggle}
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#96516f] hover:text-[#6a2f52] underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Fold letter back into envelope</span>
          </button>
        </div>
      )}

      {/* Bottom unboxed editorial signature line */}
      <div className="mt-4 text-[11px] tracking-[0.16em] uppercase text-[#9c5a78] font-medium">
        HAPPY PRINCESS DAY, KHUBSOORAT CHURAIL 👑
      </div>
    </div>
  );
};
