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
});
