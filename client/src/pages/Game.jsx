import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import CubeScene from "../components/CubeScene";
import { applyMove, scrambleCube } from "../utils/cubeMoves";
import { getSolvedCubeState } from "../utils/cubeColors";
import { toSingmasterString } from "../utils/cubeNotation";
import { solveCube } from "../services/api";

const MOVE_KEYS = ["U", "D", "R", "L", "F", "B"];

export default function Game() {
  const [cubeState, setCubeState] = useState(getSolvedCubeState());
  const [moves, setMoves] = useState(0);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [scramble, setScramble] = useState([]);
  const [autoSolving, setAutoSolving] = useState(false);

  useEffect(() => {
    if (!running) {
      return;
    }
    const id = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const handleMove = useCallback((move) => {
    setCubeState((prev) => applyMove(prev, move));
    setMoves((prev) => prev + 1);
    setRunning(true);
  }, []);

  useEffect(() => {
    const handler = (event) => {
      const key = event.key.toUpperCase();
      if (!MOVE_KEYS.includes(key)) {
        return;
      }
      const move = event.shiftKey ? `${key}'` : key;
      handleMove(move);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleMove]);

  const handleAutoSolve = async () => {
    setAutoSolving(true);
    try {
      const response = await solveCube(toSingmasterString(cubeState));
      const sequence = response.moves || [];
      let index = 0;
      const id = setInterval(() => {
        if (index >= sequence.length) {
          clearInterval(id);
          setAutoSolving(false);
          return;
        }
        handleMove(sequence[index]);
        index += 1;
      }, 300);
    } catch (error) {
      setAutoSolving(false);
    }
  };

  return (
    <section className="section">
      <SectionHeader
        title="Real-Time 3D Game"
        subtitle="Rotate faces, scramble, and track your time. Use keyboard shortcuts: U D R L F B (Shift for prime)."
      />

      <div className="mb-6 flex justify-end">
        <Link to="/guide#game" className="btn btn-secondary text-xs">
          Help: How to play Game
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <CubeScene cubeState={cubeState} />
        <div className="glass rounded-2xl p-6">
          <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/60">Time</p>
              <p className="text-2xl font-display">{time}s</p>
            </div>
            <div>
              <p className="text-white/60">Moves</p>
              <p className="text-2xl font-display">{moves}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {MOVE_KEYS.map((move) => (
              <button
                key={move}
                className="btn btn-secondary"
                onClick={() => handleMove(move)}
              >
                {move}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                const result = scrambleCube(getSolvedCubeState());
                setCubeState(result.next);
                setScramble(result.sequence);
                setMoves(0);
                setTime(0);
                setRunning(false);
              }}
            >
              Scramble
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleAutoSolve}
              disabled={autoSolving}
            >
              {autoSolving ? "Auto Solving..." : "Auto Solve"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setCubeState(getSolvedCubeState());
                setMoves(0);
                setTime(0);
                setRunning(false);
              }}
            >
              Reset
            </button>
          </div>
          {scramble.length ? (
            <p className="mt-3 text-xs text-white/60">Scramble: {scramble.join(" ")}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
