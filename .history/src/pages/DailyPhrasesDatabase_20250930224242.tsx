// Daily Phrases Database
// This file contains all the daily phrases data with word-level analysis
// You can easily add new phrases by following the structure below

export interface WordData {
  arabic: string;
  transliteration: string;
  translation: string;
  root?: string;
  grammar?: string;
  synonyms?: string[];
  etymology?: string;
  culturalUsage?: string;
}

export interface PhraseData {
  id: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  arabic: string;
  transliteration: string;
  translation: string;
  words: WordData[];
  audioUrl?: string;
  usage?: string;
  culturalContext?: string;
  tags?: string[];
}

// =============================================================================
// DAILY PHRASES DATABASE
// =============================================================================
// Instructions for adding new phrases:
// 1. Copy the structure of any existing phrase
// 2. Update the id (use format: "phrase_XXX")
// 3. Set the appropriate category and difficulty
// 4. Fill in the arabic, transliteration, and translation
// 5. Break down each word in the phrase with detailed analysis
// 6. Add any additional context or usage notes
// =============================================================================

export const dailyPhrasesDatabase: PhraseData[] = [
  // GREETINGS CATEGORY
  {
    id: "phrase_001",
    category: "Greetings",
    difficulty: "beginner",
    arabic: "السلام عليكم",
    transliteration: "As-salāmu ʿalaykum",
    translation: "Peace be upon you (Islamic greeting)",
    usage: "Standard Islamic greeting used throughout the day",
    culturalContext: "Universal greeting among Muslims worldwide",
    tags: ["greeting", "islamic", "formal"],
    words: [
      {
        arabic: "السلام",
        transliteration: "as-salām",
        translation: "the peace",
        root: "س-ل-م",
        grammar: "definite noun (masculine)",
        synonyms: ["الأمان", "الطمأنينة"],
        etymology: "From root س-ل-م meaning safety, soundness",
        culturalUsage: "Central concept in Islam meaning peace, safety, security"
      },
      {
        arabic: "عليكم",
        transliteration: "ʿalaykum",
        translation: "upon you (plural)",
        grammar: "preposition + pronoun (2nd person plural)",
        synonyms: ["فوقكم"],
        etymology: "على (upon) + كم (you plural)",
        culturalUsage: "Formal plural form showing respect"
      }
    ]
  },

  {
    id: "phrase_002",
    category: "Greetings",
    difficulty: "beginner",
    arabic: "وعليكم السلام",
    transliteration: "Wa ʿalaykum as-salām",
    translation: "And upon you peace (response to Islamic greeting)",
    usage: "Standard response to 'As-salāmu ʿalaykum'",
    culturalContext: "Required response in Islamic etiquette",
    tags: ["greeting", "response", "islamic"],
    words: [
      {
        arabic: "و",
        transliteration: "wa",
        translation: "and",
        grammar: "conjunction",
        synonyms: ["وأيضاً"],
        etymology: "Simple coordinating conjunction",
        culturalUsage: "Adds emphasis and reciprocity to the response"
      },
      {
        arabic: "عليكم",
        transliteration: "ʿalaykum",
        translation: "upon you",
        grammar: "preposition + pronoun",
        synonyms: ["فوقكم"],
        etymology: "على + كم",
        culturalUsage: "Returns the blessing back to the greeter"
      },
      {
        arabic: "السلام",
        transliteration: "as-salām",
        translation: "the peace",
        root: "س-ل-م",
        grammar: "definite noun",
        synonyms: ["الأمان"],
        etymology: "From root meaning safety and wholeness",
        culturalUsage: "Reciprocal blessing of peace"
      }
    ]
  },

  // DAILY EXPRESSIONS CATEGORY
  {
    id: "phrase_003",
    category: "Daily Expressions",
    difficulty: "beginner",
    arabic: "شكرا لك",
    transliteration: "Shukran lak",
    translation: "Thank you",
    usage: "Common way to express gratitude",
    culturalContext: "Universal expression of gratitude in Arabic",
    tags: ["gratitude", "polite", "common"],
    words: [
      {
        arabic: "شكرا",
        transliteration: "shukran",
        translation: "thanks",
        root: "ش-ك-ر",
        grammar: "verbal noun (masdar)",
        synonyms: ["جزيل الشكر", "أشكرك"],
        etymology: "From root ش-ك-ر meaning to be grateful",
        culturalUsage: "Most common way to say thanks in everyday Arabic"
      },
      {
        arabic: "لك",
        transliteration: "lak",
        translation: "to you",
        grammar: "preposition + pronoun (2nd person singular)",
        synonyms: ["إليك"],
        etymology: "ل (to/for) + ك (you)",
        culturalUsage: "Makes the gratitude personal and direct"
      }
    ]
  },

  {
    id: "phrase_004",
    category: "Daily Expressions",
    difficulty: "beginner",
    arabic: "من فضلك",
    transliteration: "Min faḍlik",
    translation: "Please",
    usage: "Polite way to make a request",
    culturalContext: "Essential for polite conversation",
    tags: ["politeness", "request", "courtesy"],
    words: [
      {
        arabic: "من",
        transliteration: "min",
        translation: "from",
        grammar: "preposition",
        synonyms: ["بواسطة"],
        etymology: "Basic preposition indicating source",
        culturalUsage: "Creates a humble tone in requests"
      },
      {
        arabic: "فضلك",
        transliteration: "faḍlik",
        translation: "your favor/kindness",
        root: "ف-ض-ل",
        grammar: "noun + possessive pronoun",
        synonyms: ["كرمك", "لطفك"],
        etymology: "From root ف-ض-ل meaning to favor, prefer",
        culturalUsage: "Appeals to someone's generosity and good nature"
      }
    ]
  },

  // FAMILY TERMS CATEGORY
  {
    id: "phrase_005",
    category: "Family",
    difficulty: "intermediate",
    arabic: "هذه عائلتي",
    transliteration: "Hādhihi ʿā'ilatī",
    translation: "This is my family",
    usage: "Introducing your family members",
    culturalContext: "Family is central to Arab culture",
    tags: ["family", "introduction", "personal"],
    words: [
      {
        arabic: "هذه",
        transliteration: "hādhihi",
        translation: "this (feminine)",
        grammar: "demonstrative pronoun (feminine)",
        synonyms: ["تلك"],
        etymology: "Demonstrative for feminine nouns",
        culturalUsage: "Used when pointing to or introducing something feminine"
      },
      {
        arabic: "عائلتي",
        transliteration: "ʿā'ilatī",
        translation: "my family",
        root: "ع-و-ل",
        grammar: "noun + possessive pronoun (1st person)",
        synonyms: ["أسرتي", "أهلي"],
        etymology: "From root ع-و-ل meaning to support, maintain",
        culturalUsage: "Family unit is the cornerstone of Arab society"
      }
    ]
  },

  // TIME EXPRESSIONS CATEGORY
  {
    id: "phrase_006",
    category: "Time",
    difficulty: "intermediate",
    arabic: "كم الساعة؟",
    transliteration: "Kam as-sāʿa?",
    translation: "What time is it?",
    usage: "Asking for the current time",
    culturalContext: "Essential for daily scheduling",
    tags: ["time", "question", "practical"],
    words: [
      {
        arabic: "كم",
        transliteration: "kam",
        translation: "how much/how many",
        grammar: "interrogative particle",
        synonyms: ["ما مقدار"],
        etymology: "Basic question word for quantity",
        culturalUsage: "Used for asking about amounts, numbers, or time"
      },
      {
        arabic: "الساعة",
        transliteration: "as-sāʿa",
        translation: "the hour/clock",
        root: "س-و-ع",
        grammar: "definite noun (feminine)",
        synonyms: ["الوقت"],
        etymology: "From root س-و-ع related to time measurement",
        culturalUsage: "Standard word for both hour and clock/watch"
      }
    ]
  }
];

