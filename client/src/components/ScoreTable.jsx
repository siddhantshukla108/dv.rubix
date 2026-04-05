export default function ScoreTable({ scores }) {
  if (!scores?.length) {
    return <p className="text-sm text-white/60">No scores yet. Be the first!</p>;
  }

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 text-white/70">
          <tr>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Time (s)</th>
            <th className="px-4 py-3">Moves</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score._id || score.date} className="border-t border-white/10">
              <td className="px-4 py-3">{score.username}</td>
              <td className="px-4 py-3">{score.time}</td>
              <td className="px-4 py-3">{score.moves}</td>
              <td className="px-4 py-3">{new Date(score.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
