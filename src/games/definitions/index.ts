import {GameRegistry} from '../engine/GameRegistry';
import {ColorQuest} from './colorQuest';
import {createPlaceholderGame, makeOption} from './helpers';

const triangle = makeOption('triangle', 'Triangle', 'त्रिभुज', 'triangle', '▲', '#FFD43B');
const circle = makeOption('circle', 'Circle', 'वृत्त', 'circle', '●', '#4D96FF');
const square = makeOption('square', 'Square', 'वर्ग', 'square', '■', '#51CF66');

const three = makeOption('three', 'Three', 'तीन', 3, '3', '#4D96FF');
const two = makeOption('two', 'Two', 'दो', 2, '2', '#FF6B6B');
const four = makeOption('four', 'Four', 'चार', 4, '4', '#51CF66');

export const Games = [
  ColorQuest,
  createPlaceholderGame({
    id: 'shape-adventure',
    title: {en: 'Shape Adventure', hi: 'आकार यात्रा'},
    description: {en: 'Find and match friendly shapes.', hi: 'प्यारे आकार पहचानो और मिलाओ।'},
    subject: {en: 'Shapes', hi: 'आकार'},
    category: 'shapes',
    icon: '🔷',
    accentColor: '#4D96FF',
    objective: {en: 'Recognize common shapes.', hi: 'आम आकारों को पहचानना।'},
    question: {en: 'Find the triangle', hi: 'त्रिभुज ढूंढो'},
    instruction: {en: 'Tap triangle', hi: 'त्रिभुज पर टैप करो'},
    correct: triangle,
    options: [circle, triangle, square],
  }),
  createPlaceholderGame({
    id: 'number-safari',
    title: {en: 'Number Safari', hi: 'नंबर सफारी'},
    description: {en: 'Count objects and learn number order.', hi: 'चीजें गिनो और संख्या क्रम सीखो।'},
    subject: {en: 'Numbers', hi: 'संख्या'},
    category: 'math',
    icon: '🧮',
    accentColor: '#51CF66',
    objective: {en: 'Build number recognition and counting.', hi: 'संख्या पहचान और गिनती सीखना।'},
    question: {en: 'How many apples?', hi: 'कितने सेब हैं?'},
    instruction: {en: 'Choose three', hi: 'तीन चुनो'},
    correct: three,
    options: [two, three, four],
  }),
  createPlaceholderGame({
    id: 'math-magic',
    title: {en: 'Math Magic', hi: 'गणित जादू'},
    description: {en: 'Solve gentle addition and subtraction puzzles.', hi: 'आसान जोड़ और घटाव पहेलियां हल करो।'},
    subject: {en: 'Math', hi: 'गणित'},
    category: 'math',
    icon: '✨',
    accentColor: '#845EF7',
    objective: {en: 'Understand simple math operations.', hi: 'सरल गणित क्रियाएं समझना।'},
    question: {en: 'Two apples plus one apple is?', hi: 'दो सेब और एक सेब कितने?'},
    instruction: {en: 'Choose three', hi: 'तीन चुनो'},
    correct: three,
    options: [two, three, four],
  }),
  createPlaceholderGame({
    id: 'english-abc',
    title: {en: 'English ABC', hi: 'English ABC'},
    description: {en: 'Letters, sounds, and first words.', hi: 'अक्षर, आवाज़ और पहले शब्द।'},
    subject: {en: 'English', hi: 'English'},
    category: 'english',
    icon: '🔤',
    accentColor: '#FF922B',
    objective: {en: 'Connect letters with sounds and words.', hi: 'अक्षर को आवाज़ और शब्द से जोड़ना।'},
    question: {en: 'A is for?', hi: 'A किसके लिए है?'},
    instruction: {en: 'Choose Apple', hi: 'Apple चुनो'},
    correct: makeOption('apple', 'Apple', 'Apple', 'apple', '🍎', '#FF6B6B'),
    options: [
      makeOption('apple', 'Apple', 'Apple', 'apple', '🍎', '#FF6B6B'),
      makeOption('ball', 'Ball', 'Ball', 'ball', '⚽', '#4D96FF'),
      makeOption('cat', 'Cat', 'Cat', 'cat', '🐱', '#FFD43B'),
    ],
  }),
  createPlaceholderGame({
    id: 'hindi-fun',
    title: {en: 'Hindi Fun', hi: 'हिंदी मस्ती'},
    description: {en: 'Hindi letters and picture words.', hi: 'हिंदी अक्षर और चित्र शब्द।'},
    subject: {en: 'Hindi', hi: 'हिंदी'},
    category: 'hindi',
    icon: 'अ',
    accentColor: '#F06595',
    objective: {en: 'Recognize Hindi letters and starter words.', hi: 'हिंदी अक्षर और शुरुआती शब्द पहचानना।'},
    question: {en: 'अ is for?', hi: 'अ से क्या होता है?'},
    instruction: {en: 'Choose अनार', hi: 'अनार चुनो'},
    correct: makeOption('anar', 'Pomegranate', 'अनार', 'anar', '🔴', '#FF4D4D'),
    options: [
      makeOption('anar', 'Pomegranate', 'अनार', 'anar', '🔴', '#FF4D4D'),
      makeOption('aam', 'Mango', 'आम', 'aam', '🥭', '#FFD43B'),
      makeOption('kamal', 'Lotus', 'कमल', 'kamal', '🪷', '#F06595'),
    ],
  }),
  createPlaceholderGame({
    id: 'memory-match',
    title: {en: 'Memory Match', hi: 'याद मिलान'},
    description: {en: 'Match pairs and strengthen memory.', hi: 'जोड़े मिलाओ और याददाश्त बढ़ाओ।'},
    subject: {en: 'Memory', hi: 'याददाश्त'},
    category: 'memory',
    icon: '🃏',
    accentColor: '#20C997',
    objective: {en: 'Improve visual memory through matching.', hi: 'मिलान से दृश्य याददाश्त बढ़ाना।'},
    question: {en: 'Which card matches red?', hi: 'लाल से कौन सा कार्ड मिलता है?'},
    instruction: {en: 'Choose red', hi: 'लाल चुनो'},
    correct: makeOption('red', 'Red', 'लाल', 'red', '🔴', '#FF4D4D'),
    options: [
      makeOption('red', 'Red', 'लाल', 'red', '🔴', '#FF4D4D'),
      makeOption('blue', 'Blue', 'नीला', 'blue', '🔵', '#4D96FF'),
      makeOption('green', 'Green', 'हरा', 'green', '🟢', '#51CF66'),
    ],
  }),
  createPlaceholderGame({
    id: 'puzzle-world',
    title: {en: 'Puzzle World', hi: 'पहेली दुनिया'},
    description: {en: 'Complete gentle logic and picture puzzles.', hi: 'चित्र और तर्क वाली पहेलियां पूरी करो।'},
    subject: {en: 'Puzzles', hi: 'पहेली'},
    category: 'puzzle',
    icon: '🧩',
    accentColor: '#15AABF',
    objective: {en: 'Practice categorization and reasoning.', hi: 'वर्गीकरण और सोच का अभ्यास।'},
    question: {en: 'Which one belongs with fruits?', hi: 'फल के साथ कौन सा है?'},
    instruction: {en: 'Choose mango', hi: 'आम चुनो'},
    correct: makeOption('mango', 'Mango', 'आम', 'mango', '🥭', '#FFD43B'),
    options: [
      makeOption('mango', 'Mango', 'आम', 'mango', '🥭', '#FFD43B'),
      makeOption('car', 'Car', 'कार', 'car', '🚗', '#4D96FF'),
      makeOption('shoe', 'Shoe', 'जूता', 'shoe', '👟', '#845EF7'),
    ],
  }),
  createPlaceholderGame({
    id: 'word-builder',
    title: {en: 'Word Builder', hi: 'शब्द बनाओ'},
    description: {en: 'Build English and Hindi words.', hi: 'English और हिंदी शब्द बनाओ।'},
    subject: {en: 'Words', hi: 'शब्द'},
    category: 'english',
    icon: '📝',
    accentColor: '#9775FA',
    objective: {en: 'Build early spelling confidence.', hi: 'शुरुआती शब्द बनाना सीखना।'},
    question: {en: 'Complete C A _', hi: 'C A _ पूरा करो'},
    instruction: {en: 'Choose T', hi: 'T चुनो'},
    correct: makeOption('t', 'T', 'T', 't', 'T', '#4D96FF'),
    options: [
      makeOption('t', 'T', 'T', 't', 'T', '#4D96FF'),
      makeOption('b', 'B', 'B', 'b', 'B', '#FF6B6B'),
      makeOption('m', 'M', 'M', 'm', 'M', '#51CF66'),
    ],
  }),
  createPlaceholderGame({
    id: 'pattern-hero',
    title: {en: 'Pattern Hero', hi: 'पैटर्न हीरो'},
    description: {en: 'Predict what comes next in a pattern.', hi: 'पैटर्न में आगे क्या आएगा बताओ।'},
    subject: {en: 'Patterns', hi: 'पैटर्न'},
    category: 'pattern',
    icon: '⭐',
    accentColor: '#FAB005',
    objective: {en: 'Develop sequencing and logic.', hi: 'क्रम और तर्क सीखना।'},
    question: {en: 'Red, blue, red, blue, ?', hi: 'लाल, नीला, लाल, नीला, ?'},
    instruction: {en: 'Choose red', hi: 'लाल चुनो'},
    correct: makeOption('red', 'Red', 'लाल', 'red', '🔴', '#FF4D4D'),
    options: [
      makeOption('red', 'Red', 'लाल', 'red', '🔴', '#FF4D4D'),
      makeOption('blue', 'Blue', 'नीला', 'blue', '🔵', '#4D96FF'),
      makeOption('yellow', 'Yellow', 'पीला', 'yellow', '🟡', '#FFD43B'),
    ],
  }),
];

let registered = false;

export function registerGames() {
  if (registered) {
    return;
  }
  Games.forEach(game => GameRegistry.register(game));
  registered = true;
}
