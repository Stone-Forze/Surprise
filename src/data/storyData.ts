export interface MiniCardItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  secretNote: string;
}

export interface ChecklistItem {
  id: string;
  icon: string;
  text: string;
  badgeText: string;
}

export interface ChapterData {
  index: number;
  numberLabel: string;
  eyebrow: string;
  shortTitle: string;
  ornament?: string;
  isOpeningSeal?: boolean;
  isFinalEnvelope?: boolean;
  headlineLines: string[];
  leadHtml?: string;
  scriptLine?: string;
  copyText?: string;
  footerSubtleKicker?: string;
  miniCards?: MiniCardItem[];
  listItems?: ChecklistItem[];
}

export interface ShayariVerse {
  id: string;
  title: string;
  lines: string[];
  accentEmoji: string;
}

export const TOTAL_CHAPTERS = 10;

export const SHAYARI_VERSES: ShayariVerse[] = [
  {
    id: 'verse-1',
    title: 'Roshan Har Shaam',
    accentEmoji: '🌸',
    lines: [
      'Teri hansi se roshan har shaam rahe,',
      'Khushiyon ke naam tera har paighaam rahe.',
      'Yun hi muskurati rehna har mod par,',
      'Tere chehre pe hamesha khushiyon ka mukaam rahe. 🌸',
    ],
  },
  {
    id: 'verse-2',
    title: 'Khoobsurat Churail',
    accentEmoji: '😂',
    lines: [
      'Na chaand ki khwahish, na sitaaron ka shor,',
      'Teri dosti mein hi hai khushiyon ka zor.',
      'Thodi si pagal, thodi si kamaal,',
      'Khoobsurat Churail, tu hai bemisaal. 😂',
    ],
  },
  {
    id: 'verse-3',
    title: 'Dosti Ka Rishta',
    accentEmoji: '🖤',
    lines: [
      'Har din tera haseen, har khwaab ho poora,',
      'Gham tujhse rahe door, sukoon ho bharpoor.',
      'Dosti ka ye rishta yun hi muskurata rahe,',
      'Gojo Raze ki taraf se ye paighaam yaad rahe. 🖤',
    ],
  },
];

