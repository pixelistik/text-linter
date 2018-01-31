import Ngrams from '@/Ngrams';

describe('Ngrams', () => {
  it('should split into 2-grams', () => {
    const text = 'Just three words';
    const result = Ngrams.ngrams(text, 2);
    const expected = [
      {
        elements: ['Just', 'three'],
        start: 0,
      },
      {
        elements: ['three', 'words'],
        start: 5,
      },
    ];

    expect(result).to.deep.equal(expected);
  });

  it('should split into 3-grams', () => {
    const text = 'Just these four words';
    const result = Ngrams.ngrams(text, 3);
    const expected = [
      {
        elements: ['Just', 'these', 'four'],
        start: 0,
      },
      {
        elements: ['these', 'four', 'words'],
        start: 5,
      },
    ];

    expect(result).to.deep.equal(expected);
  });

  it('should split correctly with multiple whitespace', () => {
    const text = 'Just  three words';
    const result = Ngrams.ngrams(text, 2);
    const expected = [
      {
        elements: ['Just', 'three'],
        start: 0,
      },
      {
        elements: ['three', 'words'],
        start: 6,
      },
    ];

    expect(result).to.deep.equal(expected);
  });
});
