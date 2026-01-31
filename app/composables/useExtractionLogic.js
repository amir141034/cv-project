import { STOPWORDS, SYNONYMS, KNOWN_PHRASES } from '@/utils/keywordData';

export const useExtractionLogic = () => {

const cleanText = (text) => {
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

const normalizeKeyword = (keyword) => {
  return SYNONYMS[keyword] || keyword;
}

const normalizeKeywords = (keywords) => {
  return keywords.map(k => normalizeKeyword(k));
}

// function escapeHtml(text) {
//   return text
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;");
// }

// function highlightMissingKeywords(jdText, missingKeywords) {
//   let highlightedText = escapeHtml(jdText);

//   missingKeywords.forEach(keyword => {
//     const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

//     const regex = new RegExp(`\\b${escapedKeyword}\\b`, "gi");

//     highlightedText = highlightedText.replace(
//       regex,
//       `<mark class="bg-yellow-200 px-1 rounded">$&</mark>`
//     );
//   });

//   return highlightedText;
// }

const extractKeywords = (text) => {
  const tokens = tokenize(text);

  const unigramsFreq = countFrequency(tokens);
  const bigrams = generateBigrams(tokens);
  const bigramsFreq = countFrequency(bigrams);

  const keywords = new Set();

  // Unigrams: keep words that appear >= 2 times
  Object.entries(unigramsFreq).forEach(([word, count]) => {
    if (count >= 2) {
      keywords.add(word);
    }
  });

  // Bigrams: keep frequent OR known phrases
  Object.entries(bigramsFreq).forEach(([phrase, count]) => {
    if (count >= 2 || KNOWN_PHRASES.has(phrase)) {
      keywords.add(phrase);
    }
  });

  console.log("Detected phrases:", Object.keys(bigramsFreq));

  return Array.from(keywords);
}

const compareKeywords = (resumeText, jdText) => {
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

  return {
    compareKeywords,
  };
}