import { COLOR_MAP } from "../utils/cubeColors";

export default function ColorPalette({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(COLOR_MAP).map(([key, value]) => (
        <button
          key={key}
          type="button"
          onClick={() => onSelect(key)}
          className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition ${
            selected === key ? "border-white" : "border-white/20"
          }`}
        >
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: value.hex }}
          />
          {value.name}
        </button>
      ))}
    </div>
  );
}
