const Cube = require("cubejs");
const { validateCubeString } = require("./validateCube");

Cube.initSolver();

function solveCube(state) {
  const validation = validateCubeString(state);
  if (!validation.ok) {
    return { error: validation.error };
  }

  try {
    const cube = Cube.fromString(state);
    const solution = cube.solve();
    const moves = solution.split(" ").filter(Boolean);
    return { moves };
  } catch (error) {
    return { error: "Cube state is not solvable." };
  }
}

module.exports = { solveCube };
