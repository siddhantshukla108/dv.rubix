// Frontend communicates with backend over REST so UI and logic can scale independently.
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

async function request(path, options) {
  const response = await fetch(`${API_BASE}${path}`, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload?.message || "Request failed";
    throw new Error(message);
  }
  return payload;
}

export async function solveCube(state) {
  return request("/api/solve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state })
  });
}

export async function detectCube(file) {
  const formData = new FormData();
  formData.append("image", file);
  return request("/api/detect", {
    method: "POST",
    body: formData
  });
}

export async function getLeaderboard() {
  return request("/api/leaderboard", { method: "GET" });
}

export async function postScore(score) {
  return request("/api/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(score)
  });
}
