const FACE_INDEX = { U: 0, R: 1, F: 2, D: 3, L: 4, B: 5 };

const rotateFaceCW = (face) => [
  face[6],
  face[3],
  face[0],
  face[7],
  face[4],
  face[1],
  face[8],
  face[5],
  face[2]
];

const rotateFaceCCW = (face) => [
  face[2],
  face[5],
  face[8],
  face[1],
  face[4],
  face[7],
  face[0],
  face[3],
  face[6]
];

const getRow = (face, row) => face.slice(row * 3, row * 3 + 3);
const setRow = (face, row, values) => {
  const copy = face.slice();
  copy.splice(row * 3, 3, ...values);
  return copy;
};
const getCol = (face, col) => [face[col], face[col + 3], face[col + 6]];
const setCol = (face, col, values) => {
  const copy = face.slice();
  copy[col] = values[0];
  copy[col + 3] = values[1];
  copy[col + 6] = values[2];
  return copy;
};

function rotateU(cube) {
  const next = cube.map((f) => f.slice());
  next[FACE_INDEX.U] = rotateFaceCW(next[FACE_INDEX.U]);
  const f = getRow(cube[FACE_INDEX.F], 0);
  const r = getRow(cube[FACE_INDEX.R], 0);
  const b = getRow(cube[FACE_INDEX.B], 0);
  const l = getRow(cube[FACE_INDEX.L], 0);
  next[FACE_INDEX.R] = setRow(next[FACE_INDEX.R], 0, f);
  next[FACE_INDEX.B] = setRow(next[FACE_INDEX.B], 0, r);
  next[FACE_INDEX.L] = setRow(next[FACE_INDEX.L], 0, b);
  next[FACE_INDEX.F] = setRow(next[FACE_INDEX.F], 0, l);
  return next;
}

function rotateD(cube) {
  const next = cube.map((f) => f.slice());
  next[FACE_INDEX.D] = rotateFaceCW(next[FACE_INDEX.D]);
  const f = getRow(cube[FACE_INDEX.F], 2);
  const r = getRow(cube[FACE_INDEX.R], 2);
  const b = getRow(cube[FACE_INDEX.B], 2);
  const l = getRow(cube[FACE_INDEX.L], 2);
  next[FACE_INDEX.L] = setRow(next[FACE_INDEX.L], 2, f);
  next[FACE_INDEX.F] = setRow(next[FACE_INDEX.F], 2, r);
  next[FACE_INDEX.R] = setRow(next[FACE_INDEX.R], 2, b);
  next[FACE_INDEX.B] = setRow(next[FACE_INDEX.B], 2, l);
  return next;
}

function rotateR(cube) {
  const next = cube.map((f) => f.slice());
  next[FACE_INDEX.R] = rotateFaceCW(next[FACE_INDEX.R]);
  const u = getCol(cube[FACE_INDEX.U], 2);
  const f = getCol(cube[FACE_INDEX.F], 2);
  const d = getCol(cube[FACE_INDEX.D], 2);
  const b = getCol(cube[FACE_INDEX.B], 0).reverse();
  next[FACE_INDEX.F] = setCol(next[FACE_INDEX.F], 2, u);
  next[FACE_INDEX.D] = setCol(next[FACE_INDEX.D], 2, f);
  next[FACE_INDEX.B] = setCol(next[FACE_INDEX.B], 0, d.slice().reverse());
  next[FACE_INDEX.U] = setCol(next[FACE_INDEX.U], 2, b);
  return next;
}

function rotateL(cube) {
  const next = cube.map((f) => f.slice());
  next[FACE_INDEX.L] = rotateFaceCW(next[FACE_INDEX.L]);
  const u = getCol(cube[FACE_INDEX.U], 0);
  const f = getCol(cube[FACE_INDEX.F], 0);
  const d = getCol(cube[FACE_INDEX.D], 0);
  const b = getCol(cube[FACE_INDEX.B], 2).reverse();
  next[FACE_INDEX.B] = setCol(next[FACE_INDEX.B], 2, u.slice().reverse());
  next[FACE_INDEX.D] = setCol(next[FACE_INDEX.D], 0, f);
  next[FACE_INDEX.F] = setCol(next[FACE_INDEX.F], 0, d);
  next[FACE_INDEX.U] = setCol(next[FACE_INDEX.U], 0, b);
  return next;
}

function rotateF(cube) {
  const next = cube.map((f) => f.slice());
  next[FACE_INDEX.F] = rotateFaceCW(next[FACE_INDEX.F]);
  const u = getRow(cube[FACE_INDEX.U], 2);
  const r = getCol(cube[FACE_INDEX.R], 0);
  const d = getRow(cube[FACE_INDEX.D], 0);
  const l = getCol(cube[FACE_INDEX.L], 2);
  next[FACE_INDEX.R] = setCol(next[FACE_INDEX.R], 0, u.slice().reverse());
  next[FACE_INDEX.D] = setRow(next[FACE_INDEX.D], 0, r);
  next[FACE_INDEX.L] = setCol(next[FACE_INDEX.L], 2, d.slice().reverse());
  next[FACE_INDEX.U] = setRow(next[FACE_INDEX.U], 2, l);
  return next;
}

function rotateB(cube) {
  const next = cube.map((f) => f.slice());
  next[FACE_INDEX.B] = rotateFaceCW(next[FACE_INDEX.B]);
  const u = getRow(cube[FACE_INDEX.U], 0);
  const r = getCol(cube[FACE_INDEX.R], 2);
  const d = getRow(cube[FACE_INDEX.D], 2);
  const l = getCol(cube[FACE_INDEX.L], 0);
  next[FACE_INDEX.L] = setCol(next[FACE_INDEX.L], 0, u.slice().reverse());
  next[FACE_INDEX.D] = setRow(next[FACE_INDEX.D], 2, l);
  next[FACE_INDEX.R] = setCol(next[FACE_INDEX.R], 2, d.slice().reverse());
  next[FACE_INDEX.U] = setRow(next[FACE_INDEX.U], 0, r);
  return next;
}

const MOVE_MAP = {
  U: rotateU,
  D: rotateD,
  R: rotateR,
  L: rotateL,
  F: rotateF,
  B: rotateB
};

export function applyMove(cube, move) {
  const baseMove = move.replace("'", "").replace("2", "");
  let next = cube.map((f) => f.slice());
  if (!MOVE_MAP[baseMove]) {
    return next;
  }
  const turns = move.includes("2") ? 2 : move.includes("'") ? 3 : 1;
  for (let i = 0; i < turns; i += 1) {
    next = MOVE_MAP[baseMove](next);
  }
  return next;
}

export function scrambleCube(cube, moves = 20) {
  const keys = Object.keys(MOVE_MAP);
  let next = cube.map((f) => f.slice());
  const sequence = [];
  for (let i = 0; i < moves; i += 1) {
    const move = keys[Math.floor(Math.random() * keys.length)];
    next = applyMove(next, move);
    sequence.push(move);
  }
  return { next, sequence };
}
