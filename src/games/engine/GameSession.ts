import {LevelDefinition, LevelResult, QuestionDefinition} from '../../types/core';
import {RewardManager} from './RewardManager';
import {ScoreManager} from './ScoreManager';

export interface GameSessionState {
  questionIndex: number;
  correctAnswers: number;
  selectedOptionId?: string;
  isCorrect?: boolean;
  completed: boolean;
}

export class GameSession {
  private state: GameSessionState = {
    questionIndex: 0,
    correctAnswers: 0,
    completed: false,
  };

  constructor(private gameId: string, private level: LevelDefinition) {}

  getState() {
    return this.state;
  }

  getCurrentQuestion(): QuestionDefinition {
    return this.level.questions[this.state.questionIndex];
  }

  answer(optionId: string) {
    const question = this.getCurrentQuestion();
    const option = question.options.find(item => item.id === optionId);
    const isCorrect = option?.value === question.answer;
    this.state = {
      ...this.state,
      selectedOptionId: optionId,
      isCorrect,
      correctAnswers: this.state.correctAnswers + (isCorrect ? 1 : 0),
    };
    return isCorrect;
  }

  next() {
    const nextIndex = this.state.questionIndex + 1;
    this.state = {
      ...this.state,
      questionIndex: nextIndex,
      selectedOptionId: undefined,
      isCorrect: undefined,
      completed: nextIndex >= this.level.questions.length,
    };
    return this.state.completed;
  }

  complete(): LevelResult {
    const totalQuestions = this.level.questions.length;
    const correctAnswers = this.state.correctAnswers;
    const score = ScoreManager.calculateScore(
      correctAnswers,
      totalQuestions,
      this.level.scoreMultiplier,
    );
    const stars = ScoreManager.calculateStars(correctAnswers, totalQuestions);
    const base = {
      gameId: this.gameId,
      levelId: this.level.id,
      totalQuestions,
      correctAnswers,
      score,
      stars,
    };

    return {...base, rewards: RewardManager.calculate(base)};
  }
}
