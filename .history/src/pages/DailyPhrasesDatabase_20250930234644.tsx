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


// ------------------ transliteration helpers ------------------
const basicMap: Record<string, string> = {
'ا': 'a','أ': 'a','إ': 'i','آ': 'aa','ء': "'",'ؤ': "'",'ئ': "'",
'ب': 'b','ت': 't','ث': 'th','ج': 'j','ح': 'h','خ': 'kh','د': 'd','ذ': 'dh',
'ر': 'r','ز': 'z','س': 's','ش': 'sh','ص': 's','ض': 'd','ط': 't','ظ': 'dh',
'ع': "'",'غ': 'gh','ف': 'f','ق': 'q','ك': 'k','ل': 'l','م': 'm','ن': 'n',
'ه': 'h','ة': 'h','و': 'w','ي': 'y','ى': 'a','لا': 'la','ﻻ': 'la','ٱ': 'a',
'ُ': 'u','ِ': 'i','َ': 'a','ً': 'an','ٌ': 'un','ٍ': 'in','ْ': '','ّ': ''
};
const transliterate = (ar: string) => ar.split('').map(c => basicMap[c] ?? c).join('');
const enrichWord = (arabic: string, english: string): Word => ({
arabic,
arabicWithHarakah: arabic || '-',
transliteration: transliterate(arabic) || '-',
translation: english,
grammarType: 'compound',
root: '',
rootTransliteration: '',
rootMeaning: '',
});


