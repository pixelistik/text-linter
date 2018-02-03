import Linter from '@/Linter';

describe('Linter', () => {
  describe('Forbidden words', () => {
    it('should find a single forbidden word', () => {
      const hints = Linter.lint('React');
      expect(hints[0].type).to.equal('forbidden');
      expect(hints[0].text).to.equal('React');
      expect(hints[0].start).to.equal(0);
      expect(hints[0].end).to.equal(4);
    });

    it('should find two forbidden words', () => {
      const hints = Linter.lint('React Java');

      expect(hints.length).to.equal(2);
      expect(hints[0].text).to.equal('React');
      expect(hints[1].text).to.equal('Java');
    });

    it('should find a repeated forbidden word', () => {
      const hints = Linter.lint('React React');

      expect(hints.length).to.equal(2);
      expect(hints[0].text).to.equal('React');
      expect(hints[1].text).to.equal('React');
    });
  });

  describe('Common mistakes', () => {
    it('should find a single correction', () => {
      const hints = Linter.lint('LKW');

      expect(hints[0].type).to.equal('common-mistake');
      expect(hints[0].text).to.equal('LKW');
      expect(hints[0].correctedText).to.equal('Lkw');
      expect(hints[0].start).to.equal(0);
      expect(hints[0].end).to.equal(2);
    });
  });

  describe('Typos', () => {
    it('should find a simple typo', () => {
      const hints = Linter.lint('Softwre');

      expect(hints[0].type).to.equal('typo');
      expect(hints[0].text).to.equal('Softwre');
      expect(hints[0].correctedText).to.equal('Software');
    });

    it('should find a multi-word typo', () => {
      const hints = Linter.lint('Quality Assuranc');

      expect(hints[0].type).to.equal('typo');
      expect(hints[0].text).to.equal('Quality Assuranc');
      expect(hints[0].correctedText).to.equal('Quality Assurance');
    });

    it('should find a typo within a sentence', () => {
      const hints = Linter.lint('My Softwre is tested.');

      expect(hints[0].type).to.equal('typo');
      expect(hints[0].text).to.equal('Softwre');
      expect(hints[0].correctedText).to.equal('Software');
    });

    it('should find a typo that ends in punctuation', () => {
      const hints = Linter.lint('Tested is my Softwre.');

      expect(hints[0].type).to.equal('typo');
      expect(hints[0].text).to.equal('Softwre');
      expect(hints[0].correctedText).to.equal('Software');
      expect(hints[0].precedingText).to.equal('Tested is my ');
    });

    it('should not find a false positive typo due to punctuation', () => {
      const hints = Linter.lint('Software.');

      expect(hints.length).to.equal(0);
    });

    it('should have the correct preceding text including multiple line breaks', () => {
      const hints = Linter.lint('\n\nSoftwre');

      expect(hints[0].precedingText).to.equal('\n\n');
    });
  });

  describe('Regex Rules', () => {
    it('should suggest typographic (German) quotes', () => {
      const hints = Linter.lint('Meine "Quotes"');

      expect(hints[0].type).to.equal('regex-rule');
      expect(hints[0].text).to.equal('"Quotes"');
      expect(hints[0].description).to.equal('Use typographic quotes, like „this“');
    });

    describe('Redundant Superlativ (German)', () => {
      it('should detect redundant Superlativ in one word', () => {
        const hints = Linter.lint('Die meistgeliebteste Grammatik');

        expect(hints[0].type).to.equal('regex-rule');
        expect(hints[0].text).to.equal('meistgeliebteste');
        expect(hints[0].description).to.equal('Avoid redundant Superlativ: both of "meist" and "...ste" are too much.');
      });

      it('should detect redundant Superlativ in two words', () => {
        const hints = Linter.lint('Die meist geliebteste Grammatik');

        expect(hints[0].type).to.equal('regex-rule');
        expect(hints[0].text).to.equal('meist geliebteste');
        expect(hints[0].description).to.equal('Avoid redundant Superlativ: both of "meist" and "...ste" are too much.');
      });
    });
  });

  describe('Fixing text', () => {
    it('should insert a simple fix of the same length', () => {
      const text = 'Wrong word.';
      const hint = {
        start: 0,
        end: 4,
        correctedText: 'Right',
      };

      const result = Linter.fixText(text, hint);
      expect(result).to.equal('Right word.');
    });

    it('should insert a fix within the text, with different length', () => {
      const text = 'Some wrong word.';
      const hint = {
        start: 5,
        end: 9,
        correctedText: 'corrected',
      };

      const result = Linter.fixText(text, hint);
      expect(result).to.equal('Some corrected word.');
    });
  });
});
