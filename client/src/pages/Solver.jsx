import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import ColorPalette from "../components/ColorPalette";
import CubeNetInput from "../components/CubeNetInput";
import MoveStepper from "../components/MoveStepper";
import UploadPanel from "../components/UploadPanel";
import Loader from "../components/Loader";
import { FACE_ORDER, getSolvedCubeState } from "../utils/cubeColors";
import { validateCubeState } from "../utils/cubeValidation";
import { fromSingmasterString, toSingmasterString } from "../utils/cubeNotation";
import { solveCube } from "../services/api";

export default function Solver() {
  const [cubeState, setCubeState] = useState(getSolvedCubeState());
  const [selectedColor, setSelectedColor] = useState("U");
  const [moves, setMoves] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState("");
  const [detectError, setDetectError] = useState("");
  const [detectFaceKey, setDetectFaceKey] = useState("F");
  const importRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get("state");
    if (shared) {
      try {
        const decoded = atob(shared);
        if (decoded.length === 54) {
          setCubeState(fromSingmasterString(decoded));
        }
      } catch (err) {
        setError("Shared state is invalid.");
      }
    }
  }, []);

  const updateSticker = (faceIndex, stickerIndex, color) => {
    setCubeState((prev) => {
      const next = prev.map((face) => face.slice());
      next[faceIndex][stickerIndex] = color;
      return next;
    });
  };

  const handleSolve = async () => {
    setError("");
    const validation = validateCubeState(cubeState);
    if (!validation.ok) {
      setError(validation.error);
      return;
    }

    setLoading(true);
    try {
      const response = await solveCube(toSingmasterString(cubeState));
      setMoves(response.moves || []);
      setStepIndex(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ state: cubeState }, null, 2)], {
      type: "application/json"
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cube-state.json";
    link.click();
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(reader.result);
        if (Array.isArray(payload.state)) {
          setCubeState(payload.state);
        }
      } catch (err) {
        setError("Failed to import cube state.");
      }
    };
    reader.readAsText(file);
  };

  const handleShare = async () => {
    const encoded = btoa(toSingmasterString(cubeState));
    const link = `${window.location.origin}/solver?state=${encoded}`;
    await navigator.clipboard.writeText(link);
  };

  // Map picked RGB to nearest cube color
  const COLOR_MAP_RGB = {
    U: [248, 250, 252],
    R: [239, 68, 68],
    F: [34, 197, 94],
    D: [250, 204, 21],
    L: [249, 115, 22],
    B: [59, 130, 246],
  };
  function nearestColor(rgb) {
    let best = "U";
    let bestDist = Infinity;
    for (const [key, ref] of Object.entries(COLOR_MAP_RGB)) {
      const dist = Math.sqrt(
        (rgb[0] - ref[0]) ** 2 +
        (rgb[1] - ref[1]) ** 2 +
        (rgb[2] - ref[2]) ** 2
      );
      if (dist < bestDist) {
        bestDist = dist;
        best = key;
      }
    }
    return best;
  }

  const handleDetect = async (points) => {
    setDetectError("");
    setDetecting(true);
    try {
      if (Array.isArray(points) && points.length === 9) {
        const faceIndex = FACE_ORDER.indexOf(detectFaceKey);
        setCubeState((prev) => {
          const next = prev.map((face) => face.slice());
          next[faceIndex] = points.map(nearestColor);
          return next;
        });
      }
    } catch (err) {
      setDetectError("Failed to map colors.");
    } finally {
      setDetecting(false);
    }
  };

  return (
    <section className="section">
      <SectionHeader
        title="Manual Cube Solver"
        subtitle="Select colors, validate the cube, and solve using the Kociemba algorithm."
      />

      <div className="mb-6 flex justify-end">
        <Link to="/guide#solver" className="btn btn-secondary text-xs">
          Help: How to use Solver
        </Link>
      </div>

      <div className="glass mb-6 rounded-2xl p-4">
        <ColorPalette selected={selectedColor} onSelect={setSelectedColor} />
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="btn btn-primary" onClick={handleSolve} disabled={loading}>
            Solve Cube
          </button>
          <button className="btn btn-secondary" onClick={() => setCubeState(getSolvedCubeState())}>
            Reset
          </button>
          <button className="btn btn-secondary" onClick={handleExport}>
            Export JSON
          </button>
          <button className="btn btn-secondary" onClick={() => importRef.current?.click()}>
            Import JSON
          </button>
          <button className="btn btn-secondary" onClick={handleShare}>
            Copy Share Link
          </button>
          {loading ? <Loader label="Solving..." /> : null}
        </div>
        <input
          ref={importRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleImport}
        />
        {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
      </div>

      <CubeNetInput
        cubeState={cubeState}
        selectedColor={selectedColor}
        onChange={updateSticker}
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <UploadPanel
          faceKey={detectFaceKey}
          onFaceChange={setDetectFaceKey}
          onFaceStickers={(faceColors) => {
            const faceIndex = FACE_ORDER.indexOf(detectFaceKey);
            setCubeState((prev) => {
              const next = prev.map((face) => face.slice());
              next[faceIndex] = faceColors;
              return next;
            });
          }}
        />
        <MoveStepper
          moves={moves}
          index={stepIndex}
          onPrev={() => setStepIndex((prev) => Math.max(prev - 1, 0))}
          onNext={() => setStepIndex((prev) => Math.min(prev + 1, moves.length - 1))}
        />
      </div>
    </section>
  );
}
