const Rules = {
  FORBIDDEN_WORDS: [
    'React',
    'Java',
    'Internet Explorer',
  ],
  COMMON_MISTAKES: [
    { wrong: 'LKW', correct: 'Lkw' },
    { wrong: 'FireFox', correct: 'Firefox' },
  ],
  COMMON_WORDS: [
    'Software',
    'Quality Assurance',
  ],
  REGEX: [
    {
      regex: /"(.+)"/g,
      description: 'Use typographic quotes, like „this“',
      correct: '„$1“',
    },
    {
      regex: /meist ?\w+ste/g,
      description: 'Avoid redundant Superlativ: both of "meist" and "...ste" are too much.',
    },
  ],
};

export default Rules;
