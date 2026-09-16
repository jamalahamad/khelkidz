import {Vibration} from 'react-native';

class HapticServiceImpl {
  private enabled = true;

  configure(enabled: boolean) {
    this.enabled = enabled;
  }

  light() {
    this.vibrate(10);
  }

  medium() {
    this.vibrate(20);
  }

  success() {
    this.vibrate([0, 15, 30, 15]);
  }

  error() {
    this.vibrate(30);
  }

  reward() {
    this.vibrate([0, 20, 40, 20, 40, 30]);
  }

  private vibrate(pattern: number | number[]) {
    if (this.enabled) {
      Vibration.vibrate(pattern);
    }
  }
}

export const HapticService = new HapticServiceImpl();