// ------------------ heuristics ------------------
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
// Seed items (your originals 1–8)
// -----------------------------------------------------------------------------
const basePhrases: DailyPhrase[] = [
  // 1
  {
    id: '1',
    category: 'greetings',
    words: [
      {
        arabic: 'السلام',
        arabicWithHarakah: 'السَّلامُ',
        transliteration: 'as-salamu',
        translation: 'peace',
        grammarType: 'noun',
        root: 'س ل م',
        rootTransliteration: 's-l-m',
        rootMeaning: 'safety, peace, security'
      },
      {
        arabic: 'عليكم',
        arabicWithHarakah: 'عَلَيْكُمْ',
        transliteration: 'alaykum',
        translation: 'upon you',
        grammarType: 'preposition',
        root: 'ع ل ي',
        rootTransliteration: '3-l-y',
        rootMeaning: 'to be high, elevated'
      }
    ],
    translation: 'Peace be upon you (Islamic greeting)',
    transliteration: 'Assalamu alaykum',
    usage: 'Standard Islamic greeting used throughout the day',
    difficulty: 'easy',
    level: 'A1'
  },
  // 2
  {
    id: '2',
    category: 'greetings',
    words: [
      {
        arabic: 'وعليكم',
        arabicWithHarakah: 'وَعَلَيْكُمُ',
        transliteration: 'wa alaykum',
        translation: 'and upon you',
        grammarType: 'conjunction',
        root: 'ع ل ي',
        rootTransliteration: '3-l-y',
        rootMeaning: 'to be high, elevated'
      },
      {
        arabic: 'السلام',
        arabicWithHarakah: 'السَّلامُ',
        transliteration: 'as-salam',
        translation: 'the peace',
        grammarType: 'noun',
        root: 'س ل م',
        rootTransliteration: 's-l-m',
        rootMeaning: 'safety, peace, security'
      }
    ],
    translation: 'And upon you peace (response to Islamic greeting)',
    transliteration: 'Wa alaykum as-salam',
    usage: 'Standard response to "As-salāmu ʿalaykum"',
    difficulty: 'easy',
    level: 'A1'
  },
  // 3
  {
    id: '3',
    category: 'daily',
    words: [
      {
        arabic: 'شكرا',
        arabicWithHarakah: 'شُكْراً',
        transliteration: 'shukran',
        translation: 'thanks',
        grammarType: 'noun',
        root: 'ش ك ر',
        rootTransliteration: 'sh-k-r',
        rootMeaning: 'to be grateful'
      },
      {
        arabic: 'لك',
        arabicWithHarakah: 'لَكَ',
        transliteration: 'lak',
        translation: 'to you',
        grammarType: 'preposition',
        root: 'ل ك',
        rootTransliteration: 'l-k',
        rootMeaning: 'to/for you'
      }
    ],
    translation: 'Thank you',
    transliteration: 'Shukran lak',
    usage: 'Common way to express gratitude',
    difficulty: 'easy',
    level: 'A1'
  },
  // 4
  {
    id: '4',
    category: 'polite',
    words: [
      {
        arabic: 'من',
        arabicWithHarakah: 'مِنْ',
        transliteration: 'min',
        translation: 'from',
        grammarType: 'preposition',
        root: 'م ن',
        rootTransliteration: 'm-n',
        rootMeaning: 'from, of'
      },
      {
        arabic: 'فضلك',
        arabicWithHarakah: 'فَضْلِكَ',
        transliteration: 'fadlik',
        translation: 'your favor',
        grammarType: 'noun',
        root: 'ف ض ل',
        rootTransliteration: 'f-d-l',
        rootMeaning: 'to favor, prefer'
      }
    ],
    translation: 'Please',
    transliteration: 'Min fadlik',
    usage: 'Polite way to make a request',
    difficulty: 'easy',
    level: 'A1'
  },
  // 5
  {
    id: '5',
    category: 'family',
    words: [
      {
        arabic: 'هذه',
        arabicWithHarakah: 'هٰذِهِ',
        transliteration: 'hadhihi',
        translation: 'this (feminine)',
        grammarType: 'pronoun',
        root: 'ه ذ ا',
        rootTransliteration: 'h-dh-a',
        rootMeaning: 'this, that'
      },
      {
        arabic: 'عائلتي',
        arabicWithHarakah: 'عائِلَتي',
        transliteration: "a'ilati",
        translation: 'my family',
        grammarType: 'noun',
        root: 'ع و ل',
        rootTransliteration: '3-w-l',
        rootMeaning: 'to support, maintain'
      }
    ],
    translation: 'This is my family',
    transliteration: "Hadhihi a'ilati",
    usage: 'Introducing your family members',
    difficulty: 'medium',
    level: 'A2'
  },
  // 6
  {
    id: '6',
    category: 'time',
    words: [
      {
        arabic: 'كم',
        arabicWithHarakah: 'كَمِ',
        transliteration: 'kam',
        translation: 'how much/many',
        grammarType: 'particle',
        root: 'ك م',
        rootTransliteration: 'k-m',
        rootMeaning: 'how much, quantity'
      },
      {
        arabic: 'الساعة؟',
        arabicWithHarakah: 'السّاعَة؟',
        transliteration: "as-sa'a?",
        translation: 'the hour/clock?',
        grammarType: 'noun',
        root: 'س و ع',
        rootTransliteration: 's-w-3',
        rootMeaning: 'time measurement'
      }
    ],
    translation: 'What time is it?',
    transliteration: "Kam as-sa'a?",
    usage: 'Asking for the current time',
    difficulty: 'medium',
    level: 'A2'
  },
  // 7
  {
    id: '7',
    category: 'food',
    words: [
      {
        arabic: 'أريد',
        arabicWithHarakah: 'أُريدُ',
        transliteration: 'uridu',
        translation: 'I want',
        grammarType: 'verb',
        root: 'ر و د',
        rootTransliteration: 'r-w-d',
        rootMeaning: 'to want, desire'
      },
      {
        arabic: 'طعاماً',
        arabicWithHarakah: 'طَعاماً',
        transliteration: "ta'aman",
        translation: 'food',
        grammarType: 'noun',
        root: 'ط ع م',
        rootTransliteration: 't-3-m',
        rootMeaning: 'food, taste'
      }
    ],
    translation: 'I want food',
    transliteration: "Uridu ta'aman",
    usage: 'Expressing desire for food',
    difficulty: 'medium',
    level: 'A2'
  },
  // 8
  {
    id: '8',
    category: 'travel',
    words: [
      {
        arabic: 'أين',
        arabicWithHarakah: 'أَيْنَ',
        transliteration: 'ayna',
        translation: 'where',
        grammarType: 'adverb',
        root: 'ا ي ن',
        rootTransliteration: 'a-y-n',
        rootMeaning: 'where, location'
      },
      {
        arabic: 'المطار؟',
        arabicWithHarakah: 'المَطارُ؟',
        transliteration: 'al-matar?',
        translation: 'the airport?',
        grammarType: 'noun',
        root: 'ط ي ر',
        rootTransliteration: 't-y-r',
        rootMeaning: 'to fly'
      }
    ],
    translation: 'Where is the airport?',
    transliteration: 'Ayna al-matar?',
    usage: 'Asking for directions to the airport',
    difficulty: 'medium',
    level: 'A2'
  }
];

