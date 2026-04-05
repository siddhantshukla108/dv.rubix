export default function Loader({ label }) {
  return (
    <div className="flex items-center gap-3 text-sm text-white/70">
      <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
      {label || "Working..."}
    </div>
  );
}
