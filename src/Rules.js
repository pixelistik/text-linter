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
    { regex: '".+"', description: 'Use typographic quotes, like „this“' },
  ],
};

export default Rules;
