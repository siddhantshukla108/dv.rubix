import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import ScoreTable from "../components/ScoreTable";
import Loader from "../components/Loader";
import { getLeaderboard, postScore } from "../services/api";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ username: "", time: "", moves: "" });

  const loadScores = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getLeaderboard();
      setScores(response.scores || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScores();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await postScore({
        username: form.username.trim(),
        time: Number(form.time),
        moves: Number(form.moves)
      });
      setForm({ username: "", time: "", moves: "" });
      loadScores();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="section">
      <SectionHeader
        title="Leaderboard"
        subtitle="Track best solve times, moves, and dates."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6">
          <h3 className="font-display text-xl">Submit Score</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <label className="grid gap-2">
              Username
              <input
                className="rounded-lg border border-white/20 bg-transparent px-3 py-2"
                value={form.username}
                onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
                required
              />
            </label>
            <label className="grid gap-2">
              Time (seconds)
              <input
                className="rounded-lg border border-white/20 bg-transparent px-3 py-2"
                type="number"
                min="1"
                value={form.time}
                onChange={(event) => setForm((prev) => ({ ...prev, time: event.target.value }))}
                required
              />
            </label>
            <label className="grid gap-2">
              Moves
              <input
                className="rounded-lg border border-white/20 bg-transparent px-3 py-2"
                type="number"
                min="1"
                value={form.moves}
                onChange={(event) => setForm((prev) => ({ ...prev, moves: event.target.value }))}
                required
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary mt-4">Submit</button>
          {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
        </form>

        <div>
          {loading ? <Loader label="Loading scores..." /> : null}
          {error ? <p className="text-xs text-red-300">{error}</p> : null}
          <ScoreTable scores={scores} />
        </div>
      </div>
    </section>
  );
}