// =============================================================================
// HELPER FUNCTIONS FOR ADDING NEW CONTENT
// =============================================================================

// Function to get phrases by category
export const getPhrasesByCategory = (category: string): PhraseData[] => {
  return dailyPhrasesDatabase.filter(phrase => phrase.category === category);
};

// Function to get phrases by difficulty
export const getPhrasesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): PhraseData[] => {
  return dailyPhrasesDatabase.filter(phrase => phrase.difficulty === difficulty);
};

// Function to get all categories
export const getCategories = (): string[] => {
  return [...new Set(dailyPhrasesDatabase.map(phrase => phrase.category))];
};

// Function to get phrase by ID
export const getPhraseById = (id: string): PhraseData | undefined => {
  return dailyPhrasesDatabase.find(phrase => phrase.id === id);
};

// =============================================================================
// TEMPLATE FOR ADDING NEW PHRASES
// =============================================================================
/*
COPY THIS TEMPLATE TO ADD NEW PHRASES:

{
  id: "phrase_XXX", // Use next available number
  category: "Category Name", // e.g., "Greetings", "Food", "Travel"
  difficulty: "beginner", // or "intermediate" or "advanced"
  arabic: "Arabic text here",
  transliteration: "Transliteration here",
  translation: "English translation here",
  usage: "When and how to use this phrase",
  culturalContext: "Cultural background information",
  tags: ["tag1", "tag2", "tag3"], // for filtering and searching
  words: [
    {
      arabic: "word",
      transliteration: "word transliteration",
      translation: "word meaning",
      root: "ر-و-ت", // Arabic root (optional)
      grammar: "grammatical information", // noun, verb, etc.
      synonyms: ["synonym1", "synonym2"], // optional
      etymology: "word origin information", // optional
      culturalUsage: "cultural significance" // optional
    }
    // Add more words as needed
  ]
}

CATEGORIES YOU CAN USE:
- Greetings
- Daily Expressions  
- Family
- Time
- Food & Dining
- Travel
- Shopping
- Weather
- Emotions
- Work & School
- Health
- Numbers
- Colors
- Directions
- Technology
- Religion
- Celebrations

*/
