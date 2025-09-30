// Text-to-Speech utility using browser's Speech Synthesis API
export class TTSService {
  private synthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private arabicVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.loadVoices();
    
    // Load voices when they become available
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices(): void {
    this.voices = this.synthesis.getVoices();
    
    // Find Arabic voices - prioritize different Arabic voice options
    this.arabicVoice = this.voices.find(voice => 
      voice.lang.startsWith('ar') || 
      voice.name.toLowerCase().includes('arabic') ||
      voice.name.toLowerCase().includes('عربي')
    ) || null;

    // Fallback to any available voice if no Arabic voice is found
    if (!this.arabicVoice && this.voices.length > 0) {
      this.arabicVoice = this.voices[0];
    }
  }

  public getAvailableArabicVoices(): SpeechSynthesisVoice[] {
    return this.voices.filter(voice => 
      voice.lang.startsWith('ar') || 
      voice.name.toLowerCase().includes('arabic') ||
      voice.name.toLowerCase().includes('عربي')
    );
  }

  public speak(text: string, options: {
    rate?: number;
    pitch?: number;
    volume?: number;
    lang?: string;
  } = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      // Stop any current speech
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set voice
      if (this.arabicVoice) {
        utterance.voice = this.arabicVoice;
      }
      
      // Set language - prefer Arabic
      utterance.lang = options.lang || 'ar-SA'; // Saudi Arabic as default
      
      // Set speech parameters
      utterance.rate = options.rate || 0.8; // Slightly slower for learning
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);

      this.synthesis.speak(utterance);
    });
  }

  public stop(): void {
    this.synthesis.cancel();
  }

  public isSpeaking(): boolean {
    return this.synthesis.speaking;
  }

  public isSupported(): boolean {
    return 'speechSynthesis' in window;
  }
}

// Create a singleton instance
export const ttsService = new TTSService();