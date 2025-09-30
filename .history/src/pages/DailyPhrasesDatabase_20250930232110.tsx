// Daily Phrases Database
// This file contains all the daily phrases data with word-level analysis
// You can easily add new phrases by following the structure below

import type { Word } from '../types';
import type { Word } from '../types';
import type { DailyPhrase } from './DailyPhrasesDatabase';


// Utility to generate simple placeholder transliteration (romanize basic Arabic letters)
// For production, replace with a real Arabic transliteration library.
const basicMap: Record<string, string> = {
'ا': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'h', 'خ': 'kh',
'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 's',
'ض': 'd', 'ط': 't', 'ظ': 'dh', 'ع': "'", 'غ': 'gh', 'ف': 'f', 'ق': 'q',
'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w', 'ي': 'y'
};


function transliterate(arabic: string): string {
return arabic.split('').map(ch => basicMap[ch] || ch).join('');
}


export function enrichWord(arabic: string, english: string): Word {
return {
arabic,
arabicWithHarakah: arabic, // fallback: show same if no diacritics are given
transliteration: transliterate(arabic),
translation: english,
grammarType: 'sentence',
root: null,
rootTransliteration: null,
rootMeaning: null,
};
}


export function enrichPhrase(id: string, arabic: string, english: string, category: string, difficulty: DailyPhrase['difficulty'], level: DailyPhrase['level']): DailyPhrase {
return {
id,
category,
words: [enrichWord(arabic, english)],
translation: english,
transliteration: transliterate(arabic),
usage: category === 'greetings' ? 'Common greeting' : '',
difficulty,
level,
};
}

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

