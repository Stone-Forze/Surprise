import React, { useState } from 'react';
import { ChapterData } from '../data/storyData';
import { RoyalEnvelope } from './RoyalEnvelope';
import { Check, Sparkles } from 'lucide-react';

interface ChapterSceneProps {
  chapter: ChapterData;
  direction: number;
  envelopeOpen: boolean;
  onToggleEnvelope: () => void;
  onSparkleBurst: (count?: number) => void;
  onAdvanceFromPrologue: () => void;
  onCardSound: () => void;
}

export const ChapterScene: React.FC<ChapterSceneProps> = ({
  chapter,
  direction,
  envelopeOpen,
  onToggleEnvelope,
  onSparkleBurst,
  onAdvanceFromPrologue,
  onCardSound,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [sealStamped, setSealStamped] = useState<boolean>(false);

  const handleMiniCardClick = (id: string) => {
    setSelectedCardId((prev) => (prev === id ? null : id));
    onCardSound();
    onSparkleBurst(12);
  };

  const handleChecklistToggle = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    onCardSound();
    onSparkleBurst(10);
  };

  const handleStampFriendshipSeal = () => {
    setSealStamped((prev) => !prev);
    onCardSound();
    onSparkleBurst(26);
  };

  return (
    <section
      key={chapter.index}
      className={`w-full max-w-[610px] mx-auto text-center px-2 sm:px-4 py-2 flex flex-col items-center justify-center ${
        direction >= 0 ? 'animate-scene-next' : 'animate-scene-prev'
      }`}
      aria-live="polite"
    >
      {/* Eyebrow Kicker */}
      <div
        style={{ animationDelay: '0.04s' }}
        className="text-[11px] tracking-[0.32em] uppercase text-[#a66884] font-medium mb-4 animate-stagger-rise"
      >
        {chapter.eyebrow}
      </div>

      {/* Chapter 10 Final Reveal Envelope Special Layout */}
      {chapter.isFinalEnvelope ? (
        <RoyalEnvelope
          isOpen={envelopeOpen}
          onToggle={onToggleEnvelope}
          onSparkleBurst={onSparkleBurst}
        />
      ) : (
        <>
          {/* Chapter 1 Rotating Royal Crown Medallion OR Floating Ornament */}
          {chapter.isOpeningSeal ? (
            <div
              style={{ animationDelay: '0.08s' }}
              className="relative w-32 h-32 mx-auto mb-5 flex items-center justify-center animate-stagger-rise"
            >
              {/* Outer rotating gold ring */}
              <div
                className="absolute inset-0 rounded-full border border-[#d5ad69] animate-seal-spin"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.88) 38%, rgba(246,229,237,0.92) 100%)',
                  boxShadow:
                    '0 0 0 8px rgba(255, 255, 255, 0.55), 0 0 0 9px rgba(233, 212, 223, 0.95), 0 18px 38px rgba(182, 91, 136, 0.2)',
                }}
              />
              {/* Decorative counter-rotating dashed aura */}
              <div className="absolute inset-[-10px] rounded-full border border-dashed border-[#d5ad69]/65 animate-seal-reverse pointer-events-none" />
              <button
                type="button"
                onClick={() => {
                  onCardSound();
                  onSparkleBurst(32);
                }}
                aria-label="Tap royal crown for extra sparkles"
                className="relative z-10 text-5xl sm:text-6xl select-none cursor-pointer focus:outline-none transition-transform duration-200 hover:scale-110 active:scale-95"
                style={{
                  filter: 'drop-shadow(0 8px 14px rgba(198, 93, 136, 0.28))',
                }}
              >
                👑
              </button>
            </div>
          ) : (
            chapter.ornament && (
              <button
                type="button"
                onClick={() => {
                  onCardSound();
                  onSparkleBurst(20);
                }}
                aria-label={`Tap ${chapter.shortTitle} emblem for magic sparkles`}
                className="text-5xl sm:text-6xl block mx-auto mb-3 select-none animate-float-bob cursor-pointer focus:outline-none transition-transform duration-200 hover:scale-110 active:scale-95"
                style={{
                  filter: 'drop-shadow(0 10px 12px rgba(198, 107, 144, 0.25))',
                }}
              >
                {chapter.ornament}
              </button>
            )
          )}

          {/* Primary Display Heading */}
          {chapter.index === 0 ? (
            <h1
              style={{
                fontSize: 'clamp(3.1rem, 8.5vw, 5.25rem)',
                textWrap: 'balance',
                animationDelay: '0.12s',
              }}
              className="font-serif-royal font-semibold text-[#6a2f52] leading-[0.96] tracking-tight my-2 animate-stagger-rise"
            >
              {chapter.headlineLines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < chapter.headlineLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
          ) : (
            <h2
              style={{
                fontSize: 'clamp(2.4rem, 6.5vw, 3.85rem)',
                textWrap: 'balance',
                animationDelay: '0.12s',
              }}
              className="font-serif-royal font-semibold text-[#6a2f52] leading-[0.98] tracking-tight my-2 animate-stagger-rise"
            >
              {chapter.headlineLines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < chapter.headlineLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
          )}

          {/* Optional Italic Script Sub-headline (Chapter 3) */}
          {chapter.scriptLine && (
            <p
              style={{ animationDelay: '0.16s' }}
              className="font-serif-royal italic text-2xl sm:text-3xl text-[#bd5d87] my-1.5 animate-stagger-rise"
            >
              {chapter.scriptLine}
            </p>
          )}

          {/* Lead Paragraph */}
          {chapter.leadHtml && (
            <p
              style={{ animationDelay: '0.18s', textWrap: 'balance' }}
              className="font-serif-royal text-lg sm:text-[21px] leading-[1.75] max-w-[540px] mx-auto text-[#6d475c] mt-2 animate-stagger-rise"
              dangerouslySetInnerHTML={{ __html: chapter.leadHtml }}
            />
          )}

          {/* Body Copy */}
          {chapter.copyText && !chapter.listItems && (
            <p
              style={{ animationDelay: '0.24s', textWrap: 'balance' }}
              className="text-sm sm:text-[15px] leading-[1.85] max-w-[510px] mx-auto text-[#735466] mt-3 animate-stagger-rise"
            >
              {chapter.copyText}
            </p>
          )}

          {/* Chapter 4: Three Interactive Trait Cards */}
          {chapter.miniCards && (
            <div className="w-full max-w-[560px] mx-auto mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {chapter.miniCards.map((card, idx) => {
                  const isSelected = selectedCardId === card.id;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleMiniCardClick(card.id)}
                      style={{ animationDelay: `${0.16 + idx * 0.08}s` }}
                      className={`text-center rounded-2xl p-4 transition-all duration-200 cursor-pointer border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c65d88] hover:-translate-y-1.5 animate-stagger-rise ${
                        isSelected
                          ? 'bg-white border-[#c65d88] shadow-lg ring-2 ring-[#c65d88]/20'
                          : 'bg-white/85 hover:bg-white border-[#eed8e3] shadow-sm'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{card.icon}</span>
                      <b className="block font-serif-royal text-2xl font-semibold text-[#a14670] my-1">
                        {card.title}
                      </b>
                      <span className="block text-xs leading-relaxed text-[#7e5b6e]">
                        {card.subtitle}
                      </span>
                      <span className="mt-2.5 inline-block text-[10px] tracking-wider uppercase text-[#b5668a] font-semibold">
                        {isSelected ? '✦ Royal Note Open' : 'Tap to inspect ✦'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Expanded Royal Note when a trait card is tapped */}
              {selectedCardId && (
                <div className="mt-3 rounded-xl bg-[#fff7fa] border border-[#e7c6d4] px-4 py-3 text-xs sm:text-sm text-[#793b60] shadow-sm animate-stagger-rise">
                  <span className="font-semibold text-[#a94d79]">Royal Archive Verdict: </span>
                  {chapter.miniCards.find((c) => c.id === selectedCardId)?.secretNote}
                </div>
              )}
            </div>
          )}

          {/* Chapter 5 & Chapter 7: Interactive Royal Decree / Superpower List */}
          {chapter.listItems && (
            <div className="w-full max-w-[460px] mx-auto mt-4 text-left grid gap-2.5">
              {chapter.listItems.map((item, idx) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleChecklistToggle(item.id)}
                    style={{ animationDelay: `${0.14 + idx * 0.08}s` }}
                    className={`w-full text-left rounded-2xl px-4 py-3 text-sm transition-all duration-200 cursor-pointer border flex items-center justify-between gap-3 hover:translate-x-1 animate-stagger-rise ${
                      isChecked
                        ? 'bg-white border-[#c65d88] shadow-md'
                        : 'bg-white/85 hover:bg-white border-[#f0dce5] shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg shrink-0" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span className="text-[#59394d] font-medium leading-snug">
                        {item.text}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline text-[10px] tracking-wider uppercase text-[#a36682]">
                        {isChecked ? 'Approved' : item.badgeText}
                      </span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-[#c65d88] border-[#c65d88] text-white'
                            : 'border-[#dfb8c9] bg-[#fff9fb] text-transparent'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Trailing copy below listItems (e.g. Chapter 5 award note) */}
          {chapter.copyText && chapter.listItems && (
            <p
              style={{ animationDelay: '0.36s' }}
              className="text-sm sm:text-[15px] leading-relaxed max-w-[490px] mx-auto text-[#735466] mt-3.5 animate-stagger-rise"
            >
              {chapter.copyText}
            </p>
          )}

          {/* Chapter 1 Interactive CTA OR Chapter 8 Stamp OR Clean Editorial Kicker */}
          {chapter.index === 0 && (
            <div
              style={{ animationDelay: '0.28s' }}
              className="mt-6 animate-stagger-rise"
            >
              <button
                type="button"
                onClick={onAdvanceFromPrologue}
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-[0.15em] uppercase text-[#8c3f65] bg-white/90 hover:bg-white border border-[#e5bfd0] shadow-md hover:shadow-lg transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c65d88] transition-transform group-hover:rotate-12" />
                <span>{chapter.footerSubtleKicker}</span>
              </button>
            </div>
          )}

          {chapter.index === 7 && (
            <div
              style={{ animationDelay: '0.28s' }}
              className="mt-5 flex flex-col items-center gap-2 animate-stagger-rise"
            >
              <button
                type="button"
                onClick={handleStampFriendshipSeal}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.14em] uppercase transition-all cursor-pointer border whitespace-nowrap shrink-0 ${
                  sealStamped
                    ? 'bg-[#793b60] text-white border-[#793b60] shadow-md'
                    : 'bg-white/85 text-[#944a6e] border-[#e7c6d4] hover:bg-white'
                }`}
              >
                <span>
                  {sealStamped
                    ? '✦ OFFICIALLY STAMPED · ONLY FRIENDS, YOUR HONOUR ✦'
                    : '👑 STAMP CERTIFICATE · ONLY FRIENDS, YOUR HONOUR'}
                </span>
              </button>
            </div>
          )}

          {chapter.footerSubtleKicker && chapter.index !== 0 && chapter.index !== 7 && (
            <div
              style={{ animationDelay: '0.3s' }}
              className="mt-5 pt-2 border-t border-[#eed8e3]/80 inline-block text-[11px] tracking-[0.2em] uppercase text-[#9c5374] font-semibold animate-stagger-rise"
            >
              ✦ {chapter.footerSubtleKicker} ✦
            </div>
          )}
        </>
      )}
    </section>
  );
};
