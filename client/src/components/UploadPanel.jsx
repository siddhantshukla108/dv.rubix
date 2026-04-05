import { useRef, useState } from "react";
import { COLOR_MAP } from "../utils/cubeColors";

export default function UploadPanel({ faceKey, onFaceChange, onFaceStickers }) {
  const inputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [points, setPoints] = useState([]);
  const [pickIndex, setPickIndex] = useState(0);
  const [colors, setColors] = useState(Array(9).fill("U"));

  const handleImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setPoints([]);
    setPickIndex(0);
    setColors(Array(9).fill("U"));
  };

  const handleCanvasClick = (event) => {
    if (!imageUrl || pickIndex >= 9) return;
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPoints((prev) => [...prev, { x, y }]);
    setPickIndex((prev) => prev + 1);
  };

  const handleColorPick = (color) => {
    if (pickIndex === 0) return;
    setColors((prev) => {
      const next = prev.slice();
      next[pickIndex - 1] = color;
      return next;
    });
  };

  const handleApply = () => {
    if (colors.some((c) => !c)) return;
    onFaceStickers(colors);
    setImageUrl("");
    setPoints([]);
    setPickIndex(0);
    setColors(Array(9).fill("U"));
  };

  return (
    <div className="glass rounded-2xl p-4">
      <p className="text-sm text-white/70">Upload a cube face image, click 9 stickers, and assign colors.</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="text-xs text-white/70">
          Apply to face
          <select
            className="ml-2 rounded-lg border border-white/20 bg-transparent px-2 py-1 text-xs"
            value={faceKey}
            onChange={(event) => onFaceChange(event.target.value)}
          >
            <option value="U">Up</option>
            <option value="R">Right</option>
            <option value="F">Front</option>
            <option value="D">Down</option>
            <option value="L">Left</option>
            <option value="B">Back</option>
          </select>
        </label>
        <input ref={inputRef} type="file" accept="image/*" className="text-sm" onChange={handleImage} />
      </div>
      {imageUrl && (
        <div className="mt-4">
          <div className="relative inline-block">
            <img
              src={imageUrl}
              alt="Cube face"
              className="max-w-xs rounded-lg border border-white/20"
              onClick={handleCanvasClick}
              style={{ cursor: pickIndex < 9 ? "crosshair" : "not-allowed" }}
            />
            {points.map((pt, i) => (
              <div
                key={i}
                className="absolute z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-black/60 text-xs text-white"
                style={{ left: pt.x - 12, top: pt.y - 12 }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(COLOR_MAP).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleColorPick(key)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition ${
                  colors[pickIndex - 1] === key ? "border-white" : "border-white/20"
                }`}
                disabled={pickIndex === 0}
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: value.hex }}
                />
                {value.name}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              className="btn btn-primary"
              onClick={handleApply}
              disabled={colors.includes("U") || pickIndex < 9}
            >
              Apply to Face
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setImageUrl("");
                setPoints([]);
                setPickIndex(0);
                setColors(Array(9).fill("U"));
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
