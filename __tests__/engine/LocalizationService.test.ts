import {LocalizationService} from '../../src/services/localization/LocalizationService';

describe('LocalizationService', () => {
  it('defaults missing keys to a visible safe marker', () => {
    expect(LocalizationService.translate('missing.key', 'hi')).toBe('[missing.key]');
  });

  it('localizes text by selected language', () => {
    expect(LocalizationService.localize({en: 'Play', hi: 'खेलो'}, 'hi')).toBe('खेलो');
  });
});
