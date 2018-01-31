import Rules from '@/Rules';
import Ngrams from '@/Ngrams';

const levenshtein = require('levenshtein-edit-distance');

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

    const grams1 = Ngrams.ngrams(text, 1);
    const grams2 = Ngrams.ngrams(text, 2);

    const grams = grams1;
    grams.push(...grams2);

    Rules.COMMON_WORDS.forEach((commonWord) => {
      grams.forEach((gram) => {
        const gramText = gram.elements.join(' ').trim();
        const distance = levenshtein(commonWord, gramText);

        if (distance === 1) {
          const lintEntry = {
            type: 'typo',
            start: gram.start,
            end: gram.start + gramText.length,
            text: gramText,
            correctedText: commonWord,
            description: `"${gramText}" may be a typo and should be "${commonWord}".`,
            precedingText: text.substring(0, gram.start),
          };

          lints.push(lintEntry);
        }
      });
    });
    return lints;
  },
};

export default Linter;