// =============================================================================
// DAILY PHRASES DATABASE (BASE ITEMS YOU ALREADY HAD)
// =============================================================================
const basePhrases: DailyPhrase[] = [
  // GREETINGS CATEGORY
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

  // DAILY EXPRESSIONS CATEGORY
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

  // FAMILY TERMS CATEGORY
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

  // TIME EXPRESSIONS CATEGORY
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

  // FOOD CATEGORY
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

  // TRAVEL CATEGORY
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

// =============================================================================
// APPEND: FIRST ~200 LINES FROM THE DOCUMENT (embedded TSV -> parsed below)
// =============================================================================
// Format: English<TAB>Arabic per line. We take the first 200 non-empty lines.
const RAW_TSV = String.raw`Hi.	مرحبًا.
Run!	اركض!
Help!	النجدة!
Jump!	اقفز!
Stop!	قف!
Go on.	داوم.
Go on.	استمر.
Hello!	مرحباً.
Hurry!	تعجّل!
Hurry!	استعجل!
I see.	انا اري
I won!	أنا فُزت!
Relax.	استرح.
Smile.	ابتسم.
Cheers!	في صحتك.
Got it?	هل فهمت؟
He ran.	ركض.
I know.	أعرف.
I know.	أعلم ذلك.
I know.	أنا أعلم
I'm 19.	أنا في 19
I'm OK.	أنا بخير.
Listen.	استمع
No way!	غير معقول!
Really?	حقاً؟
Thanks.	شكرا.
Why me?	لماذا أنا؟
Awesome!	رائع!
Be cool.	خذ راحتك.
Call me.\tهاتفني.
Call me.	اتصل بي.
Come in.	تفضل بالدخول.
Come in.	تعال إلى الداخل
Come on!	بالله عليك!
Come on!	هيا
Come on!	هيّا
Get out!	اخرج من هنا!
Get out!	أُخرج!
Get out.	اخرج!
Go away.	اتركني و شأني.
Go away.	اذهب بعيداً.
Go away.	ارحل.
Goodbye!	مع السلامة.
He came.	لقد أتى.
He runs.	هو يجري
Help me!	ساعدني!
Help me.	النجدة! ساعدني!
I'm sad.	أنا حزين.
Me, too.	أنا أيضاً.
Shut up!	اخرس!
Shut up!	اصمت!
Shut up!	اسكت!
Shut up!	أغلق فمك!
Stop it.	أوقفه
Take it.	خذه
Tom won.	توم فاز.
Tom won.	لقد ربح توم.
Wake up!	استيقظ!
Welcome.	أهلاً و سهلاً!
Welcome.	مرحباً بك!
Welcome.	اهلا وسهلا
Welcome.	مرحبا!
Who won?	من فاز؟
Who won?	من الذي ربح؟
Why not?	لم لا؟
Why not?	لما لا؟
Have fun.	استمتع بوقتك.
Hurry up.	أسرع!
I forgot.	لقد نسيت.
I got it.	فهمتُهُ.
I got it.	فهمتُها.
I got it.	فَهمتُ ذلك.
I use it.	أستخدمه.
I'll pay.	سأدفع أنا.
I'm busy.	أنا مشغول.
I'm busy.	إنني مشغول.
I'm cold.	أشعر بالبرد.
I'm free.	أنا حُرّ.
I'm here.	أنا هنا
I'm home.	لقد عدت إلى البيت
I'm poor.	أنا فقير.
I'm rich.	أنا ثري.
It hurts.	هذا مؤلم
It's hot.	الجو حار
It's new.	إنه جديد
Let's go!	هيا بنا!
Let's go!	هيا لنذهب!
Let's go!	لنذهب.
Let's go.	هيا بنا.
Let's go.	هيا بنا نذهب.
Look out!	اِنتبه!
Look out!	إحذر!
Look out!	انتبه
Speak up!	تكلم!
Stand up!	قف!
Terrific!	رائع!
Terrific!	ممتاز!
Tom died.	توم مات.
Tom died.	توفي توم.
Tom left.	لقد غادر توم.
Tom lied.	لقد كذِبَ توم.
Tom lost.	لقد خَسِرَ توم.
Tom quit.	توم استقال.
Try some.	هاك، جرب.
Who am I?	من أنا؟
Who died?	من مات؟
Who died?	من توفي؟
After you.	من بعدك
Birds fly.	العصافير تطير.
Birds fly.	تحلق الطيور.
Bless you.	يُباركك.
Calm down.	اِهدأ.
Can we go?	هل نستطيع أن نذهب؟
Come here.	تعال هنا.
Come here.	تعال إلى هنا.
Come home.	تعال إلى منزلي.
Did I win?	هل أنا فُزت؟
Do it now.	افعل ذلك الآن.
Don't lie.	إياك و الكذب.
Excuse me.	عفواً.
Fantastic!	رائع!
Forget it!	انسَ الأمر.
Forget it!	انسَ ذلك
Forget it.	انسَ الأمر.
Forget it.	انسَ ذلك
Go inside.	أُدخُلْ.
Go to bed.	اذهب إلى النوم
Good luck.	بالتوفيق.
Hands off.	لا تلمسني.
He is ill.	إنه مريض.
He is ill.	هو مريض
How's Tom?	كيف توم؟
How's Tom?	كيف حال توم؟
I am Thai.	أنا تايلاندي.
I am cold.	أشعر بالبرد.
I am here.	أنا هنا
I am okay.	أنا بخير.
I am sure.	أنا متأكد.
I hope so.	آمل ذلك.
I laughed.	ضحكت.
I like it.	هذا يعجبني.
I love it.	أنا أحبه.
I see Tom.	أنا أرى توم
I'm a man.	أنا رجلٌ.
I'm alone.	أنا لوحدي.
I'm bored.	مللت.
I'm broke.	لقد كُسِرت
I'm happy.	أنا سعيد
I'm lucky.	انا محظوظ.
I'm needy.	أنا مسكين.
I'm ready.	أنا مستعد.
I'm ready.	أنا مستعدة.
I'm sorry.	أنا آسف.
I'm sorry.	أنا متأسف.
I'm sorry.	أتأسف.
I'm sorry.	أنا آسف
I'm tired.	أنا متعب.
Is it new?	هل هذا جديد؟
It is new.	إنه جديد
It's cold.	الجو بارد.
It's late.	إنها ساعة متأخرة.
Let me go.	دَعني أذهب.
Listen up.	اسمع
Look back!	انظر خلفك!
Of course!	طبعاً!
Of course.	بالطبع.
Of course.	طبعاً.
Of course.	بالتأكيد.
Of course.	طبعاً!
Pardon me?	المعذرة؟
Seriously?	أأنت جاد؟
She walks.	هي تمشي
Stay thin.	حافظي على جسم نحيف.
Stay thin.	إبقي نحيفة.
Stay thin.	حافظ على نحافتك.
Stop that!	أوقف ذلك
Stop that.	أوقف ذلك
Stop them.	أوقفهم.
Take care!	انتبه!
Take care.	مع السلامة.
Take care.	اعتن بنفسك.
Thank you.	شكراً لك
Then what?	ثم ماذا؟
Then what?	ماذا بعد ذلك؟
Tom moved.	لقد تحرك توم.
Tom waved.	لَوَحَ توم.
Watch out!	انتبه
We're hot.	نشعر بالحرارة
What's up?	ما الجديد؟
Who cares?	من يهمّه؟
Who is it?	مَن؟
Who knows?	من يدري؟
Who knows?	من يعلم؟
Wonderful!	مذهل.
You idiot!	يا أحمق!
You idiot!	يا غبي!
You tried.	لقد حاولت وسعك.`;

// --- lightweight mappers ---
const catFromEnglish = (en: string): string => {
  const s = en.toLowerCase();
  if (/^(hi|hello|good\s*morning|good\s*evening|goodbye|welcome|what's\s*up)/.test(s)) return 'greetings';
  if (/^(thanks|thank you|cheers|pardon me|excuse me)/.test(s)) return 'polite';
  if (/^(run|help|jump|stop|go|come|look|listen|wake|watch|speak|stand|take)/.test(s)) return 'imperatives';
  if (/who|what|why|when|how|where|which|did i|is it|then what|who cares|who knows/i.test(s)) return 'questions';
  return 'daily';
};

const difficultyFromEnglish = (en: string): DailyPhrase['difficulty'] => {
  const len = en.split(/\s+/).filter(Boolean).length;
  if (len <= 2) return 'easy';
  if (len <= 5) return 'medium';
  return 'hard';
};

const levelFromDifficulty = (d: DailyPhrase['difficulty']): DailyPhrase['level'] => (
  d === 'easy' ? 'A1' : d === 'medium' ? 'A2' : 'B1'
);

// Parse TSV into DailyPhrase items, starting id after the base list.
function parseTSV(tsv: string, startId: number): DailyPhrase[] {
  const lines = tsv
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean)
    .slice(0, 200); // first 200

  let id = startId;
  return lines.map(line => {
    const [englishRaw, arabicRaw] = line.split(/\t/);
    const english = (englishRaw || '').trim();
    const arabic = (arabicRaw || '').trim();

    const category = catFromEnglish(english);
    const difficulty = difficultyFromEnglish(english);
    const level = levelFromDifficulty(difficulty);

    const words: Word[] = [
      {
        arabic,
        arabicWithHarakah: arabic, // Use the same as arabic since we don't have harakah data
        transliteration: '', // Empty string instead of null
        translation: english,
        grammarType: 'compound', // Use 'compound' for full phrases
        root: undefined, // Use undefined instead of null for optional fields
        rootTransliteration: undefined,
        rootMeaning: undefined,
      },
    ];

    const phrase: DailyPhrase = {
      id: String(id++),
      category,
      words,
      translation: english,
      transliteration: '',
      usage: category === 'greetings' ? 'Common greeting/response' : category === 'polite' ? 'Polite expression' : '',
      difficulty,
      level,
    };

    return phrase;
  });
}

const parsedFromDoc: DailyPhrase[] = parseTSV(RAW_TSV, basePhrases.length + 1);

// =============================================================================
// FINAL EXPORT: your original items + first 200 lines from the document
// =============================================================================
export const dailyPhrasesDatabase: DailyPhrase[] = [
  ...basePhrases,
  ...parsedFromDoc,
];

// =============================================================================
// HELPER FUNCTIONS FOR ADDING NEW CONTENT (unchanged API)
// =============================================================================
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

// =============================================================================
// TEMPLATE FOR ADDING NEW PHRASES (comment only)
// =============================================================================
/*
COPY THIS TEMPLATE TO ADD NEW PHRASES:

{
  id: 'phrase_XXX', // Use next available number
  category: 'category_name', // e.g., 'greetings', 'food', 'travel'
  words: [
    {
      arabic: 'word',
      arabicWithHarakah: 'word with diacritics',
      transliteration: 'word transliteration',
      translation: 'word meaning',
      grammarType: 'noun', // or 'verb', 'adjective', 'preposition', etc.
      root: 'ر و ت', // Arabic root (optional)
      rootTransliteration: 'r-w-t', // Root transliteration (optional)
      rootMeaning: 'root meaning' // Root meaning (optional)
    }
  ],
  translation: 'Complete phrase translation',
  transliteration: 'Complete phrase transliteration',
  usage: 'When and how to use this phrase',
  difficulty: 'easy', // or 'medium' or 'hard'
  level: 'A1' // or 'A2', 'B1', 'B2'
}
*/
