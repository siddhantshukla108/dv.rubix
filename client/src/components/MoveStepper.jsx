export default function MoveStepper({ moves, index, onPrev, onNext }) {
  if (!moves?.length) {
    return <p className="text-sm text-white/60">No moves yet.</p>;
  }

  return (
    <div className="glass rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-white/70">Step {index + 1} of {moves.length}</p>
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={onPrev} disabled={index === 0}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={onNext} disabled={index === moves.length - 1}>
            Next
          </button>
        </div>
      </div>
      <div className="text-3xl font-display">{moves[index]}</div>
      <p className="mt-2 text-xs text-white/60">Apply this move to your cube.</p>
    </div>
  );
}
