import {GameDefinition} from '../../types/core';
import {createChoiceLevel, makeOption} from './helpers';

const red = makeOption('red', 'Red', 'लाल', 'red', '●', '#FF4D4D');
const blue = makeOption('blue', 'Blue', 'नीला', 'blue', '●', '#4D96FF');
const green = makeOption('green', 'Green', 'हरा', 'green', '●', '#51CF66');
const yellow = makeOption('yellow', 'Yellow', 'पीला', 'yellow', '●', '#FFD43B');
const orange = makeOption('orange', 'Orange', 'नारंगी', 'orange', '●', '#FF922B');
const purple = makeOption('purple', 'Purple', 'बैंगनी', 'purple', '●', '#845EF7');
const pink = makeOption('pink', 'Pink', 'गुलाबी', 'pink', '●', '#F06595');
const brown = makeOption('brown', 'Brown', 'भूरा', 'brown', '●', '#A66A3F');

const options = [red, blue, green, yellow, orange, purple, pink, brown];

export const ColorQuest: GameDefinition = {
  id: 'color-quest',
  title: {en: 'Color Quest', hi: 'रंगों की खोज'},
  description: {
    en: 'Find, match, and remember bright colors with friendly voice guidance.',
    hi: 'आवाज़ की मदद से रंग पहचानो, मिलाओ और याद रखो।',
  },
  subject: {en: 'Colors', hi: 'रंग'},
  category: 'colors',
  ageRange: {min: 2, max: 6},
  icon: '🎨',
  accentColor: '#FF6B6B',
  learning: {
    objective: {
      en: 'Recognize and name common colors.',
      hi: 'आम रंगों को पहचानना और नाम बोलना।',
    },
    skills: [
      {en: 'Visual recognition', hi: 'देखकर पहचान'},
      {en: 'Color vocabulary', hi: 'रंग शब्दावली'},
      {en: 'Memory', hi: 'याददाश्त'},
    ],
    expectedOutcome: {
      en: 'Child can choose the requested color from a group.',
      hi: 'बच्चा समूह में से पूछा गया रंग चुन सकता है।',
    },
  },
  levels: [
    createChoiceLevel(
      'color-quest',
      1,
      1,
      {en: 'Find the red color', hi: 'लाल रंग ढूंढो'},
      {en: 'Tap red', hi: 'लाल पर टैप करो'},
      [red, blue, green],
      'red',
      '🔴',
    ),
    createChoiceLevel(
      'color-quest',
      2,
      2,
      {en: 'Find the yellow color', hi: 'पीला रंग ढूंढो'},
      {en: 'Tap yellow', hi: 'पीले पर टैप करो'},
      [blue, yellow, pink, green],
      'yellow',
      '🟡',
    ),
    createChoiceLevel(
      'color-quest',
      3,
      3,
      {en: 'Which color is the leaf?', hi: 'पत्ती कौन से रंग की है?'},
      {en: 'Choose green', hi: 'हरा चुनो'},
      [green, orange, purple, brown],
      'green',
      '🍃',
    ),
    createChoiceLevel(
      'color-quest',
      4,
      4,
      {en: 'Match the sky color', hi: 'आसमान का रंग मिलाओ'},
      {en: 'Choose blue', hi: 'नीला चुनो'},
      [pink, blue, yellow, red],
      'blue',
      '☁️',
    ),
    createChoiceLevel(
      'color-quest',
      5,
      5,
      {en: 'Find orange among many colors', hi: 'रंगों में नारंगी ढूंढो'},
      {en: 'Tap orange', hi: 'नारंगी पर टैप करो'},
      [red, orange, green, purple, blue],
      'orange',
      '🟠',
    ),
    createChoiceLevel(
      'color-quest',
      6,
      6,
      {en: 'Remember the heart color', hi: 'दिल का रंग याद करो'},
      {en: 'Choose pink', hi: 'गुलाबी चुनो'},
      [yellow, brown, pink, blue, green],
      'pink',
      '💗',
    ),
    createChoiceLevel(
      'color-quest',
      7,
      7,
      {en: 'Red and blue can make this color', hi: 'लाल और नीला मिलकर यह रंग बनाते हैं'},
      {en: 'Choose purple', hi: 'बैंगनी चुनो'},
      options,
      'purple',
      '🔴+🔵',
    ),
    createChoiceLevel(
      'color-quest',
      8,
      8,
      {en: 'Which color is the tree trunk?', hi: 'पेड़ का तना किस रंग का है?'},
      {en: 'Choose brown', hi: 'भूरा चुनो'},
      options,
      'brown',
      '🌳',
    ),
  ],
};
