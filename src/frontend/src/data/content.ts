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
  sentences: string[]; // with ___ blanks
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
  // ── GRADE 1 – Passage A ──────────────────────────────────────────────────
  {
    id: "g1",
    grade: 1,
    title: "The Red Hat",
    text: "Sam has a red hat. He likes to wear it every day. One day the wind blew his hat away. Sam ran fast to get it back. He was very happy when he found his hat.",
    chunks: [
      "Sam has",
      "a red hat.",
      "He likes to wear it",
      "every day.",
      "One day",
      "the wind blew",
      "his hat away.",
      "Sam ran fast",
      "to get it back.",
      "He was very happy",
      "when he found his hat.",
    ],
    questions: [
      {
        question: "What color is Sam's hat?",
        options: ["Blue", "Red", "Green", "Yellow"],
        correct: 1,
      },
      {
        question: "What happened to the hat?",
        options: [
          "It got wet",
          "It was lost",
          "The wind blew it away",
          "Sam gave it away",
        ],
        correct: 2,
      },
      {
        question: "How did Sam feel when he found his hat?",
        options: ["Sad", "Angry", "Scared", "Happy"],
        correct: 3,
      },
      {
        question: "What did Sam do when the hat blew away?",
        options: [
          "He cried",
          "He ran fast",
          "He went home",
          "He asked for help",
        ],
        correct: 1,
      },
      {
        question: "When did Sam wear his red hat?",
        options: ["Only on weekends", "Never", "Every day", "Only at school"],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "Sam has a ___ hat.",
        "One day the ___ blew his hat away.",
        "Sam ran ___ to get it back.",
        "He was very ___ when he found his hat.",
      ],
      answers: ["red", "wind", "fast", "happy"],
      wordBank: ["red", "wind", "fast", "happy", "blue", "rain", "slow", "sad"],
    },
    pronunciationWords: [
      {
        word: "every",
        syllables: "ev·ery",
        phonetic: "/ˈɛv.ri/",
        example: "He likes to wear it every day.",
      },
      {
        word: "happy",
        syllables: "hap·py",
        phonetic: "/ˈhæp.i/",
        example: "He was very happy.",
      },
      {
        word: "found",
        syllables: "found",
        phonetic: "/faʊnd/",
        example: "He found his hat.",
      },
      {
        word: "blew",
        syllables: "blew",
        phonetic: "/bluː/",
        example: "The wind blew his hat away.",
      },
      {
        word: "again",
        syllables: "a·gain",
        phonetic: "/əˈɡɛn/",
        example: "He wore it again.",
      },
      {
        word: "wear",
        syllables: "wear",
        phonetic: "/wɛr/",
        example: "He likes to wear his hat.",
      },
    ],
    intonationSentences: [
      {
        text: "Sam has a red hat.",
        type: "falling",
        stressedWords: ["red", "hat"],
        tip: "Your voice goes DOWN at the end of statements.",
      },
      {
        text: "Did the wind blow his hat?",
        type: "rising",
        stressedWords: ["wind", "blow"],
        tip: "Your voice goes UP at the end of questions.",
      },
      {
        text: "He was VERY happy!",
        type: "emphasis",
        stressedWords: ["VERY", "happy"],
        tip: "Say the BOLD word louder and stronger.",
      },
      {
        text: "Sam ran fast!",
        type: "falling",
        stressedWords: ["fast"],
        tip: "Your voice goes DOWN at the end of exclamations too.",
      },
    ],
    recordPassage:
      "Sam has a red hat. He likes to wear it every day. One day the wind blew his hat away. Sam ran fast to get it back.",
  },

  // ── GRADE 1 – Passage B ──────────────────────────────────────────────────
  {
    id: "g1b",
    grade: 1,
    title: "The Blue Bird",
    text: "A little blue bird sat in a big tree. She had a soft nest made of twigs and grass. One morning she laid three small eggs. She sat on the eggs to keep them warm. Soon the eggs cracked and three baby birds came out. The mother bird sang a sweet song.",
    chunks: [
      "A little blue bird",
      "sat in a big tree.",
      "She had a soft nest",
      "made of twigs and grass.",
      "One morning",
      "she laid three small eggs.",
      "She sat on the eggs",
      "to keep them warm.",
      "Soon the eggs cracked",
      "and three baby birds came out.",
      "The mother bird sang a sweet song.",
    ],
    questions: [
      {
        question: "What color was the bird?",
        options: ["Red", "Green", "Blue", "Yellow"],
        correct: 2,
      },
      {
        question: "Where did the bird have her nest?",
        options: ["On the ground", "In a big tree", "On a roof", "In a bush"],
        correct: 1,
      },
      {
        question: "How many eggs did the bird lay?",
        options: ["One", "Two", "Four", "Three"],
        correct: 3,
      },
      {
        question: "Why did the bird sit on her eggs?",
        options: [
          "To hide them",
          "To crush them",
          "To keep them warm",
          "To count them",
        ],
        correct: 2,
      },
      {
        question: "What did the mother bird do at the end?",
        options: [
          "She flew away",
          "She sang a sweet song",
          "She slept",
          "She found food",
        ],
        correct: 1,
      },
    ],
    missingWords: {
      sentences: [
        "A blue bird sat in a big ___.",
        "Her nest was made of twigs and ___.",
        "She laid three small ___.",
        "The mother bird sang a ___ song.",
      ],
      answers: ["tree", "grass", "eggs", "sweet"],
      wordBank: [
        "tree",
        "grass",
        "eggs",
        "sweet",
        "pond",
        "mud",
        "stones",
        "loud",
      ],
    },
    pronunciationWords: [
      {
        word: "little",
        syllables: "lit·tle",
        phonetic: "/ˈlɪt.əl/",
        example: "A little blue bird sat in the tree.",
      },
      {
        word: "morning",
        syllables: "morn·ing",
        phonetic: "/ˈmɔːr.nɪŋ/",
        example: "One morning she laid three eggs.",
      },
      {
        word: "cracked",
        syllables: "cracked",
        phonetic: "/krækt/",
        example: "The eggs cracked open.",
      },
      {
        word: "mother",
        syllables: "moth·er",
        phonetic: "/ˈmʌð.ər/",
        example: "The mother bird sang.",
      },
      {
        word: "sweet",
        syllables: "sweet",
        phonetic: "/swiːt/",
        example: "She sang a sweet song.",
      },
      {
        word: "soft",
        syllables: "soft",
        phonetic: "/sɒft/",
        example: "She had a soft nest.",
      },
    ],
    intonationSentences: [
      {
        text: "A little blue bird sat in the tree.",
        type: "falling",
        stressedWords: ["blue", "tree"],
        tip: "Voice falls at the end of statements.",
      },
      {
        text: "Did the eggs crack open?",
        type: "rising",
        stressedWords: ["eggs", "crack"],
        tip: "Voice rises at the end of yes/no questions.",
      },
      {
        text: "THREE baby birds came out!",
        type: "emphasis",
        stressedWords: ["THREE"],
        tip: "Stress the number to show surprise.",
      },
      {
        text: "She sang a SWEET song.",
        type: "emphasis",
        stressedWords: ["SWEET"],
        tip: "Describing words deserve extra stress.",
      },
    ],
    recordPassage:
      "A little blue bird sat in a big tree. She had a soft nest made of twigs and grass. One morning she laid three small eggs. She sat on the eggs to keep them warm.",
  },

  // ── GRADE 2 – Passage A ──────────────────────────────────────────────────
  {
    id: "g2",
    grade: 2,
    title: "A Day at the Farm",
    text: "Lily visited her grandpa's farm last summer. There were cows, chickens, and a big brown horse. Lily helped feed the animals every morning. The horse was her favourite because it had a long golden mane. Grandpa taught Lily how to ride the horse slowly around the field. It was the best day of her life.",
    chunks: [
      "Lily visited",
      "her grandpa's farm",
      "last summer.",
      "There were cows,",
      "chickens,",
      "and a big brown horse.",
      "Lily helped feed",
      "the animals",
      "every morning.",
      "The horse was her favourite",
      "because it had",
      "a long golden mane.",
      "Grandpa taught Lily",
      "how to ride the horse",
      "slowly around the field.",
      "It was the best day",
      "of her life.",
    ],
    questions: [
      {
        question: "Where did Lily visit last summer?",
        options: ["A zoo", "A park", "Her grandpa's farm", "A market"],
        correct: 2,
      },
      {
        question: "What was Lily's favourite animal?",
        options: ["Cow", "Chicken", "Dog", "Horse"],
        correct: 3,
      },
      {
        question: "What did Lily learn to do?",
        options: ["Milk a cow", "Ride a horse", "Feed chickens", "Plant seeds"],
        correct: 1,
      },
      {
        question: "What colour was the horse's mane?",
        options: ["Brown", "White", "Black", "Golden"],
        correct: 3,
      },
      {
        question: "When did Lily help feed the animals?",
        options: [
          "Every evening",
          "Every morning",
          "Only on Sundays",
          "At noon",
        ],
        correct: 1,
      },
    ],
    missingWords: {
      sentences: [
        "Lily visited her grandpa's ___ last summer.",
        "The horse had a long golden ___.",
        "Grandpa taught Lily how to ___ the horse.",
        "It was the ___ day of her life.",
      ],
      answers: ["farm", "mane", "ride", "best"],
      wordBank: ["farm", "mane", "ride", "best", "zoo", "tail", "run", "good"],
    },
    pronunciationWords: [
      {
        word: "visited",
        syllables: "vis·it·ed",
        phonetic: "/ˈvɪz.ɪ.tɪd/",
        example: "Lily visited her grandpa's farm.",
      },
      {
        word: "animals",
        syllables: "an·i·mals",
        phonetic: "/ˈæn.ɪ.məlz/",
        example: "She fed the animals.",
      },
      {
        word: "favourite",
        syllables: "fa·vour·ite",
        phonetic: "/ˈfeɪ.vər.ɪt/",
        example: "The horse was her favourite.",
      },
      {
        word: "golden",
        syllables: "gol·den",
        phonetic: "/ˈɡoʊl.dən/",
        example: "It had a golden mane.",
      },
      {
        word: "morning",
        syllables: "morn·ing",
        phonetic: "/ˈmɔːr.nɪŋ/",
        example: "Every morning she helped.",
      },
      {
        word: "slowly",
        syllables: "slow·ly",
        phonetic: "/ˈsloʊ.li/",
        example: "She rode slowly.",
      },
      {
        word: "because",
        syllables: "be·cause",
        phonetic: "/bɪˈkɔːz/",
        example: "She loved it because it was kind.",
      },
      {
        word: "summer",
        syllables: "sum·mer",
        phonetic: "/ˈsʌm.ər/",
        example: "She came last summer.",
      },
    ],
    intonationSentences: [
      {
        text: "Lily visited her grandpa's farm.",
        type: "falling",
        stressedWords: ["grandpa's", "farm"],
        tip: "Your voice goes DOWN at the end of statements.",
      },
      {
        text: "Did you see the golden horse?",
        type: "rising",
        stressedWords: ["golden", "horse"],
        tip: "Your voice goes UP at the end of questions.",
      },
      {
        text: "It was the BEST day of her life!",
        type: "emphasis",
        stressedWords: ["BEST"],
        tip: "Say the BOLD word with extra energy.",
      },
      {
        text: "Grandpa taught Lily to ride slowly.",
        type: "falling",
        stressedWords: ["taught", "slowly"],
        tip: "Stress the important action words.",
      },
    ],
    recordPassage:
      "Lily visited her grandpa's farm last summer. There were cows, chickens, and a big brown horse. The horse was her favourite because it had a long golden mane.",
  },

  // ── GRADE 2 – Passage B ──────────────────────────────────────────────────
  {
    id: "g2b",
    grade: 2,
    title: "The School Garden",
    text: "The students in Class Two planted a garden behind their school. They dug small holes and dropped seeds inside. Mrs. Green showed them how to water the plants every day. After two weeks, tiny green shoots appeared. Ben planted tomatoes and Priya planted sunflowers. By the end of term, the garden was full of colour and everyone was proud of their work.",
    chunks: [
      "The students in Class Two",
      "planted a garden",
      "behind their school.",
      "They dug small holes",
      "and dropped seeds inside.",
      "Mrs. Green showed them",
      "how to water the plants",
      "every day.",
      "After two weeks,",
      "tiny green shoots appeared.",
      "Ben planted tomatoes",
      "and Priya planted sunflowers.",
      "By the end of term,",
      "the garden was full of colour",
      "and everyone was proud of their work.",
    ],
    questions: [
      {
        question: "Where did the students plant their garden?",
        options: [
          "In the classroom",
          "At home",
          "Behind their school",
          "In a park",
        ],
        correct: 2,
      },
      {
        question: "What did Mrs. Green teach the students?",
        options: [
          "How to sing",
          "How to water plants",
          "How to draw",
          "How to read",
        ],
        correct: 1,
      },
      {
        question: "What did Ben plant?",
        options: ["Sunflowers", "Beans", "Tomatoes", "Carrots"],
        correct: 2,
      },
      {
        question: "How long did it take for shoots to appear?",
        options: ["One week", "Three weeks", "A month", "Two weeks"],
        correct: 3,
      },
      {
        question: "How did the students feel at the end of term?",
        options: ["Bored", "Sad", "Proud", "Tired"],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "The students planted a garden ___ their school.",
        "They dug small holes and dropped ___ inside.",
        "After two weeks, tiny green ___ appeared.",
        "Everyone was ___ of their work.",
      ],
      answers: ["behind", "seeds", "shoots", "proud"],
      wordBank: [
        "behind",
        "seeds",
        "shoots",
        "proud",
        "near",
        "flowers",
        "roots",
        "happy",
      ],
    },
    pronunciationWords: [
      {
        word: "planted",
        syllables: "plant·ed",
        phonetic: "/ˈplæn.tɪd/",
        example: "They planted seeds in the garden.",
      },
      {
        word: "appeared",
        syllables: "ap·peared",
        phonetic: "/əˈpɪərd/",
        example: "Tiny shoots appeared after two weeks.",
      },
      {
        word: "sunflowers",
        syllables: "sun·flow·ers",
        phonetic: "/ˈsʌnˌflaʊ.ərz/",
        example: "Priya planted sunflowers.",
      },
      {
        word: "colour",
        syllables: "col·our",
        phonetic: "/ˈkʌl.ər/",
        example: "The garden was full of colour.",
      },
      {
        word: "everyone",
        syllables: "ev·ery·one",
        phonetic: "/ˈɛv.ri.wʌn/",
        example: "Everyone was proud.",
      },
      {
        word: "tomatoes",
        syllables: "to·ma·toes",
        phonetic: "/təˈmeɪ.toʊz/",
        example: "Ben planted tomatoes.",
      },
    ],
    intonationSentences: [
      {
        text: "The students planted a garden.",
        type: "falling",
        stressedWords: ["planted", "garden"],
        tip: "Voice falls on key action words.",
      },
      {
        text: "Did you water the plants today?",
        type: "rising",
        stressedWords: ["water", "today"],
        tip: "Voice rises at the end of questions.",
      },
      {
        text: "The garden was FULL of colour!",
        type: "emphasis",
        stressedWords: ["FULL"],
        tip: "Stress FULL to show how impressive it was.",
      },
      {
        text: "Everyone was PROUD of their work.",
        type: "emphasis",
        stressedWords: ["PROUD"],
        tip: "Feeling words deserve extra stress.",
      },
    ],
    recordPassage:
      "The students in Class Two planted a garden behind their school. They dug small holes and dropped seeds inside. After two weeks, tiny green shoots appeared.",
  },

  // ── GRADE 3 – Passage A ──────────────────────────────────────────────────
  {
    id: "g3",
    grade: 3,
    title: "The Lost Puppy",
    text: "One rainy afternoon, Maya found a small brown puppy hiding under a park bench. It was shivering and looked very scared. Maya gently picked it up and wrapped it in her jacket. She checked for a collar but found none. Maya decided to take the puppy home and make a lost dog poster. She put the posters around the neighbourhood. Three days later, a little boy named Tom came to her door. He had been searching everywhere for his puppy, Biscuit. Maya felt both happy and a little sad as she handed Biscuit back to Tom.",
    chunks: [
      "One rainy afternoon,",
      "Maya found",
      "a small brown puppy",
      "hiding under a park bench.",
      "It was shivering",
      "and looked very scared.",
      "Maya gently picked it up",
      "and wrapped it",
      "in her jacket.",
      "She checked for a collar",
      "but found none.",
      "Maya decided to take the puppy home",
      "and make a lost dog poster.",
      "She put the posters",
      "around the neighbourhood.",
      "Three days later,",
      "a little boy named Tom",
      "came to her door.",
      "He had been searching everywhere",
      "for his puppy, Biscuit.",
      "Maya felt both happy and a little sad",
      "as she handed Biscuit back to Tom.",
    ],
    questions: [
      {
        question: "Where did Maya find the puppy?",
        options: [
          "In her garden",
          "Under a park bench",
          "At the school",
          "Near a shop",
        ],
        correct: 1,
      },
      {
        question: "What did Maya do to help find the owner?",
        options: [
          "Posted online",
          "Called the police",
          "Made lost dog posters",
          "Asked neighbours directly",
        ],
        correct: 2,
      },
      {
        question: "What was the puppy's name?",
        options: ["Brownie", "Biscuit", "Buddy", "Buster"],
        correct: 1,
      },
      {
        question: "How did Maya feel when she gave the puppy back?",
        options: ["Only happy", "Only sad", "Both happy and sad", "Angry"],
        correct: 2,
      },
      {
        question: "What did Maya wrap the puppy in?",
        options: ["A blanket", "A towel", "Her jacket", "A scarf"],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "Maya found a puppy hiding under a park ___.",
        "The puppy was ___ and looked very scared.",
        "She wrapped the puppy in her ___.",
        "A little boy named ___ came to her door.",
      ],
      answers: ["bench", "shivering", "jacket", "Tom"],
      wordBank: [
        "bench",
        "shivering",
        "jacket",
        "Tom",
        "tree",
        "barking",
        "bag",
        "Sam",
      ],
    },
    pronunciationWords: [
      {
        word: "afternoon",
        syllables: "af·ter·noon",
        phonetic: "/ˌæf.tərˈnuːn/",
        example: "One rainy afternoon she found the puppy.",
      },
      {
        word: "shivering",
        syllables: "shiv·er·ing",
        phonetic: "/ˈʃɪv.ər.ɪŋ/",
        example: "The puppy was shivering.",
      },
      {
        word: "gently",
        syllables: "gent·ly",
        phonetic: "/ˈdʒɛnt.li/",
        example: "Maya gently picked it up.",
      },
      {
        word: "neighbourhood",
        syllables: "neigh·bour·hood",
        phonetic: "/ˈneɪ.bər.hʊd/",
        example: "She put posters around the neighbourhood.",
      },
      {
        word: "searching",
        syllables: "search·ing",
        phonetic: "/ˈsɜːr.tʃɪŋ/",
        example: "He had been searching everywhere.",
      },
      {
        word: "decided",
        syllables: "de·ci·ded",
        phonetic: "/dɪˈsaɪ.dɪd/",
        example: "Maya decided to take it home.",
      },
      {
        word: "collar",
        syllables: "col·lar",
        phonetic: "/ˈkɒl.ər/",
        example: "She checked for a collar.",
      },
      {
        word: "wrapped",
        syllables: "wrapped",
        phonetic: "/ræpt/",
        example: "She wrapped it in her jacket.",
      },
    ],
    intonationSentences: [
      {
        text: "Maya found a small puppy.",
        type: "falling",
        stressedWords: ["found", "puppy"],
        tip: "Your voice falls at the end of this statement.",
      },
      {
        text: "Is this your puppy, Biscuit?",
        type: "rising",
        stressedWords: ["your", "Biscuit"],
        tip: "Your voice rises at the end of yes/no questions.",
      },
      {
        text: "She was SHIVERING in the cold rain!",
        type: "emphasis",
        stressedWords: ["SHIVERING", "cold"],
        tip: "Stress the feeling word to show emotion.",
      },
      {
        text: "Three days LATER, Tom came to the door.",
        type: "emphasis",
        stressedWords: ["LATER"],
        tip: "Stress time words to show a change.",
      },
    ],
    recordPassage:
      "One rainy afternoon, Maya found a small brown puppy hiding under a park bench. It was shivering and looked very scared. Maya gently picked it up and wrapped it in her jacket.",
  },

  // ── GRADE 3 – Passage B ──────────────────────────────────────────────────
  {
    id: "g3b",
    grade: 3,
    title: "The Old Lighthouse",
    text: "Every summer, the Harrison family drove to the coast to visit an old lighthouse. The lighthouse had stood on the rocky cliff for over a hundred years. Mia loved climbing the spiral staircase to reach the lamp room at the top. From there, she could see fishing boats dotting the horizon far below. The keeper, Mr. Finn, told them stories about ships he had guided safely to shore during terrible storms. On their last evening, the lamp glowed bright orange as the sun set behind the sea.",
    chunks: [
      "Every summer,",
      "the Harrison family",
      "drove to the coast",
      "to visit an old lighthouse.",
      "The lighthouse had stood",
      "on the rocky cliff",
      "for over a hundred years.",
      "Mia loved climbing",
      "the spiral staircase",
      "to reach the lamp room at the top.",
      "From there,",
      "she could see fishing boats",
      "dotting the horizon far below.",
      "The keeper, Mr. Finn,",
      "told them stories",
      "about ships he had guided safely to shore",
      "during terrible storms.",
      "On their last evening,",
      "the lamp glowed bright orange",
      "as the sun set behind the sea.",
    ],
    questions: [
      {
        question: "Where was the old lighthouse located?",
        options: [
          "On a sandy beach",
          "In a harbour",
          "On a rocky cliff",
          "In a forest",
        ],
        correct: 2,
      },
      {
        question: "What could Mia see from the lamp room?",
        options: [
          "A city skyline",
          "Fishing boats on the horizon",
          "A forest",
          "Mountains",
        ],
        correct: 1,
      },
      {
        question: "What did Mr. Finn do during storms?",
        options: [
          "He stayed inside",
          "He rang a bell",
          "He guided ships safely to shore",
          "He called for help",
        ],
        correct: 2,
      },
      {
        question: "How long had the lighthouse stood on the cliff?",
        options: [
          "Ten years",
          "Fifty years",
          "Over a hundred years",
          "Twenty years",
        ],
        correct: 2,
      },
      {
        question: "What colour did the lamp glow on the last evening?",
        options: ["White", "Blue", "Yellow", "Bright orange"],
        correct: 3,
      },
    ],
    missingWords: {
      sentences: [
        "The lighthouse stood on a rocky ___.",
        "Mia loved climbing the ___ staircase.",
        "Mr. Finn guided ships safely to ___.",
        "The lamp glowed bright ___ at sunset.",
      ],
      answers: ["cliff", "spiral", "shore", "orange"],
      wordBank: [
        "cliff",
        "spiral",
        "shore",
        "orange",
        "beach",
        "straight",
        "sea",
        "white",
      ],
    },
    pronunciationWords: [
      {
        word: "lighthouse",
        syllables: "light·house",
        phonetic: "/ˈlaɪt.haʊs/",
        example: "They visited an old lighthouse.",
      },
      {
        word: "horizon",
        syllables: "ho·ri·zon",
        phonetic: "/həˈraɪ.zən/",
        example: "Boats dotted the horizon.",
      },
      {
        word: "spiral",
        syllables: "spi·ral",
        phonetic: "/ˈspaɪ.rəl/",
        example: "She climbed the spiral staircase.",
      },
      {
        word: "terrible",
        syllables: "ter·ri·ble",
        phonetic: "/ˈtɛr.ɪ.bəl/",
        example: "He guided ships during terrible storms.",
      },
      {
        word: "glowed",
        syllables: "glowed",
        phonetic: "/ɡloʊd/",
        example: "The lamp glowed bright orange.",
      },
      {
        word: "guided",
        syllables: "guid·ed",
        phonetic: "/ˈɡaɪ.dɪd/",
        example: "He guided the ships to shore.",
      },
    ],
    intonationSentences: [
      {
        text: "The lighthouse stood on the rocky cliff.",
        type: "falling",
        stressedWords: ["lighthouse", "cliff"],
        tip: "Stress the subject and location.",
      },
      {
        text: "Can you see the boats on the horizon?",
        type: "rising",
        stressedWords: ["boats", "horizon"],
        tip: "Voice rises on yes/no questions.",
      },
      {
        text: "The storms were TERRIBLE!",
        type: "emphasis",
        stressedWords: ["TERRIBLE"],
        tip: "Give the adjective full energy.",
      },
      {
        text: "The lamp glowed BRIGHT ORANGE at sunset.",
        type: "emphasis",
        stressedWords: ["BRIGHT", "ORANGE"],
        tip: "Colour descriptions carry strong stress.",
      },
    ],
    recordPassage:
      "Every summer, the Harrison family drove to the coast to visit an old lighthouse. Mia loved climbing the spiral staircase to reach the lamp room at the top. From there, she could see fishing boats dotting the horizon.",
  },

  // ── GRADE 4 – Passage A ──────────────────────────────────────────────────
  {
    id: "g4",
    grade: 4,
    title: "Journey to the Mountains",
    text: "The Chen family had been planning their hiking trip for months. When the day finally arrived, eleven-year-old Kai could hardly contain his excitement. They drove three hours through winding roads until the snow-capped peaks came into view. The trail they chose was rated moderate, but Kai quickly realised that meant something different in the mountains. His legs ached after the first steep climb. His mother encouraged him to focus on the view rather than the distance ahead. At the summit, Kai understood why people called it breathtaking. A sea of clouds stretched below them, and the world felt impossibly vast and quiet. On the way down, Kai made a promise to himself: he would come back every year.",
    chunks: [
      "The Chen family",
      "had been planning",
      "their hiking trip",
      "for months.",
      "When the day finally arrived,",
      "eleven-year-old Kai",
      "could hardly contain his excitement.",
      "They drove three hours",
      "through winding roads",
      "until the snow-capped peaks",
      "came into view.",
      "The trail they chose",
      "was rated moderate,",
      "but Kai quickly realised",
      "that meant something different",
      "in the mountains.",
      "His legs ached",
      "after the first steep climb.",
      "His mother encouraged him",
      "to focus on the view",
      "rather than the distance ahead.",
      "At the summit,",
      "Kai understood",
      "why people called it breathtaking.",
      "A sea of clouds",
      "stretched below them,",
      "and the world felt",
      "impossibly vast and quiet.",
      "On the way down,",
      "Kai made a promise to himself:",
      "he would come back every year.",
    ],
    questions: [
      {
        question: "How long had the family been planning the trip?",
        options: ["A week", "A few days", "Months", "A year"],
        correct: 2,
      },
      {
        question:
          "What did Kai's mother encourage him to do when his legs ached?",
        options: [
          "Rest and eat",
          "Turn back",
          "Focus on the view ahead",
          "Sing a song",
        ],
        correct: 2,
      },
      {
        question: "What did Kai see from the summit?",
        options: [
          "A forest fire",
          "A river valley",
          "A city skyline",
          "A sea of clouds",
        ],
        correct: 3,
      },
      {
        question: "What promise did Kai make on the way down?",
        options: [
          "To train harder",
          "To come back every year",
          "To buy better boots",
          "To bring a friend",
        ],
        correct: 1,
      },
      {
        question: "How was the trail rated?",
        options: ["Easy", "Difficult", "Moderate", "Expert"],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "Kai could hardly contain his ___.",
        "The trail was rated ___, but it was hard.",
        "His legs ___ after the first steep climb.",
        "A sea of clouds ___ below them.",
      ],
      answers: ["excitement", "moderate", "ached", "stretched"],
      wordBank: [
        "excitement",
        "moderate",
        "ached",
        "stretched",
        "joy",
        "easy",
        "hurt",
        "floated",
      ],
    },
    pronunciationWords: [
      {
        word: "excitement",
        syllables: "ex·cite·ment",
        phonetic: "/ɪkˈsaɪt.mənt/",
        example: "Kai could not contain his excitement.",
      },
      {
        word: "moderate",
        syllables: "mod·er·ate",
        phonetic: "/ˈmɒd.ər.ɪt/",
        example: "The trail was rated moderate.",
      },
      {
        word: "encouraged",
        syllables: "en·cour·aged",
        phonetic: "/ɪnˈkɜr.ɪdʒd/",
        example: "His mother encouraged him.",
      },
      {
        word: "breathtaking",
        syllables: "breath·tak·ing",
        phonetic: "/ˈbrɛθˌteɪ.kɪŋ/",
        example: "People called it breathtaking.",
      },
      {
        word: "impossibly",
        syllables: "im·pos·si·bly",
        phonetic: "/ɪmˈpɒs.ɪ.bli/",
        example: "The world felt impossibly vast.",
      },
      {
        word: "winding",
        syllables: "wind·ing",
        phonetic: "/ˈwaɪn.dɪŋ/",
        example: "They drove through winding roads.",
      },
      {
        word: "summit",
        syllables: "sum·mit",
        phonetic: "/ˈsʌm.ɪt/",
        example: "At the summit they rested.",
      },
      {
        word: "realised",
        syllables: "re·al·ised",
        phonetic: "/ˈrɪə.laɪzd/",
        example: "Kai realised it would be hard.",
      },
    ],
    intonationSentences: [
      {
        text: "The snow-capped peaks came into view.",
        type: "falling",
        stressedWords: ["snow-capped", "peaks"],
        tip: "Descriptive phrases carry strong stress.",
      },
      {
        text: "Would you climb a mountain like Kai?",
        type: "rising",
        stressedWords: ["climb", "mountain"],
        tip: "Your voice rises asking for an opinion.",
      },
      {
        text: "At the summit, the view was BREATHTAKING!",
        type: "emphasis",
        stressedWords: ["BREATHTAKING"],
        tip: "Exclamatory words deserve full vocal energy.",
      },
      {
        text: "His legs ACHED but he did NOT give up.",
        type: "emphasis",
        stressedWords: ["ACHED", "NOT"],
        tip: "Contrast words are both stressed.",
      },
    ],
    recordPassage:
      "The Chen family had been planning their hiking trip for months. Kai could hardly contain his excitement. They drove three hours through winding roads until the snow-capped peaks came into view.",
  },

  // ── GRADE 4 – Passage B ──────────────────────────────────────────────────
  {
    id: "g4b",
    grade: 4,
    title: "The Science Fair",
    text: "Twelve-year-old Aisha had been working on her science fair project for six weeks. She was building a small car powered entirely by solar energy. The hardest part was connecting the tiny solar panel to the motor without the wires coming loose. Her father helped her solder the connections on the third attempt. On the day of the fair, thick clouds covered the sky and Aisha feared her car would not move. But when a gap in the clouds appeared, sunlight hit the panel and the little car zipped across the floor. The judges awarded her first prize, noting that her project combined engineering skill with environmental awareness.",
    chunks: [
      "Twelve-year-old Aisha",
      "had been working on her science fair project",
      "for six weeks.",
      "She was building a small car",
      "powered entirely by solar energy.",
      "The hardest part",
      "was connecting the tiny solar panel",
      "to the motor",
      "without the wires coming loose.",
      "Her father helped her solder the connections",
      "on the third attempt.",
      "On the day of the fair,",
      "thick clouds covered the sky",
      "and Aisha feared her car would not move.",
      "But when a gap in the clouds appeared,",
      "sunlight hit the panel",
      "and the little car zipped across the floor.",
      "The judges awarded her first prize,",
      "noting that her project combined",
      "engineering skill with environmental awareness.",
    ],
    questions: [
      {
        question: "What was Aisha's science fair project?",
        options: [
          "A wind turbine",
          "A solar-powered car",
          "A robot",
          "A water filter",
        ],
        correct: 1,
      },
      {
        question: "What was the hardest part of building the car?",
        options: [
          "Painting it",
          "Finding the motor",
          "Connecting the solar panel to the motor",
          "Making it waterproof",
        ],
        correct: 2,
      },
      {
        question: "What problem did Aisha face on the day of the fair?",
        options: [
          "Her car broke",
          "She was late",
          "Thick clouds blocked the sunlight",
          "The motor was missing",
        ],
        correct: 2,
      },
      {
        question: "What happened when sunlight hit the solar panel?",
        options: [
          "Nothing happened",
          "It made a noise",
          "The car zipped across the floor",
          "The panel broke",
        ],
        correct: 2,
      },
      {
        question: "Why did the judges give Aisha first prize?",
        options: [
          "Her project was the most colourful",
          "It combined engineering skill with environmental awareness",
          "She had the neatest poster",
          "She was the youngest competitor",
        ],
        correct: 1,
      },
    ],
    missingWords: {
      sentences: [
        "Aisha built a car powered by ___ energy.",
        "Her father helped her ___ the connections.",
        "Thick ___ covered the sky on fair day.",
        "The judges awarded her ___ prize.",
      ],
      answers: ["solar", "solder", "clouds", "first"],
      wordBank: [
        "solar",
        "solder",
        "clouds",
        "first",
        "wind",
        "glue",
        "rain",
        "second",
      ],
    },
    pronunciationWords: [
      {
        word: "entirely",
        syllables: "en·tire·ly",
        phonetic: "/ɪnˈtaɪər.li/",
        example: "Powered entirely by solar energy.",
      },
      {
        word: "connecting",
        syllables: "con·nect·ing",
        phonetic: "/kəˈnɛk.tɪŋ/",
        example: "Connecting the panel to the motor.",
      },
      {
        word: "environmental",
        syllables: "en·vi·ron·men·tal",
        phonetic: "/ɪnˌvaɪ.rənˈmɛn.tl/",
        example: "Environmental awareness is important.",
      },
      {
        word: "awarded",
        syllables: "a·ward·ed",
        phonetic: "/əˈwɔːr.dɪd/",
        example: "The judges awarded her first prize.",
      },
      {
        word: "attempt",
        syllables: "at·tempt",
        phonetic: "/əˈtɛmpt/",
        example: "She succeeded on the third attempt.",
      },
      {
        word: "appeared",
        syllables: "ap·peared",
        phonetic: "/əˈpɪərd/",
        example: "A gap in the clouds appeared.",
      },
    ],
    intonationSentences: [
      {
        text: "She built a car powered by solar energy.",
        type: "falling",
        stressedWords: ["solar", "energy"],
        tip: "Technical terms carry natural stress.",
      },
      {
        text: "Would the car move without sunshine?",
        type: "rising",
        stressedWords: ["move", "sunshine"],
        tip: "Voice rises on uncertainty questions.",
      },
      {
        text: "The car ZIPPED across the floor!",
        type: "emphasis",
        stressedWords: ["ZIPPED"],
        tip: "Action verbs that surprise deserve strong stress.",
      },
      {
        text: "She won FIRST prize for her hard work.",
        type: "emphasis",
        stressedWords: ["FIRST"],
        tip: "Ordinal words carry pride — stress them.",
      },
    ],
    recordPassage:
      "Twelve-year-old Aisha had been working on her science fair project for six weeks. She was building a small car powered entirely by solar energy. On the day of the fair, thick clouds covered the sky, but when sunlight appeared the little car zipped across the floor.",
  },

  // ── GRADE 5 – Passage A ──────────────────────────────────────────────────
  {
    id: "g5",
    grade: 5,
    title: "The Mystery of the Old Clock",
    text: 'The old grandfather clock in the hallway had not ticked for twenty years, ever since the day Grandma Rose passed away. Twelve-year-old Zara had grown up hearing stories about how it chimed every hour on the hour with a warm, resonant tone that filled the whole house. One stormy evening, while searching through a trunk of old letters, Zara discovered a small brass key with a label that read "For the clock, when the right time comes." Curious and a little nervous, she climbed onto a stool and inserted the key into the winding hole. She turned it three times, just as the directions on the back of the label instructed. The pendulum began to swing. Then, with a deep, musical chime, the clock struck eight. Her mother appeared in the doorway, tears streaming down her face. "It sounds just like I remember," she whispered. Zara realised that some things, once restored, carry more than just their own purpose; they carry the memories of everyone who ever loved them.',
    chunks: [
      "The old grandfather clock",
      "in the hallway",
      "had not ticked",
      "for twenty years,",
      "ever since the day",
      "Grandma Rose passed away.",
      "Twelve-year-old Zara",
      "had grown up hearing stories",
      "about how it chimed every hour",
      "with a warm, resonant tone",
      "that filled the whole house.",
      "One stormy evening,",
      "while searching through",
      "a trunk of old letters,",
      "Zara discovered a small brass key",
      "with a label that read",
      '"For the clock,',
      'when the right time comes."',
      "Curious and a little nervous,",
      "she climbed onto a stool",
      "and inserted the key",
      "into the winding hole.",
      "She turned it three times,",
      "just as the directions instructed.",
      "The pendulum began to swing.",
      "Then, with a deep, musical chime,",
      "the clock struck eight.",
      "Her mother appeared in the doorway,",
      "tears streaming down her face.",
      '"It sounds just like I remember,"',
      "she whispered.",
      "Zara realised",
      "that some things, once restored,",
      "carry more than just their own purpose;",
      "they carry the memories",
      "of everyone who ever loved them.",
    ],
    questions: [
      {
        question: "Why had the clock not ticked for twenty years?",
        options: [
          "It was broken",
          "The key was lost",
          "Grandma Rose passed away",
          "The battery died",
        ],
        correct: 2,
      },
      {
        question: "Where did Zara find the key?",
        options: [
          "In the kitchen drawer",
          "In a trunk of old letters",
          "Under the clock",
          "In Grandma's jewelry box",
        ],
        correct: 1,
      },
      {
        question: "What did Zara's mother do when the clock chimed?",
        options: [
          "Laughed loudly",
          "Ran away",
          "Stood in the doorway with tears",
          "Called for help",
        ],
        correct: 2,
      },
      {
        question: "What does Zara realise at the end?",
        options: [
          "Old clocks are valuable",
          "She should fix more things",
          "Restored things carry memories",
          "Her grandmother was right",
        ],
        correct: 2,
      },
      {
        question: "How many times did Zara turn the key?",
        options: ["Once", "Twice", "Three times", "Four times"],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "The clock had not ___ for twenty years.",
        "Zara found a small brass ___ in an old trunk.",
        "The ___ began to swing when she wound it.",
        "Her mother appeared with ___ streaming down her face.",
      ],
      answers: ["ticked", "key", "pendulum", "tears"],
      wordBank: [
        "ticked",
        "key",
        "pendulum",
        "tears",
        "chimed",
        "clock",
        "weights",
        "eyes",
      ],
    },
    pronunciationWords: [
      {
        word: "resonant",
        syllables: "res·o·nant",
        phonetic: "/ˈrɛz.ə.nənt/",
        example: "A warm, resonant tone filled the house.",
      },
      {
        word: "discovered",
        syllables: "dis·cov·ered",
        phonetic: "/dɪˈskʌv.ərd/",
        example: "Zara discovered a small brass key.",
      },
      {
        word: "pendulum",
        syllables: "pen·du·lum",
        phonetic: "/ˈpɛn.djʊ.ləm/",
        example: "The pendulum began to swing.",
      },
      {
        word: "inserted",
        syllables: "in·sert·ed",
        phonetic: "/ɪnˈsɜːr.tɪd/",
        example: "She inserted the key into the hole.",
      },
      {
        word: "restored",
        syllables: "re·stored",
        phonetic: "/rɪˈstɔːrd/",
        example: "Some things, once restored, carry memories.",
      },
      {
        word: "whispered",
        syllables: "whis·pered",
        phonetic: "/ˈwɪs.pərd/",
        example: '"I remember," she whispered.',
      },
      {
        word: "instructed",
        syllables: "in·struct·ed",
        phonetic: "/ɪnˈstrʌk.tɪd/",
        example: "She followed the directions as instructed.",
      },
      {
        word: "mysterious",
        syllables: "mys·te·ri·ous",
        phonetic: "/mɪˈstɪər.i.əs/",
        example: "The key had a mysterious label.",
      },
    ],
    intonationSentences: [
      {
        text: "The clock had not ticked for twenty years.",
        type: "falling",
        stressedWords: ["ticked", "twenty"],
        tip: "Stress key facts to convey their significance.",
      },
      {
        text: "Could this key really start the old clock?",
        type: "rising",
        stressedWords: ["really", "old", "clock"],
        tip: "Doubt or wonder lifts your voice at the end.",
      },
      {
        text: '"It sounds JUST like I remember," she whispered.',
        type: "emphasis",
        stressedWords: ["JUST"],
        tip: "JUST is emotional here — give it real weight.",
      },
      {
        text: "Then, with a deep musical chime, the clock STRUCK eight.",
        type: "emphasis",
        stressedWords: ["deep", "STRUCK"],
        tip: "Build tension by slowing down before the stressed word.",
      },
    ],
    recordPassage:
      'The old grandfather clock in the hallway had not ticked for twenty years. One stormy evening, Zara discovered a small brass key with a label that read "For the clock, when the right time comes."',
  },

  // ── GRADE 5 – Passage B ──────────────────────────────────────────────────
  {
    id: "g5b",
    grade: 5,
    title: "The Letter in the Wall",
    text: 'When the Nakamura family began renovating their old Victorian house, they expected to find outdated wiring and crumbling plaster. What they did not expect was a small tin box sealed behind the bathroom wall. Inside, wrapped in oilskin, was a letter dated 14th March 1923. It was written by a girl named Clara, who described hiding the letter for "whoever finds this in a time I cannot imagine." She wrote about her dreams of becoming a doctor, the smell of her mother\'s bread, and the maple tree she could see from her window. Thirteen-year-old Hana read every word twice, then carefully re-sealed the letter and placed it in the family\'s glass cabinet. "Clara deserves to be remembered," she told her parents. "We should keep this safe."',
    chunks: [
      "When the Nakamura family",
      "began renovating their old Victorian house,",
      "they expected to find",
      "outdated wiring and crumbling plaster.",
      "What they did not expect",
      "was a small tin box",
      "sealed behind the bathroom wall.",
      "Inside, wrapped in oilskin,",
      "was a letter dated 14th March 1923.",
      "It was written by a girl named Clara,",
      "who described hiding the letter",
      '"for whoever finds this",',
      '"in a time I cannot imagine."',
      "She wrote about her dreams",
      "of becoming a doctor,",
      "the smell of her mother's bread,",
      "and the maple tree",
      "she could see from her window.",
      "Thirteen-year-old Hana",
      "read every word twice,",
      "then carefully re-sealed the letter",
      "and placed it in the family's glass cabinet.",
      '"Clara deserves to be remembered,"',
      "she told her parents.",
      '"We should keep this safe."',
    ],
    questions: [
      {
        question: "Where did the Nakamura family find the tin box?",
        options: [
          "In the attic",
          "Under the floorboards",
          "Behind the bathroom wall",
          "In the garden",
        ],
        correct: 2,
      },
      {
        question: "Who wrote the letter inside the tin box?",
        options: [
          "A woman named Rose",
          "A girl named Clara",
          "A boy named Henry",
          "An old doctor",
        ],
        correct: 1,
      },
      {
        question: "What did Clara write about in her letter?",
        options: [
          "Her school grades",
          "Her dreams, her mother's bread, and a maple tree",
          "A treasure map",
          "Instructions for the next owners",
        ],
        correct: 1,
      },
      {
        question: "What did Hana do after reading the letter?",
        options: [
          "She threw it away",
          "She sent it to a museum",
          "She placed it in the family's glass cabinet",
          "She buried it again",
        ],
        correct: 2,
      },
      {
        question: "What did Hana say Clara deserved?",
        options: ["A prize", "A new home", "To be remembered", "To be found"],
        correct: 2,
      },
    ],
    missingWords: {
      sentences: [
        "The family found a tin box ___ the bathroom wall.",
        "The letter was wrapped in ___.",
        "Clara dreamed of becoming a ___.",
        "Hana placed the letter in the family's glass ___.",
      ],
      answers: ["behind", "oilskin", "doctor", "cabinet"],
      wordBank: [
        "behind",
        "oilskin",
        "doctor",
        "cabinet",
        "inside",
        "cloth",
        "teacher",
        "drawer",
      ],
    },
    pronunciationWords: [
      {
        word: "renovating",
        syllables: "ren·o·vat·ing",
        phonetic: "/ˈrɛn.ə.veɪ.tɪŋ/",
        example: "They began renovating the old house.",
      },
      {
        word: "Victorian",
        syllables: "Vic·to·ri·an",
        phonetic: "/vɪkˈtɔːr.i.ən/",
        example: "It was an old Victorian house.",
      },
      {
        word: "oilskin",
        syllables: "oil·skin",
        phonetic: "/ˈɔɪl.skɪn/",
        example: "The letter was wrapped in oilskin.",
      },
      {
        word: "deserves",
        syllables: "de·serves",
        phonetic: "/dɪˈzɜːrvz/",
        example: "Clara deserves to be remembered.",
      },
      {
        word: "crumbling",
        syllables: "crum·bling",
        phonetic: "/ˈkrʌm.blɪŋ/",
        example: "They found crumbling plaster.",
      },
      {
        word: "carefully",
        syllables: "care·ful·ly",
        phonetic: "/ˈkɛər.fʊl.i/",
        example: "She carefully re-sealed the letter.",
      },
      {
        word: "outdated",
        syllables: "out·dat·ed",
        phonetic: "/ˌaʊtˈdeɪ.tɪd/",
        example: "They found outdated wiring.",
      },
      {
        word: "imagine",
        syllables: "i·mag·ine",
        phonetic: "/ɪˈmædʒ.ɪn/",
        example: "In a time I cannot imagine.",
      },
    ],
    intonationSentences: [
      {
        text: "They found a letter hidden behind the wall.",
        type: "falling",
        stressedWords: ["letter", "wall"],
        tip: "Stress where the discovery happened.",
      },
      {
        text: "Who could have written this letter?",
        type: "rising",
        stressedWords: ["written", "letter"],
        tip: "Wh-questions still carry a note of wonder.",
      },
      {
        text: "Clara DESERVES to be remembered!",
        type: "emphasis",
        stressedWords: ["DESERVES"],
        tip: "Moral statements deserve passionate stress.",
      },
      {
        text: "The letter was dated FOURTEEN March, NINETEEN twenty-three.",
        type: "emphasis",
        stressedWords: ["FOURTEEN", "NINETEEN"],
        tip: "Dates in historical context carry weight — stress the numbers.",
      },
    ],
    recordPassage:
      "When the Nakamura family began renovating their old Victorian house, they found a small tin box sealed behind the bathroom wall. Inside was a letter from 1923, written by a girl named Clara, who described her dreams and her life.",
  },
];

export const getPassageByGrade = (grade: number, index = 0): Passage => {
  const gradePassages = passages.filter((p) => p.grade === grade);
  if (gradePassages.length === 0) return passages[0];
  return gradePassages[index % gradePassages.length];
};
