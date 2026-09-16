export class ScoreManager {
  static calculateScore(correctAnswers: number, totalQuestions: number, multiplier: number) {
    if (totalQuestions <= 0) {
      return 0;
    }
    const accuracy = correctAnswers / totalQuestions;
    return Math.round(correctAnswers * 100 * multiplier + accuracy * 50);
  }

  static calculateStars(correctAnswers: number, totalQuestions: number) {
    if (totalQuestions <= 0 || correctAnswers <= 0) {
      return 0;
    }
    const accuracy = correctAnswers / totalQuestions;
    if (accuracy >= 0.9) {
      return 3;
    }
    if (accuracy >= 0.65) {
      return 2;
    }
    return 1;
  }
}
