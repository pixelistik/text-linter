const Ngrams = {
  ngrams(text, n) {
    const words = text.split(' ');
    const ngrams = [];
    let startPosition = 0;
    words.forEach((word, index) => {
      const elements = [];
      for (let i = 0; i < n; i += 1) {
        if (typeof words[index + i] === 'undefined') {
          return;
        }
        elements.push(words[index + i]);
      }
      ngrams.push({ elements, start: startPosition });
      startPosition += words[index].length + 1;
    });
    return ngrams;
  },
};

export default Ngrams;
