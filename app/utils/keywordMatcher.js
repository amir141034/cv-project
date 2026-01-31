import {
  tokenize,
  removeStopwords,
  countFrequency,
  generateBigrams,
} from "./textProcessing";

import { KNOWN_PHRASES, SYNONYMS } from "./keywordData";

export const extractKeywords = (text) => {
  const tokens = removeStopwords(tokenize(text));

  const unigramFreq = countFrequency(tokens);
  const bigrams = generateBigrams(tokens);
  const bigramFreq = countFrequency(bigrams);

  const keywords = new Set();

  // Unigrams
  Object.entries(unigramFreq).forEach(([word, count]) => {
    if (count >= 2) {
      keywords.add(word);
    }
  });

  // Bigrams
  Object.entries(bigramFreq).forEach(([phrase, count]) => {
    if (count >= 2 || KNOWN_PHRASES.has(phrase)) {
      keywords.add(phrase);
    }
  });

  return Array.from(keywords);
}

export const normalizeKeywords = (keywords) => {
  return keywords.map(k => SYNONYMS[k] || k);
}

export const compareKeywords = (resumeText, jdText) => {
  const resumeKeywords = new Set(
    normalizeKeywords(extractKeywords(resumeText))
  );

  const jdKeywords = new Set(
    normalizeKeywords(extractKeywords(jdText))
  );

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