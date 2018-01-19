import Rules from '@/Rules';

const Linter = {
  lint: function lint(text) {
    const lints = [];

    Rules.FORBIDDEN_WORDS.forEach((forbiddenWord) => {
      const re = RegExp(`${forbiddenWord}`, 'g');
      let match;
      /* eslint no-cond-assign: ["error", "except-parens"] */
      while ((match = re.exec(text)) != null) {
        const lintEntry = {
          start: match.index,
          end: match.index + (forbiddenWord.length - 1),
          text: forbiddenWord,
          type: 'forbidden',
          description: `"${forbiddenWord}" is a forbidden word.`,
          precedingText: text.substring(0, match.index),
        };

        lints.push(lintEntry);
      }
    });

    Rules.COMMON_MISTAKES.forEach((wrongWord) => {
      const re = RegExp(`${wrongWord.wrong}`, 'g');
      let match;
      /* eslint no-cond-assign: ["error", "except-parens"] */
      while ((match = re.exec(text)) != null) {
        const lintEntry = {
          start: match.index,
          end: match.index + (wrongWord.wrong.length - 1),
          text: wrongWord.wrong,
          correctedText: wrongWord.correct,
          type: 'common-mistake',
          description: `"${wrongWord.wrong}" should probably be "${wrongWord.correct}".`,
          precedingText: text.substring(0, match.index),
        };

        lints.push(lintEntry);
      }
    });
    return lints;
  },
};

export default Linter;
