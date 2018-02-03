const Rules = {
  /*
   * FORBIDDEN_WORDS:
   * A list of words that should be avoided in your texts. Occurences will be
   * reported as forbidden, without giving an alternative.
   */
  FORBIDDEN_WORDS: [
    'React',
    'Java',
    'Internet Explorer',
  ],

  /*
   * COMMON_MISTAKES:
   * Pairs of wrong + correct. Occurences of the wrong versions will be
   * reported and recommended to be changed into the correct version.
   */
  COMMON_MISTAKES: [
    { wrong: 'LKW', correct: 'Lkw' },
    { wrong: 'FireFox', correct: 'Firefox' },
  ],

  /*
   * COMMON_WORDS:
   * A list of words that are important to be spelled correctly. The text is
   * checked for slightly different occurences of these words, e.g. typos.
   */
  COMMON_WORDS: [
    'Software',
    'Quality Assurance',
  ],

  /*
   * REGEX:
   * A list of regular expressions. Each match of these is reported, giving the
   * description. The description should include an explanation why this occurence
   * is wrong. Optionally, you can include a correct version, using matches
   * marked with () in the regex.
   */
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
