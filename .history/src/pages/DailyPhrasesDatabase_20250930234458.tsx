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
const RAW_TSV = String.raw`Hi.\tمرحبًا.\nRun!\tاركض!\nHelp!\tالنجدة!\nJump!\tاقفز!\nStop!\tقف!\nGo on.\tداوم.\nGo on.\tاستمر.\nHello!\tمرحباً.\nHurry!\tتعجّل!\nHurry!\tاستعجل!\nI see.\tانا اري\nI won!\tأنا فُزت!\nRelax.\tاسترح.\nSmile.\tابتسم.\nCheers!\tفي صحتك.\nGot it?\tهل فهمت؟\nHe ran.\tركض.\nI know.\tأعرف.\nI know.\tأعلم ذلك.\nI know.\tأنا أعلم\nI'm 19.\tأنا في 19\nI'm OK.\tأنا بخير.\nListen.\tاستمع\nNo way!\tغير معقول!\nReally?\tحقاً؟\nThanks.\tشكرا.\nWhy me?\tلماذا أنا؟\nAwesome!\tرائع!\nBe cool.\tخذ راحتك.\nCall me.\tهاتفني.\nCall me.\tاتصل بي.\nCome in.\tتفضل بالدخول.\nCome in.\tتعال إلى الداخل\nCome on!\tبالله عليك!\nCome on!\tهيا\nCome on!\tهيّا\nGet out!\tاخرج من هنا!\nGet out!\tأُخرج!\nGet out.\tاخرج!\nGo away.\tاتركني و شأني.\nGo away.\tاذهب بعيداً.\nGo away.\tارحل.\nGoodbye!\tمع السلامة.\nHe came.\tلقد أتى.\nHe runs.\tهو يجري\nHelp me!\tساعدني!\nHelp me.\tالنجدة! ساعدني!\nI'm sad.\tأنا حزين.\nMe, too.\tأنا أيضاً.\nShut up!\tاخرس!\nShut up!\tاصمت!\nShut up!\tاسكت!\nShut up!\tأغلق فمك!\nStop it.\tأوقفه\nTake it.\tخذه\nTom won.\tتوم فاز.\nTom won.\tلقد ربح توم.\nWake up!\tاستيقظ!\nWelcome.\tأهلاً و سهلاً!\nWelcome.\tمرحباً بك!\nWelcome.\tاهلا وسهلا\nWelcome.\tمرحبا!\nWho won?\tمن فاز؟\nWho won?\tمن الذي ربح؟\nWhy not?\tلم لا؟\nWhy not?\tلما لا؟\nHave fun.\tاستمتع بوقتك.\nHurry up.\tأسرع!\nI forgot.\tلقد نسيت.\nI got it.\tفهمتُهُ.\nI got it.\tفهمتُها.\nI got it.\tفَهمتُ ذلك.\nI use it.\tأستخدمه.\nI'll pay.\tسأدفع أنا.\nI'm busy.\tأنا مشغول.\nI'm busy.\tإنني مشغول.\nI'm cold.\tأشعر بالبرد.\nI'm free.\tأنا حُرّ.\nI'm here.\tأنا هنا\nI'm home.\tلقد عدت إلى البيت\nI'm poor.\tأنا فقير.\nI'm rich.\tأنا ثري.\nIt hurts.\tهذا مؤلم\nIt's hot.\tالجو حار\nIt's new.\tإنه جديد\nLet's go!\tهيا بنا!\nLet's go!\tهيا لنذهب!\nLet's go!\tلنذهب.\nLet's go.\tهيا بنا.\nLet's go.\tهيا بنا نذهب.\nLook out!\tاِنتبه!\nLook out!\tإحذر!\nLook out!\tانتبه\nSpeak up!\tتكلم!\nStand up!\tقف!\nTerrific!\tرائع!\nTerrific!\tممتاز!\nTom died.\tتوم مات.\nTom died.\tتوفي توم.\nTom left.\tلقد غادر توم.\nTom lied.\tلقد كذِبَ توم.\nTom lost.\tلقد خَسِرَ توم.\nTom quit.\tتوم استقال.\nTry some.\tهاك، جرب.\nWho am I?\tمن أنا؟\nWho died?\tمن مات؟\nWho died?\tمن توفي؟\nAfter you.\tمن بعدك\nBirds fly.\tالعصافير تطير.\nBirds fly.\tتحلق الطيور.\nBless you.\tيُباركك.\nCalm down.\tاِهدأ.\nCan we go?\tهل نستطيع أن نذهب؟\nCome here.\tتعال هنا.\nCome here.\tتعال إلى هنا.\nCome home.\tتعال إلى منزلي.\nDid I win?\tهل أنا فُزت؟\nDo it now.\tافعل ذلك الآن.\nDon't lie.\tإياك و الكذب.\nExcuse me.\tعفواً.\nFantastic!\tرائع!\nForget it!\tانسَ الأمر.\nForget it!\tانسَ ذلك\nForget it.\tانسَ الأمر.\nForget it.\tانسَ ذلك\nGo inside.\tأُدخُلْ.\nGo to bed.\tاذهب إلى النوم\nGood luck.\tبالتوفيق.\nHands off.\tلا تلمسني.\nHe is ill.\tإنه مريض.\nHe is ill.\tهو مريض\nHow's Tom?\tكيف توم؟\nHow's Tom?\tكيف حال توم؟\nI am Thai.\tأنا تايلاندي.\nI am cold.\tأشعر بالبرد.\nI am here.\tأنا هنا\nI am okay.\tأنا بخير.\nI am sure.\tأنا متأكد.\nI hope so.\tآمل ذلك.\nI laughed.\tضحكت.\nI like it.\tهذا يعجبني.\nI love it.\tأنا أحبه.\nI see Tom.\tأنا أرى توم\nI'm a man.\tأنا رجلٌ.\nI'm alone.\tأنا لوحدي.\nI'm bored.\tمللت.\nI'm broke.\tلقد كُسِرت\nI'm happy.\tأنا سعيد\nI'm lucky.\tانا محظوظ.\nI'm needy.\tأنا مسكين.\nI'm ready.\tأنا مستعد.\nI'm ready.\tأنا مستعدة.\nI'm sorry.\tأنا آسف.\nI'm sorry.\tأنا متأسف.\nI'm sorry.\tأتأسف.\nI'm sorry.\tأنا آسف\nI'm tired.\tأنا متعب.\nIs it new?\tهل هذا جديد؟\nIt is new.\tإنه جديد\nIt's cold.\tالجو بارد.\nIt's late.\tإنها ساعة متأخرة.\nLet me go.\tدَعني أذهب.\nListen up.\tاسمع\nLook back!\tانظر خلفك!\nOf course!\tطبعاً!\nOf course.\tبالطبع.\nOf course.\tطبعاً.\nOf course.\tبالتأكيد.\nOf course.\tطبعاً!\nPardon me?\tالمعذرة؟\nSeriously?\tأأنت جاد؟\nShe walks.\tهي تمشي\nStay thin.\tحافظي على جسم نحيف.\nStay thin.\tإبقي نحيفة.\nStay thin.\tحافظ على نحافتك.\nStop that!\tأوقف ذلك\nStop that.\tأوقف ذلك\nStop them.\tأوقفهم.\nTake care!\tانتبه!\nTake care.\tمع السلامة.\nTake care.\tاعتن بنفسك.\nThank you.\tشكراً لك\nThen what?\tثم ماذا؟\nThen what?\tماذا بعد ذلك؟\nTom moved.\tلقد تحرك توم.\nTom waved.\tلَوَحَ توم.\nWatch out!\tانتبه\nWe're hot.\tنشعر بالحرارة\nWhat's up?\tما الجديد؟\nWho cares?\tمن يهمّه؟\nWho is it?\tمَن؟\nWho knows?\tمن يدري؟\nWho knows?\tمن يعلم؟\nWonderful!\tمذهل.\nYou idiot!\tيا أحمق!\nYou idiot!\tيا غبي!\nYou tried.\tلقد حاولت وسعك.`;

