export const usePhrases = () => {

const STOPWORDS = new Set([
  // Articles
  "the", "a", "an",
  
  // Conjunctions
  "and", "or", "but", "nor", "yet", "so",
  
  // Prepositions
  "in", "on", "at", "to", "for", "of", "with", "from", "by", "about",
  "as", "into", "through", "during", "before", "after", "above", "below",
  "between", "under", "over", "among", "within", "without", "via",
  
  // Pronouns
  "i", "you", "he", "she", "it", "we", "they", "them", "their", "my",
  "your", "his", "her", "its", "our", "who", "which", "what", "that",
  
  // Common verbs
  "is", "are", "was", "were", "be", "been", "being", "have", "has", "had",
  "do", "does", "did", "will", "would", "could", "should", "may", "might",
  "must", "can",
  
  // Other common words
  "this", "that", "these", "those", "all", "each", "every", "some", "any",
  "such", "other", "than", "then", "there", "here", "when", "where", "why",
  "how", "not", "no", "yes", "also", "very", "just", "more", "most", "much",
  "many", "few", "less", "least", "both", "either", "neither"
]);

const KNOWN_PHRASES = new Set([
  // Technical Skills - Programming
  "machine learning",
  "deep learning",
  "artificial intelligence",
  "natural language processing",
  "computer vision",
  "neural networks",
  "data science",
  "data analysis",
  "data engineering",
  "software engineering",
  "software development",
  "full stack development",
  "front end development",
  "back end development",
  "mobile development",
  "web development",
  "api development",
  "database management",
  "version control",
  "agile development",
  "test driven development",
  "continuous integration",
  "continuous deployment",
  
  // Cloud & Infrastructure
  "cloud computing",
  "cloud architecture",
  "aws solutions",
  "azure services",
  "google cloud platform",
  "docker containers",
  "kubernetes orchestration",
  "microservices architecture",
  "serverless computing",
  "infrastructure as code",
  "devops practices",
  "ci cd pipeline",
  
  // Data & Analytics
  "big data",
  "data visualization",
  "business intelligence",
  "statistical analysis",
  "predictive modeling",
  "data mining",
  "etl processes",
  "data warehousing",
  "sql queries",
  "nosql databases",
  "data modeling",
  "ab testing",
  
  // Management & Business
  "project management",
  "product management",
  "team leadership",
  "agile methodologies",
  "scrum master",
  "stakeholder management",
  "business analysis",
  "requirements gathering",
  "risk management",
  "change management",
  "strategic planning",
  "cross functional teams",
  "process improvement",
  "budget management",
  
  // Security & Compliance
  "information security",
  "cybersecurity",
  "network security",
  "data privacy",
  "risk assessment",
  "compliance management",
  "security protocols",
  "penetration testing",
  "vulnerability assessment",
  
  // Soft Skills (important for resumes)
  "problem solving",
  "critical thinking",
  "analytical skills",
  "communication skills",
  "time management",
  "attention to detail",
  "customer service",
  "technical writing",
  "public speaking",
  "conflict resolution",
  
  // Industry-specific
  "user experience",
  "user interface",
  "responsive design",
  "quality assurance",
  "system design",
  "technical support",
  "sales engineering",
  "digital marketing",
  "content management",
  "social media"
]);

  return {
    STOPWORDS,
    KNOWN_PHRASES
  }
}