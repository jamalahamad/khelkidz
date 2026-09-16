import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KKButton} from '../../components/common/KKButton';
import {KKCard} from '../../components/common/KKCard';
import {KKProgressBar} from '../../components/common/KKProgressBar';
import {Screen, ScreenBand} from '../../components/common/Screen';
import {KKAnswerOption} from '../../components/game/KKAnswerOption';
import {KKMascot} from '../../components/mascot/KKMascot';
import {KKRewardPopup} from '../../components/reward/KKRewardPopup';
import {useTheme} from '../../design-system/ThemeProvider';
import {GameEngine} from '../../games/engine/GameEngine';
import {GameRegistry} from '../../games/engine/GameRegistry';
import {LevelManager} from '../../games/engine/LevelManager';
import {AudioService} from '../../services/audio/AudioService';
import {HapticService} from '../../services/haptics/HapticService';
import {VoiceService} from '../../services/voice/VoiceService';
import {useAppState} from '../../store/AppStateContext';
import {LevelResult, MascotMood} from '../../types/core';
import {Route} from '../../app/navigation';

interface Props {
  gameId: string;
  levelId: string;
  navigate: (route: Route) => void;
}

export function GamePlayScreen({gameId, levelId, navigate}: Props) {
  const theme = useTheme();
  const {localize, settings, t, saveLevelResult} = useAppState();
  const game = GameRegistry.get(gameId);
  const level = LevelManager.getLevel(game, levelId);
  const [sessionVersion, setSessionVersion] = useState(0);
  const session = useMemo(() => {
    void sessionVersion;
    return GameEngine.createSession(game, level);
  }, [game, level, sessionVersion]);
  const [state, setState] = useState(session.getState());
  const [result, setResult] = useState<LevelResult | null>(null);
  const question = session.getCurrentQuestion();
  const feedback = state.isCorrect === undefined ? null : state.isCorrect ? t('game.correct') : t('game.incorrect');
  const mascotMood: MascotMood =
    state.isCorrect === undefined ? 'thinking' : state.isCorrect ? 'celebrating' : 'encouraging';
  const progress = ((state.questionIndex + 1) / level.questions.length) * 100;
  const coins = result?.rewards.find(reward => reward.type === 'coins')?.amount ?? 0;
  const xp = result?.rewards.find(reward => reward.type === 'xp')?.amount ?? 0;

  useEffect(() => {
    AudioService.playMusic(game.category);
    VoiceService.speak({
      text: localize(question.instruction),
      language: settings.language,
      audio: question.audio,
      interrupt: true,
      rate: settings.speechRate,
    });
    return () => {
      AudioService.stopMusic();
      VoiceService.stop();
    };
  }, [game.category, localize, question.audio, question.instruction, settings.language, settings.speechRate]);

  async function handleAnswer(optionId: string) {
    if (state.selectedOptionId) {
      return;
    }
    const isCorrect = session.answer(optionId);
    const nextState = session.getState();
    setState({...nextState});
    if (isCorrect) {
      await AudioService.playSfx('correct');
      HapticService.success();
      await VoiceService.speak({text: t('game.correct'), language: settings.language});
      return;
    }
    await AudioService.playSfx('incorrect');
    HapticService.error();
    await VoiceService.speak({text: t('game.incorrect'), language: settings.language});
  }

  async function handleContinue() {
    const completed = session.next();
    if (!completed) {
      const nextState = session.getState();
      setState({...nextState});
      const nextQuestion = session.getCurrentQuestion();
      await VoiceService.speak({
        text: localize(nextQuestion.instruction),
        language: settings.language,
        audio: nextQuestion.audio,
        interrupt: true,
      });
      return;
    }
    const completedResult = session.complete();
    setResult(completedResult);
    await saveLevelResult(completedResult);
    await AudioService.playSfx('levelComplete');
    HapticService.reward();
    await VoiceService.speak({text: t('game.complete'), language: settings.language, interrupt: true});
  }

  function restartLevel() {
    setResult(null);
    setSessionVersion(value => value + 1);
    setState({
      questionIndex: 0,
      correctAnswers: 0,
      completed: false,
    });
  }

  function nextLevel() {
    const next = LevelManager.getNextLevel(game, level);
    if (next) {
      navigate({name: 'play', gameId: game.id, levelId: next.id});
      return;
    }
    navigate({name: 'games'});
  }

  return (
    <Screen>
      <ScreenBand>
        <View style={styles.topBar}>
          <KKButton label="" icon="â€¹" variant="ghost" onPress={() => navigate({name: 'levels', gameId})} />
          <View style={styles.progressBlock}>
            <Text style={[styles.levelText, {color: theme.colors.textPrimary}]}>
              {localize(game.title)} â€¢ {t('game.level')} {level.levelNumber}
            </Text>
            <KKProgressBar value={progress} color={game.accentColor} />
          </View>
        </View>

        <KKCard style={styles.questionCard}>
          <View style={styles.questionTop}>
            <Text style={styles.questionVisual}>{question.visual ?? game.icon}</Text>
            <KKMascot mood={mascotMood} />
          </View>
          <Text style={[styles.prompt, {color: theme.colors.textPrimary}]}>
            {localize(question.prompt)}
          </Text>
          <Text style={[styles.instruction, {color: theme.colors.textSecondary}]}>
            {localize(question.instruction)}
          </Text>
          <KKButton
            label={t('action.listen')}
            icon="ðŸ”Š"
            variant="ghost"
            onPress={() =>
              VoiceService.repeat({
                text: localize(question.instruction),
                language: settings.language,
                audio: question.audio,
              })
            }
          />
        </KKCard>

        <View style={styles.answerGrid}>
          {question.options.map(option => (
            <View key={option.id} style={styles.answerCell}>
              <KKAnswerOption
                option={option}
                label={localize(option.label)}
                selected={state.selectedOptionId === option.id}
                correct={option.value === question.answer}
                disabled={Boolean(state.selectedOptionId)}
                onPress={() => handleAnswer(option.id)}
              />
            </View>
          ))}
        </View>

        {feedback ? (
          <KKCard style={styles.feedback}>
            <Text
              style={[
                styles.feedbackText,
                {color: state.isCorrect ? theme.colors.success : theme.colors.secondary},
              ]}>
              {feedback}
            </Text>
            <KKButton
              label={state.isCorrect ? t('action.next') : t('game.encourage')}
              icon={state.isCorrect ? 'â–¶' : 'â†»'}
              onPress={state.isCorrect ? handleContinue : () => setState({...state, selectedOptionId: undefined, isCorrect: undefined})}
            />
          </KKCard>
        ) : null}

        <KKRewardPopup
          visible={Boolean(result)}
          title={t('game.complete')}
          earned={t('reward.earned')}
          stars={result?.stars ?? 0}
          coins={coins}
          xp={xp}
          nextLabel={t('action.next')}
          homeLabel={t('action.home')}
          onNext={nextLevel}
          onHome={() => navigate({name: 'home'})}
        />
        {result ? (
          <KKButton label={t('action.playAgain')} variant="ghost" icon="â†»" onPress={restartLevel} />
        ) : null}
      </ScreenBand>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBlock: {
    flex: 1,
    gap: 8,
  },
  levelText: {
    fontSize: 15,
    fontWeight: '800',
  },
  questionCard: {
    marginTop: 16,
    gap: 12,
  },
  questionTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  questionVisual: {
    fontSize: 72,
  },
  prompt: {
    fontSize: 30,
    fontWeight: '800',
  },
  instruction: {
    fontSize: 17,
    fontWeight: '700',
  },
  answerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  answerCell: {
    width: '48%',
  },
  feedback: {
    alignItems: 'center',
    gap: 12,
  },
  feedbackText: {
    fontSize: 25,
    fontWeight: '800',
    textAlign: 'center',
  },
});