// Parse TSV into phrases using enrichment

function parseTSV(tsv: string, startId: number): DailyPhrase[] {
  const lines = tsv.split(/\r?\n/).map(l => l.trim()).filter(Boolean).slice(0, 200);
  let id = startId;
  const items: DailyPhrase[] = [];

  for (const line of lines) {
    const [englishRaw = '', arabicRaw = ''] = line.split(/\t/);
    const english = englishRaw.trim();
    const arabic  = arabicRaw.trim();
    if (!english || !arabic) continue;

    const category   = catFromEnglish(english);
    const difficulty = difficultyFromEnglish(english);
    const level      = levelFromDifficulty(difficulty);

    items.push({
      id: String(id++),
      category,
      words: [enrichWord(arabic, english)],
      translation: english,
      transliteration: transliterate(arabic),
      usage: category === 'greetings' ? 'Common greeting/response'
           : category === 'polite'     ? 'Polite expression' : '',
      difficulty,
      level,
    });
  }

  return items;
}

const parsedFromDoc: DailyPhrase[] = parseTSV(RAW_TSV, basePhrases.length + 1);

// Debug: Check if data is being parsed
console.log('Base phrases:', basePhrases.length);
console.log('Parsed phrases:', parsedFromDoc.length);
console.log('Total phrases:', basePhrases.length + parsedFromDoc.length);

// -----------------------------------------------------------------------------
// FINAL EXPORT
// -----------------------------------------------------------------------------
export const dailyPhrasesDatabase: DailyPhrase[] = [
  ...basePhrases,
  ...parsedFromDoc,
];

// -----------------------------------------------------------------------------
// HELPERS (unchanged API)
// -----------------------------------------------------------------------------
export const getPhrasesByCategory = (category: string): DailyPhrase[] => {
  return dailyPhrasesDatabase.filter(phrase => phrase.category === category);
};

export const getPhrasesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): DailyPhrase[] => {
  return dailyPhrasesDatabase.filter(phrase => phrase.difficulty === difficulty);
};

export const getCategories = (): string[] => {
  return [...new Set(dailyPhrasesDatabase.map(phrase => phrase.category))];
};

export const getPhraseById = (id: string): DailyPhrase | undefined => {
  return dailyPhrasesDatabase.find(phrase => phrase.id === id);
};
