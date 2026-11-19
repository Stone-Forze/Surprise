import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  CHAPTERS,
  TOTAL_CHAPTERS,
  getNextChapterIndex,
  getPrevChapterIndex,
  getProgressPercent,
  formatChapterCounter,
  toggleEnvelopeState,
} from './data/storyData';
import { RoyalBackdrop, BurstParticle } from './components/RoyalBackdrop';
import { ChapterScene } from './components/ChapterScene';
import { royalAudio } from './utils/soundEffects';
import { Sparkles, Volume2, VolumeX, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export default function App() {
  const [current, setCurrent] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [envelopeOpen, setEnvelopeOpen] = useState<boolean>(false);
  const [bursts, setBursts] = useState<BurstParticle[]>([]);
  const [isMusicActive, setIsMusicActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const nextParticleId = useRef<number>(1);

  const spawnConfettiBurst = useCallback((count: number = 28) => {
    const symbols = ['✦', '♡', '🌸', '✨', '💗', '✧', '👑'];
    const created: BurstParticle[] = [];
    for (let i = 0; i < count; i++) {
      const id = nextParticleId.current++;
      created.push({
        id,
        symbol: symbols[i % symbols.length],
        startX: 32 + Math.random() * 36,
        startY: 32 + Math.random() * 32,
        dx: Math.random() * 380 - 190,
        dy: Math.random() * -320 - 45,
        rotate: (Math.random() > 0.5 ? 1 : -1) * (160 + Math.random() * 180),
        scale: 0.9 + Math.random() * 0.65,
      });
    }
    setBursts((prev) => [...prev.slice(-65), ...created]);

    const createdIds = new Set(created.map((c) => c.id));
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((item) => !createdIds.has(item.id)));
    }, 1350);
  }, []);

  const handleSprinkleMagic = useCallback(() => {
    if (soundEnabled) {
      royalAudio.playSparkleChime();
    }
    spawnConfettiBurst(38);
  }, [soundEnabled, spawnConfettiBurst]);

  const goToChapter = useCallback(
    (targetIndex: number) => {
      if (targetIndex === current) return;
      const dir = targetIndex > current ? 1 : -1;
      setDirection(dir);
      setCurrent(targetIndex);
      if (soundEnabled) {
        royalAudio.playPageTurn(dir > 0 ? 'next' : 'prev');
      }
      if (targetIndex === TOTAL_CHAPTERS - 1) {
        spawnConfettiBurst(16);
      }
    },
    [current, soundEnabled, spawnConfettiBurst]
  );

  const handleNext = useCallback(() => {
    const nextIdx = getNextChapterIndex(current);
    setDirection(current === TOTAL_CHAPTERS - 1 ? -1 : 1);
    setCurrent(nextIdx);
    if (soundEnabled) {
      royalAudio.playPageTurn('next');
    }
    if (nextIdx === TOTAL_CHAPTERS - 1) {
      spawnConfettiBurst(16);
    }
  }, [current, soundEnabled, spawnConfettiBurst]);

  const handlePrev = useCallback(() => {
    if (current <= 0) return;
    const prevIdx = getPrevChapterIndex(current);
    setDirection(-1);
    setCurrent(prevIdx);
    if (soundEnabled) {
      royalAudio.playPageTurn('prev');
    }
  }, [current, soundEnabled]);

  const handleToggleEnvelope = useCallback(() => {
    setEnvelopeOpen((prev) => {
      const nextState = toggleEnvelopeState(prev);
      if (nextState) {
        if (soundEnabled) {
          royalAudio.playEnvelopeReveal();
        }
        spawnConfettiBurst(55);
      } else if (soundEnabled) {
        royalAudio.playCardTap();
      }
      return nextState;
    });
  }, [soundEnabled, spawnConfettiBurst]);

  const handleToggleAudio = useCallback(() => {
    if (!isMusicActive) {
      royalAudio.setMuted(false);
      setSoundEnabled(true);
      royalAudio.startAmbientChimes();
      royalAudio.playSparkleChime();
      setIsMusicActive(true);
    } else {
      royalAudio.stopAmbientChimes();
      setIsMusicActive(false);
    }
  }, [isMusicActive]);

  const handleCardSound = useCallback(() => {
    if (soundEnabled) {
      royalAudio.playCardTap();
    }
  }, [soundEnabled]);

  // Keyboard navigation (ArrowRight & ArrowLeft)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  // Cleanup audio interval on unmount
  useEffect(() => {
    return () => {
      royalAudio.stopAmbientChimes();
    };
  }, []);

  const activeChapter = CHAPTERS[current];
  const progressPercent = getProgressPercent(current);
  const counterLabel = formatChapterCounter(current);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-3 sm:p-6 md:p-8 select-none">
      {/* Animated Sky Stars, Falling Petals & Confetti Bursts */}
      <RoyalBackdrop bursts={bursts} />

      {/* Main Glassmorphic Royal Storybook Shell */}
      <main
        className="relative z-10 w-full max-w-[780px] min-h-[min(780px,calc(100vh-28px))] rounded-[30px] sm:rounded-[36px] border border-white/85 flex flex-col justify-between overflow-hidden transition-all"
        style={{
          background:
            'linear-gradient(145deg, rgba(255, 250, 248, 0.93) 0%, rgba(255, 244, 246, 0.90) 100%)',
          boxShadow:
            '0 32px 100px rgba(137, 81, 106, 0.19), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Corner Royal Filigree Ornaments */}
        <span
          className="pointer-events-none absolute top-4 left-5 text-[#d5ad69] text-2xl opacity-70 select-none"
          aria-hidden="true"
        >
          ✧
        </span>
        <span
          className="pointer-events-none absolute bottom-4 right-5 text-[#d5ad69] text-2xl opacity-70 select-none"
          aria-hidden="true"
        >
          ✧
        </span>

        {/* Top Header Bar */}
        <div>
          <header className="flex items-center justify-between gap-3 px-6 sm:px-9 pt-6 pb-2.5">
            <div className="text-[10px] sm:text-[11px] tracking-[0.26em] uppercase text-[#9e607c] font-semibold truncate">
              ✦ a royal surprise for iqra · by gojo raze 🖤 ✦
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleToggleAudio}
                aria-label={isMusicActive ? 'Pause royal chimes' : 'Play royal chimes'}
                title={isMusicActive ? 'Pause royal music box' : 'Play gentle royal chimes'}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-semibold transition-all cursor-pointer border whitespace-nowrap shrink-0 ${
                  isMusicActive
                    ? 'bg-[#793b60] text-white border-[#793b60] shadow-sm'
                    : 'bg-white/80 hover:bg-white text-[#96516f] border-[#e8c5d4]'
                }`}
              >
                {isMusicActive ? (
                  <Volume2 className="w-3.5 h-3.5 text-[#f7dce8]" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-[#b57a95]" />
                )}
                <span className="hidden sm:inline">
                  {isMusicActive ? 'Chimes On' : 'Royal Chimes'}
                </span>
              </button>

              <button
                type="button"
                id="sparkleBtn"
                onClick={handleSprinkleMagic}
                className="inline-flex items-center gap-1.5 border border-[#e8c5d4] bg-white/85 hover:bg-white rounded-full px-3.5 py-2 text-[#96516f] hover:text-[#793b60] text-[11px] font-semibold cursor-pointer shadow-xs hover:shadow-sm transition-all active:scale-95 whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d5ad69]" />
                <span>✧ Sprinkle magic</span>
              </button>
            </div>
          </header>

          {/* Animated Progress Bar & Interactive 10-Chapter Scrubber */}
          <div className="px-6 sm:px-9 pt-1">
            <div
              className="h-1.5 bg-[#f0dce5] rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={10}
              aria-valuemax={100}
              aria-label="Storybook chapter progress"
            >
              <span
                id="bar"
                className="block h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, #cf7397 0%, #d9b779 100%)',
                }}
              />
            </div>

            {/* Subtle Chapter Jumping Dots */}
            <div
              className="mt-2.5 flex items-center justify-between gap-1 px-0.5"
              role="tablist"
              aria-label="Jump to story chapter"
            >
              {CHAPTERS.map((chap) => {
                const isCurrent = chap.index === current;
                const isPast = chap.index < current;
                return (
                  <button
                    key={chap.index}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={`Chapter ${chap.numberLabel}: ${chap.shortTitle}`}
                    title={`Chapter ${chap.numberLabel} · ${chap.shortTitle}`}
                    onClick={() => goToChapter(chap.index)}
                    className={`group flex-1 py-1 flex flex-col items-center gap-1 cursor-pointer focus:outline-none`}
                  >
                    <span
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isCurrent
                          ? 'w-6 bg-[#c65d88]'
                          : isPast
                          ? 'w-2 bg-[#d899b3] group-hover:bg-[#c65d88]'
                          : 'w-1.5 bg-[#e6ced9] group-hover:bg-[#d3a5ba]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Stage for the Active Chapter */}
        <div className="relative flex-1 flex items-center justify-center px-5 sm:px-10 py-5 min-h-[470px] royal-scroll overflow-y-auto">
          <ChapterScene
            chapter={activeChapter}
            direction={direction}
            envelopeOpen={envelopeOpen}
            onToggleEnvelope={handleToggleEnvelope}
            onSparkleBurst={spawnConfettiBurst}
            onAdvanceFromPrologue={handleNext}
            onCardSound={handleCardSound}
          />
        </div>

        {/* Bottom Navigation Bar & Signature Footer */}
        <div>
          <nav
            className="flex items-center justify-between px-6 sm:px-9 pt-3 pb-5 gap-3"
            aria-label="Chapter navigation"
          >
            <button
              type="button"
              id="prev"
              onClick={handlePrev}
              disabled={current === 0}
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-xs sm:text-[13px] font-semibold bg-white/85 hover:bg-white text-[#94516e] border border-[#e8c5d4] transition-all cursor-pointer disabled:opacity-35 disabled:cursor-default disabled:hover:translate-y-0 hover:-translate-y-0.5 active:scale-97 whitespace-nowrap shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="flex flex-col items-center">
              <div
                id="count"
                className="text-xs tracking-[0.22em] font-semibold text-[#9e6b83] tabular-nums"
              >
                {counterLabel}
              </div>
              <span className="text-[10px] tracking-wider text-[#b3889c] hidden sm:inline mt-0.5">
                {activeChapter.shortTitle}
              </span>
            </div>

            <button
              type="button"
              id="next"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded-full px-5 sm:px-6 py-3 text-xs sm:text-[13px] font-semibold text-white transition-all cursor-pointer hover:-translate-y-0.5 active:scale-97 whitespace-nowrap shrink-0"
              style={{
                background: 'linear-gradient(135deg, #c65d88 0%, #a94d79 100%)',
                boxShadow: '0 10px 22px rgba(185, 87, 129, 0.28)',
              }}
            >
              {current === TOTAL_CHAPTERS - 1 ? (
                <>
                  <span>Replay</span>
                  <RotateCcw className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>Next chapter</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </nav>

          <footer className="text-center text-[10px] tracking-[0.22em] uppercase text-[#ad7e94] px-4 pb-4 font-medium">
            MADE WITH ✦ FRIENDSHIP ✦ AND A LITTLE MISCHIEF · GOJO RAZE 🖤
          </footer>
        </div>
      </main>
    </div>
  );
}
