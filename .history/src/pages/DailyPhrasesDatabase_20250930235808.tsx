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
All aboard!	ليركب الجميع.
All aboard!	ليركب الكل.
Am I clear?	هل هذا واضح؟
Am I wrong?	هل أنا مخطئ؟
Be careful.	كن حذرا.
Be serious.	كُن جدياً.
Birds sing.	الطيور تغرد.
Bottoms up!	الى القاع .
Bottoms up!	برشفة واحدة .
Bring food.	أحضر الطعام.
Bring help.	أحضِر المُساعدة.
Bring wine.	أحضر الخمر.
Bring wine.	أحضر النبيذ.
Can I stay?	هل أستطيع أن أبقى؟
Carry this.	احمل هذا.
Check that.	إفحص ذلك.
Check this.	إفحص هذا.
Come again.	تعالَ مُجدداً.
Come alone.	تعالَ وحدك.
Come alone.	تعالَ بمفردك.
Come along.	تعال معنا.
Come on in!	هيا ادخل
Come on in.	هيا ادخل
Come quick!	تعال بسرعة.
Come to me.	تعال إلي
Definitely!	قطعاً
Don't move.	لا تتحرك.
Fill it up.	املئها.
Follow him.	اتبعه.
Go to work.	اذهب إلى العمل
Have faith.	كن مؤمنا.
He is nice.	إنه لطيف.
He is sick.	إنه مريض.
He's happy.	هو سعيد
He's smart.	هو ذكي.
He's smart.	إنه ذكي.
Here he is!	ها هو هنا
Here it is.	ها هي.
I am a boy.	أنا ولد.
I am bored.	أنا أشعر بالملل.
I am going.	أنا ذاهب.
I am happy.	أنا سعيد
I am sorry.	أنا آسف
I can jump.	يمكنني القفز.
I can jump.	أستطيع القفز.
I can jump.	يمكنني أن أقفز.
I can swim.	يمكنني السباحة.
I can swim.	بإمكاني أن أسبح.
I eat here.	سآكل هنا.
I envy her.	أنا أحسدها.
I felt sad.	شعرت بالحزن.
I hear you.	أنا أسمعك
I know her.	أعرِفها.
I know her.	أنا أعرفها
I know him.	أعرفه.
I know him.	أنا أعرفه
I like you.	أحبك.
I like you.	تعجبني.
I love her.	أحبها.
I love her.	أنا أحبها
I love you.	أنا أحبك.
I love you.	أحبك.
I love you.	احبك.
I love you.	انا احبك
I love you.	أنا أحبك
I meant it.	قصدت ذلك.
I miss him.	أشتاق إليه.
I miss you.	اشتقت إليك.
I miss you.	افتقدتك.
I need you.	أحتاج إليك.
I need you.	أحتاجك.
I resigned.	استقلت.
I saw that.	لقد رأيت ذلك
I think so.	أعتقد ذلك.
I think so.	أظن ذلك.
I want you.	أريدك.
I'm OK now.	أنا بخير الآن.
I'm a hero.	أنا بطل.
I'm coming.	سآتي.
I'm coming.	أنا آتٍ
I'm hungry!	أشعر بالجوع.
I'm not OK.	لست على ما يرام.
I'm sleepy!	أنا نعسان!
I'm so fat.	أنا بدين جداً.
I'm so fat.	أنا شديد البدانة.
I'm so fat.	أنا سمين جدا.
I'm unsure.	لست متأكّدا.
Is it love?	هل هذا هو الحب؟
It is cold.	الجو بارد.
It's on me.	الحساب عليّ.
Let Tom go.	دَع توم يذهب.
Let him go!	دعه يذهب!
Let him go.	دَعَهُ يذهب.
Let me out!	دعني أخرُج!
Look again.	انظر مرة أخرى
Look at me.	انظر إليّ.
Look at me.	انظر إلي
Never mind!	لا عليك!
No problem!	لا مشكلة!
Once again.	مرة أخرى.
Once again.	مجدداً.
Talk to me!	كلمني!
That's wet.	ذاك مبلل.
Tom is big.	توم كبير
Tom smiled.	توم إبتسم.
Tom yawned.	توم تثاءب.
Tom's here.	توم هنا
We are men.	نحن رجال.
We are men.	إننا رجال.
What gives?	ما الأمر؟
What's new?	ما الجديد؟
Wood burns.	الخشب يحترق.
You may go.	يمكنك الذهاب.
Are you mad? هل أنت غاضب؟
Are you sad? هل أنتِ حزينة؟
Be creative.	كُن مُبدِعاً.
Be creative.	كُن خلاقاً.
Be discreet.	كُن حَذِراً.
Be friendly.	كُن ودوداً.
Be merciful.	كُن رحيماً.
Be prepared.	كُن مُستعداً.
Be prepared.	كن مستعداً
Be prepared.	كونوا مستعدين
Be ruthless.	كُن عديم الرحمة.
Be sensible.	كُن معقول.
Be specific.	كُن محدداً.
Be tolerant.	كُن مُتسامحاً.
Be vigilant.	توخى الحذر.
Check again.	راجع مُجدداً.
Check again.	إفحص مُجدداً.
Check again.	تحقق مجدداً.
Come closer.	إقتَرِب.
Come inside.	تعالَ بالداخل.
Contact Tom.	إتصل بتوم.
Did Tom die?	هل مات توم؟
Don't argue.	لا تُجادِل.
Don't cheat.	لا تَغِش.
Don't do it!	لا تفعل ذلك!
Don't worry.	لا تقلق.
Don't worry.	لا عليك.
Go find Tom.	إذهب وابحث عن طوم.
Have a seat.	استرح.
He can come.	بإمكانه المجيء
He is alone.	إنه وحيد.
He is alone.	إنه وحده.
He is happy.	هو سعيد
He's strong.	إنه قوي.
Here we are!	ها نحن ذا
Here we are.	ها قد وصلنا.
Here we are.	ها نحن هنا
How are you?	كيف حالك؟
How are you?	كيفَ حالك؟
How are you?	كيفَ حالِك؟
`;


// ------------------ parser ------------------
function parseTSV(tsv: string, startId: number): DailyPhrase[] {
const lines = tsv.split(/\r?\n/).map(s => s.trim()).filter(Boolean).slice(0, 200);
let id = startId;
const items: DailyPhrase[] = [];


for (const line of lines) {
    // Split on the first space that separates English from Arabic
    // Look for the pattern: English text followed by space and Arabic characters
    const match = line.match(/^([^ء-ي]+)\s+([ء-ي].*)$/);
    if (!match) continue;
    
    const englishRaw = match[1] || '';
    const arabicRaw = match[2] || '';
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