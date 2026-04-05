import { FACE_ORDER } from "./cubeColors";

export function validateCubeState(cubeState) {
  if (!Array.isArray(cubeState) || cubeState.length !== 6) {
    return { ok: false, error: "Cube state must have 6 faces." };
  }

  const counts = { U: 0, R: 0, F: 0, D: 0, L: 0, B: 0 };

  for (const face of cubeState) {
    if (!Array.isArray(face) || face.length !== 9) {
      return { ok: false, error: "Each face must have 9 squares." };
    }

    for (const sticker of face) {
      if (!counts.hasOwnProperty(sticker)) {
        return { ok: false, error: "Invalid sticker color detected." };
      }
      counts[sticker] += 1;
    }
  }

  const invalid = FACE_ORDER.find((face) => counts[face] !== 9);
  if (invalid) {
    return { ok: false, error: "Each color must appear exactly 9 times." };
  }

  return { ok: true };
}
