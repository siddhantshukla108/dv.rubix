import { COLOR_MAP, FACE_ORDER } from "../utils/cubeColors";

const FACE_LABELS = {
  U: "Up",
  R: "Right",
  F: "Front",
  D: "Down",
  L: "Left",
  B: "Back"
};

export default function CubeNetInput({ cubeState, selectedColor, onChange }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {FACE_ORDER.map((faceKey, index) => (
        <div key={faceKey} className="glass rounded-2xl p-4">
          <h3 className="mb-3 text-sm font-semibold text-white/70">
            {FACE_LABELS[faceKey]}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {cubeState[index].map((sticker, stickerIndex) => (
              <button
                key={`${faceKey}-${stickerIndex}`}
                type="button"
                className="h-10 w-10 rounded-lg border border-white/20"
                style={{ backgroundColor: COLOR_MAP[sticker].hex }}
                onClick={() => onChange(index, stickerIndex, selectedColor)}
                aria-label={`Set ${faceKey} ${stickerIndex}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
