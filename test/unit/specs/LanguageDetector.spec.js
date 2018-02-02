import LanguageDetector from '@/LanguageDetector';

describe('LanguageDetector', () => {
  it('should detect German (de)', () => {
    const result = LanguageDetector.detect('Der Fahrer fährt mit dem Auto.');

    expect(result).to.equal('de');
  });

  it('should detect English (en)', () => {
    const result = LanguageDetector.detect('The driver drives with the car.');

    expect(result).to.equal('en');
  });
});
