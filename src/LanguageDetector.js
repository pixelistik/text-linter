const _ = require('lodash');

const languageCommonWordCorpuses = {
  de: ['der', 'die', 'und', 'in', 'den', 'von', 'zu', 'das', 'mit', 'sich', 'des', 'auf', 'für', 'ist', 'im', 'dem', 'nicht', 'ein', 'Die', 'eine', 'als', 'auch', 'es', 'an', 'werden', 'aus', 'er', 'hat', 'dass', 'sie', 'nach', 'wird', 'bei', 'einer', 'Der', 'um', 'am', 'sind', 'noch', 'wie', 'einem', 'ber', 'einen', 'Das', 'so', 'Sie', 'zum', 'war', 'haben', 'nur', 'oder', 'aber', 'vor', 'zur', 'bis', 'mehr', 'durch', 'man', 'sein', 'wurde', 'sei', 'In', 'Prozent', 'hatte', 'kann', 'gegen', 'vom', 'können', 'schon', 'wenn', 'habe', 'seine', 'Mark', 'ihre', 'dann', 'unter', 'wir', 'soll', 'ich', 'eines', 'Es', 'Jahr', 'zwei', 'Jahren', 'diese', 'dieser', 'wieder', 'keine', 'Uhr', 'seiner', 'worden', 'Und', 'will', 'zwischen', 'Im', 'immer', 'Millionen', 'Ein', 'was', 'sagte'],
  en: ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'],
};

const LanguageDetector = {
  detect(text) {
    const languages = Object.keys(languageCommonWordCorpuses);
    const languageScores = [];

    languages.forEach((language) => {
      const score = languageCommonWordCorpuses[language].reduce((scoreSum, commonWord) => {
        if (text.indexOf(commonWord) !== -1) {
          return scoreSum + 1;
        }
        return scoreSum;
      }, 0);

      languageScores.push({
        language,
        score,
      });
    });

    const detectedLanguage = _.maxBy(languageScores, 'score');
    return detectedLanguage.language;
  },
};

export default LanguageDetector;
