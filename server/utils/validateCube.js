const ALLOWED = new Set(["U", "R", "F", "D", "L", "B"]);

function validateCubeString(state) {
  if (!state || typeof state !== "string") {
    return { ok: false, error: "Cube state is required." };
  }
  if (state.length !== 54) {
    return { ok: false, error: "Cube state must be 54 characters." };
  }
  const counts = { U: 0, R: 0, F: 0, D: 0, L: 0, B: 0 };
  for (const char of state) {
    if (!ALLOWED.has(char)) {
      return { ok: false, error: "Cube state contains invalid colors." };
    }
    counts[char] += 1;
  }
  const invalid = Object.entries(counts).find(([, count]) => count !== 9);
  if (invalid) {
    return { ok: false, error: "Each color must appear exactly 9 times." };
  }
  return { ok: true };
}

module.exports = { validateCubeString };
