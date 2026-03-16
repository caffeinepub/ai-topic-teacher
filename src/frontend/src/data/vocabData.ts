export interface VocabWord {
  word: string;
  emoji: string;
  meaning: string;
  exampleSentence: string;
}

// 8 vocab words per passage, indexed by [grade][passageIndex]
const vocabByGrade: Record<number, VocabWord[][]> = {
  1: [
    // g1a – My Pet Cat
    [
      {
        word: "soft",
        emoji: "🧸",
        meaning: "Smooth and gentle to touch, not rough or hard.",
        exampleSentence: "The rabbit has very soft fur.",
      },
      {
        word: "small",
        emoji: "🐭",
        meaning: "Little in size; not big.",
        exampleSentence: "The kitten is very small and cute.",
      },
      {
        word: "sleep",
        emoji: "😴",
        meaning: "To rest with your eyes closed and not be awake.",
        exampleSentence: "I sleep early every night.",
      },
      {
        word: "love",
        emoji: "❤️",
        meaning: "A very strong feeling of caring for someone.",
        exampleSentence: "I love my little sister very much.",
      },
      {
        word: "pet",
        emoji: "🐾",
        meaning: "An animal that you keep at home and take care of.",
        exampleSentence: "My pet dog wags its tail.",
      },
      {
        word: "nap",
        emoji: "💤",
        meaning: "A short sleep during the day.",
        exampleSentence: "The cat takes a nap in the sun.",
      },
      {
        word: "purr",
        emoji: "😸",
        meaning: "The low humming sound a happy cat makes.",
        exampleSentence: "The cat will purr when you pet it.",
      },
      {
        word: "paw",
        emoji: "🐱",
        meaning: "The foot of an animal like a cat or dog.",
        exampleSentence: "The kitten raised its tiny paw.",
      },
    ],
    // g1b – The Big Sun
    [
      {
        word: "bright",
        emoji: "☀️",
        meaning: "Giving out a lot of light; very shiny.",
        exampleSentence: "The sun is very bright in the afternoon.",
      },
      {
        word: "warm",
        emoji: "🌡️",
        meaning: "Having a comfortable heat; not too hot or cold.",
        exampleSentence: "The warm sunshine felt nice on my skin.",
      },
      {
        word: "rise",
        emoji: "🌅",
        meaning: "To go up or move higher.",
        exampleSentence: "The sun will rise early in summer.",
      },
      {
        word: "glow",
        emoji: "✨",
        meaning: "To shine with a steady, soft light.",
        exampleSentence: "The firefly begins to glow at night.",
      },
      {
        word: "sky",
        emoji: "🌤️",
        meaning: "The space above the Earth where clouds and stars are.",
        exampleSentence: "Birds fly high in the sky.",
      },
      {
        word: "shine",
        emoji: "💫",
        meaning: "To give off light; to be bright.",
        exampleSentence: "Stars shine brightly at night.",
      },
      {
        word: "daytime",
        emoji: "🌞",
        meaning: "The part of the day when it is light outside.",
        exampleSentence: "We play outside during daytime.",
      },
      {
        word: "cloud",
        emoji: "☁️",
        meaning: "A white or grey mass of water droplets floating in the sky.",
        exampleSentence: "A dark cloud covered the sun.",
      },
    ],
    // g1c – My Red Ball
    [
      {
        word: "round",
        emoji: "⭕",
        meaning: "Having a shape like a circle or ball.",
        exampleSentence: "An orange is round and orange in colour.",
      },
      {
        word: "bounce",
        emoji: "🏀",
        meaning: "To spring back up after hitting a surface.",
        exampleSentence: "I love to bounce my ball on the floor.",
      },
      {
        word: "catch",
        emoji: "🤲",
        meaning: "To grab something that is moving through the air.",
        exampleSentence: "Can you catch the ball I throw to you?",
      },
      {
        word: "throw",
        emoji: "🎯",
        meaning: "To send something through the air with your hand.",
        exampleSentence: "Throw the ball to your friend.",
      },
      {
        word: "roll",
        emoji: "🎱",
        meaning: "To move by turning over and over.",
        exampleSentence: "The ball began to roll down the hill.",
      },
      {
        word: "play",
        emoji: "🎮",
        meaning: "To do fun activities for enjoyment.",
        exampleSentence: "Children play in the park after school.",
      },
      {
        word: "red",
        emoji: "🔴",
        meaning: "The colour of blood or a ripe tomato.",
        exampleSentence: "She painted her room red.",
      },
      {
        word: "fun",
        emoji: "🎉",
        meaning: "Something that gives you pleasure and happiness.",
        exampleSentence: "Playing with friends is a lot of fun.",
      },
    ],
    // g1d – A Rainy Day
    [
      {
        word: "rain",
        emoji: "🌧️",
        meaning: "Water that falls from clouds in the sky.",
        exampleSentence: "The rain makes the plants grow tall.",
      },
      {
        word: "wet",
        emoji: "💧",
        meaning: "Covered with water or liquid.",
        exampleSentence: "My shoes got wet in the puddle.",
      },
      {
        word: "umbrella",
        emoji: "☂️",
        meaning: "A tool you hold over yourself to stay dry in the rain.",
        exampleSentence: "Always carry an umbrella on a rainy day.",
      },
      {
        word: "puddle",
        emoji: "🌊",
        meaning: "A small pool of water on the ground after rain.",
        exampleSentence: "The children jumped in the puddle.",
      },
      {
        word: "cloud",
        emoji: "🌧️",
        meaning: "A grey mass in the sky that can bring rain.",
        exampleSentence: "Dark clouds appeared before the storm.",
      },
      {
        word: "drizzle",
        emoji: "🌦️",
        meaning: "Light, soft rain falling gently.",
        exampleSentence: "A cool drizzle fell all morning.",
      },
      {
        word: "thunder",
        emoji: "⛈️",
        meaning: "The loud rumbling sound heard during a storm.",
        exampleSentence: "The thunder made the baby cry.",
      },
      {
        word: "rainbow",
        emoji: "🌈",
        meaning: "A curved band of colours in the sky after rain.",
        exampleSentence: "A beautiful rainbow appeared after the shower.",
      },
    ],
  ],
  2: [
    // g2a – The Little Garden
    [
      {
        word: "plant",
        emoji: "🌱",
        meaning: "A living thing that grows in soil and has leaves.",
        exampleSentence: "We plant seeds in spring.",
      },
      {
        word: "seed",
        emoji: "🌰",
        meaning: "A tiny object from which a new plant grows.",
        exampleSentence: "The farmer planted a seed in the field.",
      },
      {
        word: "water",
        emoji: "💧",
        meaning: "To pour water on plants so they can grow.",
        exampleSentence: "Remember to water the flowers every morning.",
      },
      {
        word: "soil",
        emoji: "🪱",
        meaning: "The top layer of earth where plants grow.",
        exampleSentence: "Rich soil helps vegetables grow well.",
      },
      {
        word: "bloom",
        emoji: "🌸",
        meaning: "To produce flowers; to blossom.",
        exampleSentence: "The roses begin to bloom in summer.",
      },
      {
        word: "grow",
        emoji: "📈",
        meaning: "To become bigger or taller over time.",
        exampleSentence: "With sunlight, plants grow quickly.",
      },
      {
        word: "leaf",
        emoji: "🍃",
        meaning: "The flat, green part of a plant that makes food.",
        exampleSentence: "Each leaf on the tree is a different shade of green.",
      },
      {
        word: "harvest",
        emoji: "🌾",
        meaning: "To pick and collect crops or fruits when they are ready.",
        exampleSentence: "Farmers harvest wheat in October.",
      },
    ],
    // g2b – A Rainy Afternoon
    [
      {
        word: "pour",
        emoji: "🌧️",
        meaning: "To rain very heavily.",
        exampleSentence: "It began to pour and everyone ran inside.",
      },
      {
        word: "shelter",
        emoji: "🏠",
        meaning: "A place that protects you from bad weather.",
        exampleSentence: "We found shelter under the big tree.",
      },
      {
        word: "stormy",
        emoji: "⛈️",
        meaning: "Having strong winds, rain, or thunder.",
        exampleSentence: "It was a very stormy evening.",
      },
      {
        word: "cosy",
        emoji: "🛋️",
        meaning: "Warm, comfortable and snug.",
        exampleSentence: "I felt cosy reading by the fireplace.",
      },
      {
        word: "splash",
        emoji: "💦",
        meaning: "To make water fly around noisily.",
        exampleSentence: "The car made a big splash in the puddle.",
      },
      {
        word: "damp",
        emoji: "🌫️",
        meaning: "Slightly wet; moist.",
        exampleSentence: "The ground was damp after last night's rain.",
      },
      {
        word: "thunder",
        emoji: "🌩️",
        meaning: "A loud rumbling sound in the sky during a storm.",
        exampleSentence: "The thunder scared the little puppy.",
      },
      {
        word: "lightning",
        emoji: "⚡",
        meaning: "A flash of bright light seen during a storm.",
        exampleSentence: "Lightning lit up the dark sky.",
      },
    ],
    // g2c – The Garden
    [
      {
        word: "flower",
        emoji: "🌺",
        meaning: "The colourful part of a plant that blooms.",
        exampleSentence: "The garden is full of pretty flowers.",
      },
      {
        word: "butterfly",
        emoji: "🦋",
        meaning: "An insect with large, colourful wings.",
        exampleSentence: "A butterfly landed on the rose.",
      },
      {
        word: "bee",
        emoji: "🐝",
        meaning: "A yellow and black insect that makes honey.",
        exampleSentence: "The bee flew from flower to flower.",
      },
      {
        word: "garden",
        emoji: "🏡",
        meaning: "An area of land where plants and flowers are grown.",
        exampleSentence: "Grandma loves working in her garden.",
      },
      {
        word: "fragrance",
        emoji: "👃",
        meaning: "A sweet or pleasant smell.",
        exampleSentence: "The fragrance of roses fills the air.",
      },
      {
        word: "colourful",
        emoji: "🎨",
        meaning: "Having many bright and different colours.",
        exampleSentence: "The garden is colourful in spring.",
      },
      {
        word: "roots",
        emoji: "🌿",
        meaning: "The parts of a plant that grow underground to get water.",
        exampleSentence: "Trees have deep roots underground.",
      },
      {
        word: "sunlight",
        emoji: "🌞",
        meaning: "The light and warmth that comes from the sun.",
        exampleSentence: "Plants need sunlight to make their food.",
      },
    ],
    // g2d – My Family
    [
      {
        word: "family",
        emoji: "👨‍👩‍👧‍👦",
        meaning: "A group of people related to each other.",
        exampleSentence: "My family goes on a picnic every Sunday.",
      },
      {
        word: "together",
        emoji: "🤝",
        meaning: "With each other; in the same place at the same time.",
        exampleSentence: "We eat dinner together every night.",
      },
      {
        word: "caring",
        emoji: "🤗",
        meaning: "Showing kindness and concern for others.",
        exampleSentence: "My mother is very caring and gentle.",
      },
      {
        word: "respect",
        emoji: "🙏",
        meaning: "To treat someone with honour and kindness.",
        exampleSentence: "We should always respect our elders.",
      },
      {
        word: "sibling",
        emoji: "👫",
        meaning: "A brother or sister.",
        exampleSentence: "My sibling and I share a room.",
      },
      {
        word: "celebrate",
        emoji: "🎊",
        meaning: "To do something special and enjoyable for a happy occasion.",
        exampleSentence: "We celebrate birthdays with a cake.",
      },
      {
        word: "support",
        emoji: "💪",
        meaning: "To help and encourage someone.",
        exampleSentence: "My family always supports me when I feel sad.",
      },
      {
        word: "tradition",
        emoji: "🏮",
        meaning: "A custom or practice passed down through generations.",
        exampleSentence: "Lighting diyas is a tradition in our family.",
      },
    ],
  ],
  3: [
    // g3a – The Old Lighthouse
    [
      {
        word: "lighthouse",
        emoji: "🗼",
        meaning: "A tall tower with a bright light that guides ships at sea.",
        exampleSentence:
          "The lighthouse helped the sailors find their way home.",
      },
      {
        word: "coast",
        emoji: "🏖️",
        meaning: "The land next to the sea or ocean.",
        exampleSentence: "We drove along the rocky coast.",
      },
      {
        word: "beam",
        emoji: "🔦",
        meaning: "A ray of bright light.",
        exampleSentence: "The beam from the lighthouse reached far out to sea.",
      },
      {
        word: "sailor",
        emoji: "⚓",
        meaning: "A person who works on or operates a ship.",
        exampleSentence: "The old sailor told stories of the ocean.",
      },
      {
        word: "fog",
        emoji: "🌫️",
        meaning: "A thick, cloudy mist close to the ground or sea.",
        exampleSentence: "The fog made it hard to see the path.",
      },
      {
        word: "signal",
        emoji: "🚦",
        meaning: "A sign or message used to communicate information.",
        exampleSentence: "The lighthouse sends a signal to warn ships.",
      },
      {
        word: "rocky",
        emoji: "🪨",
        meaning: "Covered with or made of rocks; uneven and hard.",
        exampleSentence: "The rocky shore was dangerous for boats.",
      },
      {
        word: "keeper",
        emoji: "🧑‍🔧",
        meaning: "A person who looks after or manages a place.",
        exampleSentence:
          "The lighthouse keeper checked the light every evening.",
      },
    ],
    // g3b – The Desert Fox
    [
      {
        word: "desert",
        emoji: "🏜️",
        meaning: "A very dry, sandy place with little rain or plants.",
        exampleSentence: "The camel walks through the hot desert.",
      },
      {
        word: "survive",
        emoji: "🌵",
        meaning: "To continue to live through difficult conditions.",
        exampleSentence: "Many animals can survive in the desert.",
      },
      {
        word: "nocturnal",
        emoji: "🌙",
        meaning: "Active at night rather than during the day.",
        exampleSentence: "Owls are nocturnal animals.",
      },
      {
        word: "burrow",
        emoji: "🕳️",
        meaning: "A hole or tunnel dug by an animal to live in.",
        exampleSentence: "The rabbit hid in its burrow.",
      },
      {
        word: "predator",
        emoji: "🦊",
        meaning: "An animal that hunts and eats other animals.",
        exampleSentence: "The fox is a predator of small mice.",
      },
      {
        word: "camouflage",
        emoji: "🎭",
        meaning: "A way of hiding by blending in with surroundings.",
        exampleSentence: "The lizard uses camouflage to hide on rocks.",
      },
      {
        word: "harsh",
        emoji: "🌡️",
        meaning: "Very difficult or extreme; cruel or severe.",
        exampleSentence: "Animals adapt to the harsh desert heat.",
      },
      {
        word: "adapt",
        emoji: "🔄",
        meaning: "To change to suit new conditions or environment.",
        exampleSentence: "The polar bear has adapted to cold weather.",
      },
    ],
    // g3c – The Ocean
    [
      {
        word: "ocean",
        emoji: "🌊",
        meaning: "A very large body of salt water covering most of the Earth.",
        exampleSentence: "The ocean is home to millions of creatures.",
      },
      {
        word: "tide",
        emoji: "🌊",
        meaning: "The regular rise and fall of the sea level.",
        exampleSentence: "At high tide, the waves reach the rocks.",
      },
      {
        word: "coral",
        emoji: "🪸",
        meaning: "A hard, colourful sea creature that forms reefs.",
        exampleSentence: "Colourful fish live near the coral reef.",
      },
      {
        word: "current",
        emoji: "➡️",
        meaning: "A steady flow of water moving in one direction.",
        exampleSentence: "A strong current pulled the boat away.",
      },
      {
        word: "creature",
        emoji: "🐙",
        meaning: "A living animal, especially one that is unusual.",
        exampleSentence: "The octopus is a strange sea creature.",
      },
      {
        word: "depth",
        emoji: "📏",
        meaning: "The distance from the surface to the bottom.",
        exampleSentence: "Scientists explored the great depth of the ocean.",
      },
      {
        word: "wave",
        emoji: "🏄",
        meaning: "A raised ridge of water on the sea surface.",
        exampleSentence: "The surfer rode the big wave.",
      },
      {
        word: "marine",
        emoji: "🐠",
        meaning: "Related to the sea or ocean.",
        exampleSentence: "Marine biologists study ocean animals.",
      },
    ],
    // g3d – Seasons Change
    [
      {
        word: "season",
        emoji: "🍂",
        meaning:
          "One of the four periods of the year — spring, summer, autumn, winter.",
        exampleSentence: "My favourite season is winter.",
      },
      {
        word: "autumn",
        emoji: "🍁",
        meaning: "The season after summer when leaves fall from trees.",
        exampleSentence: "In autumn, the leaves turn red and gold.",
      },
      {
        word: "hibernate",
        emoji: "🐻",
        meaning: "To sleep deeply through the cold winter months.",
        exampleSentence: "Bears hibernate during the cold winter.",
      },
      {
        word: "migrate",
        emoji: "🦅",
        meaning: "To travel to a different place with the change of season.",
        exampleSentence: "Birds migrate south in winter.",
      },
      {
        word: "blossom",
        emoji: "🌸",
        meaning: "To produce flowers; the flower of a plant.",
        exampleSentence: "Cherry trees blossom in spring.",
      },
      {
        word: "harvest",
        emoji: "🌾",
        meaning: "The time when crops are gathered; the crops collected.",
        exampleSentence: "Farmers have a good harvest in autumn.",
      },
      {
        word: "frost",
        emoji: "❄️",
        meaning: "Ice crystals that form on surfaces when it is very cold.",
        exampleSentence: "The grass was covered in frost this morning.",
      },
      {
        word: "temperature",
        emoji: "🌡️",
        meaning: "How hot or cold something is, measured in degrees.",
        exampleSentence: "The temperature drops in December.",
      },
    ],
  ],
  4: [
    // g4a – The Water Cycle
    [
      {
        word: "evaporation",
        emoji: "☁️",
        meaning: "The process of water turning into water vapour when heated.",
        exampleSentence: "Evaporation causes puddles to disappear on hot days.",
      },
      {
        word: "condensation",
        emoji: "💧",
        meaning:
          "The process of water vapour cooling and turning into liquid water.",
        exampleSentence: "Condensation forms droplets on a cold glass.",
      },
      {
        word: "precipitation",
        emoji: "🌧️",
        meaning: "Water falling from the sky as rain, snow, or hail.",
        exampleSentence: "Precipitation fills rivers and lakes.",
      },
      {
        word: "vapour",
        emoji: "💨",
        meaning: "Water in its gas form; steam.",
        exampleSentence: "Water vapour rises from the hot pot.",
      },
      {
        word: "cycle",
        emoji: "🔄",
        meaning: "A series of events that repeats over and over again.",
        exampleSentence: "The water cycle keeps water moving on Earth.",
      },
      {
        word: "reservoir",
        emoji: "🏞️",
        meaning: "A large lake for storing drinking water.",
        exampleSentence:
          "The city gets its water from a reservoir in the mountains.",
      },
      {
        word: "groundwater",
        emoji: "🌊",
        meaning: "Water stored underground in soil and rock.",
        exampleSentence: "Farmers use groundwater to irrigate their fields.",
      },
      {
        word: "runoff",
        emoji: "⛰️",
        meaning:
          "Water that flows over the surface of land into rivers or sea.",
        exampleSentence: "Heavy rain causes runoff that can erode soil.",
      },
    ],
    // g4b – Volcanoes: Fire from the Earth
    [
      {
        word: "volcano",
        emoji: "🌋",
        meaning: "A mountain with an opening through which hot lava comes out.",
        exampleSentence: "The volcano erupted and sent ash into the sky.",
      },
      {
        word: "erupt",
        emoji: "💥",
        meaning: "To burst out suddenly; for a volcano to throw out lava.",
        exampleSentence:
          "When a volcano erupts, it can destroy nearby villages.",
      },
      {
        word: "lava",
        emoji: "🔥",
        meaning: "Very hot, melted rock that comes out of a volcano.",
        exampleSentence: "Lava flows slowly down the sides of the volcano.",
      },
      {
        word: "magma",
        emoji: "⚫",
        meaning: "Hot melted rock found inside the Earth.",
        exampleSentence: "Magma pushes upward through cracks in the Earth.",
      },
      {
        word: "crater",
        emoji: "🕳️",
        meaning: "The bowl-shaped opening at the top of a volcano.",
        exampleSentence: "Scientists lowered a camera into the crater.",
      },
      {
        word: "tectonic",
        emoji: "🌍",
        meaning:
          "Related to the large plates that make up the Earth's surface.",
        exampleSentence:
          "Tectonic activity causes earthquakes and volcanic eruptions.",
      },
      {
        word: "ash",
        emoji: "🌪️",
        meaning: "The grey powder left after something burns; volcanic dust.",
        exampleSentence: "Ash from the volcano covered nearby towns.",
      },
      {
        word: "pressure",
        emoji: "⚡",
        meaning: "The force applied to an area; the build-up inside the Earth.",
        exampleSentence: "Pressure inside the Earth pushes magma upward.",
      },
    ],
    // g4c – The Water Cycle (variation)
    [
      {
        word: "irrigation",
        emoji: "🚿",
        meaning: "Supplying water to land or crops using pipes or channels.",
        exampleSentence:
          "Irrigation allows farmers to grow crops in dry areas.",
      },
      {
        word: "aquifer",
        emoji: "💦",
        meaning: "An underground layer of rock or soil that holds water.",
        exampleSentence: "An aquifer can supply clean water to villages.",
      },
      {
        word: "watershed",
        emoji: "🏔️",
        meaning: "An area of land where all water drains to the same river.",
        exampleSentence: "Protecting the watershed protects the river.",
      },
      {
        word: "transpiration",
        emoji: "🌿",
        meaning:
          "The process by which plants release water vapour through leaves.",
        exampleSentence: "Transpiration contributes to cloud formation.",
      },
      {
        word: "filtration",
        emoji: "🧪",
        meaning: "Removing dirt and impurities from water.",
        exampleSentence: "Filtration makes water safe to drink.",
      },
      {
        word: "drought",
        emoji: "🥵",
        meaning: "A long period of very little or no rain.",
        exampleSentence: "The drought caused rivers to dry up.",
      },
      {
        word: "flood",
        emoji: "🌊",
        meaning: "A large amount of water covering land that is usually dry.",
        exampleSentence: "Heavy rains caused a flood in the valley.",
      },
      {
        word: "glacier",
        emoji: "🧊",
        meaning: "A large, slow-moving mass of ice.",
        exampleSentence: "Glaciers melt due to rising temperatures.",
      },
    ],
    // g4d – Ancient Egypt
    [
      {
        word: "civilization",
        emoji: "🏛️",
        meaning: "An advanced human society with culture, laws, and cities.",
        exampleSentence: "Ancient Egypt was one of the greatest civilizations.",
      },
      {
        word: "pharaoh",
        emoji: "👑",
        meaning: "The ruler or king of ancient Egypt.",
        exampleSentence: "The pharaoh was considered a god by the Egyptians.",
      },
      {
        word: "pyramid",
        emoji: "🔺",
        meaning:
          "A huge stone structure with four triangular sides, built as a tomb.",
        exampleSentence:
          "The Great Pyramid at Giza is one of the world's wonders.",
      },
      {
        word: "mummy",
        emoji: "🪄",
        meaning: "A preserved dead body, wrapped in cloth.",
        exampleSentence: "The mummy of a pharaoh was found in the pyramid.",
      },
      {
        word: "hieroglyph",
        emoji: "📜",
        meaning: "A writing system that uses pictures and symbols.",
        exampleSentence:
          "Historians decoded the hieroglyphs on the temple wall.",
      },
      {
        word: "fertile",
        emoji: "🌱",
        meaning: "Rich in nutrients; good for growing crops.",
        exampleSentence:
          "The fertile soil beside the Nile grew plenty of crops.",
      },
      {
        word: "archaeologist",
        emoji: "⛏️",
        meaning: "A scientist who studies history by digging up old objects.",
        exampleSentence:
          "The archaeologist found ancient pottery in the desert.",
      },
      {
        word: "artefact",
        emoji: "🏺",
        meaning: "An old object made by humans that has historical value.",
        exampleSentence: "The museum displayed artefacts from ancient Egypt.",
      },
    ],
  ],
  5: [
    // g5a – The Amazon Rainforest
    [
      {
        word: "biodiversity",
        emoji: "🌿",
        meaning: "The variety of different plants and animals in an ecosystem.",
        exampleSentence: "The Amazon has incredible biodiversity.",
      },
      {
        word: "canopy",
        emoji: "🌳",
        meaning: "The upper layer of leaves and branches in a forest.",
        exampleSentence: "Monkeys swing through the forest canopy.",
      },
      {
        word: "ecosystem",
        emoji: "🌐",
        meaning: "All the living things in an area and how they interact.",
        exampleSentence: "Cutting trees disrupts the forest ecosystem.",
      },
      {
        word: "deforestation",
        emoji: "🪓",
        meaning: "The large-scale removal of forests by cutting or burning.",
        exampleSentence: "Deforestation destroys the homes of many animals.",
      },
      {
        word: "species",
        emoji: "🦎",
        meaning:
          "A group of living things that share the same characteristics.",
        exampleSentence: "Hundreds of bird species live in the Amazon.",
      },
      {
        word: "indigenous",
        emoji: "🧑‍🤝‍🧑",
        meaning: "Originally from or naturally existing in a place.",
        exampleSentence: "Indigenous people protect the Amazon forest.",
      },
      {
        word: "oxygen",
        emoji: "💨",
        meaning: "The gas in air that living things breathe to survive.",
        exampleSentence: "Trees produce the oxygen we breathe.",
      },
      {
        word: "conservation",
        emoji: "♻️",
        meaning: "The careful protection of natural resources and wildlife.",
        exampleSentence: "Conservation efforts saved the endangered tiger.",
      },
    ],
    // g5b – The Psychology of Decision-Making
    [
      {
        word: "psychology",
        emoji: "🧠",
        meaning: "The scientific study of the mind and human behaviour.",
        exampleSentence:
          "Psychology helps us understand why people act the way they do.",
      },
      {
        word: "bias",
        emoji: "⚖️",
        meaning: "A preference or tendency that makes judgement unfair.",
        exampleSentence:
          "Confirmation bias leads us to believe what we already think.",
      },
      {
        word: "rational",
        emoji: "🤔",
        meaning: "Based on reason and logic rather than emotion.",
        exampleSentence: "A rational decision is made by thinking carefully.",
      },
      {
        word: "cognitive",
        emoji: "💭",
        meaning: "Related to thinking, learning, and mental processes.",
        exampleSentence: "Cognitive skills include memory and problem-solving.",
      },
      {
        word: "impulse",
        emoji: "⚡",
        meaning: "A sudden urge to do something without careful thought.",
        exampleSentence: "She bought the toy on impulse.",
      },
      {
        word: "consequence",
        emoji: "➡️",
        meaning: "A result or effect of an action.",
        exampleSentence: "Every choice has a consequence.",
      },
      {
        word: "ethical",
        emoji: "🕊️",
        meaning: "Morally right and honest; following a code of values.",
        exampleSentence: "It is ethical to return lost money.",
      },
      {
        word: "heuristic",
        emoji: "💡",
        meaning: "A practical shortcut for solving problems quickly.",
        exampleSentence: "Humans use heuristics to make quick decisions.",
      },
    ],
    // g5c – The Solar System
    [
      {
        word: "planet",
        emoji: "🪐",
        meaning: "A large body that orbits a star like the Sun.",
        exampleSentence: "Earth is the third planet from the Sun.",
      },
      {
        word: "orbit",
        emoji: "🔄",
        meaning: "The curved path of one object around another in space.",
        exampleSentence: "The Moon's orbit around Earth takes about 28 days.",
      },
      {
        word: "gravity",
        emoji: "⬇️",
        meaning: "The force that pulls objects towards each other.",
        exampleSentence: "Gravity keeps the planets orbiting the Sun.",
      },
      {
        word: "asteroid",
        emoji: "☄️",
        meaning: "A rocky object smaller than a planet orbiting the Sun.",
        exampleSentence: "An asteroid belt lies between Mars and Jupiter.",
      },
      {
        word: "atmosphere",
        emoji: "🌍",
        meaning: "The layer of gases surrounding a planet.",
        exampleSentence:
          "Earth's atmosphere protects us from harmful radiation.",
      },
      {
        word: "satellite",
        emoji: "🛰️",
        meaning: "An object that orbits a planet; can be natural or man-made.",
        exampleSentence: "The Moon is Earth's natural satellite.",
      },
      {
        word: "telescope",
        emoji: "🔭",
        meaning: "An instrument used to see distant objects in space.",
        exampleSentence: "A telescope helped scientists discover new planets.",
      },
      {
        word: "rotation",
        emoji: "🔃",
        meaning: "The spinning motion of a body around its own axis.",
        exampleSentence: "Earth's rotation causes day and night.",
      },
    ],
    // g5d – Rainforests
    [
      {
        word: "tropical",
        emoji: "🌴",
        meaning: "Relating to the hot, wet regions near the equator.",
        exampleSentence:
          "Tropical rainforests receive heavy rainfall all year.",
      },
      {
        word: "humid",
        emoji: "💧",
        meaning: "Very moist or damp; containing a lot of water in the air.",
        exampleSentence: "The humid air in the rainforest makes it feel warm.",
      },
      {
        word: "predator",
        emoji: "🐆",
        meaning: "An animal that hunts other animals for food.",
        exampleSentence: "The jaguar is a top predator in the rainforest.",
      },
      {
        word: "vegetation",
        emoji: "🌿",
        meaning: "Plants or plant life that grow in an area.",
        exampleSentence: "Dense vegetation covers the forest floor.",
      },
      {
        word: "photosynthesis",
        emoji: "☀️",
        meaning: "The process plants use to make food from sunlight and CO₂.",
        exampleSentence: "Photosynthesis produces the oxygen we breathe.",
      },
      {
        word: "extinction",
        emoji: "💀",
        meaning: "When every member of a species has died and none are left.",
        exampleSentence:
          "Deforestation pushes many animals towards extinction.",
      },
      {
        word: "resilience",
        emoji: "💪",
        meaning: "The ability to recover from difficulty.",
        exampleSentence: "The forest shows great resilience after a fire.",
      },
      {
        word: "symbiosis",
        emoji: "🤝",
        meaning:
          "A close relationship between two different species that benefits both.",
        exampleSentence: "The bee and flower have a symbiosis relationship.",
      },
    ],
  ],
  6: [
    [
      {
        word: "commerce",
        emoji: "🏪",
        meaning: "The buying and selling of goods and services.",
        exampleSentence: "E-commerce has transformed how people shop.",
      },
      {
        word: "resource",
        emoji: "⛏️",
        meaning: "A supply of something useful that can be used.",
        exampleSentence: "Water is a precious natural resource.",
      },
      {
        word: "govern",
        emoji: "🏛️",
        meaning: "To control and run a country or organisation.",
        exampleSentence: "Leaders govern with the support of citizens.",
      },
      {
        word: "economy",
        emoji: "💹",
        meaning: "The system by which a country manages its money and trade.",
        exampleSentence: "A strong economy helps reduce poverty.",
      },
      {
        word: "constitution",
        emoji: "📜",
        meaning: "The basic set of laws and principles of a country.",
        exampleSentence:
          "India's constitution guarantees freedom to all citizens.",
      },
      {
        word: "democracy",
        emoji: "🗳️",
        meaning: "A system where citizens vote to choose their leaders.",
        exampleSentence: "In a democracy, every vote matters.",
      },
      {
        word: "treaty",
        emoji: "🤝",
        meaning: "A formal agreement between two or more countries.",
        exampleSentence: "The countries signed a peace treaty.",
      },
      {
        word: "citizen",
        emoji: "👤",
        meaning: "A person who legally belongs to a country.",
        exampleSentence: "Every citizen has rights and responsibilities.",
      },
    ],
    [
      {
        word: "latitude",
        emoji: "🗺️",
        meaning: "The distance north or south of the equator on a map.",
        exampleSentence: "Cities at high latitude experience cold winters.",
      },
      {
        word: "longitude",
        emoji: "🌐",
        meaning: "The distance east or west of the prime meridian on a map.",
        exampleSentence: "Longitude helps determine time zones.",
      },
      {
        word: "peninsula",
        emoji: "🏝️",
        meaning: "A piece of land almost surrounded by water.",
        exampleSentence: "India is a peninsula surrounded by three seas.",
      },
      {
        word: "plateau",
        emoji: "🏔️",
        meaning: "A flat area of land at a high elevation.",
        exampleSentence: "The Deccan plateau covers much of central India.",
      },
      {
        word: "tributary",
        emoji: "🌊",
        meaning: "A smaller river that flows into a larger one.",
        exampleSentence: "The Yamuna is a tributary of the Ganga.",
      },
      {
        word: "erosion",
        emoji: "🪨",
        meaning: "The gradual wearing away of rock or soil by wind or water.",
        exampleSentence: "Wind erosion creates sand dunes in deserts.",
      },
      {
        word: "sediment",
        emoji: "⛱️",
        meaning: "Sand, soil, and rock material deposited by water or wind.",
        exampleSentence: "Rivers carry sediment down to the sea.",
      },
      {
        word: "delta",
        emoji: "🌊",
        meaning: "A triangular area of land at the mouth of a river.",
        exampleSentence: "The Sundarbans sits in the Ganga delta.",
      },
    ],
    [
      {
        word: "medieval",
        emoji: "🏰",
        meaning: "Relating to the Middle Ages (roughly 500–1500 CE).",
        exampleSentence: "Medieval castles were built for protection.",
      },
      {
        word: "empire",
        emoji: "👑",
        meaning: "A large group of countries ruled by one powerful ruler.",
        exampleSentence:
          "The Mughal empire was one of the greatest in history.",
      },
      {
        word: "invasion",
        emoji: "⚔️",
        meaning: "An armed attack on a foreign country.",
        exampleSentence: "The invasion led to years of conflict.",
      },
      {
        word: "dynasty",
        emoji: "🏛️",
        meaning: "A series of rulers from the same family.",
        exampleSentence: "The Gupta dynasty was known for art and science.",
      },
      {
        word: "conquest",
        emoji: "🗡️",
        meaning: "The act of taking over a country or territory by force.",
        exampleSentence: "The conquest of new lands expanded the empire.",
      },
      {
        word: "tribute",
        emoji: "💰",
        meaning:
          "Something given as a sign of respect or as payment to a ruler.",
        exampleSentence: "Smaller kingdoms paid tribute to the emperor.",
      },
      {
        word: "alliance",
        emoji: "🤝",
        meaning: "A union between countries or groups for a common goal.",
        exampleSentence:
          "The two kingdoms formed an alliance against their enemy.",
      },
      {
        word: "manuscript",
        emoji: "📖",
        meaning: "A handwritten book or document, especially an ancient one.",
        exampleSentence: "Monks copied manuscripts by hand in the monastery.",
      },
    ],
    [
      {
        word: "nutrition",
        emoji: "🥗",
        meaning: "The process of eating the right foods for good health.",
        exampleSentence: "Good nutrition helps children grow strong.",
      },
      {
        word: "protein",
        emoji: "🥚",
        meaning:
          "A nutrient found in food that helps build muscles and repair cells.",
        exampleSentence: "Eggs and lentils are good sources of protein.",
      },
      {
        word: "organism",
        emoji: "🦠",
        meaning: "Any living thing, including plants, animals, and bacteria.",
        exampleSentence: "A bacterium is a microscopic organism.",
      },
      {
        word: "tissue",
        emoji: "🔬",
        meaning: "A group of similar cells that perform a specific function.",
        exampleSentence: "Muscle tissue helps the body move.",
      },
      {
        word: "immunity",
        emoji: "🛡️",
        meaning: "The body's ability to resist disease and infection.",
        exampleSentence: "Vaccines boost immunity against diseases.",
      },
      {
        word: "digestion",
        emoji: "🍽️",
        meaning: "The process of breaking down food in the body for energy.",
        exampleSentence: "Digestion begins in the mouth.",
      },
      {
        word: "nutrient",
        emoji: "🌽",
        meaning: "A substance in food that the body needs to stay healthy.",
        exampleSentence: "Vegetables are rich in essential nutrients.",
      },
      {
        word: "metabolism",
        emoji: "⚡",
        meaning:
          "The chemical processes in the body that convert food into energy.",
        exampleSentence: "Exercise speeds up your metabolism.",
      },
    ],
  ],
  7: [
    [
      {
        word: "democracy",
        emoji: "🗳️",
        meaning: "A system of government where people elect their leaders.",
        exampleSentence: "Democracy gives every citizen a voice.",
      },
      {
        word: "parliament",
        emoji: "🏛️",
        meaning: "The group of elected people who make the laws of a country.",
        exampleSentence: "New laws are discussed and passed in parliament.",
      },
      {
        word: "legislation",
        emoji: "📜",
        meaning: "Laws that are made by a parliament or government.",
        exampleSentence: "New legislation protects the rights of workers.",
      },
      {
        word: "judiciary",
        emoji: "⚖️",
        meaning: "The branch of government responsible for courts and justice.",
        exampleSentence: "The judiciary ensures laws are applied fairly.",
      },
      {
        word: "sovereignty",
        emoji: "🏴",
        meaning: "The full power and authority of a state to govern itself.",
        exampleSentence: "India gained sovereignty in 1947.",
      },
      {
        word: "referendum",
        emoji: "📋",
        meaning: "A vote by citizens on a single important question.",
        exampleSentence: "The government held a referendum on the new policy.",
      },
      {
        word: "amendment",
        emoji: "✏️",
        meaning: "A change or addition made to a law or official document.",
        exampleSentence: "The constitution has been amended many times.",
      },
      {
        word: "bureaucracy",
        emoji: "🗂️",
        meaning: "The complex system of rules and officials in a government.",
        exampleSentence: "Too much bureaucracy can slow things down.",
      },
    ],
    [
      {
        word: "molecule",
        emoji: "⚗️",
        meaning:
          "The smallest unit of a substance that has all its chemical properties.",
        exampleSentence: "Water is made of hydrogen and oxygen molecules.",
      },
      {
        word: "atom",
        emoji: "⚛️",
        meaning: "The smallest particle of a chemical element.",
        exampleSentence: "Everything around us is made of atoms.",
      },
      {
        word: "element",
        emoji: "🧪",
        meaning:
          "A pure substance that cannot be broken down into simpler substances.",
        exampleSentence: "Gold is a precious chemical element.",
      },
      {
        word: "compound",
        emoji: "🔗",
        meaning: "A substance formed when two or more elements combine.",
        exampleSentence: "Water is a compound of hydrogen and oxygen.",
      },
      {
        word: "reaction",
        emoji: "💥",
        meaning: "A process in which substances change to form new substances.",
        exampleSentence: "A chemical reaction produces heat and light.",
      },
      {
        word: "catalyst",
        emoji: "⚡",
        meaning: "A substance that speeds up a chemical reaction.",
        exampleSentence: "Enzymes act as catalysts in our body.",
      },
      {
        word: "hypothesis",
        emoji: "🤔",
        meaning: "A proposed explanation that can be tested by an experiment.",
        exampleSentence:
          "The scientist formed a hypothesis before the experiment.",
      },
      {
        word: "variable",
        emoji: "📊",
        meaning: "A factor that can change in a scientific experiment.",
        exampleSentence: "Temperature was the variable in their experiment.",
      },
    ],
    [
      {
        word: "colonialism",
        emoji: "🚢",
        meaning:
          "The practice of a powerful country taking control of another country.",
        exampleSentence:
          "India suffered under British colonialism for 200 years.",
      },
      {
        word: "nationalism",
        emoji: "🏴",
        meaning: "Strong pride in one's country and desire for independence.",
        exampleSentence: "Nationalism inspired freedom fighters across India.",
      },
      {
        word: "revolt",
        emoji: "✊",
        meaning: "To rise up against authority in protest or rebellion.",
        exampleSentence:
          "The 1857 revolt was India's first major uprising against British rule.",
      },
      {
        word: "independence",
        emoji: "🎉",
        meaning: "Freedom from outside control.",
        exampleSentence: "India gained independence on 15th August 1947.",
      },
      {
        word: "partition",
        emoji: "🗺️",
        meaning: "The division of a country into separate parts.",
        exampleSentence: "The partition of India in 1947 affected millions.",
      },
      {
        word: "liberation",
        emoji: "🕊️",
        meaning: "The act of gaining freedom from control or oppression.",
        exampleSentence:
          "The liberation of the country was celebrated joyfully.",
      },
      {
        word: "resistance",
        emoji: "🛡️",
        meaning: "The act of fighting against something unwanted.",
        exampleSentence:
          "Non-violent resistance was Gandhi's most powerful tool.",
      },
      {
        word: "oppression",
        emoji: "⛓️",
        meaning: "Unjust or cruel exercise of authority over others.",
        exampleSentence: "People bravely fought against oppression.",
      },
    ],
    [
      {
        word: "friction",
        emoji: "🔥",
        meaning:
          "The force that resists motion between two surfaces in contact.",
        exampleSentence: "Friction slows down a sliding object.",
      },
      {
        word: "velocity",
        emoji: "🚀",
        meaning: "The speed of an object in a specific direction.",
        exampleSentence: "The rocket reached an incredible velocity.",
      },
      {
        word: "momentum",
        emoji: "➡️",
        meaning: "The force of a moving object based on its mass and speed.",
        exampleSentence: "A heavy truck has greater momentum than a bicycle.",
      },
      {
        word: "inertia",
        emoji: "🧱",
        meaning: "The tendency of an object to stay still or keep moving.",
        exampleSentence: "Inertia keeps a rolling ball moving.",
      },
      {
        word: "acceleration",
        emoji: "📈",
        meaning: "The rate at which an object's speed increases.",
        exampleSentence: "The car had a high acceleration on the motorway.",
      },
      {
        word: "gravity",
        emoji: "⬇️",
        meaning: "The force that pulls objects towards the Earth.",
        exampleSentence: "Gravity holds the moon in its orbit.",
      },
      {
        word: "potential",
        emoji: "🔋",
        meaning: "Stored energy that can be released as motion.",
        exampleSentence: "A ball at the top of a hill has potential energy.",
      },
      {
        word: "equilibrium",
        emoji: "⚖️",
        meaning: "A state of balance where forces cancel each other out.",
        exampleSentence:
          "A seesaw is in equilibrium when both sides are equal.",
      },
    ],
  ],
  8: [
    [
      {
        word: "globalisation",
        emoji: "🌐",
        meaning: "The process by which the world becomes more interconnected.",
        exampleSentence: "Globalisation has increased trade between countries.",
      },
      {
        word: "industrialisation",
        emoji: "🏭",
        meaning:
          "The development of manufacturing and industry on a large scale.",
        exampleSentence: "Industrialisation brought people to cities.",
      },
      {
        word: "urbanisation",
        emoji: "🏙️",
        meaning: "The process of people moving from rural to urban areas.",
        exampleSentence:
          "Rapid urbanisation has created traffic problems in cities.",
      },
      {
        word: "infrastructure",
        emoji: "🏗️",
        meaning: "Basic physical systems of a country, like roads and power.",
        exampleSentence: "Good infrastructure supports a growing economy.",
      },
      {
        word: "migration",
        emoji: "✈️",
        meaning: "Moving from one place to another to live or work.",
        exampleSentence:
          "Rural-to-urban migration is common in developing countries.",
      },
      {
        word: "sustainability",
        emoji: "♻️",
        meaning:
          "Using resources carefully so they are available for the future.",
        exampleSentence: "Sustainability is key to protecting the environment.",
      },
      {
        word: "regulation",
        emoji: "📋",
        meaning: "A rule or law made by an authority to control something.",
        exampleSentence: "Government regulations protect workers' rights.",
      },
      {
        word: "disparity",
        emoji: "⚖️",
        meaning: "A great difference, especially in wealth or opportunity.",
        exampleSentence:
          "There is a large disparity between rich and poor countries.",
      },
    ],
    [
      {
        word: "heredity",
        emoji: "🧬",
        meaning:
          "The passing of traits from parents to offspring through genes.",
        exampleSentence: "Eye colour is determined by heredity.",
      },
      {
        word: "chromosome",
        emoji: "🔬",
        meaning: "A structure in cells that carries genetic information.",
        exampleSentence: "Humans have 46 chromosomes in each cell.",
      },
      {
        word: "evolution",
        emoji: "🦎",
        meaning: "The gradual development of species over millions of years.",
        exampleSentence:
          "Darwin's theory of evolution changed our understanding of life.",
      },
      {
        word: "mutation",
        emoji: "🧫",
        meaning: "A change in the DNA of an organism.",
        exampleSentence: "A mutation can sometimes lead to new traits.",
      },
      {
        word: "adaptation",
        emoji: "🦋",
        meaning: "A feature that helps an organism survive in its environment.",
        exampleSentence:
          "The cactus's thick skin is an adaptation to the desert.",
      },
      {
        word: "fossil",
        emoji: "🦴",
        meaning: "The preserved remains of an ancient organism.",
        exampleSentence: "Scientists found a fossil of a dinosaur in the rock.",
      },
      {
        word: "natural selection",
        emoji: "✅",
        meaning:
          "The process where the best-adapted organisms survive and reproduce.",
        exampleSentence: "Natural selection drives evolution.",
      },
      {
        word: "biodiversity",
        emoji: "🌍",
        meaning: "The variety of life in a particular area.",
        exampleSentence:
          "Protecting biodiversity is essential for healthy ecosystems.",
      },
    ],
    [
      {
        word: "Renaissance",
        emoji: "🎨",
        meaning:
          "The period of great cultural and artistic revival in Europe (14th–17th century).",
        exampleSentence:
          "The Renaissance produced masterpieces by Leonardo da Vinci.",
      },
      {
        word: "reformation",
        emoji: "⛪",
        meaning: "A 16th-century movement that changed the Christian church.",
        exampleSentence:
          "The Reformation led to the creation of Protestant churches.",
      },
      {
        word: "exploration",
        emoji: "🧭",
        meaning: "The act of travelling to discover unknown places.",
        exampleSentence: "European exploration opened up new trade routes.",
      },
      {
        word: "trade route",
        emoji: "🗺️",
        meaning:
          "A path or sea lane used for buying and selling goods between places.",
        exampleSentence: "The Silk Road was an ancient trade route.",
      },
      {
        word: "imperialism",
        emoji: "🌍",
        meaning:
          "The policy of extending a country's power by taking over others.",
        exampleSentence: "European imperialism shaped much of Asia and Africa.",
      },
      {
        word: "philosophy",
        emoji: "💭",
        meaning:
          "The study of fundamental questions about life, knowledge, and existence.",
        exampleSentence: "Greek philosophy influenced modern science.",
      },
      {
        word: "Renaissance",
        emoji: "🖼️",
        meaning:
          "A rebirth of interest in classical arts and learning in Europe.",
        exampleSentence:
          "Artists of the Renaissance used perspective in their paintings.",
      },
      {
        word: "secular",
        emoji: "🏙️",
        meaning: "Not connected with religion; worldly rather than spiritual.",
        exampleSentence: "Secular education is not based on religion.",
      },
    ],
    [
      {
        word: "photosynthesis",
        emoji: "🌿",
        meaning: "The process plants use to make food using sunlight.",
        exampleSentence: "Photosynthesis occurs in the chlorophyll of leaves.",
      },
      {
        word: "chlorophyll",
        emoji: "🍃",
        meaning:
          "The green pigment in plants that absorbs sunlight for photosynthesis.",
        exampleSentence: "Chlorophyll gives leaves their green colour.",
      },
      {
        word: "respiration",
        emoji: "💨",
        meaning: "The process of converting food into energy inside cells.",
        exampleSentence: "Cellular respiration releases energy from glucose.",
      },
      {
        word: "osmosis",
        emoji: "💧",
        meaning:
          "The movement of water through a membrane from a weaker to stronger solution.",
        exampleSentence: "Osmosis allows plant roots to absorb water.",
      },
      {
        word: "hormone",
        emoji: "🧪",
        meaning:
          "A chemical produced by the body that controls specific functions.",
        exampleSentence: "Growth hormone helps children develop.",
      },
      {
        word: "enzyme",
        emoji: "⚗️",
        meaning: "A protein that speeds up chemical reactions in the body.",
        exampleSentence: "Digestive enzymes break down food in the stomach.",
      },
      {
        word: "parasite",
        emoji: "🦟",
        meaning:
          "An organism that lives in or on another organism and harms it.",
        exampleSentence: "The mosquito is a parasite that spreads malaria.",
      },
      {
        word: "symbiosis",
        emoji: "🐠",
        meaning:
          "A relationship between two organisms that benefits at least one of them.",
        exampleSentence: "Clownfish and sea anemones have a symbiosis.",
      },
    ],
  ],
  9: [
    [
      {
        word: "geopolitics",
        emoji: "🌍",
        meaning: "The study of how geography affects international politics.",
        exampleSentence:
          "Geopolitics explains why countries compete for resources.",
      },
      {
        word: "alliance",
        emoji: "🤝",
        meaning: "A union of countries for mutual benefit or defence.",
        exampleSentence: "NATO is a military alliance of many nations.",
      },
      {
        word: "diplomacy",
        emoji: "🕊️",
        meaning: "The art of managing international relations peacefully.",
        exampleSentence: "Diplomacy can prevent wars between nations.",
      },
      {
        word: "sanction",
        emoji: "⛔",
        meaning: "An official penalty imposed on a country for breaking rules.",
        exampleSentence: "Economic sanctions were imposed on the nation.",
      },
      {
        word: "sovereignty",
        emoji: "🏴",
        meaning:
          "A country's right to govern itself without outside interference.",
        exampleSentence: "Every country's sovereignty must be respected.",
      },
      {
        word: "propaganda",
        emoji: "📣",
        meaning:
          "Information spread to promote a particular viewpoint, often misleading.",
        exampleSentence: "Propaganda was widely used during the war.",
      },
      {
        word: "intervention",
        emoji: "✋",
        meaning: "The act of coming between parties to help or influence.",
        exampleSentence: "Military intervention ended the conflict.",
      },
      {
        word: "neutrality",
        emoji: "⚖️",
        meaning: "The state of not supporting either side in a conflict.",
        exampleSentence: "Switzerland is known for its political neutrality.",
      },
    ],
    [
      {
        word: "quantum",
        emoji: "⚛️",
        meaning: "Relating to the smallest possible unit of energy in physics.",
        exampleSentence:
          "Quantum physics describes the behaviour of subatomic particles.",
      },
      {
        word: "relativity",
        emoji: "⏱️",
        meaning:
          "Einstein's theory that space and time are relative to the observer.",
        exampleSentence:
          "The theory of relativity changed our view of the universe.",
      },
      {
        word: "electromagnetic",
        emoji: "📡",
        meaning: "Related to electric and magnetic forces acting together.",
        exampleSentence: "Radio waves are a form of electromagnetic radiation.",
      },
      {
        word: "nuclear",
        emoji: "☢️",
        meaning: "Relating to the nucleus of an atom or nuclear energy.",
        exampleSentence:
          "Nuclear energy produces electricity without burning fuel.",
      },
      {
        word: "radioactive",
        emoji: "⚠️",
        meaning: "Emitting radiation due to unstable atomic nuclei.",
        exampleSentence: "Radioactive materials must be stored safely.",
      },
      {
        word: "fission",
        emoji: "💥",
        meaning: "The splitting of an atomic nucleus releasing vast energy.",
        exampleSentence: "Nuclear fission powers atomic bombs and reactors.",
      },
      {
        word: "fusion",
        emoji: "🌟",
        meaning: "The joining of atomic nuclei releasing enormous energy.",
        exampleSentence: "Nuclear fusion is the energy source of the Sun.",
      },
      {
        word: "semiconductor",
        emoji: "💻",
        meaning:
          "A material that conducts electricity under certain conditions, used in electronics.",
        exampleSentence: "Silicon is the most common semiconductor.",
      },
    ],
    [
      {
        word: "enlightenment",
        emoji: "💡",
        meaning:
          "An 18th-century movement promoting reason, science, and human rights.",
        exampleSentence: "The Enlightenment inspired democratic revolutions.",
      },
      {
        word: "revolution",
        emoji: "🔄",
        meaning: "A dramatic, wide-reaching change in society or government.",
        exampleSentence: "The French Revolution overthrew the monarchy.",
      },
      {
        word: "ideology",
        emoji: "💭",
        meaning:
          "A system of ideas and beliefs that guides politics or society.",
        exampleSentence: "Communism and capitalism are competing ideologies.",
      },
      {
        word: "secularism",
        emoji: "🏙️",
        meaning: "The separation of religion from public or political affairs.",
        exampleSentence: "Secularism protects freedom of religion.",
      },
      {
        word: "capitalism",
        emoji: "💰",
        meaning:
          "An economic system based on private ownership and free markets.",
        exampleSentence: "Capitalism drives innovation and competition.",
      },
      {
        word: "socialism",
        emoji: "🤝",
        meaning:
          "A system where wealth and resources are shared by the community.",
        exampleSentence: "Socialism aims to reduce economic inequality.",
      },
      {
        word: "industrialisation",
        emoji: "🏭",
        meaning: "The development of industry on a large scale.",
        exampleSentence:
          "Industrialisation transformed Britain in the 19th century.",
      },
      {
        word: "imperialism",
        emoji: "🚢",
        meaning: "The extension of a nation's power over other territories.",
        exampleSentence: "Imperialism caused exploitation of colonies.",
      },
    ],
    [
      {
        word: "neural",
        emoji: "🧠",
        meaning: "Relating to nerves or the nervous system.",
        exampleSentence: "Neural pathways in the brain control movement.",
      },
      {
        word: "stimulus",
        emoji: "⚡",
        meaning: "Something that causes a reaction in the body or mind.",
        exampleSentence: "A loud noise is a sudden stimulus.",
      },
      {
        word: "homeostasis",
        emoji: "⚖️",
        meaning: "The body's ability to maintain stable internal conditions.",
        exampleSentence: "Sweating is part of homeostasis to cool the body.",
      },
      {
        word: "endocrine",
        emoji: "🧪",
        meaning:
          "Relating to glands that release hormones into the bloodstream.",
        exampleSentence:
          "The endocrine system regulates growth and metabolism.",
      },
      {
        word: "antibody",
        emoji: "🛡️",
        meaning: "A protein produced by the body to fight infection.",
        exampleSentence: "Antibodies are produced when we get vaccinated.",
      },
      {
        word: "pathogen",
        emoji: "🦠",
        meaning: "A microorganism that causes disease.",
        exampleSentence: "The virus is a pathogen that spreads through air.",
      },
      {
        word: "circulation",
        emoji: "❤️",
        meaning: "The movement of blood through the body's blood vessels.",
        exampleSentence: "Exercise improves blood circulation.",
      },
      {
        word: "diagnosis",
        emoji: "🩺",
        meaning: "The identification of a disease based on its symptoms.",
        exampleSentence: "Early diagnosis leads to better treatment.",
      },
    ],
  ],
  10: [
    [
      {
        word: "macroeconomics",
        emoji: "📊",
        meaning:
          "The study of the economy as a whole, including GDP and inflation.",
        exampleSentence:
          "Macroeconomics helps governments plan national budgets.",
      },
      {
        word: "microeconomics",
        emoji: "🔍",
        meaning: "The study of individual economic decisions and markets.",
        exampleSentence: "Microeconomics analyses how businesses set prices.",
      },
      {
        word: "inflation",
        emoji: "📈",
        meaning:
          "A general rise in prices over time, reducing purchasing power.",
        exampleSentence: "High inflation makes everyday goods more expensive.",
      },
      {
        word: "monetary",
        emoji: "💱",
        meaning: "Relating to money or currency.",
        exampleSentence: "The central bank controls monetary policy.",
      },
      {
        word: "fiscal",
        emoji: "🏦",
        meaning: "Relating to government revenue and spending.",
        exampleSentence: "Fiscal policy can stimulate economic growth.",
      },
      {
        word: "deficit",
        emoji: "📉",
        meaning: "The amount by which spending exceeds income.",
        exampleSentence: "A large budget deficit can increase national debt.",
      },
      {
        word: "subsidy",
        emoji: "💸",
        meaning: "Money paid by a government to reduce the cost of a product.",
        exampleSentence: "Farming subsidies help keep food prices low.",
      },
      {
        word: "equilibrium",
        emoji: "⚖️",
        meaning: "A stable market state where supply equals demand.",
        exampleSentence:
          "Price equilibrium is reached when buyers and sellers agree.",
      },
    ],
    [
      {
        word: "organic chemistry",
        emoji: "⚗️",
        meaning: "The branch of chemistry studying carbon-based compounds.",
        exampleSentence:
          "Organic chemistry is fundamental to medicine and materials science.",
      },
      {
        word: "polymer",
        emoji: "🔗",
        meaning: "A large molecule made of repeating smaller units.",
        exampleSentence: "Plastic is a synthetic polymer.",
      },
      {
        word: "oxidation",
        emoji: "🔥",
        meaning:
          "A chemical reaction where a substance loses electrons or gains oxygen.",
        exampleSentence: "Rusting is a slow oxidation process.",
      },
      {
        word: "electrolysis",
        emoji: "⚡",
        meaning: "The use of electric current to drive a chemical reaction.",
        exampleSentence: "Electrolysis is used to extract metals from ores.",
      },
      {
        word: "alloy",
        emoji: "🔩",
        meaning: "A metal made by mixing two or more metals.",
        exampleSentence: "Steel is an alloy of iron and carbon.",
      },
      {
        word: "corrosion",
        emoji: "🟫",
        meaning: "The gradual destruction of a material by chemical reactions.",
        exampleSentence: "Corrosion weakens iron bridges over time.",
      },
      {
        word: "titration",
        emoji: "🧪",
        meaning: "A lab technique to find the concentration of a solution.",
        exampleSentence: "Titration is used in pharmaceutical quality control.",
      },
      {
        word: "precipitate",
        emoji: "⬇️",
        meaning: "A solid that forms and falls out of solution in a reaction.",
        exampleSentence: "A white precipitate formed when the liquids mixed.",
      },
    ],
    [
      {
        word: "imperialism",
        emoji: "🌍",
        meaning:
          "The practice of extending national power through colonisation.",
        exampleSentence: "European imperialism shaped the modern world.",
      },
      {
        word: "apartheid",
        emoji: "✊",
        meaning: "A policy of racial segregation and discrimination.",
        exampleSentence:
          "Nelson Mandela fought against apartheid in South Africa.",
      },
      {
        word: "holocaust",
        emoji: "✡️",
        meaning: "The systematic mass murder of Jewish people by the Nazis.",
        exampleSentence: "The Holocaust was one of history's darkest events.",
      },
      {
        word: "decolonisation",
        emoji: "🕊️",
        meaning: "The process by which colonies gain independence.",
        exampleSentence: "Decolonisation reshaped the map of Africa and Asia.",
      },
      {
        word: "propaganda",
        emoji: "📣",
        meaning: "Biased information used to influence public opinion.",
        exampleSentence: "Wartime propaganda was used to encourage enlistment.",
      },
      {
        word: "genocide",
        emoji: "⚠️",
        meaning: "The deliberate killing of a large group of people.",
        exampleSentence:
          "The international community works to prevent genocide.",
      },
      {
        word: "reparation",
        emoji: "💰",
        meaning: "Compensation paid for harm done, especially after a war.",
        exampleSentence: "Germany paid reparations after World War I.",
      },
      {
        word: "ceasefire",
        emoji: "🕊️",
        meaning: "A temporary stop to fighting agreed by all sides.",
        exampleSentence: "The ceasefire ended months of conflict.",
      },
    ],
    [
      {
        word: "neuroscience",
        emoji: "🧠",
        meaning: "The scientific study of the nervous system and brain.",
        exampleSentence: "Neuroscience helps explain how memory works.",
      },
      {
        word: "genome",
        emoji: "🧬",
        meaning: "The complete set of genetic information in an organism.",
        exampleSentence: "Scientists mapped the human genome in 2003.",
      },
      {
        word: "nanotechnology",
        emoji: "🔬",
        meaning:
          "Technology involving materials at the atomic or molecular scale.",
        exampleSentence: "Nanotechnology is used in advanced drug delivery.",
      },
      {
        word: "artificial intelligence",
        emoji: "🤖",
        meaning:
          "The development of computer systems that perform human-like tasks.",
        exampleSentence: "Artificial intelligence is transforming healthcare.",
      },
      {
        word: "algorithm",
        emoji: "💻",
        meaning: "A step-by-step set of instructions for solving a problem.",
        exampleSentence: "Search engines use algorithms to rank websites.",
      },
      {
        word: "biotechnology",
        emoji: "🧫",
        meaning:
          "Using living organisms or biological processes in technology.",
        exampleSentence: "Biotechnology has produced life-saving medicines.",
      },
      {
        word: "quantum computing",
        emoji: "⚛️",
        meaning:
          "Computing using quantum mechanical phenomena for massive processing power.",
        exampleSentence:
          "Quantum computing could break current encryption methods.",
      },
      {
        word: "renewable energy",
        emoji: "☀️",
        meaning: "Energy from natural sources that are constantly replenished.",
        exampleSentence: "Solar power is a renewable energy source.",
      },
    ],
  ],
};

export function getVocabByGrade(
  grade: number,
  passageIndex: number,
): VocabWord[] {
  const gradeData = vocabByGrade[grade];
  if (!gradeData) return vocabByGrade[1][0];
  const passageData = gradeData[passageIndex];
  if (!passageData) return gradeData[0];
  return passageData;
}
