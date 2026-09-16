import {LevelResult, RewardGrant} from '../../types/core';

export class RewardManager {
  static calculate(result: Omit<LevelResult, 'rewards'>): RewardGrant[] {
    const coins = result.stars * 10 + result.correctAnswers * 2;
    const xp = result.score;
    const rewards: RewardGrant[] = [
      {type: 'level-complete', amount: 1},
      {type: 'stars', amount: result.stars},
      {type: 'coins', amount: coins},
      {type: 'xp', amount: xp},
    ];

    if (result.stars === 3) {
      rewards.push({
        type: 'badge',
        amount: 1,
        id: `${result.gameId}-${result.levelId}-perfect`,
        label: {en: 'Shining Star', hi: 'चमकता सितारा'},
      });
    }

    return rewards;
  }
}
