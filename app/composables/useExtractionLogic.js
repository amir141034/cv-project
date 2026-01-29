export const useExtractionLogic = () => {

const STOPWORDS = new Set([
  "the", "and", "with", "for", "to", "in", "of", "a", "is",
  "on", "as", "by", "an", "be", "are", "this", "that"
]);

const cleanText = (text) => {
    console.log(text);
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const tokenize = (text) => {
  return cleanText(text)
    .split(" ")
    .filter(word => word.length > 2 && !STOPWORDS.has(word));
}

const extractKeywords = (text) => {
  const tokens = tokenize(text);
  const frequency = {};

  tokens.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Keep words that appear at least twice
  return Object.keys(frequency).filter(word => frequency[word] >= 2);
}

const compareKeywords = (resumeText, jdText) => {
  const resumeKeywords = new Set(extractKeywords(resumeText));
  const jdKeywords = new Set(extractKeywords(jdText));

  const matched = [];
  const missing = [];

  jdKeywords.forEach(keyword => {
    if (resumeKeywords.has(keyword)) {
      matched.push(keyword);
    } else {
      missing.push(keyword);
    }
  });

  const score = jdKeywords.size === 0
    ? 0
    : Math.round((matched.length / jdKeywords.size) * 100);

  return { score, matched, missing };
}

  return {
    compareKeywords,
  };
}