import {AppSettings} from '../../types/core';

export type SfxKey =
  | 'button'
  | 'correct'
  | 'incorrect'
  | 'levelComplete'
  | 'reward'
  | 'gameStart';

class AudioServiceImpl {
  private settings: Pick<
    AppSettings,
    'musicEnabled' | 'soundEffectsEnabled'
  > | null = null;
  private currentMusic: string | null = null;

  configure(settings: Pick<AppSettings, 'musicEnabled' | 'soundEffectsEnabled'>) {
    this.settings = settings;
  }

  async playMusic(trackId: string) {
    if (!this.settings?.musicEnabled) {
      return;
    }
    this.currentMusic = trackId;
  }

  async stopMusic() {
    this.currentMusic = null;
  }

  async playSfx(_key: SfxKey) {
    if (!this.settings?.soundEffectsEnabled) {
      return;
    }
  }

  getCurrentMusic() {
    return this.currentMusic;
  }
}

export const AudioService = new AudioServiceImpl();
