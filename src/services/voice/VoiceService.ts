import {AudioAsset, SupportedLanguage} from '../../types/core';

interface SpeakInput {
  text: string;
  language: SupportedLanguage;
  audio?: AudioAsset;
  interrupt?: boolean;
  rate?: number;
}

class VoiceServiceImpl {
  private enabled = true;
  private speaking = false;
  private queue: SpeakInput[] = [];

  configure(enabled: boolean) {
    this.enabled = enabled;
  }

  async speak(input: SpeakInput) {
    if (!this.enabled || !input.text.trim()) {
      return;
    }
    if (input.interrupt) {
      this.queue = [];
      await this.stop();
    }
    this.queue.push(input);
    await this.flushQueue();
  }

  async repeat(input: SpeakInput) {
    await this.speak({...input, interrupt: true});
  }

  async stop() {
    this.speaking = false;
  }

  async pause() {
    this.speaking = false;
  }

  private async flushQueue() {
    if (this.speaking) {
      return;
    }
    const next = this.queue.shift();
    if (!next) {
      return;
    }
    this.speaking = true;
    try {
      // Native TTS or recorded audio can be connected here later.
      await Promise.resolve(next.audio?.[next.language] ?? next.text);
    } finally {
      this.speaking = false;
      if (this.queue.length > 0) {
        await this.flushQueue();
      }
    }
  }
}

export const VoiceService = new VoiceServiceImpl();
