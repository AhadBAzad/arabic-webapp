// Text-to-Speech utility using browser's Speech Synthesis API
export class TTSService {
  private synthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private arabicVoices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private settings = {
    rate: 0.8,
    pitch: 1,
    volume: 1,
    voiceIndex: 0
  };

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
    
    // Find all Arabic voices with enhanced detection
    this.arabicVoices = this.voices.filter(voice => 
      voice.lang.startsWith('ar') || 
      voice.name.toLowerCase().includes('arabic') ||
      voice.name.toLowerCase().includes('عربي') ||
      voice.lang.includes('ar-') ||
      voice.name.toLowerCase().includes('mahmoud') ||
      voice.name.toLowerCase().includes('sara') ||
      voice.name.toLowerCase().includes('yasmina')
    );

    // Set default voice to first Arabic voice or fallback
    if (this.arabicVoices.length > 0) {
      this.selectedVoice = this.arabicVoices[0];
    } else if (this.voices.length > 0) {
      this.selectedVoice = this.voices[0];
    }
  }

  public getAvailableArabicVoices(): SpeechSynthesisVoice[] {
    return this.arabicVoices;
  }

  public getAllVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public setVoice(voiceIndex: number): void {
    if (this.arabicVoices[voiceIndex]) {
      this.selectedVoice = this.arabicVoices[voiceIndex];
      this.settings.voiceIndex = voiceIndex;
    }
  }

  public getSettings() {
    return { ...this.settings };
  }

  public updateSettings(newSettings: Partial<typeof this.settings>): void {
    this.settings = { ...this.settings, ...newSettings };
    if (newSettings.voiceIndex !== undefined && this.arabicVoices[newSettings.voiceIndex]) {
      this.selectedVoice = this.arabicVoices[newSettings.voiceIndex];
    }
  }

  public speak(text: string, options: {
    rate?: number;
    pitch?: number;
    volume?: number;
    lang?: string;
    voiceIndex?: number;
  } = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      // Stop any current speech
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set voice - use provided voice index or current selection
      const voiceIndex = options.voiceIndex ?? this.settings.voiceIndex;
      const voice = this.arabicVoices[voiceIndex] || this.selectedVoice;
      if (voice) {
        utterance.voice = voice;
      }
      
      // Set language - try multiple Arabic variants
      const arabicLanguages = ['ar-SA', 'ar-EG', 'ar-AE', 'ar-JO', 'ar'];
      utterance.lang = options.lang || arabicLanguages[0];
      
      // Set speech parameters with current settings
      utterance.rate = options.rate || this.settings.rate;
      utterance.pitch = options.pitch || this.settings.pitch;
      utterance.volume = options.volume || this.settings.volume;

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