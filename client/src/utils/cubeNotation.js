import { FACE_ORDER } from "./cubeColors";

export function toSingmasterString(cubeState) {
  return FACE_ORDER.map((face, index) => cubeState[index].join("")).join("");
}

export function fromSingmasterString(state) {
  const faces = [];
  for (let i = 0; i < FACE_ORDER.length; i += 1) {
    const start = i * 9;
    faces.push(state.slice(start, start + 9).split(""));
  }
  return faces;
}
