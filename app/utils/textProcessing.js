export const cleanText = (text) => {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .toLowerCase()
    // Preserve +, #, and other tech symbols, replace others with space
    .replace(/[^a-z0-9+#\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const tokenize = (text) => {
  const cleaned = cleanText(text);
  return cleaned ? cleaned.split(" ").filter(Boolean) : [];
}

export const normalizeToken = (word) => {
  // if (!word || word.length <= 2) return word;
  
  // Skip if in NO_SINGULARIZE set
  if (NO_SINGULARIZE.has(word)) {
    return word;
  }

  // Check exact mapping first (most reliable and comprehensive)
  if (PLURAL_TO_SINGULAR.has(word)) {
    return PLURAL_TO_SINGULAR.get(word);
  }

  // Fallback rule: -ies → -y (for words not in mapping)
  if (word.endsWith("ies") && word.length > 4) {
    return word.slice(0, -3) + "y";
  }

  // Fallback rule: simple -s removal (for words not in mapping)
  if (word.endsWith("s") && !word.endsWith("ss") && word.length > 3) {
    return word.slice(0, -1);
  }

  return word;
}

export const removeStopwords = (tokens) => {
  return tokens
    .map(normalizeToken)
    .filter(word => word.length > 1 && !STOPWORDS.has(word));
}

export const countFrequency = (items) => {
  return items.reduce((freq, item) => {
    freq[item] = (freq[item] || 0) + 1;
    return freq;
  }, {});
}

export const generateBigrams = (tokens) => {
  const bigrams = [];
  const minLength = 2; // configurable threshold

  for (let i = 0; i < tokens.length - 1; i++) {
    const w1 = tokens[i];
    const w2 = tokens[i + 1];

    if (w1.length > minLength && w2.length > minLength) {
      bigrams.push(`${w1} ${w2}`);
    }
  }

  return bigrams;
}

// NEW: Generate trigrams for phrases like "machine learning engineer"
export const generateTrigrams = (tokens) => {
  const trigrams = [];
  const minLength = 2;

  for (let i = 0; i < tokens.length - 2; i++) {
    const w1 = tokens[i];
    const w2 = tokens[i + 1];
    const w3 = tokens[i + 2];

    if (w1.length > minLength && w2.length > minLength && w3.length > minLength) {
      trigrams.push(`${w1} ${w2} ${w3}`);
    }
  }

  return trigrams;
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