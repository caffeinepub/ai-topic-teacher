export interface Passage {
  id: string;
  grade: number;
  title: string;
  text: string;
  chunks: string[];
  questions: Question[];
  missingWords: MissingWordExercise;
  pronunciationWords: PronunciationWord[];
  intonationSentences: IntonationSentence[];
  recordPassage: string;
}

export interface Question {
  question: string;
  options: string[];
  correct: number;
}

export interface MissingWordExercise {
  sentences: string[];
  answers: string[];
  wordBank: string[];
}

export interface PronunciationWord {
  word: string;
  syllables: string;
  phonetic: string;
  example: string;
}

export interface IntonationSentence {
  text: string;
  type: "rising" | "falling" | "emphasis";
  stressedWords: string[];
  tip: string;
}

export const passages: Passage[] = [
  // ── GRADE 1 – Passage A ─────────────────────────────────────────────────
  {
    id: "g1a",
    grade: 1,
    title: "My Pet Cat",
    text: "I have a cat. Her name is Mia. She is soft and small. Mia likes to sleep. I love my cat.",
    chunks: [
      "I have",
      "a cat.",
      "Her name",
      "is Mia.",
      "She is soft",
      "and small.",
      "Mia likes",
      "to sleep.",
      "I love",
      "my cat.",
    ],
    questions: [
      {
        question: "What is the cat's name?",
        options: ["Luna", "Mia", "Bella", "Daisy"],
        correct: 1,
      },
      {
        question: "What does Mia like to do?",
        options: ["Run", "Swim", "Sleep", "Jump"],
        correct: 2,
      },
      {
        question: "How does the cat feel?",
        options: [
          "Big and rough",
          "Soft and small",
          "Cold and wet",
          "Hard and fast",
        ],
        correct: 1,
      },
      {
        question: "Who owns the cat?",
        options: [
          "A boy named Sam",
          "A girl named Mia",
          "The writer of the story",
          "A teacher",
        ],
        correct: 2,
      },
      {
        question: "What is the story mostly about?",
        options: ["A dog", "A fish", "A pet cat", "A bird"],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "I have a ___.",
        "Her name is ___.",
        "She is soft and ___.",
        "Mia likes to ___.",
        "I ___ my cat.",
      ],
      answers: ["cat", "Mia", "small", "sleep", "love"],
      wordBank: ["cat", "Mia", "small", "sleep", "love"],
    },
    pronunciationWords: [
      {
        word: "cat",
        syllables: "cat",
        phonetic: "/kæt/",
        example: "I have a cat.",
      },
      {
        word: "soft",
        syllables: "soft",
        phonetic: "/sɒft/",
        example: "She is soft.",
      },
      {
        word: "sleep",
        syllables: "sleep",
        phonetic: "/sliːp/",
        example: "Mia likes to sleep.",
      },
      {
        word: "love",
        syllables: "love",
        phonetic: "/lʌv/",
        example: "I love my cat.",
      },
    ],
    intonationSentences: [
      {
        text: "I have a cat.",
        type: "falling",
        stressedWords: ["cat"],
        tip: "Statements end with a falling tone.",
      },
      {
        text: "Do you have a pet?",
        type: "rising",
        stressedWords: ["pet"],
        tip: "Yes/no questions end with a rising tone.",
      },
    ],
    recordPassage:
      "I have a cat. Her name is Mia. She is soft and small. Mia likes to sleep. I love my cat.",
  },

  // ── GRADE 1 – Passage B ─────────────────────────────────────────────────
  {
    id: "g1b",
    grade: 1,
    title: "The Big Sun",
    text: "The sun is big. It shines in the sky. The sun gives us light. Plants need the sun. We all like the sun.",
    chunks: [
      "The sun",
      "is big.",
      "It shines",
      "in the sky.",
      "The sun gives",
      "us light.",
      "Plants need",
      "the sun.",
      "We all like",
      "the sun.",
    ],
    questions: [
      {
        question: "Where does the sun shine?",
        options: ["Under the ground", "In the sky", "In the sea", "In a box"],
        correct: 1,
      },
      {
        question: "What does the sun give us?",
        options: ["Rain", "Wind", "Light", "Snow"],
        correct: 2,
      },
      {
        question: "What needs the sun?",
        options: ["Rocks", "Plants", "Sand", "Ice"],
        correct: 1,
      },
      {
        question: "How big is the sun?",
        options: ["Small", "Tiny", "Medium", "Big"],
        correct: 3,
      },
      {
        question: "Who likes the sun?",
        options: ["Nobody", "Only plants", "We all do", "Only cats"],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "The sun is ___.",
        "It shines in the ___.",
        "The sun gives us ___.",
        "___ need the sun.",
        "We all ___ the sun.",
      ],
      answers: ["big", "sky", "light", "Plants", "like"],
      wordBank: ["big", "sky", "light", "Plants", "like"],
    },
    pronunciationWords: [
      {
        word: "sun",
        syllables: "sun",
        phonetic: "/sʌn/",
        example: "The sun is big.",
      },
      {
        word: "shine",
        syllables: "shine",
        phonetic: "/ʃaɪn/",
        example: "It shines in the sky.",
      },
      {
        word: "light",
        syllables: "light",
        phonetic: "/laɪt/",
        example: "The sun gives us light.",
      },
      {
        word: "plant",
        syllables: "plant",
        phonetic: "/plænt/",
        example: "Plants need the sun.",
      },
    ],
    intonationSentences: [
      {
        text: "The sun is BIG!",
        type: "emphasis",
        stressedWords: ["BIG"],
        tip: "Stress the important word to show excitement.",
      },
      {
        text: "Is the sun hot?",
        type: "rising",
        stressedWords: ["hot"],
        tip: "Your voice goes up at the end of a question.",
      },
    ],
    recordPassage:
      "The sun is big. It shines in the sky. The sun gives us light. Plants need the sun. We all like the sun.",
  },

  // ── GRADE 2 – Passage A ─────────────────────────────────────────────────
  {
    id: "g2a",
    grade: 2,
    title: "The Little Garden",
    text: "Maya has a small garden behind her house. She plants seeds in the soil every spring. The seeds grow into flowers because they get water and sunlight. Maya waters her flowers every morning before school. She is proud of her beautiful garden.",
    chunks: [
      "Maya has",
      "a small garden",
      "behind her house.",
      "She plants seeds",
      "in the soil",
      "every spring.",
      "The seeds grow into flowers",
      "because they get water and sunlight.",
      "Maya waters her flowers",
      "every morning before school.",
      "She is proud",
      "of her beautiful garden.",
    ],
    questions: [
      {
        question: "Where is Maya's garden?",
        options: ["In a park", "Behind her house", "At school", "In a forest"],
        correct: 1,
      },
      {
        question: "Why do the seeds grow into flowers?",
        options: [
          "Because Maya sings to them",
          "Because of cold weather",
          "Because they get water and sunlight",
          "Because the soil is black",
        ],
        correct: 2,
      },
      {
        question: "When does Maya water her flowers?",
        options: [
          "At night",
          "After school",
          "Every morning before school",
          "On weekends only",
        ],
        correct: 2,
      },
      {
        question: "What does Maya plant in her garden?",
        options: ["Trees", "Vegetables", "Seeds", "Fruits"],
        correct: 2,
      },
      {
        question: "How does Maya feel about her garden?",
        options: ["Bored", "Scared", "Angry", "Proud"],
        correct: 3,
      },
    ],
    missingWords: {
      sentences: [
        "Maya has a small ___ behind her house.",
        "She plants ___ in the soil every spring.",
        "The seeds grow into flowers because they get water and ___.",
        "Maya ___ her flowers every morning before school.",
        "She is ___ of her beautiful garden.",
      ],
      answers: ["garden", "seeds", "sunlight", "waters", "proud"],
      wordBank: [
        "garden",
        "seeds",
        "sunlight",
        "waters",
        "proud",
        "plants",
        "spring",
      ],
    },
    pronunciationWords: [
      {
        word: "garden",
        syllables: "gar-den",
        phonetic: "/ˈɡɑːrdən/",
        example: "Maya has a small garden.",
      },
      {
        word: "sunlight",
        syllables: "sun-light",
        phonetic: "/ˈsʌnlaɪt/",
        example: "The flowers need sunlight.",
      },
      {
        word: "morning",
        syllables: "mor-ning",
        phonetic: "/ˈmɔːrnɪŋ/",
        example: "She waters them every morning.",
      },
      {
        word: "beautiful",
        syllables: "beau-ti-ful",
        phonetic: "/ˈbjuːtɪfʊl/",
        example: "She has a beautiful garden.",
      },
    ],
    intonationSentences: [
      {
        text: "Maya is PROUD of her garden.",
        type: "emphasis",
        stressedWords: ["PROUD"],
        tip: "Stress words that show feelings.",
      },
      {
        text: "Does Maya water her flowers every day?",
        type: "rising",
        stressedWords: ["every", "day"],
        tip: "Yes/no questions use a rising tone at the end.",
      },
    ],
    recordPassage:
      "Maya has a small garden behind her house. She plants seeds in the soil every spring. The seeds grow into flowers because they get water and sunlight. Maya waters her flowers every morning before school. She is proud of her beautiful garden.",
  },

  // ── GRADE 2 – Passage B ─────────────────────────────────────────────────
  {
    id: "g2b",
    grade: 2,
    title: "A Rainy Afternoon",
    text: "One afternoon, dark clouds filled the sky and it began to rain. Tom and his sister Lily stayed inside and looked out the window. The raindrops made patterns on the glass, but they did not feel sad. Tom made hot cocoa and Lily read her favourite book. When the rain stopped, a bright rainbow appeared in the sky.",
    chunks: [
      "One afternoon,",
      "dark clouds filled the sky",
      "and it began to rain.",
      "Tom and his sister Lily",
      "stayed inside",
      "and looked out the window.",
      "The raindrops made patterns on the glass,",
      "but they did not feel sad.",
      "Tom made hot cocoa",
      "and Lily read her favourite book.",
      "When the rain stopped,",
      "a bright rainbow appeared in the sky.",
    ],
    questions: [
      {
        question: "What filled the sky before it rained?",
        options: ["Birds", "Dark clouds", "Bright stars", "Kites"],
        correct: 1,
      },
      {
        question: "What did Tom make during the rain?",
        options: ["A sandwich", "Lemonade", "Hot cocoa", "Soup"],
        correct: 2,
      },
      {
        question: "What appeared when the rain stopped?",
        options: ["The moon", "A rainbow", "The stars", "Snow"],
        correct: 1,
      },
      {
        question: "How did the children feel during the rain?",
        options: ["Very scared", "Angry", "Not sad", "Bored"],
        correct: 2,
      },
      {
        question: "What did Lily do while it rained?",
        options: [
          "She slept",
          "She played outside",
          "She watched TV",
          "She read a book",
        ],
        correct: 3,
      },
    ],
    missingWords: {
      sentences: [
        "Dark ___ filled the sky and it began to rain.",
        "Tom and Lily stayed inside and looked out the ___.",
        "The raindrops made ___ on the glass.",
        "Tom made hot ___.",
        "A bright ___ appeared in the sky.",
      ],
      answers: ["clouds", "window", "patterns", "cocoa", "rainbow"],
      wordBank: [
        "clouds",
        "window",
        "patterns",
        "cocoa",
        "rainbow",
        "rain",
        "sky",
      ],
    },
    pronunciationWords: [
      {
        word: "afternoon",
        syllables: "af-ter-noon",
        phonetic: "/ˌæftərˈnuːn/",
        example: "One afternoon it rained.",
      },
      {
        word: "rainbow",
        syllables: "rain-bow",
        phonetic: "/ˈreɪnboʊ/",
        example: "A bright rainbow appeared.",
      },
      {
        word: "patterns",
        syllables: "pat-terns",
        phonetic: "/ˈpætərnz/",
        example: "Raindrops made patterns.",
      },
      {
        word: "favourite",
        syllables: "fa-vour-ite",
        phonetic: "/ˈfeɪvərɪt/",
        example: "Lily read her favourite book.",
      },
    ],
    intonationSentences: [
      {
        text: "A beautiful rainbow appeared in the sky!",
        type: "falling",
        stressedWords: ["beautiful", "rainbow"],
        tip: "Exciting statements still use a falling tone at the end.",
      },
      {
        text: "Did you see the rainbow?",
        type: "rising",
        stressedWords: ["rainbow"],
        tip: "Questions asking yes or no rise at the end.",
      },
    ],
    recordPassage:
      "One afternoon, dark clouds filled the sky and it began to rain. Tom and his sister Lily stayed inside and looked out the window. The raindrops made patterns on the glass, but they did not feel sad. Tom made hot cocoa and Lily read her favourite book. When the rain stopped, a bright rainbow appeared in the sky.",
  },

  // ── GRADE 3 – Passage A ─────────────────────────────────────────────────
  {
    id: "g3a",
    grade: 3,
    title: "The Old Lighthouse",
    text: "On a rocky cliff above the sea stood an old lighthouse that had guided sailors for over a hundred years. Its bright beam swept across the dark water every night, warning ships of dangerous rocks below. Because the light was so powerful, even boats far out at sea could see it clearly. One stormy evening, the light flickered and nearly went out, causing great worry among the fishermen at the harbour. Fortunately, the keeper climbed the long spiral staircase and replaced the lamp just in time to save a passing vessel.",
    chunks: [
      "On a rocky cliff",
      "above the sea",
      "stood an old lighthouse",
      "that had guided sailors",
      "for over a hundred years.",
      "Its bright beam swept across the dark water",
      "every night,",
      "warning ships of dangerous rocks below.",
      "Because the light was so powerful,",
      "even boats far out at sea",
      "could see it clearly.",
      "One stormy evening,",
      "the light flickered and nearly went out,",
      "causing great worry among the fishermen.",
      "Fortunately, the keeper climbed the long spiral staircase",
      "and replaced the lamp just in time.",
    ],
    questions: [
      {
        question: "Where was the lighthouse located?",
        options: [
          "In a forest",
          "On a rocky cliff",
          "In a valley",
          "On a beach",
        ],
        correct: 1,
      },
      {
        question: "Why did the fishermen feel worried that evening?",
        options: [
          "Because there was fog",
          "Because a ship sank",
          "Because the lighthouse light flickered and nearly went out",
          "Because the keeper was sick",
        ],
        correct: 2,
      },
      {
        question: "What did the lighthouse keeper do to fix the problem?",
        options: [
          "He called for help",
          "He climbed the spiral staircase and replaced the lamp",
          "He turned off the lighthouse",
          "He waited until morning",
        ],
        correct: 1,
      },
      {
        question: "Why could boats far out at sea see the light?",
        options: [
          "Because the night was clear",
          "Because sailors had telescopes",
          "Because the light was very powerful",
          "Because the sea was calm",
        ],
        correct: 2,
      },
      {
        question: "What is the main purpose of the lighthouse?",
        options: [
          "To look beautiful",
          "To give the keeper a home",
          "To warn ships about dangerous rocks",
          "To send messages to the shore",
        ],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "The lighthouse stood on a rocky ___ above the sea.",
        "Its bright ___ swept across the dark water every night.",
        "The light warned ships of ___ rocks below.",
        "The light flickered and nearly went out, causing great ___ among the fishermen.",
        "The keeper replaced the ___ just in time to save the vessel.",
      ],
      answers: ["cliff", "beam", "dangerous", "worry", "lamp"],
      wordBank: [
        "cliff",
        "beam",
        "dangerous",
        "worry",
        "lamp",
        "spiral",
        "vessel",
      ],
    },
    pronunciationWords: [
      {
        word: "lighthouse",
        syllables: "light-house",
        phonetic: "/ˈlaɪthaʊs/",
        example: "The old lighthouse guided sailors.",
      },
      {
        word: "dangerous",
        syllables: "dan-ger-ous",
        phonetic: "/ˈdeɪndʒərəs/",
        example: "It warned ships of dangerous rocks.",
      },
      {
        word: "flickered",
        syllables: "flic-kered",
        phonetic: "/ˈflɪkərd/",
        example: "The light flickered that evening.",
      },
      {
        word: "fortunately",
        syllables: "for-tu-nate-ly",
        phonetic: "/ˈfɔːrtʃənɪtli/",
        example: "Fortunately the keeper fixed the lamp.",
      },
    ],
    intonationSentences: [
      {
        text: "Fortunately, the keeper replaced the lamp JUST IN TIME.",
        type: "emphasis",
        stressedWords: ["JUST", "IN", "TIME"],
        tip: "Emphasise the key phrase to show relief and urgency.",
      },
      {
        text: "Did the lighthouse save the passing vessel?",
        type: "rising",
        stressedWords: ["save", "vessel"],
        tip: "Yes/no questions rise at the end.",
      },
    ],
    recordPassage:
      "On a rocky cliff above the sea stood an old lighthouse that had guided sailors for over a hundred years. Its bright beam swept across the dark water every night, warning ships of dangerous rocks below. Because the light was so powerful, even boats far out at sea could see it clearly. One stormy evening, the light flickered and nearly went out, causing great worry among the fishermen at the harbour. Fortunately, the keeper climbed the long spiral staircase and replaced the lamp just in time to save a passing vessel.",
  },

  // ── GRADE 3 – Passage B ─────────────────────────────────────────────────
  {
    id: "g3b",
    grade: 3,
    title: "The Desert Fox",
    text: "The fennec fox is a small animal that lives in the Sahara Desert, the largest hot desert in the world. Because the desert is extremely hot during the day, the fennec fox sleeps underground to stay cool. At night, when temperatures drop, it comes out to hunt insects, lizards, and fruit. Its enormous ears are not just for hearing — they also release body heat, which helps the fox survive the extreme heat. Fennec foxes live in small family groups and communicate with each other using a range of sounds.",
    chunks: [
      "The fennec fox is a small animal",
      "that lives in the Sahara Desert,",
      "the largest hot desert in the world.",
      "Because the desert is extremely hot during the day,",
      "the fennec fox sleeps underground to stay cool.",
      "At night, when temperatures drop,",
      "it comes out to hunt insects, lizards, and fruit.",
      "Its enormous ears are not just for hearing —",
      "they also release body heat,",
      "which helps the fox survive the extreme heat.",
      "Fennec foxes live in small family groups",
      "and communicate using a range of sounds.",
    ],
    questions: [
      {
        question: "Where does the fennec fox live?",
        options: [
          "The Amazon Rainforest",
          "The Sahara Desert",
          "The Arctic Tundra",
          "The Gobi Desert",
        ],
        correct: 1,
      },
      {
        question: "Why does the fennec fox sleep underground during the day?",
        options: [
          "To hide from predators",
          "Because it is afraid of sunlight",
          "To stay cool in the extreme heat",
          "To store its food",
        ],
        correct: 2,
      },
      {
        question: "What is another purpose of the fennec fox's large ears?",
        options: [
          "To scare away enemies",
          "To collect water",
          "To release body heat",
          "To help it run faster",
        ],
        correct: 2,
      },
      {
        question: "When does the fennec fox hunt for food?",
        options: ["At sunrise", "At midday", "At night", "In the morning"],
        correct: 2,
      },
      {
        question: "How do fennec foxes interact with each other?",
        options: [
          "They use body language only",
          "They communicate using a range of sounds",
          "They leave marks on trees",
          "They do not interact at all",
        ],
        correct: 1,
      },
    ],
    missingWords: {
      sentences: [
        "The fennec fox lives in the Sahara ___, the largest hot desert in the world.",
        "The fennec fox sleeps ___ during the day to stay cool.",
        "At night it comes out to hunt insects, lizards, and ___.",
        "Its enormous ears release body ___, helping the fox survive the heat.",
        "Fennec foxes communicate with each other using a range of ___.",
      ],
      answers: ["Desert", "underground", "fruit", "heat", "sounds"],
      wordBank: [
        "Desert",
        "underground",
        "fruit",
        "heat",
        "sounds",
        "night",
        "ears",
      ],
    },
    pronunciationWords: [
      {
        word: "enormous",
        syllables: "e-nor-mous",
        phonetic: "/ɪˈnɔːrməs/",
        example: "Its enormous ears help it cool down.",
      },
      {
        word: "extreme",
        syllables: "ex-treme",
        phonetic: "/ɪkˈstriːm/",
        example: "The desert has extreme heat.",
      },
      {
        word: "communicate",
        syllables: "com-mu-ni-cate",
        phonetic: "/kəˈmjuːnɪkeɪt/",
        example: "They communicate using sounds.",
      },
      {
        word: "temperature",
        syllables: "tem-per-a-ture",
        phonetic: "/ˈtemprɪtʃər/",
        example: "Temperatures drop at night.",
      },
    ],
    intonationSentences: [
      {
        text: "The fennec fox is PERFECTLY adapted to the desert.",
        type: "emphasis",
        stressedWords: ["PERFECTLY"],
        tip: "Stress adverbs to highlight degree of meaning.",
      },
      {
        text: "How does the fox survive such extreme heat?",
        type: "rising",
        stressedWords: ["survive", "extreme"],
        tip: "Wh-questions rise slightly, showing genuine curiosity.",
      },
    ],
    recordPassage:
      "The fennec fox is a small animal that lives in the Sahara Desert, the largest hot desert in the world. Because the desert is extremely hot during the day, the fennec fox sleeps underground to stay cool. At night, when temperatures drop, it comes out to hunt insects, lizards, and fruit. Its enormous ears are not just for hearing — they also release body heat, which helps the fox survive the extreme heat. Fennec foxes live in small family groups and communicate with each other using a range of sounds.",
  },

  // ── GRADE 4 – Passage A ─────────────────────────────────────────────────
  {
    id: "g4a",
    grade: 4,
    title: "The Water Cycle",
    text: "The water cycle is a continuous process by which water moves through the Earth's atmosphere, land, and oceans. When the sun heats bodies of water such as lakes and rivers, water evaporates and rises into the atmosphere as invisible vapour. As this vapour ascends to cooler altitudes, it condenses around tiny dust particles to form clouds. When the droplets in a cloud become heavy enough, precipitation occurs in the form of rain, sleet, or snow. The water that falls returns to rivers and oceans, and the entire cycle begins again. Without this extraordinary process, life on Earth would be impossible, because all living organisms depend on fresh water to survive.",
    chunks: [
      "The water cycle is a continuous process",
      "by which water moves",
      "through the Earth's atmosphere, land, and oceans.",
      "When the sun heats bodies of water,",
      "water evaporates and rises into the atmosphere",
      "as invisible vapour.",
      "As this vapour ascends to cooler altitudes,",
      "it condenses around tiny dust particles",
      "to form clouds.",
      "When the droplets in a cloud become heavy enough,",
      "precipitation occurs",
      "in the form of rain, sleet, or snow.",
      "The water that falls returns to rivers and oceans,",
      "and the entire cycle begins again.",
      "Without this extraordinary process,",
      "life on Earth would be impossible.",
    ],
    questions: [
      {
        question: "What causes water to evaporate from lakes and rivers?",
        options: ["Wind", "The sun's heat", "Cold temperatures", "Gravity"],
        correct: 1,
      },
      {
        question: "What does water vapour condense around to form clouds?",
        options: [
          "Raindrops",
          "Ice crystals",
          "Tiny dust particles",
          "Salt crystals",
        ],
        correct: 2,
      },
      {
        question: "What is precipitation?",
        options: [
          "The heating of water by the sun",
          "Water falling from clouds as rain, sleet, or snow",
          "Water rising as vapour into the sky",
          "Water condensing into clouds",
        ],
        correct: 1,
      },
      {
        question:
          "Why does the author describe the water cycle as 'extraordinary'?",
        options: [
          "Because it is very slow",
          "Because it is difficult to see",
          "Because without it, life on Earth would be impossible",
          "Because only scientists understand it",
        ],
        correct: 2,
      },
      {
        question:
          "Which word best describes the water cycle according to the passage?",
        options: ["Random", "Continuous", "Temporary", "Invisible"],
        correct: 1,
      },
    ],
    missingWords: {
      sentences: [
        "Water ___ when the sun heats lakes and rivers.",
        "Water vapour ascends and ___ around dust particles to form clouds.",
        "When cloud droplets become heavy enough, ___ occurs.",
        "Rain and snow return water to rivers and ___, completing the cycle.",
        "Without this process, life on Earth would be ___.",
      ],
      answers: [
        "evaporates",
        "condenses",
        "precipitation",
        "oceans",
        "impossible",
      ],
      wordBank: [
        "evaporates",
        "condenses",
        "precipitation",
        "oceans",
        "impossible",
        "atmosphere",
        "vapour",
      ],
    },
    pronunciationWords: [
      {
        word: "evaporates",
        syllables: "e-vap-o-rates",
        phonetic: "/ɪˈvæpəreɪts/",
        example: "Water evaporates in the sun.",
      },
      {
        word: "atmosphere",
        syllables: "at-mo-sphere",
        phonetic: "/ˈætməsfɪər/",
        example: "Vapour rises into the atmosphere.",
      },
      {
        word: "precipitation",
        syllables: "pre-cip-i-ta-tion",
        phonetic: "/prɪˌsɪpɪˈteɪʃən/",
        example: "Precipitation includes rain and snow.",
      },
      {
        word: "extraordinary",
        syllables: "ex-tra-or-di-na-ry",
        phonetic: "/ɪkˈstrɔːrdɪneri/",
        example: "This is an extraordinary process.",
      },
    ],
    intonationSentences: [
      {
        text: "Without this EXTRAORDINARY process, life would be impossible.",
        type: "emphasis",
        stressedWords: ["EXTRAORDINARY"],
        tip: "Emphasise the adjective to convey the importance of the idea.",
      },
      {
        text: "Does the water cycle ever truly stop?",
        type: "rising",
        stressedWords: ["ever", "stop"],
        tip: "Rhetorical questions use a gentle rising tone to invite thought.",
      },
    ],
    recordPassage:
      "The water cycle is a continuous process by which water moves through the Earth's atmosphere, land, and oceans. When the sun heats bodies of water such as lakes and rivers, water evaporates and rises into the atmosphere as invisible vapour. As this vapour ascends to cooler altitudes, it condenses around tiny dust particles to form clouds. When the droplets in a cloud become heavy enough, precipitation occurs in the form of rain, sleet, or snow. The water that falls returns to rivers and oceans, and the entire cycle begins again. Without this extraordinary process, life on Earth would be impossible.",
  },

  // ── GRADE 4 – Passage B ─────────────────────────────────────────────────
  {
    id: "g4b",
    grade: 4,
    title: "Volcanoes: Fire from the Earth",
    text: "A volcano is an opening in the Earth's crust through which molten rock, called magma, forces its way to the surface during an eruption. Beneath the surface, intense heat and pressure cause solid rock to melt into magma, which collects in underground chambers. When the pressure in these chambers becomes too great, the magma is expelled violently, forming lava flows, ash clouds, and explosive blasts that can be heard hundreds of kilometres away. Although volcanic eruptions are destructive, they also have a constructive role: over millions of years, volcanic activity has formed entire islands, such as the Hawaiian archipelago, and enriched the surrounding soil with minerals that support agriculture. Scientists who study volcanoes, known as volcanologists, use sophisticated instruments to monitor changes in pressure and temperature in order to predict eruptions before they occur.",
    chunks: [
      "A volcano is an opening in the Earth's crust",
      "through which molten rock, called magma,",
      "forces its way to the surface during an eruption.",
      "Beneath the surface,",
      "intense heat and pressure cause solid rock to melt into magma,",
      "which collects in underground chambers.",
      "When the pressure becomes too great,",
      "the magma is expelled violently,",
      "forming lava flows, ash clouds, and explosive blasts.",
      "Although volcanic eruptions are destructive,",
      "they also have a constructive role:",
      "volcanic activity has formed entire islands,",
      "and enriched the surrounding soil with minerals.",
    ],
    questions: [
      {
        question: "What is magma?",
        options: [
          "Solid rock found underground",
          "Molten rock beneath the Earth's surface",
          "The ash released by a volcano",
          "A type of mineral found near volcanoes",
        ],
        correct: 1,
      },
      {
        question: "What causes magma to be expelled from a volcano?",
        options: [
          "Earthquakes near the surface",
          "Rainwater seeping underground",
          "Pressure in underground chambers becoming too great",
          "The cooling of the Earth's core",
        ],
        correct: 2,
      },
      {
        question:
          "According to the passage, what is one constructive effect of volcanoes?",
        options: [
          "They create rain clouds",
          "They form islands and enrich soil with minerals",
          "They reduce temperatures globally",
          "They clean the atmosphere",
        ],
        correct: 1,
      },
      {
        question: "What do volcanologists do?",
        options: [
          "They drill holes into volcanoes",
          "They study the history of islands",
          "They monitor volcanoes to predict eruptions",
          "They grow crops near volcanic soil",
        ],
        correct: 2,
      },
      {
        question: "What can be inferred about volcanic islands such as Hawaii?",
        options: [
          "They were created by human activity",
          "They formed through millions of years of volcanic activity",
          "They are entirely covered in lava",
          "They have no agricultural value",
        ],
        correct: 1,
      },
    ],
    missingWords: {
      sentences: [
        "A volcano is an opening in the Earth's ___ through which magma escapes.",
        "Magma collects in underground ___ beneath the surface.",
        "When pressure becomes too great, magma is ___ violently.",
        "Volcanic activity has formed entire ___, such as the Hawaiian archipelago.",
        "Scientists called ___ use instruments to predict eruptions.",
      ],
      answers: ["crust", "chambers", "expelled", "islands", "volcanologists"],
      wordBank: [
        "crust",
        "chambers",
        "expelled",
        "islands",
        "volcanologists",
        "magma",
        "pressure",
      ],
    },
    pronunciationWords: [
      {
        word: "volcano",
        syllables: "vol-ca-no",
        phonetic: "/vɒlˈkeɪnoʊ/",
        example: "A volcano is an opening in the Earth's crust.",
      },
      {
        word: "eruption",
        syllables: "e-rup-tion",
        phonetic: "/ɪˈrʌpʃən/",
        example: "The eruption produced ash clouds.",
      },
      {
        word: "destructive",
        syllables: "de-struc-tive",
        phonetic: "/dɪˈstrʌktɪv/",
        example: "Eruptions can be very destructive.",
      },
      {
        word: "archipelago",
        syllables: "ar-chi-pel-a-go",
        phonetic: "/ˌɑːrkɪˈpeləɡoʊ/",
        example: "Hawaii is an archipelago formed by volcanoes.",
      },
    ],
    intonationSentences: [
      {
        text: "Although eruptions are DESTRUCTIVE, they also create new land.",
        type: "emphasis",
        stressedWords: ["DESTRUCTIVE"],
        tip: "Stressing the contrasting word makes the surprise in the sentence clear.",
      },
      {
        text: "Can scientists predict when a volcano will erupt?",
        type: "rising",
        stressedWords: ["predict", "erupt"],
        tip: "Yes/no questions carry a rising intonation at the end.",
      },
    ],
    recordPassage:
      "A volcano is an opening in the Earth's crust through which molten rock, called magma, forces its way to the surface during an eruption. Beneath the surface, intense heat and pressure cause solid rock to melt into magma, which collects in underground chambers. When the pressure in these chambers becomes too great, the magma is expelled violently, forming lava flows, ash clouds, and explosive blasts. Although volcanic eruptions are destructive, they also have a constructive role: volcanic activity has formed entire islands and enriched the surrounding soil with minerals that support agriculture.",
  },

  // ── GRADE 5 – Passage A ─────────────────────────────────────────────────
  {
    id: "g5a",
    grade: 5,
    title: "The Amazon Rainforest: Lungs of the Earth",
    text: "The Amazon rainforest, which spans across nine South American countries and covers approximately 5.5 million square kilometres, represents the world's largest tropical rainforest and harbours an estimated ten percent of all species on Earth. This extraordinary biodiversity is sustained by a complex web of ecological relationships: towering canopy trees intercept sunlight and regulate the microclimate beneath them, while fungi in the soil break down organic matter and return vital nutrients to the ecosystem. However, decades of deforestation driven by agricultural expansion, illegal logging, and infrastructure development have degraded vast tracts of this irreplaceable habitat, releasing enormous quantities of carbon dioxide into the atmosphere and accelerating global climate change. Scientists warn that if deforestation continues at its current rate, the Amazon may reach a tipping point — a threshold beyond which the forest can no longer sustain itself and begins an irreversible transition to savanna. Preserving the Amazon is therefore not merely a regional concern but a global imperative, as the ecological services it provides — from oxygen production and carbon sequestration to rainfall regulation — are indispensable to the stability of Earth's climate system.",
    chunks: [
      "The Amazon rainforest,",
      "which spans across nine South American countries",
      "and covers approximately 5.5 million square kilometres,",
      "represents the world's largest tropical rainforest",
      "and harbours an estimated ten percent of all species on Earth.",
      "This extraordinary biodiversity is sustained",
      "by a complex web of ecological relationships:",
      "towering canopy trees intercept sunlight",
      "and regulate the microclimate beneath them,",
      "while fungi in the soil break down organic matter.",
      "However, decades of deforestation",
      "driven by agricultural expansion and illegal logging",
      "have degraded vast tracts of this irreplaceable habitat.",
      "Scientists warn that the Amazon may reach a tipping point —",
      "a threshold beyond which the forest begins",
      "an irreversible transition to savanna.",
      "Preserving the Amazon is a global imperative.",
    ],
    questions: [
      {
        question:
          "What does the author mean by 'a tipping point' in the context of the Amazon?",
        options: [
          "A moment when scientists begin studying the forest",
          "A threshold beyond which the forest can no longer sustain itself",
          "The point at which deforestation becomes illegal",
          "The peak of biodiversity in the rainforest",
        ],
        correct: 1,
      },
      {
        question:
          "According to the passage, why is preserving the Amazon described as a 'global imperative'?",
        options: [
          "Because the Amazon provides tourism income",
          "Because the Amazon is the oldest forest on Earth",
          "Because the ecological services it provides are indispensable to Earth's climate system",
          "Because most of the world's population lives near the Amazon",
        ],
        correct: 2,
      },
      {
        question: "What role do fungi in the Amazon soil play?",
        options: [
          "They intercept sunlight for the canopy trees",
          "They break down organic matter and return nutrients to the ecosystem",
          "They regulate rainfall in the region",
          "They prevent deforestation by holding the soil together",
        ],
        correct: 1,
      },
      {
        question:
          "What does the word 'irreversible' suggest about the transition to savanna?",
        options: [
          "It would happen very slowly over centuries",
          "It would be noticed only by scientists",
          "It cannot be undone once it begins",
          "It would improve the biodiversity of the region",
        ],
        correct: 2,
      },
      {
        question:
          "What does the author suggest is the primary cause of deforestation in the Amazon?",
        options: [
          "Natural climate shifts and drought",
          "Tourism and overcrowding",
          "Agricultural expansion, illegal logging, and infrastructure development",
          "Scientific research and exploration",
        ],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "The Amazon rainforest harbours an estimated ten percent of all ___ on Earth.",
        "Canopy trees regulate the ___ beneath them.",
        "Decades of ___ have degraded vast tracts of this irreplaceable habitat.",
        "Scientists warn the Amazon may reach a tipping ___ beyond which it cannot sustain itself.",
        "The ecological services the Amazon provides are ___ to Earth's climate system.",
      ],
      answers: [
        "species",
        "microclimate",
        "deforestation",
        "point",
        "indispensable",
      ],
      wordBank: [
        "species",
        "microclimate",
        "deforestation",
        "point",
        "indispensable",
        "biodiversity",
        "savanna",
      ],
    },
    pronunciationWords: [
      {
        word: "biodiversity",
        syllables: "bi-o-di-ver-si-ty",
        phonetic: "/ˌbaɪoʊdaɪˈvɜːrsɪti/",
        example: "The Amazon has extraordinary biodiversity.",
      },
      {
        word: "irreversible",
        syllables: "ir-re-ver-si-ble",
        phonetic: "/ˌɪrɪˈvɜːrsɪbəl/",
        example: "The transition to savanna would be irreversible.",
      },
      {
        word: "sequestration",
        syllables: "se-ques-tra-tion",
        phonetic: "/ˌsiːkwɪˈstreɪʃən/",
        example: "Carbon sequestration helps slow climate change.",
      },
      {
        word: "indispensable",
        syllables: "in-dis-pen-sa-ble",
        phonetic: "/ˌɪndɪˈspensəbəl/",
        example: "The Amazon's services are indispensable.",
      },
    ],
    intonationSentences: [
      {
        text: "Preserving the Amazon is not merely a regional concern — it is a GLOBAL IMPERATIVE.",
        type: "emphasis",
        stressedWords: ["GLOBAL", "IMPERATIVE"],
        tip: "Stress the climactic phrase to convey the gravity and urgency of the argument.",
      },
      {
        text: "Can the Amazon recover if deforestation is not stopped immediately?",
        type: "rising",
        stressedWords: ["recover", "immediately"],
        tip: "Complex yes/no questions still use a rising tone, showing the stakes are high.",
      },
    ],
    recordPassage:
      "The Amazon rainforest spans across nine South American countries and harbours an estimated ten percent of all species on Earth. This extraordinary biodiversity is sustained by a complex web of ecological relationships. However, decades of deforestation driven by agricultural expansion and illegal logging have degraded vast tracts of this irreplaceable habitat. Scientists warn that the Amazon may reach a tipping point beyond which the forest begins an irreversible transition to savanna. Preserving the Amazon is therefore not merely a regional concern but a global imperative.",
  },

  // ── GRADE 5 – Passage B ─────────────────────────────────────────────────
  {
    id: "g5b",
    grade: 5,
    title: "The Psychology of Decision-Making",
    text: "Every day, human beings make thousands of decisions — from trivial choices such as what to eat for breakfast to consequential judgements that may shape the course of their lives. Psychologists have long sought to understand how and why people make the choices they do, and their research has revealed that human decision-making is far less rational than most people assume. Rather than carefully analysing all available options before arriving at a logically optimal conclusion, people frequently rely on cognitive shortcuts known as heuristics — mental rules of thumb that enable rapid decisions but also introduce systematic biases. For instance, the availability heuristic causes individuals to overestimate the likelihood of events that are easily recalled, such as plane crashes, while underestimating more statistically probable risks. Similarly, confirmation bias leads people to seek out and favour information that supports their pre-existing beliefs, while unconsciously ignoring contradictory evidence. Understanding these cognitive tendencies is not merely an academic pursuit; it has profound implications for fields as diverse as public health policy, financial regulation, and artificial intelligence, where the design of choice architectures can be used to nudge individuals towards decisions that are more beneficial both to themselves and to society at large.",
    chunks: [
      "Every day, human beings make thousands of decisions —",
      "from trivial choices such as what to eat for breakfast",
      "to consequential judgements that may shape the course of their lives.",
      "Psychologists have long sought to understand",
      "how and why people make the choices they do.",
      "Human decision-making is far less rational than most people assume.",
      "People frequently rely on cognitive shortcuts known as heuristics —",
      "mental rules of thumb",
      "that enable rapid decisions but also introduce systematic biases.",
      "The availability heuristic causes individuals to overestimate",
      "the likelihood of easily recalled events.",
      "Confirmation bias leads people to favour information",
      "that supports their pre-existing beliefs.",
      "This has profound implications",
      "for public health policy, financial regulation, and artificial intelligence.",
    ],
    questions: [
      {
        question: "What does the author suggest about human decision-making?",
        options: [
          "It is entirely based on logical analysis",
          "It is more rational than psychologists previously believed",
          "It is far less rational than most people assume",
          "It improves significantly with age",
        ],
        correct: 2,
      },
      {
        question: "What is a heuristic, as described in the passage?",
        options: [
          "A scientific method for measuring brain activity",
          "A mental shortcut that enables rapid decisions but can introduce biases",
          "A strategy used only by experts in their field",
          "A tool used to design public health campaigns",
        ],
        correct: 1,
      },
      {
        question:
          "According to the passage, what does confirmation bias cause people to do?",
        options: [
          "Make decisions based on statistical data",
          "Overestimate the probability of rare events",
          "Seek information that confirms their existing beliefs while ignoring contradictions",
          "Rely on advice from trusted experts",
        ],
        correct: 2,
      },
      {
        question:
          "What does 'nudge individuals towards decisions' imply in the context of choice architecture?",
        options: [
          "Forcing people to make specific choices by law",
          "Designing environments that guide people towards better choices without removing freedom",
          "Punishing people who make poor financial decisions",
          "Teaching people to ignore their instincts",
        ],
        correct: 1,
      },
      {
        question:
          "Why does the author argue that understanding cognitive biases is not 'merely an academic pursuit'?",
        options: [
          "Because it makes interesting reading for students",
          "Because it confirms theories developed centuries ago",
          "Because it has practical applications in health policy, finance, and artificial intelligence",
          "Because it helps scientists understand the structure of the human brain",
        ],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "Human decision-making is far less ___ than most people assume.",
        "People rely on cognitive shortcuts known as ___.",
        "The availability ___ causes people to overestimate the likelihood of easily recalled events.",
        "___ bias leads people to favour information that supports their existing beliefs.",
        "Choice ___ can nudge individuals towards more beneficial decisions.",
      ],
      answers: [
        "rational",
        "heuristics",
        "heuristic",
        "Confirmation",
        "architectures",
      ],
      wordBank: [
        "rational",
        "heuristics",
        "heuristic",
        "Confirmation",
        "architectures",
        "biases",
        "cognitive",
      ],
    },
    pronunciationWords: [
      {
        word: "heuristics",
        syllables: "heu-ris-tics",
        phonetic: "/hjʊˈrɪstɪks/",
        example: "People use heuristics to make quick decisions.",
      },
      {
        word: "consequential",
        syllables: "con-se-quen-tial",
        phonetic: "/ˌkɒnsɪˈkwenʃəl/",
        example: "Some choices are highly consequential.",
      },
      {
        word: "contradictory",
        syllables: "con-tra-dic-to-ry",
        phonetic: "/ˌkɒntrəˈdɪktəri/",
        example: "People ignore contradictory evidence.",
      },
      {
        word: "implications",
        syllables: "im-pli-ca-tions",
        phonetic: "/ˌɪmplɪˈkeɪʃənz/",
        example: "This has profound implications for society.",
      },
    ],
    intonationSentences: [
      {
        text: "Understanding cognitive bias is NOT merely an academic pursuit.",
        type: "emphasis",
        stressedWords: ["NOT", "merely"],
        tip: "Stressing a negation challenges the reader's assumptions and strengthens the argument.",
      },
      {
        text: "Are our decisions truly as rational as we believe them to be?",
        type: "rising",
        stressedWords: ["truly", "rational"],
        tip: "A rhetorical question with a rising tone invites the reader to reconsider their assumptions.",
      },
    ],
    recordPassage:
      "Every day, human beings make thousands of decisions — from trivial choices to consequential judgements that may shape the course of their lives. Psychologists have found that human decision-making is far less rational than most people assume. People frequently rely on cognitive shortcuts known as heuristics, which enable rapid decisions but also introduce systematic biases. Confirmation bias leads people to favour information that supports their pre-existing beliefs while ignoring contradictory evidence. Understanding these tendencies has profound implications for public health policy, financial regulation, and artificial intelligence.",
  },
];

export const getPassageByGrade = (grade: number, index = 0): Passage => {
  const gradePassages = passages.filter((p) => p.grade === grade);
  if (gradePassages.length === 0) return passages[0];
  return gradePassages[index % gradePassages.length];
};

export const hasMorePassages = (grade: number, index: number): boolean => {
  const gradePassages = passages.filter((p) => p.grade === grade);
  return index < gradePassages.length;
};
