const FORBIDDEN_WORDS = ['React', 'Java'];

const Linter = {
  lint: function lint(text) {
    const lints = [];

    FORBIDDEN_WORDS.forEach((forbiddenWord) => {
      if (text.indexOf(forbiddenWord) > -1) {
        const lintEntry = {
          start: text.indexOf(forbiddenWord),
          end: text.indexOf(forbiddenWord) + forbiddenWord.length,
          text: forbiddenWord,
          precedingText: text.substring(0, text.indexOf(forbiddenWord)),
        };

        lints.push(lintEntry);
      }
    });
    return lints;
  },
};

export default Linter;
