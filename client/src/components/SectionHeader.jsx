export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-2 text-white/70">{subtitle}</p> : null}
    </div>
  );
}
