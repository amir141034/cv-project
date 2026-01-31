import { STOPWORDS } from "./keywordData";

export const cleanText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const tokenize = (text) => {
  return cleanText(text).split(" ");
}

export const normalizeToken = (word) => {
  // libraries → library
  if (word.endsWith("ies") && word.length > 4) {
    return word.slice(0, -3) + "y";
  }

  // databases → database
  if (word.endsWith("es") && word.length > 3) {
    return word.slice(0, -2);
  }

  // models → model
  if (word.endsWith("s") && word.length > 3) {
    return word.slice(0, -1);
  }

  return word;
}

export const removeStopwords = (tokens) => {
  return tokens
    .map(normalizeToken)
    .filter(word => word.length > 2 && !STOPWORDS.has(word));
}

export const countFrequency = (items) => {
  const freq = {};
  items.forEach(item => {
    freq[item] = (freq[item] || 0) + 1;
  });
  return freq;
}

export const generateBigrams = (tokens) => {
  const bigrams = [];

  for (let i = 0; i < tokens.length - 1; i++) {
    const w1 = tokens[i];
    const w2 = tokens[i + 1];

    if (w1.length > 2 && w2.length > 2) {
      bigrams.push(`${w1} ${w2}`);
    }
  }

  return bigrams;
}

export const escapeHtml = (text) => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export const highlightMissingKeywords = (jdText, missingKeywords) => {
  let highlightedText = escapeHtml(jdText);

  missingKeywords.forEach(keyword => {
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(`\\b${escapedKeyword}\\b`, "gi");

    highlightedText = highlightedText.replace(
      regex,
      `<mark class="bg-yellow-200 px-1 rounded">$&</mark>`
    );
  });

  return highlightedText;
}