// -----------------------------------------------------------------------------
// Append: first ~200 lines from document (TSV: English\tArabic)
// -----------------------------------------------------------------------------
const RAW_TSV = `
Take care. مع السلامة.
Take care. اعتن بنفسك.
Thank you. شكراً لك
Then what? ثم ماذا؟
Then what? ماذا بعد ذلك؟
Tom moved. لقد تحرك توم.
Tom waved. لَوَحَ توم.
Watch out! انتبه
We're hot. نشعر بالحرارة
What's up? ما الجديد؟
Who cares? من يهمّه؟
Who is it? مَن؟
Who knows? من يدري؟
Who knows? من يعلم؟
Wonderful! مذهل.
You idiot! يا أحمق!
You idiot! يا غبي!
You tried. لقد حاولت وسعك.
`;


// ------------------ parser ------------------
function parseTSV(tsv: string, startId: number): DailyPhrase[] {
const lines = tsv.split(/\r?\n/).map(s => s.trim()).filter(Boolean).slice(0, 200);
let id = startId;
const items: DailyPhrase[] = [];


for (const line of lines) {
const [englishRaw = '', arabicRaw = ''] = line.split(/\t/);
const english = englishRaw.trim();
const arabic = arabicRaw.trim();
if (!english || !arabic) continue;


const category = catFromEnglish(english);
const difficulty = difficultyFromEnglish(english);
const level = levelFromDifficulty(difficulty);


items.push({
id: String(id++),
category,
words: [enrichWord(arabic, english)],
translation: english,
transliteration: transliterate(arabic) || '-',
usage: category === 'greetings' ? 'Common greeting/response' : category === 'polite' ? 'Polite expression' : '',
difficulty,
level,
});
}
return items;
}


const parsedFromDoc = parseTSV(RAW_TSV, 9);


// ------------------ final export with safety net fills ------------------
export const dailyPhrasesDatabase: DailyPhrase[] = [...basePhrases, ...parsedFromDoc].map(p => ({
...p,
transliteration: p.transliteration && p.transliteration.trim() ? p.transliteration : '-',
words: p.words.map(w => ({
...w,
arabicWithHarakah: w.arabicWithHarakah && w.arabicWithHarakah.trim() ? w.arabicWithHarakah : w.arabic || '-',
transliteration: w.transliteration && w.transliteration.trim() ? w.transliteration : transliterate(w.arabic || ''),
})),
}));


// helpers stay the same
export const getPhrasesByCategory = (category: string) => dailyPhrasesDatabase.filter(p => p.category === category);
export const getPhrasesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => dailyPhrasesDatabase.filter(p => p.difficulty === difficulty);
export const getCategories = () => [...new Set(dailyPhrasesDatabase.map(p => p.category))];
export const getPhraseById = (id: string) => dailyPhrasesDatabase.find(p => p.id === id);