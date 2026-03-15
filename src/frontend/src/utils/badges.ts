export const GRADE_BADGES: Record<
  number,
  { name: string; emoji: string; gradient: string }
> = {
  1: {
    name: "Seedling",
    emoji: "🌱",
    gradient: "from-green-400 to-emerald-500",
  },
  2: { name: "Explorer", emoji: "🔍", gradient: "from-teal-400 to-cyan-500" },
  3: { name: "Adventurer", emoji: "🗺️", gradient: "from-sky-400 to-blue-500" },
  4: { name: "Thinker", emoji: "💡", gradient: "from-blue-500 to-indigo-500" },
  5: {
    name: "Achiever",
    emoji: "⭐",
    gradient: "from-violet-500 to-purple-600",
  },
  6: {
    name: "Champion",
    emoji: "🏆",
    gradient: "from-amber-400 to-orange-500",
  },
  7: { name: "Scholar", emoji: "📚", gradient: "from-orange-500 to-red-500" },
  8: { name: "Innovator", emoji: "🚀", gradient: "from-rose-500 to-pink-600" },
  9: { name: "Leader", emoji: "🦁", gradient: "from-pink-500 to-fuchsia-600" },
  10: {
    name: "Master",
    emoji: "🎓",
    gradient: "from-fuchsia-500 to-purple-700",
  },
};

export function getBadge(grade: number) {
  return (
    GRADE_BADGES[grade] ?? {
      name: `Grade ${grade}`,
      emoji: "📖",
      gradient: "from-gray-400 to-gray-500",
    }
  );
}

export function getBadgeLabel(grade: number) {
  const b = getBadge(grade);
  return `${b.emoji} ${b.name}`;
}
