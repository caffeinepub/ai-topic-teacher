export default function AppHeader() {
  return (
    <div className="w-full bg-white border-b border-gray-100 py-3 px-4">
      <div className="flex items-center justify-center gap-3">
        <svg
          width="48"
          height="48"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Classio logo"
        >
          <title>Classio logo</title>
          <circle cx="32" cy="32" r="32" fill="black" />
          <text
            x="32"
            y="32"
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize="38"
            fontWeight="bold"
            fontFamily="Georgia, serif"
          >
            C
          </text>
        </svg>
        <span className="text-2xl font-extrabold text-black tracking-widest">
          CLASSIO
        </span>
      </div>
    </div>
  );
}
