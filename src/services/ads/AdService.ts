export class AdService {
  static async initialize() {
    return {enabled: false, reason: 'Ads disabled for child-safe foundation'};
  }

  static async maybeShowLevelBreakAd() {
    return {shown: false};
  }
}
