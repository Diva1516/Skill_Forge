export const flashcards = [
  { id: 'fc1', category: 'React', question: 'What is the Virtual DOM?', answer: 'A lightweight JavaScript representation of the actual DOM used by React to optimize rendering.' },
  { id: 'fc2', category: 'React', question: 'What is a Hook?', answer: 'A special function that lets you "hook into" React state and lifecycle features from function components.' },
  { id: 'fc3', category: 'JavaScript', question: 'What is a Closure?', answer: 'A function bundled together with references to its surrounding state (the lexical environment).' },
  { id: 'fc4', category: 'Java', question: 'What is OOP?', answer: 'Object-Oriented Programming: a paradigm based on objects, which can contain data and code.' },
];

export const quizQuestions = [
  {
    id: 'q1',
    topic: 'React',
    question: 'Which hook is used for side effects?',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correctAnswer: 1,
    explanation: 'useEffect is used to perform side effects in function components.'
  },
  {
    id: 'q2',
    topic: 'JavaScript',
    question: 'What is the output of `typeof null`?',
    options: ['"null"', '"undefined"', '"object"', '"number"'],
    correctAnswer: 2,
    explanation: 'In JavaScript, typeof null is "object" due to a historical bug.'
  }
];

export const dailyChallengeData = {
  title: 'Two Sum in JavaScript',
  description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
  difficulty: 'Easy',
  hints: ['Try using a Hash Map to store values you have already seen.'],
  starterCode: 'function twoSum(nums, target) {\n  // Write your code here\n}'
};
