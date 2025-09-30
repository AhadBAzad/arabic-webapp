// Daily Phrases Database — smart transliteration + reliable harakah for sample lines
// Drop-in replacement for your module. Preserves your interfaces & helpers.

import type { Word } from '../types';

export interface DailyPhrase {
  id: string;
  category: string;
  words: Word[];
  translation: string;
  transliteration: string;
  usage: string;
  difficulty: 'easy' | 'medium' | 'hard';
  level: 'A1' | 'A2' | 'B1' | 'B2';
}

// -----------------------------------------------------------------------------
// Smart transliteration + harakah helpers
// -----------------------------------------------------------------------------
const AR_DIAC = /[ًٌٍَُِّْـ]/g; // Arabic diacritics we may strip/ignore
const SUN_LETTERS = new Set(['ت','ث','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ل','ن']);

// Per-token overrides (function words)
const TOKEN_OVERRIDES: Record<string, { harakah?: string; translit?: string }> = {
  'في': { harakah: 'فِي', translit: 'fi' },
  'هل': { harakah: 'هَلْ', translit: 'hal' },
  'هذا': { harakah: 'هٰذَا', translit: 'hadha' },
  'هذه': { harakah: 'هٰذِهِ', translit: 'hadhihi' },
  'من': { harakah: 'مِنْ', translit: 'min' },
  'إلى': { harakah: 'إِلَى', translit: 'ila' },
  'على': { harakah: 'عَلَى', translit: "'ala" },
  'و': { harakah: 'وَ', translit: 'wa' },
  'يا': { harakah: 'يَا', translit: 'ya' },
};

// Phrase-level overrides (exact match → guaranteed harakah + transliteration)
const PHRASE_OVERRIDES: Record<string, { harakah: string; translit: string }> = {
  'في صحتك.': { harakah: 'فِي صِحَّتِكَ.', translit: 'fi sihhatika.' },
  'هل فهمت؟': { harakah: 'هَلْ فَهِمْتَ؟', translit: 'hal fahimta?' },
  'مرحباً.': { harakah: 'مَرْحَبًا.', translit: 'marhaban.' },
  'النجدة!': { harakah: 'النَّجْدَة!', translit: 'an-najdah!' },
  'اركض!': { harakah: 'اِرْكُضْ!', translit: 'irkud!' },
  'اقفز!': { harakah: 'اِقْفِزْ!', translit: 'iqfiz!' },
  'قف!': { harakah: 'قِفْ!', translit: 'qif!' },
};

// Base character map (ASCII-friendly)
const charMap: Record<string, string> = {
  'ا': 'a','أ': 'a','إ': 'i','آ': 'aa','ء': "'",'ؤ': "'",'ئ': "'",
  'ب': 'b','ت': 't','ث': 'th','ج': 'j','ح': 'h','خ': 'kh','د': 'd','ذ': 'dh',
  'ر': 'r','ز': 'z','س': 's','ش': 'sh','ص': 's','ض': 'd','ط': 't','ظ': 'dh',
  'ع': "'",'غ': 'gh','ف': 'f','ق': 'q','ك': 'k','ل': 'l','م': 'm','ن': 'n',
  'ه': 'h','ة': 'a','و': 'w','ي': 'y','ى': 'a','ٱ': 'a','ﻻ': 'la','لا': 'la',
};

function romanizeCore(raw: string): string {
  let out = '';
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === 'و') { out += i === 0 ? 'w' : 'u'; continue; }
    if (ch === 'ي') { out += i === 0 ? 'y' : 'i'; continue; }
    out += charMap[ch] ?? ch;
  }
  return out;
}

function transliterateToken(token: string): string {
  if (!token) return '';
  const raw = token.replace(AR_DIAC, '');
  // Token-level override
  if (TOKEN_OVERRIDES[raw]?.translit) return TOKEN_OVERRIDES[raw]!.translit!;

  // Definite article handling with simple assimilation: al- + sun letter → a{C}-
  if (raw.startsWith('ال') && raw.length > 2) {
    const next = raw[2];
    const rest = raw.slice(2);
    if (SUN_LETTERS.has(next)) {
      // e.g., الشمس → ash-shams, النجدة → an-najdah
      const head = 'a' + romanizeCore(next) + '-';
      return head + romanizeCore(rest)
        .replace(new RegExp('^' + romanizeCore(next)), ''); // avoid double printing first consonant
    }
    return 'al-' + romanizeCore(rest);
  }

  return romanizeCore(raw);
}

