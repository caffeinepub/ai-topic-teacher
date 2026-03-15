export default function AppHeader() {
  return (
    <div className="w-full bg-white border-b border-gray-100 py-3 px-4">
      <div className="flex items-center justify-center gap-3">
        <img
          src="/assets/generated/classio-logo-transparent.dim_200x200.png"
          alt="Classio logo"
          className="w-16 h-16 object-contain"
        />
        <span className="text-2xl font-extrabold text-black tracking-widest">
          CLASSIO
        </span>
      </div>
    </div>
  );
}
