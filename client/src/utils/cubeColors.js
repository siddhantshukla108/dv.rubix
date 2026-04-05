export const COLOR_MAP = {
  U: { name: "White", hex: "#f8fafc" },
  R: { name: "Red", hex: "#ef4444" },
  F: { name: "Green", hex: "#22c55e" },
  D: { name: "Yellow", hex: "#facc15" },
  L: { name: "Orange", hex: "#f97316" },
  B: { name: "Blue", hex: "#3b82f6" }
};

export const FACE_ORDER = ["U", "R", "F", "D", "L", "B"];

export const getSolvedCubeState = () =>
  FACE_ORDER.map((face) => Array(9).fill(face));
