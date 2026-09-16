import {ScoreManager} from '../../src/games/engine/ScoreManager';

describe('ScoreManager', () => {
  it('calculates stars from accuracy', () => {
    expect(ScoreManager.calculateStars(10, 10)).toBe(3);
    expect(ScoreManager.calculateStars(7, 10)).toBe(2);
    expect(ScoreManager.calculateStars(3, 10)).toBe(1);
    expect(ScoreManager.calculateStars(0, 10)).toBe(0);
  });

  it('uses the level multiplier when scoring', () => {
    expect(ScoreManager.calculateScore(2, 2, 1.5)).toBe(350);
  });
});
