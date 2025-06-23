export interface Level {
  id: number
  name: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced" | "expert"
  requiredWPM: number
  requiredAccuracy: number
  content: string
  tips: string[]
}

export const LEVELS: Level[] = [
  // Beginner Levels (1-10)
  {
    id: 1,
    name: "Home Row Basics",
    description: "Learn the foundation keys: ASDF JKL;",
    difficulty: "beginner",
    requiredWPM: 15,
    requiredAccuracy: 85,
    content: "asdf jkl; asdf jkl; fdsa ;lkj fdsa ;lkj aaa sss ddd fff jjj kkk lll ;;; asdf jkl;",
    tips: ["Keep your fingers on the home row", "Use proper finger placement", "Don't look at the keyboard"],
  },
  {
    id: 2,
    name: "Home Row Words",
    description: "Form simple words using home row keys",
    difficulty: "beginner",
    requiredWPM: 18,
    requiredAccuracy: 87,
    content: "ask dad sad lad fall all ask dad sad lad fall all flask flask flask ask dad sad lad",
    tips: ["Focus on accuracy over speed", "Keep your wrists straight", "Use all fingers, not just index fingers"],
  },
  {
    id: 3,
    name: "Top Row Introduction",
    description: "Add Q W E R T Y U I O P to your skills",
    difficulty: "beginner",
    requiredWPM: 20,
    requiredAccuracy: 85,
    content: "qwer tyui op qwer tyui op quit quit quit port port port wipe wipe wipe type type type",
    tips: ["Reach up from home row", "Return fingers to home position", "Practice the reach motion"],
  },
  {
    id: 4,
    name: "Top Row Words",
    description: "Create words combining home and top rows",
    difficulty: "beginner",
    requiredWPM: 22,
    requiredAccuracy: 87,
    content: "quit port wipe type rope tire pure quote quite write power tower water paper",
    tips: ["Combine movements smoothly", "Maintain rhythm", "Don't rush the difficult reaches"],
  },
  {
    id: 5,
    name: "Bottom Row Basics",
    description: "Master Z X C V B N M keys",
    difficulty: "beginner",
    requiredWPM: 20,
    requiredAccuracy: 85,
    content: "zxcv bnm zxcv bnm zxcv bnm maze maze maze cave cave cave venom venom venom",
    tips: ["Reach down from home row", "Use proper finger assignments", "Keep other fingers on home row"],
  },
  {
    id: 6,
    name: "Bottom Row Words",
    description: "Form words using all three rows",
    difficulty: "beginner",
    requiredWPM: 25,
    requiredAccuracy: 87,
    content: "maze cave venom zebra boxer maven civic maxim zinc bronze carbon",
    tips: ["Coordinate all three rows", "Maintain steady rhythm", "Focus on finger independence"],
  },
  {
    id: 7,
    name: "Capital Letters",
    description: "Learn to use shift keys properly",
    difficulty: "beginner",
    requiredWPM: 23,
    requiredAccuracy: 85,
    content: "The Quick Brown Fox Jumps Over The Lazy Dog. The Quick Brown Fox Jumps Over The Lazy Dog.",
    tips: ["Use opposite shift key", "Don't lift other fingers", "Practice shift combinations"],
  },
  {
    id: 8,
    name: "Common Words",
    description: "Practice frequently used English words",
    difficulty: "beginner",
    requiredWPM: 27,
    requiredAccuracy: 88,
    content:
      "the and for are but not you all can had her was one our out day get has him his how its may new now old see two who boy did man men get",
    tips: ["Build muscle memory for common words", "Focus on word patterns", "Increase typing rhythm"],
  },
  {
    id: 9,
    name: "Short Sentences",
    description: "Type complete sentences with proper spacing",
    difficulty: "beginner",
    requiredWPM: 25,
    requiredAccuracy: 88,
    content:
      "The cat sat on the mat. Dogs run fast in the park. Birds fly high in the blue sky. Fish swim deep in the ocean.",
    tips: ["Use thumb for space bar", "Maintain consistent spacing", "Practice sentence flow"],
  },
  {
    id: 10,
    name: "Beginner Assessment",
    description: "Test your basic typing skills",
    difficulty: "beginner",
    requiredWPM: 30,
    requiredAccuracy: 90,
    content:
      "Learning to type is an important skill in today's digital world. With practice and patience, anyone can master the keyboard and type efficiently without looking at the keys.",
    tips: ["Combine all learned skills", "Focus on consistency", "Prepare for intermediate levels"],
  },

  // Intermediate Levels (11-25)
  {
    id: 11,
    name: "Number Row Basics",
    description: "Learn to type numbers 1-0",
    difficulty: "intermediate",
    requiredWPM: 28,
    requiredAccuracy: 88,
    content: "1234567890 1234567890 123 456 789 012 345 678 901 234 567 890 123 456 789",
    tips: ["Use proper finger for each number", "Don't look at number row", "Practice number combinations"],
  },
  {
    id: 12,
    name: "Numbers and Letters",
    description: "Mix numbers with letters in typing",
    difficulty: "intermediate",
    requiredWPM: 30,
    requiredAccuracy: 88,
    content: "room 123 page 456 line 789 code 012 year 2024 age 25 phone 555 address 123 main street",
    tips: [
      "Smooth transitions between numbers and letters",
      "Maintain typing rhythm",
      "Practice common number-letter patterns",
    ],
  },
  {
    id: 13,
    name: "Basic Punctuation",
    description: "Add periods, commas, and question marks",
    difficulty: "intermediate",
    requiredWPM: 28,
    requiredAccuracy: 87,
    content:
      "Hello, how are you? I am fine, thank you. What time is it? It is 3:30 PM. Are you ready? Yes, I am ready.",
    tips: ["Use proper finger for punctuation", "Don't pause before punctuation", "Practice punctuation patterns"],
  },
  {
    id: 14,
    name: "Apostrophes and Quotes",
    description: "Master contractions and quotations",
    difficulty: "intermediate",
    requiredWPM: 30,
    requiredAccuracy: 87,
    content:
      "I can't believe it's already time to go. She said, \"I'll be there soon.\" Don't worry, we won't be late.",
    tips: ["Practice apostrophe placement", "Use proper quote finger", "Master contraction typing"],
  },
  {
    id: 15,
    name: "Longer Paragraphs",
    description: "Type extended text passages",
    difficulty: "intermediate",
    requiredWPM: 32,
    requiredAccuracy: 88,
    content:
      "Technology has revolutionized the way we communicate and work. From smartphones to laptops, digital devices have become essential tools in our daily lives. The ability to type quickly and accurately is now more important than ever before.",
    tips: ["Maintain consistency over longer text", "Focus on endurance", "Keep steady rhythm throughout"],
  },
  {
    id: 16,
    name: "Mixed Case Text",
    description: "Handle varied capitalization patterns",
    difficulty: "intermediate",
    requiredWPM: 30,
    requiredAccuracy: 87,
    content:
      "JavaScript HTML CSS Python Java C++ SQL PHP Ruby Swift Kotlin React Angular Vue Node Express MongoDB MySQL",
    tips: ["Quick shift key usage", "Maintain speed with capitals", "Practice programming terms"],
  },
  {
    id: 17,
    name: "Email Addresses",
    description: "Type common email and web formats",
    difficulty: "intermediate",
    requiredWPM: 28,
    requiredAccuracy: 87,
    content: "john.doe@email.com mary_smith@company.org info@website.net support@service.com admin@domain.co.uk",
    tips: ["Practice @ symbol placement", "Master dot and underscore", "Build email typing rhythm"],
  },
  {
    id: 18,
    name: "Web Addresses",
    description: "Type URLs and web addresses",
    difficulty: "intermediate",
    requiredWPM: 30,
    requiredAccuracy: 87,
    content: "https://www.example.com http://subdomain.site.org www.company.net/about https://blog.website.com/posts",
    tips: ["Practice forward slash", "Master colon placement", "Build URL typing patterns"],
  },
  {
    id: 19,
    name: "Business Writing",
    description: "Professional communication text",
    difficulty: "intermediate",
    requiredWPM: 33,
    requiredAccuracy: 89,
    content:
      "Dear Mr. Johnson, Thank you for your inquiry regarding our services. We would be pleased to schedule a meeting at your convenience. Please let us know your availability. Best regards, Sarah Wilson",
    tips: ["Professional writing rhythm", "Proper business formatting", "Maintain formal tone speed"],
  },
  {
    id: 20,
    name: "Technical Terms",
    description: "IT and technical vocabulary",
    difficulty: "intermediate",
    requiredWPM: 31,
    requiredAccuracy: 87,
    content:
      "database server network protocol algorithm encryption authentication authorization firewall bandwidth latency throughput",
    tips: ["Technical term accuracy", "Build tech vocabulary speed", "Practice complex terms"],
  },
  {
    id: 21,
    name: "Data Entry Practice",
    description: "Numbers, codes, and structured data",
    difficulty: "intermediate",
    requiredWPM: 32,
    requiredAccuracy: 90,
    content: "ID: 12345 Name: John Smith Phone: 555-0123 Email: john@email.com Address: 123 Main St, City, ST 12345",
    tips: ["Accurate data entry", "Consistent formatting", "Error-free number typing"],
  },
  {
    id: 22,
    name: "Scientific Text",
    description: "Scientific and academic writing",
    difficulty: "intermediate",
    requiredWPM: 30,
    requiredAccuracy: 88,
    content:
      "The hypothesis was tested through controlled experiments. Results indicated a significant correlation between variables. Further research is needed to validate these findings.",
    tips: ["Academic vocabulary", "Scientific term accuracy", "Formal writing speed"],
  },
  {
    id: 23,
    name: "Creative Writing",
    description: "Descriptive and narrative text",
    difficulty: "intermediate",
    requiredWPM: 33,
    requiredAccuracy: 88,
    content:
      "The golden sunset painted the sky in brilliant hues of orange and pink. Gentle waves lapped against the shore as seagulls danced overhead in the warm evening breeze.",
    tips: ["Descriptive language flow", "Creative expression speed", "Narrative rhythm"],
  },
  {
    id: 24,
    name: "News Article Style",
    description: "Journalistic writing patterns",
    difficulty: "intermediate",
    requiredWPM: 34,
    requiredAccuracy: 89,
    content:
      "Local authorities reported that the new community center will open next month. The facility will include a gymnasium, library, and meeting rooms for public use.",
    tips: ["News writing pace", "Factual information speed", "Journalistic style"],
  },
  {
    id: 25,
    name: "Intermediate Assessment",
    description: "Comprehensive intermediate skills test",
    difficulty: "intermediate",
    requiredWPM: 35,
    requiredAccuracy: 90,
    content:
      "Congratulations on reaching the intermediate level! You've developed solid typing fundamentals and can now handle various text types. The advanced levels will challenge you with complex formatting, special characters, and higher speed requirements. Keep practicing to maintain your progress.",
    tips: ["Demonstrate all intermediate skills", "Prepare for advanced challenges", "Maintain consistent performance"],
  },

  // Advanced Levels (26-40)
  {
    id: 26,
    name: "Special Characters",
    description: "Master symbols and special characters",
    difficulty: "advanced",
    requiredWPM: 33,
    requiredAccuracy: 87,
    content: "!@#$%^&*()_+-=[]{}|;':\",./<>? !@#$%^&*()_+-=[]{}|;':\",./<>? special characters practice",
    tips: ["Learn symbol finger assignments", "Practice shift combinations", "Build symbol muscle memory"],
  },
  {
    id: 27,
    name: "Programming Code",
    description: "Type programming syntax and code",
    difficulty: "advanced",
    requiredWPM: 30,
    requiredAccuracy: 90,
    content:
      "function calculateTotal(price, tax) { return price * (1 + tax); } const result = calculateTotal(100, 0.08);",
    tips: ["Code syntax accuracy", "Programming punctuation", "Bracket and brace placement"],
  },
  {
    id: 28,
    name: "Mathematical Expressions",
    description: "Type mathematical formulas and equations",
    difficulty: "advanced",
    requiredWPM: 28,
    requiredAccuracy: 92,
    content: "y = mx + b; a² + b² = c²; f(x) = 2x³ - 5x² + 3x - 7; ∫(2x + 1)dx = x² + x + C",
    tips: ["Mathematical symbol accuracy", "Formula structure", "Scientific notation"],
  },
  {
    id: 29,
    name: "Foreign Phrases",
    description: "Common foreign words and phrases",
    difficulty: "advanced",
    requiredWPM: 32,
    requiredAccuracy: 88,
    content: "café résumé naïve fiancé piñata jalapeño über schadenfreude karaoke tsunami sushi anime manga",
    tips: ["International character handling", "Accent mark awareness", "Foreign word patterns"],
  },
  {
    id: 30,
    name: "Legal Text",
    description: "Legal document and contract language",
    difficulty: "advanced",
    requiredWPM: 31,
    requiredAccuracy: 92,
    content:
      "Whereas the parties agree to the terms herein, notwithstanding any prior agreements, the undersigned hereby acknowledges receipt of said documents.",
    tips: ["Legal terminology accuracy", "Formal document speed", "Complex sentence structure"],
  },
  {
    id: 31,
    name: "Medical Terminology",
    description: "Healthcare and medical vocabulary",
    difficulty: "advanced",
    requiredWPM: 29,
    requiredAccuracy: 93,
    content:
      "diagnosis prognosis prescription medication dosage symptoms treatment therapy rehabilitation cardiovascular respiratory",
    tips: ["Medical term precision", "Healthcare vocabulary", "Complex medical words"],
  },
  {
    id: 32,
    name: "Financial Reports",
    description: "Financial and accounting text",
    difficulty: "advanced",
    requiredWPM: 33,
    requiredAccuracy: 91,
    content:
      "Q3 revenue increased 15.7% year-over-year to $2.4 million. Operating expenses decreased 8.2% while net profit margin improved to 12.3%.",
    tips: ["Financial data accuracy", "Percentage and decimal precision", "Business metrics speed"],
  },
  {
    id: 33,
    name: "Academic Citations",
    description: "Bibliography and citation formats",
    difficulty: "advanced",
    requiredWPM: 30,
    requiredAccuracy: 93,
    content:
      "Smith, J. (2023). Advanced Typing Techniques. Journal of Digital Literacy, 15(3), 45-62. doi:10.1234/jdl.2023.15.3.45",
    tips: ["Citation format accuracy", "Academic punctuation", "Reference precision"],
  },
  {
    id: 34,
    name: "Poetry and Literature",
    description: "Literary text with varied formatting",
    difficulty: "advanced",
    requiredWPM: 34,
    requiredAccuracy: 89,
    content:
      "Two roads diverged in a yellow wood, / And sorry I could not travel both / And be one traveler, long I stood / And looked down one as far as I could",
    tips: ["Literary rhythm", "Poetic line breaks", "Artistic expression speed"],
  },
  {
    id: 35,
    name: "Technical Documentation",
    description: "Software documentation and manuals",
    difficulty: "advanced",
    requiredWPM: 32,
    requiredAccuracy: 91,
    content:
      "To configure the API endpoint, navigate to Settings > Advanced > API Configuration. Enter your authentication token and set the timeout value to 30 seconds.",
    tips: ["Technical instruction clarity", "Step-by-step accuracy", "Documentation speed"],
  },
  {
    id: 36,
    name: "Multilingual Text",
    description: "Mixed language content",
    difficulty: "advanced",
    requiredWPM: 30,
    requiredAccuracy: 88,
    content: "Hello, bonjour, hola, guten tag, konnichiwa, namaste, shalom, salaam alaikum, ciao, aloha, zdravstvuyte",
    tips: ["Language switching", "International greetings", "Cultural vocabulary"],
  },
  {
    id: 37,
    name: "Complex Punctuation",
    description: "Advanced punctuation and formatting",
    difficulty: "advanced",
    requiredWPM: 31,
    requiredAccuracy: 90,
    content:
      "The CEO announced—after much deliberation—that the merger would proceed; however, several conditions must be met (see Appendix A).",
    tips: ["Advanced punctuation marks", "Complex sentence structure", "Professional formatting"],
  },
  {
    id: 38,
    name: "Speed Challenge",
    description: "High-speed typing test",
    difficulty: "advanced",
    requiredWPM: 40,
    requiredAccuracy: 88,
    content:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
    tips: ["Maximum speed focus", "Maintain accuracy at speed", "Rhythm and flow"],
  },
  {
    id: 39,
    name: "Error Correction",
    description: "Typing with deliberate error correction",
    difficulty: "advanced",
    requiredWPM: 33,
    requiredAccuracy: 95,
    content:
      "Accuracy is more important than speed when learning to type. Focus on getting every character correct before increasing your typing pace.",
    tips: ["Perfect accuracy focus", "Error prevention", "Quality over speed"],
  },
  {
    id: 40,
    name: "Advanced Assessment",
    description: "Comprehensive advanced skills evaluation",
    difficulty: "advanced",
    requiredWPM: 38,
    requiredAccuracy: 92,
    content:
      "You have successfully completed the advanced typing levels! Your skills now include complex punctuation, special characters, and various text types. The expert levels will push your abilities to professional standards with specialized content and higher performance requirements.",
    tips: ["Demonstrate mastery", "Prepare for expert level", "Professional typing standards"],
  },

  // Expert Levels (41-50)
  {
    id: 41,
    name: "Professional Transcription",
    description: "Transcribe complex professional content",
    difficulty: "expert",
    requiredWPM: 40,
    requiredAccuracy: 95,
    content:
      "The quarterly board meeting will convene at 9:00 AM EST on March 15th, 2024. Agenda items include: budget review, strategic planning, personnel updates, and Q1 projections.",
    tips: ["Professional transcription speed", "Meeting note accuracy", "Business communication"],
  },
  {
    id: 42,
    name: "Live Captioning",
    description: "Real-time captioning simulation",
    difficulty: "expert",
    requiredWPM: 45,
    requiredAccuracy: 93,
    content:
      "Ladies and gentlemen, welcome to today's presentation. We'll be discussing the latest developments in artificial intelligence and machine learning technologies.",
    tips: ["Real-time typing speed", "Live event accuracy", "Continuous flow"],
  },
  {
    id: 43,
    name: "Court Reporting",
    description: "Legal proceeding transcription",
    difficulty: "expert",
    requiredWPM: 42,
    requiredAccuracy: 97,
    content:
      "The witness testified under oath that on the evening of January 10th, approximately 8:30 PM, they observed the defendant leaving the premises through the rear exit.",
    tips: ["Legal accuracy standards", "Testimony precision", "Court reporting speed"],
  },
  {
    id: 44,
    name: "Medical Dictation",
    description: "Medical report transcription",
    difficulty: "expert",
    requiredWPM: 38,
    requiredAccuracy: 98,
    content:
      "Patient presents with acute myocardial infarction. Administered nitroglycerin sublingual. Vital signs: BP 140/90, HR 110, RR 22, O2 sat 95% on room air.",
    tips: ["Medical terminology precision", "Healthcare accuracy", "Clinical documentation"],
  },
  {
    id: 45,
    name: "Simultaneous Translation",
    description: "Multi-language typing exercise",
    difficulty: "expert",
    requiredWPM: 35,
    requiredAccuracy: 94,
    content:
      "English: Good morning. French: Bonjour. Spanish: Buenos días. German: Guten Morgen. Italian: Buongiorno. Portuguese: Bom dia.",
    tips: ["Language switching speed", "International communication", "Cultural accuracy"],
  },
  {
    id: 46,
    name: "Data Processing",
    description: "High-volume data entry",
    difficulty: "expert",
    requiredWPM: 43,
    requiredAccuracy: 99,
    content: "ID001: John Smith, DOB: 01/15/1985, SSN: 123-45-6789, Phone: (555) 123-4567, Email: john.smith@email.com",
    tips: ["Data entry perfection", "Zero-error tolerance", "High-speed accuracy"],
  },
  {
    id: 47,
    name: "Programming Marathon",
    description: "Extended coding session",
    difficulty: "expert",
    requiredWPM: 40,
    requiredAccuracy: 96,
    content:
      "class TypingTrainer { constructor(level) { this.level = level; this.wpm = 0; this.accuracy = 0; } calculateScore() { return this.wpm * (this.accuracy / 100); } }",
    tips: ["Code accuracy perfection", "Programming efficiency", "Syntax precision"],
  },
  {
    id: 48,
    name: "Executive Summary",
    description: "High-level business communication",
    difficulty: "expert",
    requiredWPM: 44,
    requiredAccuracy: 94,
    content:
      "Executive Summary: Our comprehensive analysis indicates a 23% increase in market share, driven by strategic partnerships and innovative product development. ROI exceeded projections by 15%.",
    tips: ["Executive communication speed", "Business summary accuracy", "Professional presentation"],
  },
  {
    id: 49,
    name: "Crisis Communication",
    description: "Urgent communication typing",
    difficulty: "expert",
    requiredWPM: 47,
    requiredAccuracy: 92,
    content:
      "URGENT: System maintenance scheduled for tonight 11 PM - 3 AM EST. All users will be logged out automatically. Please save your work and plan accordingly. Contact IT for questions.",
    tips: ["Urgent communication speed", "Crisis response accuracy", "Time-critical typing"],
  },
  {
    id: 50,
    name: "Master Certification",
    description: "Final mastery assessment",
    difficulty: "expert",
    requiredWPM: 50,
    requiredAccuracy: 95,
    content:
      "Congratulations! You have achieved typing mastery. Your dedication and practice have developed professional-level skills. You can now type efficiently in any professional environment, handle complex documents, and maintain accuracy under pressure. Welcome to the elite group of expert typists!",
    tips: ["Demonstrate complete mastery", "Professional typing excellence", "Expert-level performance"],
  },
]

export function getLevel(id: number): Level | undefined {
  return LEVELS.find((level) => level.id === id)
}

export function getLevelsByDifficulty(difficulty: Level["difficulty"]): Level[] {
  return LEVELS.filter((level) => level.difficulty === difficulty)
}

export function getNextLevel(currentId: number): Level | undefined {
  return LEVELS.find((level) => level.id === currentId + 1)
}

export function isLevelUnlocked(levelId: number, completedLevels: number[]): boolean {
  if (levelId === 1) return true
  return completedLevels.includes(levelId - 1)
}
