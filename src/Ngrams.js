const Ngrams = {
  ngrams(text, n) {
    const splitByRe = RegExp(/\W/);

    const words = text.split(splitByRe);

    const ngrams = [];
    let startPosition = 0;

    words.forEach((word, index) => {
      if (word !== '') {
        const elements = [];
        let i = 0;

        while (elements.length < n) {
          if (typeof words[index + i] === 'undefined') {
            return;
          }

          if (words[index + i] !== '') {
            elements.push(words[index + i]);
          }
          i += 1;
        }

        ngrams.push({ elements, start: startPosition });
      }

      startPosition += word.length + 1;
    });

    return ngrams;
  },
};

export default Ngrams;
