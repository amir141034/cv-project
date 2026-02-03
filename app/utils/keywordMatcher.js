export const extractKeywords = (text, options = {}) => {
  const {
    unigramThreshold = 1, 
    bigramThreshold = 1,  
    trigramThreshold = 1,
    includeTrigrams = true
  } = options;

  const tokens = removeStopwords(tokenize(text));
  
  if (tokens.length === 0) {
    console.warn('No tokens after stopword removal');
    return [];
  }

  const unigramFreq = countFrequency(tokens);
  const bigrams = generateBigrams(tokens);
  const bigramFreq = countFrequency(bigrams);
  
  const keywords = new Set();

  // Known Phrases Bigram
  bigrams.forEach(phrase => {
    if (KNOWN_PHRASES.has(phrase)) {
      console.log('Adding known phrase:', phrase);
      keywords.add(phrase);
    }
  });

  // Trigrams first (longest phrases have priority)
  if (includeTrigrams) {
    const trigrams = generateTrigrams(tokens);
    const trigramFreq = countFrequency(trigrams);
    
    Object.entries(trigramFreq).forEach(([phrase, count]) => {
      if (count >= trigramThreshold || KNOWN_PHRASES.has(phrase)) {
        keywords.add(phrase);
      }
    });
  }

  // Bigrams
  bigrams.forEach(phrase => {
    if ((bigramFreq[phrase] >= bigramThreshold)) {
      keywords.add(phrase);
    }
  });

  // Unigrams (only if not part of a phrase)
  Object.entries(unigramFreq).forEach(([word, count]) => {
    if (count >= unigramThreshold) {
      const isInPhrase = Array.from(keywords).some(phrase => 
        phrase.split(' ').includes(word) && phrase !== word
      );
      
      if (!isInPhrase) {
        keywords.add(word);
      }
    }
  });

  return Array.from(keywords);
}