export const CHAPTERS: ChapterData[] = [
  {
    index: 0,
    numberLabel: '01',
    eyebrow: 'A special delivery has arrived',
    shortTitle: 'Prologue',
    isOpeningSeal: true,
    headlineLines: ['Happy', 'Princess Day'],
    leadHtml: 'For the one and only <b>IQRA</b> — today, the whole kingdom is yours.',
    footerSubtleKicker: 'OPEN YOUR LITTLE SURPRISE ✨',
  },
  {
    index: 1,
    numberLabel: '02',
    eyebrow: 'Chapter 02 · The royal invitation',
    shortTitle: 'Invitation',
    ornament: '💌',
    headlineLines: ['Dear Princess Iqra,'],
    leadHtml:
      'Please take your seat on the royal throne. This tiny website has been prepared by <b>Gojo Raze 🖤</b> with a little sparkle, a lot of respect, and just enough teasing.',
    copyText:
      'Your royal duties for today: smile, relax, and accept compliments without arguing. 😌',
  },
  {
    index: 2,
    numberLabel: '03',
    eyebrow: 'Chapter 03 · Official royal title',
    shortTitle: 'Royal Title',
    ornament: '🪄',
    headlineLines: ['Khoobsurat', 'Churail'],
    scriptLine: 'The legendary one. 😂',
    copyText:
      'A nickname this iconic cannot be given to an ordinary person. It takes beauty, mischief, dramatic timing, and a little bit of supernatural talent.',
    footerSubtleKicker: 'TITLE APPROVED BY THE KINGDOM',
  },
  {
    index: 3,
    numberLabel: '04',
    eyebrow: "Chapter 04 · Why you're iconic",
    shortTitle: 'Iconic Traits',
    ornament: '🌷',
    headlineLines: ['Three things', 'that make you YOU'],
    miniCards: [
      {
        id: 'vibe',
        icon: '✨',
        title: 'Your vibe',
        subtitle: 'One of a kind. Impossible to copy.',
        secretNote: 'Certified 100% authentic original energy — zero duplicates found in the kingdom.',
      },
      {
        id: 'drama',
        icon: '😂',
        title: 'Your drama',
        subtitle: 'Even Netflix needs your storyline.',
        secretNote: 'Plot twists, dramatic pauses, and main-character energy in every single episode.',
      },
      {
        id: 'sparkle',
        icon: '🦋',
        title: 'Your sparkle',
        subtitle: 'A little chaos, a lot of charm.',
        secretNote: 'Turns ordinary dull days into memorable stories effortlessly.',
      },
    ],
  },
  {
    index: 4,
    numberLabel: '05',
    eyebrow: 'Chapter 05 · Royal superpowers',
    shortTitle: 'Superpowers',
    ornament: '⚡',
    headlineLines: ['Certified', 'troublemaker'],
    listItems: [
      {
        id: 'power-1',
        icon: '💬',
        text: 'Turning one message into a whole conversation.',
        badgeText: 'Mastery Level: Royal Legend',
      },
      {
        id: 'power-2',
        icon: '🎭',
        text: 'Making a simple moment ten times more dramatic.',
        badgeText: 'Oscar-Worthy Timing',
      },
      {
        id: 'power-3',
        icon: '🌟',
        text: 'Being memorable without even trying.',
        badgeText: 'Effortless Aura',
      },
    ],
    copyText: 'Honestly, your talent deserves its own award. 🏆',
  },
  {
    index: 5,
    numberLabel: '06',
    eyebrow: 'Chapter 06 · A little reminder',
    shortTitle: 'Your Worth',
    ornament: '🦢',
    headlineLines: ['Never forget', 'your worth'],
    leadHtml:
      "You're stronger than your difficult days, brighter than your doubts, and deserving of kindness in every season.",
    copyText:
      'Keep your head high, protect your peace, and never let the world dim your sparkle. 💗',
  },
  {
    index: 6,
    numberLabel: '07',
    eyebrow: 'Chapter 07 · Royal privileges',
    shortTitle: 'Royal Rules',
    ornament: '🍰',
    headlineLines: ['Rules for today'],
    listItems: [
      {
        id: 'rule-1',
        icon: '👑',
        text: 'Be extra. It is your royal right.',
        badgeText: 'Decree #01 · Active',
      },
      {
        id: 'rule-2',
        icon: '🍓',
        text: 'Snacks are mandatory, not optional.',
        badgeText: 'Decree #02 · Top Priority',
      },
      {
        id: 'rule-3',
        icon: '💅',
        text: 'Ignore negativity like a queen.',
        badgeText: 'Decree #03 · Unbreakable',
      },
      {
        id: 'rule-4',
        icon: '🤣',
        text: 'Laugh at your own jokes. Always.',
        badgeText: 'Decree #04 · Signature Move',
      },
    ],
  },
  {
    index: 7,
    numberLabel: '08',
    eyebrow: 'Chapter 08 · Important clarification',
    shortTitle: 'Friendship Seal',
    ornament: '🤝',
    headlineLines: ['Friendship', 'certificate'],
    leadHtml:
      'This royal surprise is officially, proudly, and completely <b>FRIENDSHIP EDITION</b>.',
    copyText:
      'No romance. No proposal. No hidden plot twist. Just Gojo Raze 🖤 appreciating a friend and teasing her a little. 😌',
    footerSubtleKicker: 'ONLY FRIENDS, YOUR HONOUR',
  },
  {
    index: 8,
    numberLabel: '09',
    eyebrow: 'Chapter 09 · A wish from your friend',
    shortTitle: 'Royal Wish',
    ornament: '🌙',
    headlineLines: ['May life be', 'kind to you'],
    leadHtml:
      'May your smile stay bright, your worries get lighter, your dreams come closer, and your days be filled with people who truly value you.',
    copyText:
      'You deserve peaceful mornings, happy surprises, genuine laughter, and countless reasons to feel proud of yourself.',
  },
  {
    index: 9,
    numberLabel: '10',
    eyebrow: 'Chapter 10 · The final royal reveal',
    shortTitle: 'Final Reveal',
    isFinalEnvelope: true,
    headlineLines: ['One last thing…'],
    leadHtml: 'Tap the envelope, Your Highness.',
    copyText: 'Your final message is waiting inside. 💌',
    footerSubtleKicker: 'HAPPY PRINCESS DAY, KHUBSOORAT CHURAIL 👑',
  },
];

export function clampChapterIndex(index: number): number {
  if (Number.isNaN(index) || index < 0) return 0;
  if (index >= TOTAL_CHAPTERS) return TOTAL_CHAPTERS - 1;
  return index;
}

export function getNextChapterIndex(current: number): number {
  if (current >= TOTAL_CHAPTERS - 1) return 0;
  return current + 1;
}

export function getPrevChapterIndex(current: number): number {
  if (current <= 0) return 0;
  return current - 1;
}

export function getProgressPercent(current: number): number {
  const safe = clampChapterIndex(current);
  return Math.round(((safe + 1) / TOTAL_CHAPTERS) * 100);
}

export function formatChapterCounter(current: number): string {
  const safe = clampChapterIndex(current);
  return `${String(safe + 1).padStart(2, '0')} / ${String(TOTAL_CHAPTERS).padStart(2, '0')}`;
}

export function toggleEnvelopeState(isOpen: boolean): boolean {
  return !isOpen;
}
