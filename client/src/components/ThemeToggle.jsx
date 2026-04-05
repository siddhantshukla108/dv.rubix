import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("theme-light", light);
  }, [light]);

  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => setLight((prev) => !prev)}
    >
      {light ? "Dark" : "Light"} Mode
    </button>
  );
}
