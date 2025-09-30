// Daily Phrases Database (final patch)
// - Ensures real newlines in RAW_TSV
// - Guarantees transliteration & arabicWithHarakah are never empty
// - Keeps your API the same

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
  grammarType: 'sentence',
  root: null,
  rootTransliteration: null,
  rootMeaning: null,
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

// ------------------ seeds (1–8 unchanged) ------------------
const basePhrases: DailyPhrase[] = [/* ... keep your 1–8 here exactly as before ... */] as unknown as DailyPhrase[];

// ------------------ RAW_TSV with REAL newlines ------------------
const RAW_TSV = `
Hi.	مرحبًا.
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
Call me.	هاتفني.
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
You tried.	لقد حاولت وسعك.
`;

// ------------------ parser ------------------
function parseTSV(tsv: string, startId: number): DailyPhrase[] {
  const lines = tsv.split(/\r?\n/).map(s => s.trim()).filter(Boolean).slice(0, 200);
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