export const normalizeKeywords = (keywords) => {
  return keywords.map(k => {
    // Normalize the entire phrase first
    const normalized = SYNONYMS[k] || k;
    
    // Also check if individual words in phrases have synonyms
    if (normalized.includes(' ')) {
      const words = normalized.split(' ');
      const normalizedWords = words.map(word => SYNONYMS[word] || word);
      return normalizedWords.join(' ');
    }
    
    return normalized;
  });
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


// FUTURE ENHANCEMENTS:
// export const compareKeywords = (resumeText, jdText) => {
//   if (!resumeText || !jdText) {
//     return { 
//       score: 0, 
//       matched: [], 
//       missing: [],
//       weightedScore: 0,
//       stats: {
//         totalJdKeywords: 0,
//         totalResumeKeywords: 0,
//         matchedCount: 0,
//         missingCount: 0,
//         totalWeight: 0,
//         matchedWeight: 0
//       }
//     };
//   }

//   const resumeKeywords = new Set(
//     normalizeKeywords(extractKeywords(resumeText))
//   );

//   const jdKeywords = normalizeKeywords(extractKeywords(jdText));
//   const jdKeywordsSet = new Set(jdKeywords);

//   const matched = [];
//   const missing = [];
  
//   let matchedWeight = 0;
//   let totalWeight = 0;

//   // Calculate weighted score
//   jdKeywords.forEach(keyword => {
//     const weight = getKeywordWeight(keyword);
//     totalWeight += weight;

//     if (resumeKeywords.has(keyword)) {
//       if (!matched.includes(keyword)) {
//         matched.push(keyword);
//         matchedWeight += weight;
//       }
//     } else {
//       if (!missing.includes(keyword)) {
//         missing.push(keyword);
//       }
//     }
//   });

//   // Weighted score (more accurate)
//   const weightedScore = totalWeight === 0
//     ? 0
//     : Math.round((matchedWeight / totalWeight) * 100);

//   // Simple percentage score (for comparison)
//   const simpleScore = jdKeywordsSet.size === 0
//     ? 0
//     : Math.round((matched.length / jdKeywordsSet.size) * 100);

//   return { 
//     score: weightedScore, // Use weighted score as primary
//     simpleScore, // Keep simple score for reference
//     matched: matched.sort(), 
//     missing: missing.sort(),
//     stats: {
//       totalJdKeywords: jdKeywordsSet.size,
//       totalResumeKeywords: resumeKeywords.size,
//       matchedCount: matched.length,
//       missingCount: missing.length,
//       totalWeight,
//       matchedWeight,
//       weightedScore,
//       simpleScore
//     }
//   };
// }

// export const getKeywordWeight = (keyword) => {
//   if (SKILL_CATEGORIES.technical.has(keyword)) return 3;
//   if (SKILL_CATEGORIES.tools.has(keyword)) return 2;
//   if (SKILL_CATEGORIES.soft.has(keyword)) return 1;
//   return 1.5; // Default weight for unknown keywords (medium importance)
// }

// // NEW: Fuzzy matching for similar keywords
// export const fuzzyMatch = (word1, word2, threshold = 0.8) => {
//   const longer = word1.length > word2.length ? word1 : word2;
//   const shorter = word1.length > word2.length ? word2 : word1;
  
//   if (longer.length === 0) return 1.0;
  
//   const editDistance = levenshteinDistance(longer, shorter);
//   return (longer.length - editDistance) / longer.length >= threshold;
// }

// // Helper: Levenshtein distance for fuzzy matching
// const levenshteinDistance = (str1, str2) => {
//   const matrix = [];

//   for (let i = 0; i <= str2.length; i++) {
//     matrix[i] = [i];
//   }

//   for (let j = 0; j <= str1.length; j++) {
//     matrix[0][j] = j;
//   }

//   for (let i = 1; i <= str2.length; i++) {
//     for (let j = 1; j <= str1.length; j++) {
//       if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
//         matrix[i][j] = matrix[i - 1][j - 1];
//       } else {
//         matrix[i][j] = Math.min(
//           matrix[i - 1][j - 1] + 1,
//           matrix[i][j - 1] + 1,
//           matrix[i - 1][j] + 1
//         );
//       }
//     }
//   }

//   return matrix[str2.length][str1.length];
// }

// // NEW: Get breakdown by category
// export const getKeywordBreakdown = (keywords) => {
//   const breakdown = {
//     technical: [],
//     tools: [],
//     soft: [],
//     other: []
//   };

//   keywords.forEach(keyword => {
//     if (SKILL_CATEGORIES.technical.has(keyword)) {
//       breakdown.technical.push(keyword);
//     } else if (SKILL_CATEGORIES.tools.has(keyword)) {
//       breakdown.tools.push(keyword);
//     } else if (SKILL_CATEGORIES.soft.has(keyword)) {
//       breakdown.soft.push(keyword);
//     } else {
//       breakdown.other.push(keyword);
//     }
//   });

//   return breakdown;
// }

// // NEW: Enhanced comparison with category breakdown
// export const compareKeywordsDetailed = (resumeText, jdText) => {
//   const result = compareKeywords(resumeText, jdText);
  
//   const matchedBreakdown = getKeywordBreakdown(result.matched);
//   const missingBreakdown = getKeywordBreakdown(result.missing);

//   return {
//     ...result,
//     matchedBreakdown,
//     missingBreakdown,
//     recommendations: generateRecommendations(missingBreakdown)
//   };
// }

// // NEW: Generate recommendations based on missing skills
// const generateRecommendations = (missingBreakdown) => {
//   const recommendations = [];

//   if (missingBreakdown.technical.length > 0) {
//     recommendations.push({
//       priority: 'high',
//       category: 'Technical Skills',
//       message: `Add these critical technical skills: ${missingBreakdown.technical.slice(0, 3).join(', ')}`,
//       keywords: missingBreakdown.technical
//     });
//   }

//   if (missingBreakdown.tools.length > 0) {
//     recommendations.push({
//       priority: 'medium',
//       category: 'Tools & Technologies',
//       message: `Include experience with: ${missingBreakdown.tools.slice(0, 3).join(', ')}`,
//       keywords: missingBreakdown.tools
//     });
//   }

//   if (missingBreakdown.soft.length > 0) {
//     recommendations.push({
//       priority: 'low',
//       category: 'Soft Skills',
//       message: `Consider highlighting: ${missingBreakdown.soft.slice(0, 3).join(', ')}`,
//       keywords: missingBreakdown.soft
//     });
//   }

//   return recommendations;
// }