function smartTransliterate(arabic: string): string {
  const ov = PHRASE_OVERRIDES[arabic.trim()];
  if (ov) return ov.translit;
  return arabic
    .split(/(\s+|[؟!?.,؛،])/)
    .map(tok => (/^\s+$/.test(tok) || /^[؟!?.,؛،]$/.test(tok) ? tok : transliterateToken(tok)))
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

function addHarakah(arabic: string): string {
  const ov = PHRASE_OVERRIDES[arabic.trim()];
  if (ov) return ov.harakah;
  // Light per-token enrichment only (function words). Others remain as-is (no guessing).
  return arabic
    .split(/(\s+|[؟!?.,؛،])/)
    .map(tok => {
      if (/^\s+$/.test(tok) || /^[؟!?.,؛،]$/.test(tok)) return tok;
      const base = tok.replace(AR_DIAC, '');
      return TOKEN_OVERRIDES[base]?.harakah ?? tok;
    })
    .join('');
}

// Builder to avoid TS spreads/any casts
const makeWord = (
  arabic: string,
  english: string,
  opts?: { harakah?: string; translit?: string }
): Word => {
  const har = (opts?.harakah ?? arabic ?? '-').trim();
  const tr  = (opts?.translit ?? smartTransliterate(arabic)).trim();
  return {
    arabic,
    arabicWithHarakah: har || arabic || '-',
    transliteration: tr || '-',
    translation: english,
    grammarType: 'compound',
    root: '',
    rootTransliteration: '',
    rootMeaning: '',
  };
};

// -----------------------------------------------------------------------------
// Category/difficulty heuristics (unchanged)
// -----------------------------------------------------------------------------
const catFromEnglish = (en: string): string => {
  const s = en.toLowerCase();
  if (/^(hi|hello|good\s*morning|good\s*evening|goodbye|welcome|what's\s*up)/.test(s)) return 'greetings';
  if (/^(thanks|thank you|cheers|pardon me|excuse me)/.test(s)) return 'polite';
  if (/^(run|help|jump|stop|go|come|look|listen|wake|watch|speak|stand|take)/.test(s)) return 'imperatives';
  if (/(^|\s)(who|what|why|when|how|where|which)\b|^did i|^is it|then what|who cares|who knows/i.test(s)) return 'questions';
  return 'daily';
};
const difficultyFromEnglish = (en: string) => (en.split(/\s+/).filter(Boolean).length <= 2 ? 'easy' : en.split(/\s+/).length <= 5 ? 'medium' : 'hard') as DailyPhrase['difficulty'];
const levelFromDifficulty = (d: DailyPhrase['difficulty']) => (d === 'easy' ? 'A1' : d === 'medium' ? 'A2' : 'B1') as DailyPhrase['level'];

// -----------------------------------------------------------------------------
// Seeds (1–8) — your originals
// -----------------------------------------------------------------------------
const basePhrases: DailyPhrase[] = [
  {
    id: '1',
    category: 'greetings',
    words: [
      { arabic: 'السلام', arabicWithHarakah: 'السَّلامُ', transliteration: 'as-salamu', translation: 'peace', grammarType: 'noun', root: 'س ل م', rootTransliteration: 's-l-m', rootMeaning: 'safety, peace, security' },
      { arabic: 'عليكم', arabicWithHarakah: 'عَلَيْكُمْ', transliteration: 'alaykum', translation: 'upon you', grammarType: 'preposition', root: 'ع ل ي', rootTransliteration: '3-l-y', rootMeaning: 'to be high, elevated' },
    ],
    translation: 'Peace be upon you (Islamic greeting)',
    transliteration: 'Assalamu alaykum',
    usage: 'Standard Islamic greeting used throughout the day',
    difficulty: 'easy',
    level: 'A1',
  },
  {
    id: '2',
    category: 'greetings',
    words: [
      { arabic: 'وعليكم', arabicWithHarakah: 'وَعَلَيْكُمُ', transliteration: 'wa alaykum', translation: 'and upon you', grammarType: 'conjunction', root: 'ع ل ي', rootTransliteration: '3-l-y', rootMeaning: 'to be high, elevated' },
      { arabic: 'السلام', arabicWithHarakah: 'السَّلامُ', transliteration: 'as-salam', translation: 'the peace', grammarType: 'noun', root: 'س ل م', rootTransliteration: 's-l-m', rootMeaning: 'safety, peace, security' },
    ],
    translation: 'And upon you peace (response to Islamic greeting)',
    transliteration: 'Wa alaykum as-salam',
    usage: 'Standard response to "As-salāmu ʿalaykum"',
    difficulty: 'easy',
    level: 'A1',
  },
  {
    id: '3',
    category: 'daily',
    words: [
      { arabic: 'شكرا', arabicWithHarakah: 'شُكْراً', transliteration: 'shukran', translation: 'thanks', grammarType: 'noun', root: 'ش ك ر', rootTransliteration: 'sh-k-r', rootMeaning: 'to be grateful' },
      { arabic: 'لك', arabicWithHarakah: 'لَكَ', transliteration: 'lak', translation: 'to you', grammarType: 'preposition', root: 'ل ك', rootTransliteration: 'l-k', rootMeaning: 'to/for you' },
    ],
    translation: 'Thank you',
    transliteration: 'Shukran lak',
    usage: 'Common way to express gratitude',
    difficulty: 'easy',
    level: 'A1',
  },
  {
    id: '4',
    category: 'polite',
    words: [
      { arabic: 'من', arabicWithHarakah: 'مِنْ', transliteration: 'min', translation: 'from', grammarType: 'preposition', root: 'م ن', rootTransliteration: 'm-n', rootMeaning: 'from, of' },
      { arabic: 'فضلك', arabicWithHarakah: 'فَضْلِكَ', transliteration: 'fadlik', translation: 'your favor', grammarType: 'noun', root: 'ف ض ل', rootTransliteration: 'f-d-l', rootMeaning: 'to favor, prefer' },
    ],
    translation: 'Please',
    transliteration: 'Min fadlik',
    usage: 'Polite way to make a request',
    difficulty: 'easy',
    level: 'A1',
  },
  {
    id: '5',
    category: 'family',
    words: [
      { arabic: 'هذه', arabicWithHarakah: 'هٰذِهِ', transliteration: 'hadhihi', translation: 'this (feminine)', grammarType: 'pronoun', root: 'ه ذ ا', rootTransliteration: 'h-dh-a', rootMeaning: 'this, that' },
      { arabic: 'عائلتي', arabicWithHarakah: 'عائِلَتي', transliteration: "a'ilati", translation: 'my family', grammarType: 'noun', root: 'ع و ل', rootTransliteration: '3-w-l', rootMeaning: 'to support, maintain' },
    ],
    translation: 'This is my family',
    transliteration: "Hadhihi a'ilati",
    usage: 'Introducing your family members',
    difficulty: 'medium',
    level: 'A2',
  },
  {
    id: '6',
    category: 'time',
    words: [
      { arabic: 'كم', arabicWithHarakah: 'كَمِ', transliteration: 'kam', translation: 'how much/many', grammarType: 'particle', root: 'ك م', rootTransliteration: 'k-m', rootMeaning: 'how much, quantity' },
      { arabic: 'الساعة؟', arabicWithHarakah: 'السّاعَة؟', transliteration: "as-sa'a?", translation: 'the hour/clock?', grammarType: 'noun', root: 'س و ع', rootTransliteration: 's-w-3', rootMeaning: 'time measurement' },
    ],
    translation: 'What time is it?',
    transliteration: "Kam as-sa'a?",
    usage: 'Asking for the current time',
    difficulty: 'medium',
    level: 'A2',
  },
  {
    id: '7',
    category: 'food',
    words: [
      { arabic: 'أريد', arabicWithHarakah: 'أُريدُ', transliteration: 'uridu', translation: 'I want', grammarType: 'verb', root: 'ر و د', rootTransliteration: 'r-w-d', rootMeaning: 'to want, desire' },
      { arabic: 'طعاماً', arabicWithHarakah: 'طَعاماً', transliteration: "ta'aman", translation: 'food', grammarType: 'noun', root: 'ط ع م', rootTransliteration: 't-3-m', rootMeaning: 'food, taste' },
    ],
    translation: 'I want food',
    transliteration: "Uridu ta'aman",
    usage: 'Expressing desire for food',
    difficulty: 'medium',
    level: 'A2',
  },
  {
    id: '8',
    category: 'travel',
    words: [
      { arabic: 'أين', arabicWithHarakah: 'أَيْنَ', transliteration: 'ayna', translation: 'where', grammarType: 'adverb', root: 'ا ي ن', rootTransliteration: 'a-y-n', rootMeaning: 'where, location' },
      { arabic: 'المطار؟', arabicWithHarakah: 'المَطارُ؟', transliteration: 'al-matar?', translation: 'the airport?', grammarType: 'noun', root: 'ط ي ر', rootTransliteration: 't-y-r', rootMeaning: 'to fly' },
    ],
    translation: 'Where is the airport?',
    transliteration: 'Ayna al-matar?',
    usage: 'Asking for directions to the airport',
    difficulty: 'medium',
    level: 'A2',
  },
];

// -----------------------------------------------------------------------------
// RAW sample lines (few) — English + Arabic on the same line
// -----------------------------------------------------------------------------
const RAW_LINES = `
Run! اركض!
Jump! اقفز!
Stop! قف!
Got it? هل فهمت؟
Cheers! في صحتك.
Hello! مرحباً.
Help! النجدة!

`;

// -----------------------------------------------------------------------------
// Parser (split English and Arabic with a regex)
// -----------------------------------------------------------------------------
function parseLines(raw: string, startId: number): DailyPhrase[] {
  const lines = raw.split(/\r?\n/).map(s => s.trim()).filter(Boolean).slice(0, 200);
  let id = startId;
  const items: DailyPhrase[] = [];

  for (const line of lines) {
    const m = line.match(/^([^ء-ي]+?)\s+([ء-ي].*)$/);
    if (!m) continue; // skip malformed
    const english = m[1].trim();
    const arabic  = m[2].trim();

    const category   = catFromEnglish(english);
    const difficulty = difficultyFromEnglish(english);
    const level      = levelFromDifficulty(difficulty);

    const withHarakah = addHarakah(arabic);
    const tr          = smartTransliterate(arabic);

    items.push({
      id: String(id++),
      category,
      words: [makeWord(arabic, english, { harakah: withHarakah, translit: tr })],
      translation: english,
      transliteration: tr,
      usage: category === 'greetings' ? 'Common greeting/response' : category === 'polite' ? 'Polite expression' : '',
      difficulty,
      level,
    });
  }
  return items;
}

const parsedFromDoc: DailyPhrase[] = parseLines(RAW_LINES, basePhrases.length + 1);

// -----------------------------------------------------------------------------
// FINAL EXPORT + HELPERS
// -----------------------------------------------------------------------------
export const dailyPhrasesDatabase: DailyPhrase[] = [
  ...basePhrases,
  ...parsedFromDoc,
];

export const getPhrasesByCategory = (category: string): DailyPhrase[] => dailyPhrasesDatabase.filter(p => p.category === category);
export const getPhrasesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): DailyPhrase[] => dailyPhrasesDatabase.filter(p => p.difficulty === difficulty);
export const getCategories = (): string[] => [...new Set(dailyPhrasesDatabase.map(p => p.category))];
export const getPhraseById = (id: string): DailyPhrase | undefined => dailyPhrasesDatabase.find(p => p.id === id);
