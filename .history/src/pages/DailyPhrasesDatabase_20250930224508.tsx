// Daily Phrases Database
// This file contains all the daily phrases data with word-level analysis
// You can easily add new phrases by following the structure below

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

// =============================================================================
// DAILY PHRASES DATABASE
// =============================================================================
// Instructions for adding new phrases:
// 1. Copy the structure of any existing phrase
// 2. Update the id (use format: "phrase_XXX")
// 3. Set the appropriate category and difficulty
// 4. Fill in the transliteration, and translation
// 5. Break down each word in the phrase with detailed analysis
// 6. Add any additional context or usage notes
// =============================================================================

export const dailyPhrasesDatabase: DailyPhrase[] = [
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
        transliteration: 'a'ilati',
        translation: 'my family',
        grammarType: 'noun',
        root: 'ع و ل',
        rootTransliteration: '3-w-l',
        rootMeaning: 'to support, maintain'
      }
    ],
    translation: 'This is my family',
    transliteration: 'Hadhihi a'ilati',
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
        transliteration: 'as-sa'a?',
        translation: 'the hour/clock?',
        grammarType: 'noun',
        root: 'س و ع',
        rootTransliteration: 's-w-3',
        rootMeaning: 'time measurement'
      }
    ],
    translation: 'What time is it?',
    transliteration: 'Kam as-sa'a?',
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
        transliteration: 'ta'aman',
        translation: 'food',
        grammarType: 'noun',
        root: 'ط ع م',
        rootTransliteration: 't-3-m',
        rootMeaning: 'food, taste'
      }
    ],
    translation: 'I want food',
    transliteration: 'Uridu ta'aman',
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
// HELPER FUNCTIONS FOR ADDING NEW CONTENT
// =============================================================================

// Function to get phrases by category
export const getPhrasesByCategory = (category: string): DailyPhrase[] => {
  return dailyPhrasesDatabase.filter(phrase => phrase.category === category);
};

// Function to get phrases by difficulty
export const getPhrasesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): DailyPhrase[] => {
  return dailyPhrasesDatabase.filter(phrase => phrase.difficulty === difficulty);
};

// Function to get all categories
export const getCategories = (): string[] => {
  return [...new Set(dailyPhrasesDatabase.map(phrase => phrase.category))];
};

// Function to get phrase by ID
export const getPhraseById = (id: string): DailyPhrase | undefined => {
  return dailyPhrasesDatabase.find(phrase => phrase.id === id);
};

// =============================================================================
// TEMPLATE FOR ADDING NEW PHRASES
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
    // Add more words as needed
  ],
  translation: 'Complete phrase translation',
  transliteration: 'Complete phrase transliteration',
  usage: 'When and how to use this phrase',
  difficulty: 'easy', // or 'medium' or 'hard'
  level: 'A1' // or 'A2', 'B1', 'B2'
}

CATEGORIES YOU CAN USE:
- greetings
- daily
- polite
- family
- time
- food
- travel
- shopping
- weather
- emotions
- work
- school
- health
- numbers
- colors
- directions
- technology
- religion
- celebrations

GRAMMAR TYPES:
- noun
- verb
- adjective
- preposition
- particle
- pronoun
- adverb
- conjunction
- compound

DIFFICULTY LEVELS:
- easy (A1-A2)
- medium (A2-B1)
- hard (B1-B2)

*/
