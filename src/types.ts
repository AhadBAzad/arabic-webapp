export interface Word {
  arabic: string;
  arabicWithHarakah: string;
  transliteration: string;
  translation: string;
  grammarType: 'noun' | 'verb' | 'adjective' | 'preposition' | 'particle' | 'pronoun' | 'adverb' | 'conjunction' | 'compound';
  root?: string;
  rootTransliteration?: string;
  rootMeaning?: string;
}

export interface Sentence {
  id: number;
  words: Word[];
  translation: string;
  transliteration: string;
  difficulty: 'Easy' | 'Medium' | 'Difficult';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: 'Phrases' | 'Education' | 'News' | 'Travel' | 'Others';
}

export interface Story {
  id: number;
  title: string;
  titleArabic: string;
  author?: string;
  source: 'Al Jazeera' | 'BBC Arabic' | 'Project Gutenberg' | 'Archive.org' | 'Shamela Library' | 'Public Domain' | 'Original';
  topic: 'News' | 'Religion' | 'Science' | 'Psychology' | 'Literature' | 'History' | 'Culture' | 'Technology';
  difficulty: 'Easy' | 'Medium' | 'Difficult';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  estimatedReadingTime: number; // in minutes
  wordCount: number;
  sentences: Sentence[];
  summary: {
    arabic: string;
    english: string;
  };
  tags: string[];
  datePublished?: string;
  audioUrl?: string; // For TTS
}

export interface DisplayOptions {
  showHarakah: boolean;
  showTranslation: boolean;
  showTransliteration: boolean;
  enableTTS: boolean;
  ttsSpeed: number; // 0.5 to 2.0
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
}

export interface FilterOptions {
  difficulty: ('Easy' | 'Medium' | 'Difficult')[];
  level: ('A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2')[];
  category: ('Phrases' | 'Education' | 'News' | 'Travel' | 'Others')[];
  topic?: ('News' | 'Religion' | 'Science' | 'Psychology' | 'Literature' | 'History' | 'Culture' | 'Technology')[];
  source?: ('Al Jazeera' | 'BBC Arabic' | 'Project Gutenberg' | 'Archive.org' | 'Shamela Library' | 'Public Domain' | 'Original')[];
  wordCountRange?: {
    min: number;
    max: number;
  };
}