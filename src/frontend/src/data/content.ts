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
      {
        word: "name",
        syllables: "name",
        phonetic: "/neɪm/",
        example: "Her name is Mia.",
      },
      {
        word: "small",
        syllables: "small",
        phonetic: "/smɔːl/",
        example: "She is small.",
      },
      {
        word: "pet",
        syllables: "pet",
        phonetic: "/pɛt/",
        example: "She is my pet.",
      },
      {
        word: "fur",
        syllables: "fur",
        phonetic: "/fɜː/",
        example: "Her fur is soft.",
      },
      {
        word: "paw",
        syllables: "paw",
        phonetic: "/pɔː/",
        example: "She has a tiny paw.",
      },
      {
        word: "nap",
        syllables: "nap",
        phonetic: "/næp/",
        example: "She takes a nap.",
      },
      {
        word: "purr",
        syllables: "purr",
        phonetic: "/pɜː/",
        example: "The cat will purr.",
      },
      {
        word: "feed",
        syllables: "feed",
        phonetic: "/fiːd/",
        example: "I feed my cat.",
      },
      {
        word: "play",
        syllables: "play",
        phonetic: "/pleɪ/",
        example: "We play together.",
      },
      {
        word: "hug",
        syllables: "hug",
        phonetic: "/hʌɡ/",
        example: "I give her a hug.",
      },
      {
        word: "tail",
        syllables: "tail",
        phonetic: "/teɪl/",
        example: "She wags her tail.",
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
      "A family is a group of people who love and care for each other. My family has my father, my mother, and my sister. We live in a small house. Father goes to work every morning. Mother cooks food for us. We eat together every evening. A family helps and supports each other. I love my family.",
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
        example: "The sun will shine.",
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
        phonetic: "/plɑːnt/",
        example: "Plants need the sun.",
      },
      {
        word: "sky",
        syllables: "sky",
        phonetic: "/skaɪ/",
        example: "The sun is in the sky.",
      },
      {
        word: "warm",
        syllables: "warm",
        phonetic: "/wɔːm/",
        example: "The sun feels warm.",
      },
      {
        word: "bright",
        syllables: "bright",
        phonetic: "/braɪt/",
        example: "The sun is very bright.",
      },
      {
        word: "hot",
        syllables: "hot",
        phonetic: "/hɒt/",
        example: "It is hot today.",
      },
      {
        word: "glow",
        syllables: "glow",
        phonetic: "/ɡloʊ/",
        example: "The sun has a warm glow.",
      },
      {
        word: "rise",
        syllables: "rise",
        phonetic: "/raɪz/",
        example: "The sun will rise early.",
      },
      {
        word: "heat",
        syllables: "heat",
        phonetic: "/hiːt/",
        example: "We feel the heat.",
      },
      {
        word: "ray",
        syllables: "ray",
        phonetic: "/reɪ/",
        example: "A ray of sun fell on me.",
      },
      {
        word: "day",
        syllables: "day",
        phonetic: "/deɪ/",
        example: "It is a sunny day.",
      },
      {
        word: "grow",
        syllables: "grow",
        phonetic: "/ɡroʊ/",
        example: "Plants grow in the sun.",
      },
      {
        word: "need",
        syllables: "need",
        phonetic: "/niːd/",
        example: "We need the sun.",
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
      "The sun rises every morning in the east. It gives us light and warmth. Plants need sunlight to grow green and tall. Without the sun, there would be no life on Earth. Animals and people also need the sun. The sun sets in the evening in the west. At night the sky becomes dark. The sun is very important for all living things.",
  },

  // ── GRADE 2 – Passage A ─────────────────────────────────────────────────
  {
    id: "g2a",
    grade: 2,
    title: "The Little Garden",
    text: "Maya has a small garden at her house. She plants seeds in the soil each spring. The seeds grow into flowers when they get water and sunlight. Maya waters her flowers every morning before school. She is very happy with her garden.",
    chunks: [
      "Maya has a small garden",
      "at her house.",
      "She plants seeds in the soil",
      "each spring.",
      "The seeds grow into flowers",
      "when they get water and sunlight.",
      "Maya waters her flowers",
      "every morning before school.",
      "She is very happy",
      "with her garden.",
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
        syllables: "gar·den",
        phonetic: "/ˈɡɑːrdən/",
        example: "I work in the garden.",
      },
      {
        word: "sunlight",
        syllables: "sun·light",
        phonetic: "/ˈsʌnlaɪt/",
        example: "Plants need sunlight.",
      },
      {
        word: "morning",
        syllables: "mor·ning",
        phonetic: "/ˈmɔːrnɪŋ/",
        example: "We water plants in the morning.",
      },
      {
        word: "beautiful",
        syllables: "beau·ti·ful",
        phonetic: "/ˈbjuːtɪfʊl/",
        example: "The flowers are beautiful.",
      },
      {
        word: "seed",
        syllables: "seed",
        phonetic: "/siːd/",
        example: "We plant a seed.",
      },
      {
        word: "soil",
        syllables: "soil",
        phonetic: "/sɔɪl/",
        example: "Put the seed in the soil.",
      },
      {
        word: "water",
        syllables: "wa·ter",
        phonetic: "/ˈwɔːtər/",
        example: "I water the plants.",
      },
      {
        word: "flower",
        syllables: "flow·er",
        phonetic: "/ˈflaʊər/",
        example: "A flower bloomed today.",
      },
      {
        word: "green",
        syllables: "green",
        phonetic: "/ɡriːn/",
        example: "The leaves are green.",
      },
      {
        word: "leaf",
        syllables: "leaf",
        phonetic: "/liːf/",
        example: "A green leaf fell.",
      },
      {
        word: "root",
        syllables: "root",
        phonetic: "/ruːt/",
        example: "Roots grow underground.",
      },
      {
        word: "grow",
        syllables: "grow",
        phonetic: "/ɡroʊ/",
        example: "The plants grow tall.",
      },
      {
        word: "dig",
        syllables: "dig",
        phonetic: "/dɪɡ/",
        example: "I dig in the soil.",
      },
      {
        word: "rain",
        syllables: "rain",
        phonetic: "/reɪn/",
        example: "Rain helps plants grow.",
      },
      {
        word: "pick",
        syllables: "pick",
        phonetic: "/pɪk/",
        example: "I pick the ripe tomatoes.",
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
      "We need food to stay healthy and strong. Rice, bread, and chapati give us energy to work and play. Fruits and vegetables keep us fit and free from illness. Milk and eggs make our bones and teeth strong. Farmers grow food for all of us with hard work. We should eat fresh and healthy food every day. We must never waste food. Let us thank the farmers who feed us all.",
  },

  // ── GRADE 2 – Passage B ─────────────────────────────────────────────────
  {
    id: "g2b",
    grade: 2,
    title: "A Rainy Afternoon",
    text: "One day, dark clouds filled the sky and it started to rain. Tom and his sister Lily stayed inside. They looked out the window at the rain. Tom made hot cocoa to drink. Lily read her favourite book. When the rain stopped, a bright rainbow came out in the sky.",
    chunks: [
      "One day,",
      "dark clouds filled the sky",
      "and it started to rain.",
      "Tom and his sister Lily",
      "stayed inside.",
      "They looked out the window",
      "at the rain.",
      "Tom made hot cocoa",
      "to drink.",
      "Lily read her favourite book.",
      "When the rain stopped,",
      "a bright rainbow came out",
      "in the sky.",
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
        syllables: "af·ter·noon",
        phonetic: "/ˌæftərˈnuːn/",
        example: "It rained all afternoon.",
      },
      {
        word: "rainbow",
        syllables: "rain·bow",
        phonetic: "/ˈreɪnboʊ/",
        example: "A rainbow appeared after the rain.",
      },
      {
        word: "patterns",
        syllables: "pat·terns",
        phonetic: "/ˈpætərnz/",
        example: "We saw patterns in the clouds.",
      },
      {
        word: "favourite",
        syllables: "fa·vour·ite",
        phonetic: "/ˈfeɪvərɪt/",
        example: "Rain is my favourite weather.",
      },
      {
        word: "cloud",
        syllables: "cloud",
        phonetic: "/klaʊd/",
        example: "A cloud brought the rain.",
      },
      {
        word: "drop",
        syllables: "drop",
        phonetic: "/drɒp/",
        example: "A raindrop fell on my hand.",
      },
      {
        word: "puddle",
        syllables: "pud·dle",
        phonetic: "/ˈpʌdəl/",
        example: "I jumped in the puddle.",
      },
      {
        word: "wet",
        syllables: "wet",
        phonetic: "/wɛt/",
        example: "My shoes got wet.",
      },
      {
        word: "splash",
        syllables: "splash",
        phonetic: "/splæʃ/",
        example: "We splash in the rain.",
      },
      {
        word: "umbrella",
        syllables: "um·brel·la",
        phonetic: "/ʌmˈbrɛlə/",
        example: "I opened my umbrella.",
      },
      {
        word: "thunder",
        syllables: "thun·der",
        phonetic: "/ˈθʌndər/",
        example: "We heard loud thunder.",
      },
      {
        word: "storm",
        syllables: "storm",
        phonetic: "/stɔːrm/",
        example: "A storm was coming.",
      },
      {
        word: "cozy",
        syllables: "co·zy",
        phonetic: "/ˈkoʊzi/",
        example: "We stayed cozy inside.",
      },
      {
        word: "drizzle",
        syllables: "driz·zle",
        phonetic: "/ˈdrɪzəl/",
        example: "A light drizzle fell.",
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
      "Water is very important for all living things on Earth. We drink water every day to stay alive. Plants need water to grow and make food. Animals also drink water to live. Rain brings fresh water to the earth from the clouds. Rivers, lakes, and ponds are sources of water. We should not waste water at all. Clean water keeps us healthy and prevents diseases.",
  },

  // ── GRADE 3 – Passage A ─────────────────────────────────────────────────
  {
    id: "g3a",
    grade: 3,
    title: "The Old Lighthouse",
    text: "An old lighthouse stood on a cliff by the sea. It helped ships stay safe. The bright light shone all night. Ships could see the light from far away. One stormy night, the light went out. The keeper quickly fixed it and saved a ship.",
    chunks: [
      "An old lighthouse",
      "stood on a cliff",
      "by the sea.",
      "It helped ships",
      "stay safe.",
      "The bright light",
      "shone all night.",
      "Ships could see the light",
      "from far away.",
      "One stormy night,",
      "the light went out.",
      "The keeper fixed it",
      "and saved a ship.",
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
        syllables: "light·house",
        phonetic: "/ˈlaɪthaʊs/",
        example: "The lighthouse stood on the cliff.",
      },
      {
        word: "dangerous",
        syllables: "dan·ger·ous",
        phonetic: "/ˈdeɪndʒərəs/",
        example: "The rocks were dangerous.",
      },
      {
        word: "flickered",
        syllables: "flic·kered",
        phonetic: "/ˈflɪkərd/",
        example: "The light flickered in the storm.",
      },
      {
        word: "fortunately",
        syllables: "for·tu·nate·ly",
        phonetic: "/ˈfɔːrtʃənətli/",
        example: "Fortunately, the sailors were safe.",
      },
      {
        word: "signal",
        syllables: "sig·nal",
        phonetic: "/ˈsɪɡnəl/",
        example: "The lighthouse sent a signal.",
      },
      {
        word: "sailor",
        syllables: "sail·or",
        phonetic: "/ˈseɪlər/",
        example: "The sailor saw the light.",
      },
      {
        word: "coast",
        syllables: "coast",
        phonetic: "/koʊst/",
        example: "They sailed along the coast.",
      },
      {
        word: "keeper",
        syllables: "keep·er",
        phonetic: "/ˈkiːpər/",
        example: "The keeper lit the lamp.",
      },
      {
        word: "warned",
        syllables: "warned",
        phonetic: "/wɔːrnd/",
        example: "He warned the ships.",
      },
      {
        word: "rocky",
        syllables: "rock·y",
        phonetic: "/ˈrɒki/",
        example: "The rocky shore was nearby.",
      },
      {
        word: "waves",
        syllables: "waves",
        phonetic: "/weɪvz/",
        example: "Tall waves crashed below.",
      },
      {
        word: "foggy",
        syllables: "fog·gy",
        phonetic: "/ˈfɒɡi/",
        example: "It was a foggy night.",
      },
      {
        word: "tower",
        syllables: "tow·er",
        phonetic: "/ˈtaʊər/",
        example: "The tower was very tall.",
      },
      {
        word: "beam",
        syllables: "beam",
        phonetic: "/biːm/",
        example: "The beam shone far out to sea.",
      },
      {
        word: "guide",
        syllables: "guide",
        phonetic: "/ɡaɪd/",
        example: "The light helped guide the ships.",
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
      "Plants are very useful to us in many ways. We get fruits and vegetables to eat from plants. Cotton plants give us cotton to make our clothes. Trees give us wood to build houses and make furniture. Plants also clean the air we breathe by taking in carbon dioxide. The roots of plants hold the soil together and prevent erosion. We should plant more trees every year. Trees are a precious gift of nature and we must protect them.",
  },

  // ── GRADE 3 – Passage B ─────────────────────────────────────────────────
  {
    id: "g3b",
    grade: 3,
    title: "The Desert Fox",
    text: "The fennec fox is a small animal. It lives in the desert. The desert is very hot in the day. So the fox sleeps in the ground to keep cool. At night it comes out to find food. Its big ears help it hear well and stay cool.",
    chunks: [
      "The fennec fox",
      "is a small animal.",
      "It lives in the desert.",
      "The desert is very hot",
      "in the day.",
      "So the fox sleeps",
      "in the ground",
      "to keep cool.",
      "At night it comes out",
      "to find food.",
      "Its big ears help it",
      "hear well and stay cool.",
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
        syllables: "e·nor·mous",
        phonetic: "/ɪˈnɔːrməs/",
        example: "The desert is enormous.",
      },
      {
        word: "extreme",
        syllables: "ex·treme",
        phonetic: "/ɪkˈstriːm/",
        example: "The heat is extreme.",
      },
      {
        word: "communicate",
        syllables: "com·mu·ni·cate",
        phonetic: "/kəˈmjuːnɪkeɪt/",
        example: "Foxes communicate with sounds.",
      },
      {
        word: "temperature",
        syllables: "tem·per·a·ture",
        phonetic: "/ˈtɛmprɪtʃər/",
        example: "The temperature is very high.",
      },
      {
        word: "survive",
        syllables: "sur·vive",
        phonetic: "/sərˈvaɪv/",
        example: "The fox can survive in the desert.",
      },
      {
        word: "nocturnal",
        syllables: "noc·tur·nal",
        phonetic: "/nɒkˈtɜːrnəl/",
        example: "The fox is nocturnal.",
      },
      {
        word: "burrow",
        syllables: "bur·row",
        phonetic: "/ˈbɜːroʊ/",
        example: "The fox sleeps in a burrow.",
      },
      {
        word: "predator",
        syllables: "pred·a·tor",
        phonetic: "/ˈprɛdətər/",
        example: "The fox is a predator.",
      },
      {
        word: "camouflage",
        syllables: "cam·ou·flage",
        phonetic: "/ˈkæməflɑːʒ/",
        example: "Its fur acts as camouflage.",
      },
      {
        word: "habitat",
        syllables: "hab·i·tat",
        phonetic: "/ˈhæbɪtæt/",
        example: "The desert is its habitat.",
      },
      {
        word: "scarce",
        syllables: "scarce",
        phonetic: "/skɛrs/",
        example: "Water is scarce in the desert.",
      },
      {
        word: "adapted",
        syllables: "a·dapt·ed",
        phonetic: "/əˈdæptɪd/",
        example: "The fox is adapted to heat.",
      },
      {
        word: "pounce",
        syllables: "pounce",
        phonetic: "/paʊns/",
        example: "The fox will pounce on its prey.",
      },
      {
        word: "prey",
        syllables: "prey",
        phonetic: "/preɪ/",
        example: "It hunts its prey at night.",
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
      "We live on a planet called Earth. Earth is round in shape like a ball. It has both land and water on its surface. The large areas of land are called continents. Asia, Africa, Europe, and America are the main continents of the world. The large bodies of salt water are called oceans. The Pacific is the largest and the deepest ocean. Earth is the only planet in our solar system known to have life.",
  },

  // ── GRADE 4 – Passage A ─────────────────────────────────────────────────
  {
    id: "g4a",
    grade: 4,
    title: "The Water Cycle",
    text: "Water moves around the Earth all the time. The sun heats water in rivers and lakes. The water turns into steam and goes up into the sky. It cools and becomes clouds. When clouds get heavy, rain falls down. The water flows back to rivers and the cycle starts again. All living things need water to live.",
    chunks: [
      "Water moves around the Earth",
      "all the time.",
      "The sun heats water",
      "in rivers and lakes.",
      "The water turns into steam",
      "and goes up into the sky.",
      "It cools",
      "and becomes clouds.",
      "When clouds get heavy,",
      "rain falls down.",
      "The water flows back to rivers",
      "and the cycle starts again.",
      "All living things",
      "need water to live.",
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
        syllables: "e·vap·o·rates",
        phonetic: "/ɪˈvæpəreɪts/",
        example: "Water evaporates in the sun.",
      },
      {
        word: "atmosphere",
        syllables: "at·mos·phere",
        phonetic: "/ˈætməsfɪər/",
        example: "Water vapour rises into the atmosphere.",
      },
      {
        word: "precipitation",
        syllables: "pre·cip·i·ta·tion",
        phonetic: "/prɪˌsɪpɪˈteɪʃən/",
        example: "Rain is a form of precipitation.",
      },
      {
        word: "extraordinary",
        syllables: "ex·traor·di·na·ry",
        phonetic: "/ɪkˈstrɔːrdɪneri/",
        example: "The water cycle is extraordinary.",
      },
      {
        word: "vapour",
        syllables: "va·pour",
        phonetic: "/ˈveɪpər/",
        example: "Steam turns into vapour.",
      },
      {
        word: "condense",
        syllables: "con·dense",
        phonetic: "/kənˈdɛns/",
        example: "Water vapour will condense into clouds.",
      },
      {
        word: "cycle",
        syllables: "cy·cle",
        phonetic: "/ˈsaɪkəl/",
        example: "Water moves in a cycle.",
      },
      {
        word: "collect",
        syllables: "col·lect",
        phonetic: "/kəˈlɛkt/",
        example: "Rain collects in rivers.",
      },
      {
        word: "absorb",
        syllables: "ab·sorb",
        phonetic: "/əbˈzɔːrb/",
        example: "The ground absorbs the water.",
      },
      {
        word: "runoff",
        syllables: "run·off",
        phonetic: "/ˈrʌnɒf/",
        example: "Runoff flows into lakes.",
      },
      {
        word: "reservoir",
        syllables: "res·er·voir",
        phonetic: "/ˈrɛzəvwɑːr/",
        example: "Water is stored in a reservoir.",
      },
      {
        word: "glaciers",
        syllables: "gla·ciers",
        phonetic: "/ˈɡleɪʃərz/",
        example: "Glaciers hold frozen water.",
      },
      {
        word: "transpire",
        syllables: "tran·spire",
        phonetic: "/trænsˈpaɪər/",
        example: "Plants transpire water through their leaves.",
      },
      {
        word: "groundwater",
        syllables: "ground·wa·ter",
        phonetic: "/ˈɡraʊndwɔːtər/",
        example: "Groundwater flows under the earth.",
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
      "Long ago, people lived in caves and forests. They did not know how to grow food. They hunted wild animals and collected fruits and roots to eat. They made sharp tools from stones to help them hunt. Fire was one of their greatest discoveries. Fire gave them warmth and helped them cook food. Over thousands of years, people learned to grow crops and keep animals. They built villages and settled down together. This was the beginning of human civilization.",
  },

  // ── GRADE 4 – Passage B ─────────────────────────────────────────────────
  {
    id: "g4b",
    grade: 4,
    title: "Volcanoes: Fire from the Earth",
    text: "A volcano is a hole in the ground where hot rock comes out. Deep inside the Earth, rock gets so hot that it melts. This melted rock is called magma. When it comes out of the ground, we call it lava. Lava flows down the side of the volcano. Over time, volcanoes can make new land. Scientists study volcanoes to stay safe.",
    chunks: [
      "A volcano is a hole",
      "in the ground",
      "where hot rock comes out.",
      "Deep inside the Earth,",
      "rock gets so hot",
      "that it melts.",
      "This melted rock",
      "is called magma.",
      "When it comes out of the ground,",
      "we call it lava.",
      "Lava flows down",
      "the side of the volcano.",
      "Over time, volcanoes",
      "can make new land.",
      "Scientists study volcanoes",
      "to stay safe.",
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
        syllables: "vol·ca·no",
        phonetic: "/vɒlˈkeɪnoʊ/",
        example: "The volcano erupted last year.",
      },
      {
        word: "eruption",
        syllables: "e·rup·tion",
        phonetic: "/ɪˈrʌpʃən/",
        example: "The eruption was heard far away.",
      },
      {
        word: "destructive",
        syllables: "de·struc·tive",
        phonetic: "/dɪˈstrʌktɪv/",
        example: "The eruption was very destructive.",
      },
      {
        word: "archipelago",
        syllables: "ar·chi·pel·a·go",
        phonetic: "/ˌɑːrkɪˈpɛləɡoʊ/",
        example: "Japan is an archipelago of islands.",
      },
      {
        word: "magma",
        syllables: "mag·ma",
        phonetic: "/ˈmæɡmə/",
        example: "Hot magma lies beneath the earth.",
      },
      {
        word: "lava",
        syllables: "la·va",
        phonetic: "/ˈlɑːvə/",
        example: "Lava flows down the mountain.",
      },
      {
        word: "crater",
        syllables: "cra·ter",
        phonetic: "/ˈkreɪtər/",
        example: "The crater was filled with ash.",
      },
      {
        word: "tectonic",
        syllables: "tec·ton·ic",
        phonetic: "/tɛkˈtɒnɪk/",
        example: "Tectonic plates cause earthquakes.",
      },
      {
        word: "erupt",
        syllables: "e·rupt",
        phonetic: "/ɪˈrʌpt/",
        example: "The volcano began to erupt.",
      },
      {
        word: "ash",
        syllables: "ash",
        phonetic: "/æʃ/",
        example: "Ash covered the nearby town.",
      },
      {
        word: "pressure",
        syllables: "pres·sure",
        phonetic: "/ˈprɛʃər/",
        example: "The pressure inside grew very high.",
      },
      {
        word: "dormant",
        syllables: "dor·mant",
        phonetic: "/ˈdɔːrmənt/",
        example: "The volcano has been dormant for years.",
      },
      {
        word: "hazardous",
        syllables: "haz·ard·ous",
        phonetic: "/ˈhæzərdəs/",
        example: "Volcanic gas is hazardous.",
      },
      {
        word: "active",
        syllables: "ac·tive",
        phonetic: "/ˈæktɪv/",
        example: "This is an active volcano.",
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
      "The human body is made up of many organs that work together. The brain controls all our actions, thoughts, and feelings. The heart pumps blood to every part of the body through blood vessels. The lungs help us breathe in oxygen and breathe out carbon dioxide. The stomach digests the food we eat and gives us energy. Our bones support the body and protect the delicate organs inside. Muscles help us move and do all our work. We should eat a balanced diet and exercise daily to keep our body healthy and strong.",
  },

  // ── GRADE 5 – Passage A ─────────────────────────────────────────────────
  {
    id: "g5a",
    grade: 5,
    title: "The Amazon Rainforest: Lungs of the Earth",
    text: "The Amazon rainforest is the biggest forest in the world. It is in South America. Many animals and plants live there. The trees take in bad air and give out clean air. This helps the whole Earth stay healthy. But people are cutting down many trees. This is a big problem. We must protect the Amazon forest.",
    chunks: [
      "The Amazon rainforest",
      "is the biggest forest in the world.",
      "It is in South America.",
      "Many animals and plants",
      "live there.",
      "The trees take in bad air",
      "and give out clean air.",
      "This helps the whole Earth",
      "stay healthy.",
      "But people are cutting down",
      "many trees.",
      "This is a big problem.",
      "We must protect",
      "the Amazon forest.",
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
        syllables: "bi·o·di·ver·si·ty",
        phonetic: "/ˌbaɪoʊdaɪˈvɜːrsɪti/",
        example: "The rainforest has amazing biodiversity.",
      },
      {
        word: "irreversible",
        syllables: "ir·re·vers·i·ble",
        phonetic: "/ˌɪrɪˈvɜːrsɪbəl/",
        example: "Some damage is irreversible.",
      },
      {
        word: "sequestration",
        syllables: "se·ques·tra·tion",
        phonetic: "/ˌsiːkwɛˈstreɪʃən/",
        example: "Carbon sequestration helps the climate.",
      },
      {
        word: "indispensable",
        syllables: "in·dis·pen·sa·ble",
        phonetic: "/ˌɪndɪˈspɛnsəbəl/",
        example: "Rainforests are indispensable to life.",
      },
      {
        word: "canopy",
        syllables: "can·o·py",
        phonetic: "/ˈkænəpi/",
        example: "Monkeys swing through the canopy.",
      },
      {
        word: "species",
        syllables: "spe·cies",
        phonetic: "/ˈspiːʃiːz/",
        example: "Many species live here.",
      },
      {
        word: "deforestation",
        syllables: "de·for·est·a·tion",
        phonetic: "/dɪˌfɒrɪˈsteɪʃən/",
        example: "Deforestation destroys animal homes.",
      },
      {
        word: "habitat",
        syllables: "hab·i·tat",
        phonetic: "/ˈhæbɪtæt/",
        example: "This forest is a rich habitat.",
      },
      {
        word: "ecosystem",
        syllables: "e·co·sys·tem",
        phonetic: "/ˈiːkoʊˌsɪstəm/",
        example: "The ecosystem depends on every species.",
      },
      {
        word: "predator",
        syllables: "pred·a·tor",
        phonetic: "/ˈprɛdətər/",
        example: "The jaguar is a top predator.",
      },
      {
        word: "indigenous",
        syllables: "in·dig·e·nous",
        phonetic: "/ɪnˈdɪdʒɪnəs/",
        example: "Indigenous tribes live in the forest.",
      },
      {
        word: "abundant",
        syllables: "a·bun·dant",
        phonetic: "/əˈbʌndənt/",
        example: "Rainfall is abundant in the Amazon.",
      },
      {
        word: "sustainable",
        syllables: "sus·tain·a·ble",
        phonetic: "/səˈsteɪnəbəl/",
        example: "We need sustainable farming.",
      },
      {
        word: "climate",
        syllables: "cli·mate",
        phonetic: "/ˈklaɪmɪt/",
        example: "The rainforest affects global climate.",
      },
      {
        word: "medicinal",
        syllables: "me·dic·i·nal",
        phonetic: "/mɪˈdɪsɪnəl/",
        example: "Many plants have medicinal uses.",
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
      "India won its freedom from British rule on the fifteenth of August nineteen forty-seven. Many brave men and women sacrificed their lives for this freedom. Mahatma Gandhi led the non-violent freedom struggle and inspired millions of people. Jawaharlal Nehru became the first Prime Minister of independent India. Bhagat Singh gave his life for the nation at a very young age and became a great hero. Subhas Chandra Bose formed the Indian National Army to fight the British. Rani Lakshmibai fought fearlessly against the British in eighteen fifty-seven. We remember all these heroes with deep respect and pride every day.",
  },

  // ── GRADE 5 – Passage B ─────────────────────────────────────────────────
  {
    id: "g5b",
    grade: 5,
    title: "The Psychology of Decision-Making",
    text: "Every day we make many choices. Some choices are small, like what to eat. Some choices are big and can change our life. We do not always think about all the facts before we choose. Sometimes we use quick thinking to decide fast. This can lead to mistakes. We can also miss facts that do not match what we already think. It is good to slow down and think before making big choices.",
    chunks: [
      "Every day we make",
      "many choices.",
      "Some choices are small,",
      "like what to eat.",
      "Some choices are big",
      "and can change our life.",
      "We do not always think",
      "about all the facts",
      "before we choose.",
      "Sometimes we use quick thinking",
      "to decide fast.",
      "This can lead to mistakes.",
      "It is good to slow down",
      "and think",
      "before making big choices.",
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
        syllables: "heu·ris·tics",
        phonetic: "/hjʊˈrɪstɪks/",
        example: "We use heuristics to decide quickly.",
      },
      {
        word: "consequential",
        syllables: "con·se·quen·tial",
        phonetic: "/ˌkɒnsɪˈkwɛnʃəl/",
        example: "This is a consequential decision.",
      },
      {
        word: "contradictory",
        syllables: "con·tra·dic·to·ry",
        phonetic: "/ˌkɒntrəˈdɪktəri/",
        example: "The evidence was contradictory.",
      },
      {
        word: "implications",
        syllables: "im·pli·ca·tions",
        phonetic: "/ˌɪmplɪˈkeɪʃənz/",
        example: "Think about the implications first.",
      },
      {
        word: "cognitive",
        syllables: "cog·ni·tive",
        phonetic: "/ˈkɒɡnɪtɪv/",
        example: "We rely on cognitive shortcuts.",
      },
      {
        word: "bias",
        syllables: "bi·as",
        phonetic: "/ˈbaɪəs/",
        example: "Confirmation bias affects our thinking.",
      },
      {
        word: "rational",
        syllables: "ra·tion·al",
        phonetic: "/ˈræʃənəl/",
        example: "Try to make a rational choice.",
      },
      {
        word: "subconscious",
        syllables: "sub·con·scious",
        phonetic: "/sʌbˈkɒnʃəs/",
        example: "Subconscious thoughts guide our actions.",
      },
      {
        word: "evaluate",
        syllables: "e·val·u·ate",
        phonetic: "/ɪˈvæljueɪt/",
        example: "We evaluate options before choosing.",
      },
      {
        word: "perspective",
        syllables: "per·spec·tive",
        phonetic: "/pərˈspɛktɪv/",
        example: "Consider another perspective.",
      },
      {
        word: "intuition",
        syllables: "in·tu·i·tion",
        phonetic: "/ˌɪntjuˈɪʃən/",
        example: "Sometimes intuition guides us well.",
      },
      {
        word: "systematic",
        syllables: "sys·te·mat·ic",
        phonetic: "/ˌsɪstɪˈmætɪk/",
        example: "Use a systematic approach.",
      },
      {
        word: "deliberate",
        syllables: "de·lib·er·ate",
        phonetic: "/dɪˈlɪbərɪt/",
        example: "Make a deliberate and careful choice.",
      },
      {
        word: "analytical",
        syllables: "an·a·lyt·i·cal",
        phonetic: "/ˌænəˈlɪtɪkəl/",
        example: "She has an analytical mind.",
      },
      {
        word: "outcome",
        syllables: "out·come",
        phonetic: "/ˈaʊtkʌm/",
        example: "Think about the outcome of your choice.",
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
      "An ecosystem is a community of living things sharing the same environment and depending on each other. A forest ecosystem has trees, shrubs, animals, insects, birds, and many tiny organisms. The green plants make food using sunlight through the process of photosynthesis. Plant-eating animals feed on the plants and meat-eating animals feed on other animals. When plants and animals die, tiny organisms break them down and return nutrients to the soil. This great cycle of life continues forever in nature. Human beings are also part of ecosystems. We must protect our ecosystems from the damage caused by pollution and deforestation.",
  },
  // ─── GRADE 1 C: My Red Ball ───────────────────────────────────────────────
  {
    id: "g1c",
    grade: 1,
    title: "My Red Ball",
    text: "I have a red ball. It is big and round. I kick the ball. It goes up high. I catch the ball. The ball is fun to play with.",
    chunks: [
      "I have",
      "a red ball.",
      "It is big",
      "and round.",
      "I kick the ball.",
      "It goes up high.",
      "I catch the ball.",
      "The ball is fun",
      "to play with.",
    ],
    questions: [
      {
        question: "What colour is the ball?",
        options: ["Blue", "Red", "Green", "Yellow"],
        correct: 1,
      },
      {
        question: "What shape is the ball?",
        options: ["Square", "Triangle", "Round", "Flat"],
        correct: 2,
      },
      {
        question: "What does the child do with the ball?",
        options: [
          "Throw and drop",
          "Kick and catch",
          "Roll and hide",
          "Push and pull",
        ],
        correct: 1,
      },
      {
        question: "How high does the ball go?",
        options: ["Down low", "Up high", "Sideways", "Underground"],
        correct: 1,
      },
      {
        question: "Is the ball fun?",
        options: [
          "No, it is boring",
          "Yes, it is fun",
          "It is scary",
          "It is heavy",
        ],
        correct: 1,
      },
    ],
    missingWords: {
      sentences: [
        "I have a ___ ball.",
        "It is big and ___.",
        "I ___ the ball.",
        "It goes up ___.",
        "The ball is fun to ___ with.",
      ],
      answers: ["red", "round", "kick", "high", "play"],
      wordBank: [
        "red",
        "round",
        "kick",
        "high",
        "play",
        "blue",
        "flat",
        "push",
      ],
    },
    pronunciationWords: [
      {
        word: "ball",
        syllables: "ball",
        phonetic: "/bɔːl/",
        example: "I kicked the ball far.",
      },
      {
        word: "round",
        syllables: "round",
        phonetic: "/raʊnd/",
        example: "The ball is round.",
      },
      {
        word: "catch",
        syllables: "catch",
        phonetic: "/kætʃ/",
        example: "I can catch the ball.",
      },
      {
        word: "kick",
        syllables: "kick",
        phonetic: "/kɪk/",
        example: "Kick the ball to me.",
      },
      {
        word: "bounce",
        syllables: "bounce",
        phonetic: "/baʊns/",
        example: "The ball will bounce high.",
      },
      {
        word: "throw",
        syllables: "throw",
        phonetic: "/θroʊ/",
        example: "Throw the ball to your friend.",
      },
      {
        word: "roll",
        syllables: "roll",
        phonetic: "/roʊl/",
        example: "Watch the ball roll away.",
      },
      {
        word: "grip",
        syllables: "grip",
        phonetic: "/ɡrɪp/",
        example: "Get a firm grip on the ball.",
      },
      {
        word: "inflate",
        syllables: "in·flate",
        phonetic: "/ɪnˈfleɪt/",
        example: "We need to inflate the ball.",
      },
      {
        word: "score",
        syllables: "score",
        phonetic: "/skɔːr/",
        example: "He scored a goal.",
      },
      {
        word: "play",
        syllables: "play",
        phonetic: "/pleɪ/",
        example: "We play with the ball.",
      },
      {
        word: "field",
        syllables: "field",
        phonetic: "/fiːld/",
        example: "We play on a green field.",
      },
      {
        word: "team",
        syllables: "team",
        phonetic: "/tiːm/",
        example: "Our team plays together.",
      },
      {
        word: "goal",
        syllables: "goal",
        phonetic: "/ɡoʊl/",
        example: "We scored a goal!",
      },
    ],
    intonationSentences: [
      {
        text: "The ball is red.",
        type: "falling",
        stressedWords: ["red"],
        tip: "Your voice falls at the end of a statement.",
      },
      {
        text: "Can you catch the ball?",
        type: "rising",
        stressedWords: ["catch", "ball"],
        tip: "Your voice rises at the end of a yes/no question.",
      },
      {
        text: "I LOVE my red ball!",
        type: "emphasis",
        stressedWords: ["LOVE"],
        tip: "Stress the word LOVE to show strong feeling.",
      },
    ],
    recordPassage:
      "A school is where we go to learn. Our school has classrooms, a library, and a playground. Our teacher helps us read and write. We learn numbers and new words in school every day. We make many friends at school. We play together during the lunch break. School helps us grow and become wise. I love going to school.",
  },

  // ─── GRADE 1 D: A Rainy Day ───────────────────────────────────────────────
  {
    id: "g1d",
    grade: 1,
    title: "A Rainy Day",
    text: "Rain falls from the sky. I wear my yellow coat. I put on my boots. I jump in the puddles. Splash! I love the rain.",
    chunks: [
      "Rain falls",
      "from the sky.",
      "I wear",
      "my yellow coat.",
      "I put on",
      "my boots.",
      "I jump in",
      "the puddles.",
      "Splash!",
      "I love the rain.",
    ],
    questions: [
      {
        question: "Where does rain come from?",
        options: ["The ground", "The sky", "The trees", "The sea"],
        correct: 1,
      },
      {
        question: "What colour is the coat?",
        options: ["Red", "Blue", "Yellow", "Green"],
        correct: 2,
      },
      {
        question: "What does the child put on?",
        options: ["Gloves", "Boots", "Hat", "Scarf"],
        correct: 1,
      },
      {
        question: "What does the child jump in?",
        options: ["Leaves", "Mud", "Puddles", "Sand"],
        correct: 2,
      },
      {
        question: "How does the child feel about rain?",
        options: ["Scared", "Sad", "Loves it", "Bored"],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "___ falls from the sky.",
        "I wear my yellow ___.",
        "I put on my ___.",
        "I jump in the ___.",
        "I ___ the rain.",
      ],
      answers: ["Rain", "coat", "boots", "puddles", "love"],
      wordBank: [
        "Rain",
        "coat",
        "boots",
        "puddles",
        "love",
        "Snow",
        "hat",
        "jump",
      ],
    },
    pronunciationWords: [
      {
        word: "rain",
        syllables: "rain",
        phonetic: "/reɪn/",
        example: "The rain came down hard.",
      },
      {
        word: "boots",
        syllables: "boots",
        phonetic: "/buːts/",
        example: "I put on my rain boots.",
      },
      {
        word: "puddle",
        syllables: "pud·dle",
        phonetic: "/ˈpʌdəl/",
        example: "I jumped in the puddle.",
      },
      {
        word: "splash",
        syllables: "splash",
        phonetic: "/splæʃ/",
        example: "Water splash went everywhere.",
      },
      {
        word: "drench",
        syllables: "drench",
        phonetic: "/drɛntʃ/",
        example: "The rain drenched my coat.",
      },
      {
        word: "forecast",
        syllables: "fore·cast",
        phonetic: "/ˈfɔːrkæst/",
        example: "The forecast said heavy rain.",
      },
      {
        word: "soaked",
        syllables: "soaked",
        phonetic: "/soʊkt/",
        example: "My clothes were soaked.",
      },
      {
        word: "shelter",
        syllables: "shel·ter",
        phonetic: "/ˈʃɛltər/",
        example: "We ran for shelter.",
      },
      {
        word: "umbrella",
        syllables: "um·brel·la",
        phonetic: "/ʌmˈbrɛlə/",
        example: "Open your umbrella.",
      },
      {
        word: "downpour",
        syllables: "down·pour",
        phonetic: "/ˈdaʊnpɔːr/",
        example: "A downpour hit the town.",
      },
      {
        word: "drizzle",
        syllables: "driz·zle",
        phonetic: "/ˈdrɪzəl/",
        example: "A light drizzle began.",
      },
      {
        word: "cloudy",
        syllables: "cloud·y",
        phonetic: "/ˈklaʊdi/",
        example: "The sky was very cloudy.",
      },
      {
        word: "thunder",
        syllables: "thun·der",
        phonetic: "/ˈθʌndər/",
        example: "I heard thunder in the distance.",
      },
      {
        word: "lightning",
        syllables: "light·ning",
        phonetic: "/ˈlaɪtnɪŋ/",
        example: "Lightning lit up the sky.",
      },
    ],
    intonationSentences: [
      {
        text: "Rain falls from the sky.",
        type: "falling",
        stressedWords: ["Rain", "sky"],
        tip: "Your voice drops at the end of this calm statement.",
      },
      {
        text: "Do you love the rain?",
        type: "rising",
        stressedWords: ["love", "rain"],
        tip: "Your voice rises at the end of this question.",
      },
      {
        text: "SPLASH! I jumped in the puddle!",
        type: "emphasis",
        stressedWords: ["SPLASH"],
        tip: "Say SPLASH loudly and suddenly to show the action.",
      },
    ],
    recordPassage:
      "There are many animals around us. Some animals live in our homes as pets. A dog is a faithful and loyal pet. A cow gives us milk to drink. Birds make nests in trees and sing sweet songs. Fish live in rivers, ponds, and the sea. We must be kind to all animals. Animals are our friends and we should never hurt them.",
  },

  // ─── GRADE 2 C: The Garden ────────────────────────────────────────────────
  {
    id: "g2c",
    grade: 2,
    title: "The Garden",
    text: "Our garden is full of flowers. Red roses grow by the fence. Yellow sunflowers reach up to the sun. Bees visit the flowers to collect nectar. We water the plants every morning so they stay healthy.",
    chunks: [
      "Our garden",
      "is full of flowers.",
      "Red roses grow",
      "by the fence.",
      "Yellow sunflowers",
      "reach up to the sun.",
      "Bees visit the flowers",
      "to collect nectar.",
      "We water the plants",
      "every morning",
      "so they stay healthy.",
    ],
    questions: [
      {
        question: "What grows by the fence?",
        options: ["Sunflowers", "Red roses", "Daisies", "Tulips"],
        correct: 1,
      },
      {
        question: "Which flower reaches up to the sun?",
        options: ["Red roses", "Daisies", "Yellow sunflowers", "Bluebells"],
        correct: 2,
      },
      {
        question: "Why do bees visit flowers?",
        options: ["To sleep", "To hide", "To collect nectar", "To eat leaves"],
        correct: 2,
      },
      {
        question: "When do they water the plants?",
        options: ["At night", "In the evening", "Every morning", "Once a week"],
        correct: 2,
      },
      {
        question: "Why do they water the plants?",
        options: [
          "To make them tall",
          "To keep them healthy",
          "To attract bees",
          "To make flowers red",
        ],
        correct: 1,
      },
    ],
    missingWords: {
      sentences: [
        "Our garden is full of ___.",
        "Red ___ grow by the fence.",
        "Yellow sunflowers reach up to the ___.",
        "Bees visit the flowers to collect ___.",
        "We water the plants every ___ so they stay healthy.",
      ],
      answers: ["flowers", "roses", "sun", "nectar", "morning"],
      wordBank: [
        "flowers",
        "roses",
        "sun",
        "nectar",
        "morning",
        "trees",
        "moon",
        "evening",
      ],
    },
    pronunciationWords: [
      {
        word: "garden",
        syllables: "gar·den",
        phonetic: "/ˈɡɑːrdən/",
        example: "She loves her flower garden.",
      },
      {
        word: "sunflower",
        syllables: "sun·flow·er",
        phonetic: "/ˈsʌnflaʊər/",
        example: "The sunflower grew very tall.",
      },
      {
        word: "nectar",
        syllables: "nec·tar",
        phonetic: "/ˈnɛktər/",
        example: "Bees collect nectar from flowers.",
      },
      {
        word: "healthy",
        syllables: "health·y",
        phonetic: "/ˈhɛlθi/",
        example: "Vegetables keep us healthy.",
      },
      {
        word: "harvest",
        syllables: "har·vest",
        phonetic: "/ˈhɑːrvɪst/",
        example: "We harvest vegetables in autumn.",
      },
      {
        word: "compost",
        syllables: "com·post",
        phonetic: "/ˈkɒmpoʊst/",
        example: "Compost feeds the soil.",
      },
      {
        word: "pollinate",
        syllables: "pol·li·nate",
        phonetic: "/ˈpɒlɪneɪt/",
        example: "Bees pollinate the flowers.",
      },
      {
        word: "fertilise",
        syllables: "fer·til·ise",
        phonetic: "/ˈfɜːrtɪlaɪz/",
        example: "We fertilise the soil every spring.",
      },
      {
        word: "seedling",
        syllables: "seed·ling",
        phonetic: "/ˈsiːdlɪŋ/",
        example: "A seedling sprouted overnight.",
      },
      {
        word: "prune",
        syllables: "prune",
        phonetic: "/pruːn/",
        example: "We prune the rose bushes.",
      },
      {
        word: "weed",
        syllables: "weed",
        phonetic: "/wiːd/",
        example: "Pull out every weed.",
      },
      {
        word: "bloom",
        syllables: "bloom",
        phonetic: "/bluːm/",
        example: "The roses bloom in spring.",
      },
      {
        word: "irrigate",
        syllables: "ir·ri·gate",
        phonetic: "/ˈɪrɪɡeɪt/",
        example: "Farmers irrigate their crops.",
      },
      {
        word: "organic",
        syllables: "or·gan·ic",
        phonetic: "/ɔːrˈɡænɪk/",
        example: "We grow organic vegetables.",
      },
    ],
    intonationSentences: [
      {
        text: "Our garden is full of beautiful flowers.",
        type: "falling",
        stressedWords: ["beautiful", "flowers"],
        tip: "Let your voice fall gently on the final word.",
      },
      {
        text: "Have you ever seen a sunflower up close?",
        type: "rising",
        stressedWords: ["ever", "sunflower"],
        tip: "Your voice rises at the end of a yes/no question.",
      },
      {
        text: "The bees work SO hard every single day.",
        type: "emphasis",
        stressedWords: ["SO", "hard"],
        tip: "Stress SO to show how impressed you are.",
      },
    ],
    recordPassage:
      "Many people help us in our daily life. The doctor treats sick people and makes them well. The police officer keeps us safe from danger. The farmer grows food for the whole country. The teacher helps us learn and understand the world. The postman brings letters and parcels to our door. We should respect and thank all our helpers. Their hard work makes our life easy and comfortable.",
  },

  // ─── GRADE 2 D: My Family ─────────────────────────────────────────────────
  {
    id: "g2d",
    grade: 2,
    title: "My Family",
    text: "My family has four people. My mum cooks delicious meals. My dad reads stories at bedtime. My little sister loves to draw pictures. We all help each other and spend time together on weekends.",
    chunks: [
      "My family",
      "has four people.",
      "My mum cooks",
      "delicious meals.",
      "My dad reads",
      "stories at bedtime.",
      "My little sister",
      "loves to draw pictures.",
      "We all help each other",
      "and spend time together",
      "on weekends.",
    ],
    questions: [
      {
        question: "How many people are in the family?",
        options: ["Two", "Three", "Four", "Five"],
        correct: 2,
      },
      {
        question: "What does the mum do?",
        options: [
          "Reads stories",
          "Cooks meals",
          "Draws pictures",
          "Plays games",
        ],
        correct: 1,
      },
      {
        question: "When does dad read stories?",
        options: [
          "In the morning",
          "At lunchtime",
          "At bedtime",
          "After school",
        ],
        correct: 2,
      },
      {
        question: "What does the sister love to do?",
        options: ["Cook", "Sing", "Draw pictures", "Run"],
        correct: 2,
      },
      {
        question: "When do they spend time together?",
        options: [
          "Every evening",
          "On weekends",
          "During school",
          "At bedtime",
        ],
        correct: 1,
      },
    ],
    missingWords: {
      sentences: [
        "My ___ has four people.",
        "My mum cooks ___ meals.",
        "My dad reads stories at ___.",
        "My little sister loves to ___ pictures.",
        "We spend time together on ___.",
      ],
      answers: ["family", "delicious", "bedtime", "draw", "weekends"],
      wordBank: [
        "family",
        "delicious",
        "bedtime",
        "draw",
        "weekends",
        "school",
        "boring",
        "paint",
      ],
    },
    pronunciationWords: [
      {
        word: "family",
        syllables: "fam·i·ly",
        phonetic: "/ˈfæmɪli/",
        example: "My family is very close.",
      },
      {
        word: "delicious",
        syllables: "de·li·cious",
        phonetic: "/dɪˈlɪʃəs/",
        example: "Mum made a delicious meal.",
      },
      {
        word: "bedtime",
        syllables: "bed·time",
        phonetic: "/ˈbɛdtaɪm/",
        example: "Bedtime is at eight o'clock.",
      },
      {
        word: "weekend",
        syllables: "week·end",
        phonetic: "/ˈwiːkɛnd/",
        example: "We rest on the weekend.",
      },
      {
        word: "together",
        syllables: "to·geth·er",
        phonetic: "/təˈɡɛðər/",
        example: "We eat together every night.",
      },
      {
        word: "celebrate",
        syllables: "cel·e·brate",
        phonetic: "/ˈsɛlɪbreɪt/",
        example: "We celebrate birthdays together.",
      },
      {
        word: "tradition",
        syllables: "tra·di·tion",
        phonetic: "/trəˈdɪʃən/",
        example: "Cooking is a family tradition.",
      },
      {
        word: "laughter",
        syllables: "laugh·ter",
        phonetic: "/ˈlæftər/",
        example: "Laughter filled the room.",
      },
      {
        word: "support",
        syllables: "sup·port",
        phonetic: "/səˈpɔːrt/",
        example: "Family members support each other.",
      },
      {
        word: "cherish",
        syllables: "cher·ish",
        phonetic: "/ˈtʃɛrɪʃ/",
        example: "We cherish time together.",
      },
      {
        word: "routine",
        syllables: "rou·tine",
        phonetic: "/ruːˈtiːn/",
        example: "Our daily routine keeps us close.",
      },
      {
        word: "gratitude",
        syllables: "grat·i·tude",
        phonetic: "/ˈɡrætɪtjuːd/",
        example: "We show gratitude to our parents.",
      },
      {
        word: "memories",
        syllables: "mem·o·ries",
        phonetic: "/ˈmɛməriz/",
        example: "We make good memories together.",
      },
      {
        word: "sibling",
        syllables: "sib·ling",
        phonetic: "/ˈsɪblɪŋ/",
        example: "My sibling and I play together.",
      },
    ],
    intonationSentences: [
      {
        text: "My family spends time together on weekends.",
        type: "falling",
        stressedWords: ["family", "weekends"],
        tip: "A warm statement ends with a falling tone.",
      },
      {
        text: "Does your mum cook delicious meals too?",
        type: "rising",
        stressedWords: ["delicious", "too"],
        tip: "Your voice rises on the last word of a yes/no question.",
      },
      {
        text: "I LOVE my family so much!",
        type: "emphasis",
        stressedWords: ["LOVE"],
        tip: "Stress LOVE to show deep feeling and warmth.",
      },
    ],
    recordPassage:
      "Once there was a little bird who lived in a tall mango tree. Every morning she would sing a sweet and cheerful song. One day a strong wind blew and she fell to the ground. A kind boy found her lying there and gave her water to drink. He placed her back gently on a low branch. The bird slowly recovered and flew back to her nest. She sang her sweetest song for the kind boy. Kindness is always rewarded in the end.",
  },

  // ─── GRADE 3 C: The Ocean ─────────────────────────────────────────────────
  {
    id: "g3c",
    grade: 3,
    title: "The Ocean",
    text: "The ocean covers more than half of our planet. Many animals live in the ocean. Small creatures like plankton and big ones like blue whales live there. Coral reefs are like underwater gardens where fish live. We must take care of the ocean because it gives us food and air.",
    chunks: [
      "The ocean covers",
      "more than half",
      "of our planet.",
      "Many animals live",
      "in the ocean.",
      "Small creatures like plankton",
      "and big ones like blue whales",
      "live there.",
      "Coral reefs are like",
      "underwater gardens",
      "where fish live.",
      "We must take care of the ocean",
      "because it gives us",
      "food and air.",
    ],
    questions: [
      {
        question: "How much of our planet does the ocean cover?",
        options: [
          "Less than a quarter",
          "About a third",
          "More than half",
          "Almost all of it",
        ],
        correct: 2,
      },
      {
        question: "What is a coral reef compared to?",
        options: ["A mountain", "An underwater forest", "A desert", "A river"],
        correct: 1,
      },
      {
        question: "What do ocean currents carry?",
        options: [
          "Sand and rocks",
          "Warm and cold water",
          "Fish and plankton",
          "Oxygen and food",
        ],
        correct: 1,
      },
      {
        question: "What do oceans provide for all life on Earth?",
        options: [
          "Rain and snow",
          "Oxygen and food",
          "Soil and minerals",
          "Sunlight and heat",
        ],
        correct: 1,
      },
      {
        question: "What is the largest creature mentioned?",
        options: ["Plankton", "Coral", "Blue whale", "Shark"],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "The ocean covers more than half of our ___.",
        "Tiny plankton to enormous blue ___ live in the ocean.",
        "Ocean currents affect the ___ on land.",
        "Coral reefs are underwater ___ where fish live.",
        "Oceans provide ___ and food for all life on Earth.",
      ],
      answers: ["planet", "whales", "climate", "forests", "oxygen"],
      wordBank: [
        "planet",
        "whales",
        "climate",
        "forests",
        "oxygen",
        "stars",
        "mountains",
        "shadows",
      ],
    },
    pronunciationWords: [
      {
        word: "ocean",
        syllables: "o·cean",
        phonetic: "/ˈoʊʃən/",
        example: "The ocean is very deep.",
      },
      {
        word: "plankton",
        syllables: "plank·ton",
        phonetic: "/ˈplæŋktən/",
        example: "Plankton is food for many fish.",
      },
      {
        word: "current",
        syllables: "cur·rent",
        phonetic: "/ˈkɜːrənt/",
        example: "The current moved the boat.",
      },
      {
        word: "coral",
        syllables: "cor·al",
        phonetic: "/ˈkɒrəl/",
        example: "Coral reefs are full of life.",
      },
      {
        word: "underwater",
        syllables: "un·der·wa·ter",
        phonetic: "/ˌʌndərˈwɔːtər/",
        example: "She swam underwater.",
      },
      {
        word: "tidal",
        syllables: "ti·dal",
        phonetic: "/ˈtaɪdəl/",
        example: "Tidal waves can be powerful.",
      },
      {
        word: "marine",
        syllables: "ma·rine",
        phonetic: "/məˈriːn/",
        example: "Marine life is diverse.",
      },
      {
        word: "salinity",
        syllables: "sa·lin·i·ty",
        phonetic: "/səˈlɪnɪti/",
        example: "The salinity of the sea is high.",
      },
      {
        word: "depth",
        syllables: "depth",
        phonetic: "/dɛpθ/",
        example: "The depth of the ocean is vast.",
      },
      {
        word: "habitat",
        syllables: "hab·i·tat",
        phonetic: "/ˈhæbɪtæt/",
        example: "The reef is a fish habitat.",
      },
      {
        word: "species",
        syllables: "spe·cies",
        phonetic: "/ˈspiːʃiːz/",
        example: "Many species live in the ocean.",
      },
      {
        word: "pressure",
        syllables: "pres·sure",
        phonetic: "/ˈprɛʃər/",
        example: "Pressure increases at great depths.",
      },
      {
        word: "migration",
        syllables: "mi·gra·tion",
        phonetic: "/maɪˈɡreɪʃən/",
        example: "Whale migration follows warm waters.",
      },
      {
        word: "bioluminescent",
        syllables: "bi·o·lu·mi·nes·cent",
        phonetic: "/ˌbaɪoʊˌluːmɪˈnɛsənt/",
        example: "Some deep-sea fish are bioluminescent.",
      },
    ],
    intonationSentences: [
      {
        text: "The ocean covers more than half of our planet.",
        type: "falling",
        stressedWords: ["more", "half", "planet"],
        tip: "End the sentence with a falling tone for a clear fact.",
      },
      {
        text: "Have you ever seen a blue whale in the ocean?",
        type: "rising",
        stressedWords: ["ever", "whale"],
        tip: "Your voice rises on the final stressed word of a question.",
      },
      {
        text: "We MUST protect our oceans before it is too late.",
        type: "emphasis",
        stressedWords: ["MUST", "protect"],
        tip: "Stress MUST to express urgency and importance.",
      },
    ],
    recordPassage:
      "A map is a drawing of a place made on flat paper. Maps help us find our way and understand the world. A compass shows us the four main directions. They are North, South, East, and West. The sun rises in the East and sets in the West. Maps use symbols and colors to show different features. A key or legend explains what each symbol means. India is the seventh largest country in the world by area.",
  },

  // ─── GRADE 3 D: Seasons Change ────────────────────────────────────────────
  {
    id: "g3d",
    grade: 3,
    title: "Seasons Change",
    text: "There are four seasons in a year. They are spring, summer, autumn, and winter. In spring, flowers come out and birds come back. Summer has long, sunny days. In autumn, the leaves turn red and fall. Winter is cold and sometimes it snows.",
    chunks: [
      "There are four seasons",
      "in a year.",
      "They are spring,",
      "summer, autumn,",
      "and winter.",
      "In spring, flowers come out",
      "and birds come back.",
      "Summer has",
      "long, sunny days.",
      "In autumn,",
      "the leaves turn red and fall.",
      "Winter is cold",
      "and sometimes it snows.",
    ],
    questions: [
      {
        question: "How many seasons are there?",
        options: ["Two", "Three", "Four", "Five"],
        correct: 2,
      },
      {
        question: "What happens in spring?",
        options: [
          "Leaves fall",
          "Snow falls",
          "Flowers bloom",
          "Days get short",
        ],
        correct: 2,
      },
      {
        question: "What colour do leaves turn in autumn?",
        options: [
          "Green and blue",
          "White and grey",
          "Golden, red, and orange",
          "Pink and purple",
        ],
        correct: 2,
      },
      {
        question: "What does summer bring?",
        options: [
          "Cold winds",
          "Long sunny days",
          "Falling leaves",
          "Short days",
        ],
        correct: 1,
      },
      {
        question: "What sometimes happens in winter?",
        options: [
          "Flowers bloom",
          "Birds return",
          "It snows",
          "Leaves turn golden",
        ],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "The four ___ are spring, summer, autumn, and winter.",
        "In spring, ___ bloom and birds return.",
        "Summer brings long ___ days.",
        "Autumn is when leaves turn golden, red, and ___.",
        "___ arrives with cold winds and short days.",
      ],
      answers: ["seasons", "flowers", "sunny", "orange", "Winter"],
      wordBank: [
        "seasons",
        "flowers",
        "sunny",
        "orange",
        "Winter",
        "months",
        "clouds",
        "Summer",
      ],
    },
    pronunciationWords: [
      {
        word: "autumn",
        syllables: "au·tumn",
        phonetic: "/ˈɔːtəm/",
        example: "Leaves fall in autumn.",
      },
      {
        word: "temperature",
        syllables: "tem·per·a·ture",
        phonetic: "/ˈtɛmprɪtʃər/",
        example: "The temperature drops in winter.",
      },
      {
        word: "golden",
        syllables: "gold·en",
        phonetic: "/ˈɡoʊldən/",
        example: "The golden leaves looked beautiful.",
      },
      {
        word: "season",
        syllables: "sea·son",
        phonetic: "/ˈsiːzən/",
        example: "Each season has its own beauty.",
      },
      {
        word: "migrate",
        syllables: "mi·grate",
        phonetic: "/ˈmaɪɡreɪt/",
        example: "Birds migrate south in winter.",
      },
      {
        word: "hibernate",
        syllables: "hi·ber·nate",
        phonetic: "/ˈhaɪbərneɪt/",
        example: "Bears hibernate during winter.",
      },
      {
        word: "equinox",
        syllables: "e·qui·nox",
        phonetic: "/ˈiːkwɪnɒks/",
        example: "The equinox marks equal day and night.",
      },
      {
        word: "deciduous",
        syllables: "de·cid·u·ous",
        phonetic: "/dɪˈsɪdjuəs/",
        example: "Deciduous trees lose their leaves.",
      },
      {
        word: "solstice",
        syllables: "sol·stice",
        phonetic: "/ˈsɒlstɪs/",
        example: "The summer solstice is the longest day.",
      },
      {
        word: "perennial",
        syllables: "per·en·ni·al",
        phonetic: "/pəˈrɛniəl/",
        example: "Perennial plants return every spring.",
      },
      {
        word: "harvest",
        syllables: "har·vest",
        phonetic: "/ˈhɑːrvɪst/",
        example: "Farmers harvest in autumn.",
      },
      {
        word: "frost",
        syllables: "frost",
        phonetic: "/frɒst/",
        example: "Frost covered the grass.",
      },
      {
        word: "dormant",
        syllables: "dor·mant",
        phonetic: "/ˈdɔːrmənt/",
        example: "Trees are dormant in winter.",
      },
      {
        word: "transition",
        syllables: "tran·si·tion",
        phonetic: "/trænˈzɪʃən/",
        example: "Each season is a transition.",
      },
    ],
    intonationSentences: [
      {
        text: "Autumn is when leaves turn golden and fall to the ground.",
        type: "falling",
        stressedWords: ["golden", "ground"],
        tip: "A descriptive statement ends with a gentle falling tone.",
      },
      {
        text: "Which season is your favourite?",
        type: "rising",
        stressedWords: ["season", "favourite"],
        tip: "A 'which' question may still use a rising tone to show curiosity.",
      },
      {
        text: "Winter can be BITTERLY cold and dark.",
        type: "emphasis",
        stressedWords: ["BITTERLY", "cold"],
        tip: "Stress BITTERLY to convey just how cold winter can be.",
      },
    ],
    recordPassage:
      "Once a poor farmer found a bag of gold coins lying on the road while walking home. He took the bag to the village chief right away. The chief announced to everyone that the farmer had found the lost gold. A rich merchant came forward saying the gold was his. He was greatly surprised by the farmer's honesty and goodness. The merchant gave half the gold coins to the farmer as a reward. The farmer became prosperous and was respected by all. Honesty is truly the best policy.",
  },

  // ─── GRADE 4 C: The Water Cycle ───────────────────────────────────────────
  {
    id: "g4c",
    grade: 4,
    title: "The Water Cycle",
    text: "Water moves around the Earth in a cycle. The sun heats water in oceans, lakes, and rivers. The water turns to steam and goes into the air. The steam cools and forms clouds. When clouds get heavy, rain or snow falls. The water flows back to rivers and oceans. Then the cycle starts all over again.",
    chunks: [
      "Water moves around the Earth",
      "in a cycle.",
      "The sun heats water",
      "in oceans, lakes, and rivers.",
      "The water turns to steam",
      "and goes into the air.",
      "The steam cools",
      "and forms clouds.",
      "When clouds get heavy,",
      "rain or snow falls.",
      "The water flows back",
      "to rivers and oceans.",
      "Then the cycle",
      "starts all over again.",
    ],
    questions: [
      {
        question: "What is the water cycle?",
        options: [
          "The path rivers follow",
          "The continuous movement of water through the environment",
          "The way rain forms in clouds",
          "How oceans are formed",
        ],
        correct: 1,
      },
      {
        question: "What causes water to evaporate?",
        options: ["Wind", "Cold air", "The sun", "Clouds"],
        correct: 2,
      },
      {
        question: "What happens when water vapour rises and cools?",
        options: [
          "It falls as rain",
          "It forms rivers",
          "It condenses into clouds",
          "It returns to the ocean",
        ],
        correct: 2,
      },
      {
        question: "What is precipitation?",
        options: [
          "Evaporation from oceans",
          "Water vapour rising",
          "Rain, snow, or hail falling",
          "Clouds forming in the sky",
        ],
        correct: 2,
      },
      {
        question: "Where does precipitation flow back to?",
        options: [
          "Into the sky",
          "Into rivers, lakes, and oceans",
          "Into underground caves",
          "Into the clouds",
        ],
        correct: 1,
      },
    ],
    missingWords: {
      sentences: [
        "The water cycle is the continuous ___ of water.",
        "The sun causes water to ___ into the atmosphere.",
        "Water vapour ___ and forms clouds as it rises.",
        "___ falls as rain, snow, or hail.",
        "Water flows back into rivers, lakes, and ___ to begin the cycle again.",
      ],
      answers: [
        "movement",
        "evaporate",
        "condenses",
        "Precipitation",
        "oceans",
      ],
      wordBank: [
        "movement",
        "evaporate",
        "condenses",
        "Precipitation",
        "oceans",
        "process",
        "melts",
        "Evaporation",
      ],
    },
    pronunciationWords: [
      {
        word: "evaporate",
        syllables: "e·vap·o·rate",
        phonetic: "/ɪˈvæpəreɪt/",
        example: "Water will evaporate in the heat.",
      },
      {
        word: "condense",
        syllables: "con·dense",
        phonetic: "/kənˈdɛns/",
        example: "Vapour condenses to form clouds.",
      },
      {
        word: "precipitation",
        syllables: "pre·cip·i·ta·tion",
        phonetic: "/prɪˌsɪpɪˈteɪʃən/",
        example: "Rainfall is a type of precipitation.",
      },
      {
        word: "atmosphere",
        syllables: "at·mos·phere",
        phonetic: "/ˈætməsfɪər/",
        example: "Water vapour enters the atmosphere.",
      },
      {
        word: "transpiration",
        syllables: "tran·spir·a·tion",
        phonetic: "/ˌtrænspaɪˈreɪʃən/",
        example: "Plants release water through transpiration.",
      },
      {
        word: "hydrological",
        syllables: "hy·dro·log·i·cal",
        phonetic: "/ˌhaɪdrəˈlɒdʒɪkəl/",
        example: "This is the hydrological cycle.",
      },
      {
        word: "percolate",
        syllables: "per·co·late",
        phonetic: "/ˈpɜːrkəleɪt/",
        example: "Water can percolate through soil.",
      },
      {
        word: "aquifer",
        syllables: "a·qui·fer",
        phonetic: "/ˈækwɪfər/",
        example: "An aquifer stores underground water.",
      },
      {
        word: "sublimation",
        syllables: "sub·li·ma·tion",
        phonetic: "/ˌsʌblɪˈmeɪʃən/",
        example: "Ice turns directly to gas by sublimation.",
      },
      {
        word: "saturated",
        syllables: "sat·u·rat·ed",
        phonetic: "/ˈsætʃəreɪtɪd/",
        example: "The soil was saturated with rain.",
      },
      {
        word: "infiltration",
        syllables: "in·fil·tra·tion",
        phonetic: "/ˌɪnfɪlˈtreɪʃən/",
        example: "Infiltration allows water into the ground.",
      },
      {
        word: "runoff",
        syllables: "run·off",
        phonetic: "/ˈrʌnɒf/",
        example: "Surface runoff fills rivers.",
      },
      {
        word: "watershed",
        syllables: "wa·ter·shed",
        phonetic: "/ˈwɔːtərʃɛd/",
        example: "A watershed drains into one river.",
      },
      {
        word: "glacial",
        syllables: "gla·cial",
        phonetic: "/ˈɡleɪʃəl/",
        example: "Glacial melt adds to sea levels.",
      },
      {
        word: "humidity",
        syllables: "hu·mid·i·ty",
        phonetic: "/hjuːˈmɪdɪti/",
        example: "High humidity makes air feel sticky.",
      },
    ],
    intonationSentences: [
      {
        text: "The water cycle is a continuous process that never stops.",
        type: "falling",
        stressedWords: ["continuous", "never"],
        tip: "End with a falling tone to signal a definitive statement.",
      },
      {
        text: "Can you explain how water evaporates from the ocean?",
        type: "rising",
        stressedWords: ["explain", "evaporates"],
        tip: "A genuine question rises at the end to invite a response.",
      },
      {
        text: "Without the water cycle, life on Earth would be IMPOSSIBLE.",
        type: "emphasis",
        stressedWords: ["IMPOSSIBLE"],
        tip: "Stress IMPOSSIBLE to highlight a dramatic and important consequence.",
      },
    ],
    recordPassage:
      "India is a large and beautiful country in South Asia. It has twenty-eight states and eight union territories. Each state has its own culture, language, food, and traditions. Rajasthan is the largest state and Goa is the smallest state. India has many great rivers like the Ganga, Yamuna, and Brahmaputra. The Himalayan mountains in the north are the highest in the world. India is home to many wild animals including tigers, elephants, and peacocks. India is known all over the world for its unity in diversity.",
  },

  // ─── GRADE 4 D: Ancient Egypt ─────────────────────────────────────────────
  {
    id: "g4d",
    grade: 4,
    title: "Ancient Egypt",
    text: "Ancient Egypt was a great land long, long ago. People there built big pyramids. The pyramids were made for their kings, called pharaohs. The River Nile gave them water to grow food. They used pictures to write. These pictures are called hieroglyphics. Today, people dig in the ground to find old things from Egypt.",
    chunks: [
      "Ancient Egypt was a great land",
      "long, long ago.",
      "People there built",
      "big pyramids.",
      "The pyramids were made",
      "for their kings,",
      "called pharaohs.",
      "The River Nile",
      "gave them water",
      "to grow food.",
      "They used pictures to write.",
      "These pictures are called",
      "hieroglyphics.",
      "Today, people dig in the ground",
      "to find old things from Egypt.",
    ],
    questions: [
      {
        question: "How long did ancient Egyptian civilisation last?",
        options: [
          "One thousand years",
          "Two thousand years",
          "Over three thousand years",
          "Five hundred years",
        ],
        correct: 2,
      },
      {
        question: "What were pyramids built as?",
        options: [
          "Temples for worship",
          "Houses for farmers",
          "Tombs for pharaohs",
          "Schools for children",
        ],
        correct: 2,
      },
      {
        question: "Who were pharaohs considered to be?",
        options: ["Warriors", "Farmers", "Teachers", "Gods on Earth"],
        correct: 3,
      },
      {
        question: "Why was the River Nile essential?",
        options: [
          "It provided fish to eat",
          "It provided water for farming",
          "It protected from enemies",
          "It was used for trade",
        ],
        correct: 1,
      },
      {
        question: "What were hieroglyphics?",
        options: [
          "A type of pyramid",
          "A kind of boat",
          "A system of picture writing",
          "A farming tool",
        ],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "Ancient Egypt lasted over three thousand ___.",
        "Pyramids were built as ___ for pharaohs.",
        "Pharaohs were considered ___ on Earth.",
        "The River Nile provided water for ___ in the desert.",
        "___ is a system of picture writing.",
      ],
      answers: ["years", "tombs", "gods", "farming", "Hieroglyphics"],
      wordBank: [
        "years",
        "tombs",
        "gods",
        "farming",
        "Hieroglyphics",
        "decades",
        "palaces",
        "Archaeology",
      ],
    },
    pronunciationWords: [
      {
        word: "civilisation",
        syllables: "civ·i·li·sa·tion",
        phonetic: "/ˌsɪvɪlaɪˈzeɪʃən/",
        example: "Ancient Egypt was a great civilisation.",
      },
      {
        word: "pharaoh",
        syllables: "phar·aoh",
        phonetic: "/ˈfɛroʊ/",
        example: "The pharaoh ruled all of Egypt.",
      },
      {
        word: "hieroglyphics",
        syllables: "hi·er·o·glyph·ics",
        phonetic: "/ˌhaɪərəˈɡlɪfɪks/",
        example: "Hieroglyphics were written on the walls.",
      },
      {
        word: "archaeologist",
        syllables: "ar·chae·ol·o·gist",
        phonetic: "/ˌɑːrkiˈɒlədʒɪst/",
        example: "An archaeologist found the ancient tomb.",
      },
      {
        word: "mummification",
        syllables: "mum·mi·fi·ca·tion",
        phonetic: "/ˌmʌmɪfɪˈkeɪʃən/",
        example: "Mummification preserved the pharaoh's body.",
      },
      {
        word: "dynasty",
        syllables: "dy·nas·ty",
        phonetic: "/ˈdaɪnəsti/",
        example: "Many pharaohs ruled in the same dynasty.",
      },
      {
        word: "monument",
        syllables: "mon·u·ment",
        phonetic: "/ˈmɒnjʊmənt/",
        example: "The pyramid is a great monument.",
      },
      {
        word: "inscription",
        syllables: "in·scrip·tion",
        phonetic: "/ɪnˈskrɪpʃən/",
        example: "The inscription told the story.",
      },
      {
        word: "deity",
        syllables: "de·i·ty",
        phonetic: "/ˈdiːɪti/",
        example: "Ra was the sun deity.",
      },
      {
        word: "excavation",
        syllables: "ex·ca·va·tion",
        phonetic: "/ˌɛkskəˈveɪʃən/",
        example: "Excavation revealed ancient artefacts.",
      },
      {
        word: "artefact",
        syllables: "ar·te·fact",
        phonetic: "/ˈɑːrtɪfækt/",
        example: "Each artefact told a story.",
      },
      {
        word: "papyrus",
        syllables: "pa·py·rus",
        phonetic: "/pəˈpaɪrəs/",
        example: "Scribes wrote on papyrus scrolls.",
      },
      {
        word: "sovereignty",
        syllables: "sov·er·eign·ty",
        phonetic: "/ˈsɒvrɪnti/",
        example: "Egypt's sovereignty lasted thousands of years.",
      },
      {
        word: "irrigation",
        syllables: "ir·ri·ga·tion",
        phonetic: "/ˌɪrɪˈɡeɪʃən/",
        example: "Irrigation used water from the Nile.",
      },
      {
        word: "sarcophagus",
        syllables: "sar·coph·a·gus",
        phonetic: "/sɑːrˈkɒfəɡəs/",
        example: "The mummy was placed in a sarcophagus.",
      },
    ],
    intonationSentences: [
      {
        text: "Ancient Egypt was one of the world's greatest civilisations.",
        type: "falling",
        stressedWords: ["greatest", "civilisations"],
        tip: "A historical fact is delivered with authority and a falling tone.",
      },
      {
        text: "Can you imagine living in ancient Egypt thousands of years ago?",
        type: "rising",
        stressedWords: ["imagine", "thousands"],
        tip: "An imaginative question uses a rising tone to spark curiosity.",
      },
      {
        text: "The pyramids are TRULY one of humanity's most astonishing achievements.",
        type: "emphasis",
        stressedWords: ["TRULY", "astonishing"],
        tip: "Stress TRULY to add sincerity and emphasis to your admiration.",
      },
    ],
    recordPassage:
      "Once a poor boy named Manu found a magic paintbrush in an old forest. Whatever he painted with it came to life instantly. He painted food for the hungry and water for the thirsty villagers. A greedy king heard about the magic brush and wanted it for himself. He ordered Manu to paint him a mountain of gold. Manu painted a golden island far away in the middle of a stormy sea. The king sailed out to reach it on a small boat. The waves grew stronger and the king was never seen again. Greed leads only to destruction.",
  },

  // ─── GRADE 5 C: The Solar System ──────────────────────────────────────────
  {
    id: "g5c",
    grade: 5,
    title: "The Solar System",
    text: "Our solar system has the Sun and eight planets. The Sun is very big and gives us light and heat. The four planets near the Sun are made of rock. The four planets far from the Sun are made of gas. They are much bigger. Saturn has rings around it made of ice and rock. People who study space work hard to find out more about it.",
    chunks: [
      "Our solar system has",
      "the Sun and eight planets.",
      "The Sun is very big",
      "and gives us light and heat.",
      "The four planets near the Sun",
      "are made of rock.",
      "The four planets far from the Sun",
      "are made of gas.",
      "They are much bigger.",
      "Saturn has rings around it",
      "made of ice and rock.",
      "People who study space",
      "work hard to find out more.",
    ],
    questions: [
      {
        question:
          "What percentage of the solar system's mass does the Sun account for?",
        options: [
          "Over fifty percent",
          "Over seventy-five percent",
          "Over ninety-nine percent",
          "Exactly one hundred percent",
        ],
        correct: 2,
      },
      {
        question: "How many planets are in our solar system?",
        options: ["Six", "Seven", "Eight", "Nine"],
        correct: 2,
      },
      {
        question: "Which planets are described as gas giants?",
        options: [
          "Mercury, Venus, Earth, Mars",
          "Jupiter, Saturn, Uranus, Neptune",
          "Saturn, Uranus, Neptune, Pluto",
          "Earth, Mars, Jupiter, Saturn",
        ],
        correct: 1,
      },
      {
        question: "What are Saturn's rings made of?",
        options: [
          "Clouds of gas",
          "Molten rock and lava",
          "Billions of ice and rock particles",
          "Dust and sand",
        ],
        correct: 2,
      },
      {
        question: "Where might mysterious undiscovered objects be found?",
        options: [
          "Near the Sun",
          "Between Earth and Mars",
          "Beyond Neptune",
          "Inside Saturn's rings",
        ],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "Our solar system consists of the Sun and eight ___.",
        "The Sun provides the energy that ___ life on Earth.",
        "Mercury, Venus, Earth, and Mars are ___ planets.",
        "Saturn's rings are composed of billions of ___ and rock particles.",
        "___ continue to study the outer edges of our solar system.",
      ],
      answers: ["planets", "sustains", "rocky", "ice", "Astronomers"],
      wordBank: [
        "planets",
        "sustains",
        "rocky",
        "ice",
        "Astronomers",
        "moons",
        "destroys",
        "gaseous",
      ],
    },
    pronunciationWords: [
      {
        word: "gravitational",
        syllables: "grav·i·ta·tion·al",
        phonetic: "/ˌɡrævɪˈteɪʃənəl/",
        example: "Gravitational force keeps planets in orbit.",
      },
      {
        word: "asteroid",
        syllables: "as·ter·oid",
        phonetic: "/ˈæstərɔɪd/",
        example: "An asteroid orbits the sun.",
      },
      {
        word: "astronomical",
        syllables: "as·tro·nom·i·cal",
        phonetic: "/ˌæstrəˈnɒmɪkəl/",
        example: "Astronomical distances are measured in light-years.",
      },
      {
        word: "composition",
        syllables: "com·po·si·tion",
        phonetic: "/ˌkɒmpəˈzɪʃən/",
        example: "Each planet has a unique composition.",
      },
      {
        word: "elliptical",
        syllables: "el·lip·ti·cal",
        phonetic: "/ɪˈlɪptɪkəl/",
        example: "Planets follow an elliptical orbit.",
      },
      {
        word: "nebula",
        syllables: "neb·u·la",
        phonetic: "/ˈnɛbjʊlə/",
        example: "Stars form inside a nebula.",
      },
      {
        word: "heliocentric",
        syllables: "he·li·o·cen·tric",
        phonetic: "/ˌhiːlɪoʊˈsɛntrɪk/",
        example: "The heliocentric model places the sun at the centre.",
      },
      {
        word: "exoplanet",
        syllables: "ex·o·plan·et",
        phonetic: "/ˈɛksoʊplænɪt/",
        example: "Scientists discovered a new exoplanet.",
      },
      {
        word: "luminosity",
        syllables: "lu·mi·nos·i·ty",
        phonetic: "/ˌluːmɪˈnɒsɪti/",
        example: "The star's luminosity varies.",
      },
      {
        word: "magnetosphere",
        syllables: "mag·ne·to·sphere",
        phonetic: "/mæɡˈniːtəsfɪər/",
        example: "Earth's magnetosphere protects life.",
      },
      {
        word: "planetary",
        syllables: "plan·e·ta·ry",
        phonetic: "/ˈplænɪteri/",
        example: "Planetary motion follows Kepler's laws.",
      },
      {
        word: "velocity",
        syllables: "ve·loc·i·ty",
        phonetic: "/vɪˈlɒsɪti/",
        example: "Orbital velocity keeps satellites moving.",
      },
      {
        word: "spectrum",
        syllables: "spec·trum",
        phonetic: "/ˈspɛktrəm/",
        example: "Light bends into a spectrum of colours.",
      },
      {
        word: "rotation",
        syllables: "ro·ta·tion",
        phonetic: "/roʊˈteɪʃən/",
        example: "Earth's rotation causes day and night.",
      },
    ],
    intonationSentences: [
      {
        text: "The Sun accounts for over ninety-nine percent of the solar system's mass.",
        type: "falling",
        stressedWords: ["ninety-nine", "mass"],
        tip: "A precise scientific fact is delivered with a confident falling tone.",
      },
      {
        text: "Could there be undiscovered planets beyond Neptune waiting to be found?",
        type: "rising",
        stressedWords: ["undiscovered", "beyond"],
        tip: "A speculative question uses a rising tone to express wonder and uncertainty.",
      },
      {
        text: "The scale of our solar system is ALMOST INCOMPREHENSIBLE to the human mind.",
        type: "emphasis",
        stressedWords: ["ALMOST", "INCOMPREHENSIBLE"],
        tip: "Stressing both words together conveys the mind-bending nature of astronomical scale.",
      },
    ],
    recordPassage:
      "Natural disasters are powerful events caused by forces of nature that cause great harm to people, animals, and the environment. Earthquakes happen when the layers of rock beneath the ground shift and shake suddenly. Floods occur when rivers overflow their banks after very heavy rainfall. Cyclones are violent storms with extremely strong winds and heavy rain that form over warm seas. Droughts happen when a region receives very little or no rainfall for a long time. Volcanic eruptions send hot lava and ash into the surrounding areas. We cannot stop natural disasters but we can prepare for them. Early warnings, safe buildings, and emergency shelters save many lives during disasters.",
  },

  // ─── GRADE 5 D: Rainforests ───────────────────────────────────────────────
  {
    id: "g5d",
    grade: 5,
    title: "Rainforests",
    text: "Rain forests are large, thick forests. More than half of all animals and plants in the world live in rain forests. The trees take in bad air and make clean air. The Amazon rain forest makes a lot of the clean air we all breathe. But people are cutting down the trees to make farms and build roads. This is harming the forests. We need to stop this and protect rain forests for all living things.",
    chunks: [
      "Rain forests are large,",
      "thick forests.",
      "More than half of all animals",
      "and plants in the world",
      "live in rain forests.",
      "The trees take in bad air",
      "and make clean air.",
      "The Amazon rain forest",
      "makes a lot of the clean air",
      "we all breathe.",
      "But people are cutting down",
      "the trees",
      "to make farms and build roads.",
      "This is harming the forests.",
      "We need to stop this",
      "and protect rain forests.",
    ],
    questions: [
      {
        question:
          "What fraction of the world's species do rainforests harbour?",
        options: [
          "About a quarter",
          "About a third",
          "More than half",
          "Almost all",
        ],
        correct: 2,
      },
      {
        question: "What percentage of the land surface do rainforests cover?",
        options: [
          "About two percent",
          "About four percent",
          "About six percent",
          "About ten percent",
        ],
        correct: 2,
      },
      {
        question: "What title has the Amazon rainforest been given?",
        options: [
          "Heart of the Earth",
          "Lungs of the Earth",
          "Roots of the Earth",
          "Veins of the Earth",
        ],
        correct: 1,
      },
      {
        question: "How do rainforests help regulate the global climate?",
        options: [
          "By reflecting sunlight into space",
          "By absorbing carbon dioxide and releasing oxygen",
          "By producing rainfall through evaporation",
          "By cooling the oceans with cold air",
        ],
        correct: 1,
      },
      {
        question: "What is the main cause of deforestation?",
        options: [
          "Natural disasters",
          "Climate change",
          "Agricultural expansion, logging, and urbanisation",
          "Ocean flooding",
        ],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "Rainforests harbour more than half of the world's plant and animal ___ .",
        "The closed ___ absorbs sunlight in a rainforest.",
        "Rainforests absorb carbon dioxide and release ___ through photosynthesis.",
        "The Amazon rainforest is called the '___ of the Earth'.",
        "___ driven by farming and logging threatens rainforests.",
      ],
      answers: ["species", "canopy", "oxygen", "lungs", "Deforestation"],
      wordBank: [
        "species",
        "canopy",
        "oxygen",
        "lungs",
        "Deforestation",
        "types",
        "branches",
        "carbon",
      ],
    },
    pronunciationWords: [
      {
        word: "biodiversity",
        syllables: "bi·o·di·ver·si·ty",
        phonetic: "/ˌbaɪoʊdaɪˈvɜːrsɪti/",
        example: "Rainforests support extraordinary biodiversity.",
      },
      {
        word: "photosynthesis",
        syllables: "pho·to·syn·the·sis",
        phonetic: "/ˌfoʊtoʊˈsɪnθɪsɪs/",
        example: "Photosynthesis turns sunlight into food.",
      },
      {
        word: "deforestation",
        syllables: "de·for·est·a·tion",
        phonetic: "/dɪˌfɒrɪˈsteɪʃən/",
        example: "Deforestation is destroying rainforests.",
      },
      {
        word: "ecosystem",
        syllables: "e·co·sys·tem",
        phonetic: "/ˈiːkoʊˌsɪstəm/",
        example: "The ecosystem is delicately balanced.",
      },
      {
        word: "indigenous",
        syllables: "in·dig·e·nous",
        phonetic: "/ɪnˈdɪdʒɪnəs/",
        example: "Indigenous communities protect the forest.",
      },
      {
        word: "canopy",
        syllables: "can·o·py",
        phonetic: "/ˈkænəpi/",
        example: "The canopy blocks most sunlight.",
      },
      {
        word: "stratification",
        syllables: "strat·i·fi·ca·tion",
        phonetic: "/ˌstrætɪfɪˈkeɪʃən/",
        example: "Rainforests show clear stratification.",
      },
      {
        word: "epiphyte",
        syllables: "ep·i·phyte",
        phonetic: "/ˈɛpɪfaɪt/",
        example: "An epiphyte grows on another plant.",
      },
      {
        word: "transpiration",
        syllables: "tran·spir·a·tion",
        phonetic: "/ˌtrænspaɪˈreɪʃən/",
        example: "Transpiration adds moisture to the air.",
      },
      {
        word: "microclimate",
        syllables: "mi·cro·cli·mate",
        phonetic: "/ˈmaɪkroʊklaɪmɪt/",
        example: "The forest has its own microclimate.",
      },
      {
        word: "herbivore",
        syllables: "her·bi·vore",
        phonetic: "/ˈhɜːrbɪvɔːr/",
        example: "A herbivore eats only plants.",
      },
      {
        word: "symbiosis",
        syllables: "sym·bi·o·sis",
        phonetic: "/ˌsɪmbaɪˈoʊsɪs/",
        example: "The plants and insects live in symbiosis.",
      },
      {
        word: "resilience",
        syllables: "re·sil·ience",
        phonetic: "/rɪˈzɪliəns/",
        example: "The forest shows great resilience.",
      },
      {
        word: "conservation",
        syllables: "con·ser·va·tion",
        phonetic: "/ˌkɒnsərˈveɪʃən/",
        example: "Conservation protects endangered species.",
      },
    ],
    intonationSentences: [
      {
        text: "Rainforests harbour more than half of all species on Earth.",
        type: "falling",
        stressedWords: ["more than half", "species"],
        tip: "Deliver a striking statistic with a confident, falling tone.",
      },
      {
        text: "Is it already too late to stop the destruction of the Amazon rainforest?",
        type: "rising",
        stressedWords: ["already", "destruction"],
        tip: "A challenging question with a rising tone invites the listener to reflect.",
      },
      {
        text: "We are destroying our planet's MOST VITAL ecosystems at an alarming rate.",
        type: "emphasis",
        stressedWords: ["MOST", "VITAL"],
        tip: "Stressing MOST VITAL underscores the irreplaceable importance of rainforests.",
      },
    ],
    recordPassage:
      "The river Ganga has given life to millions of people for thousands of years in India. Farmers use its water to grow wheat, rice, and sugarcane in the fertile plains. People bathe in its holy waters and consider it sacred. Ancient temples and ghats line its banks in the holy city of Varanasi. But today the great river is in danger from industrial pollution and household waste. Factory chemicals and plastic garbage are making its water unclean and harmful. Thousands of young volunteers are working hard to clean and protect the river. A clean and flowing Ganga will be our most precious gift to future generations.",
  },
];

export const getPassageByGrade = (grade: number, index = 0): Passage => {
  const gradePassages = passages.filter((p) => p.grade === grade);
  if (gradePassages.length === 0) return passages[0];
  const safeIndex = Math.min(index, gradePassages.length - 1);
  return gradePassages[safeIndex];
};

export const hasMorePassages = (grade: number, index: number): boolean => {
  const gradePassages = passages.filter((p) => p.grade === grade);
  return index < gradePassages.length;
};
