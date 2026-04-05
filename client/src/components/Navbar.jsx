import { NavLink } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Solver", to: "/solver" },
  { label: "Game", to: "/game" },
  { label: "Manual", to: "/guide" },
  { label: "Leaderboard", to: "/leaderboard" }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <div className="font-display text-lg">dv.rubix</div>
        <div className="flex gap-4 text-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition ${isActive ? "text-accent" : "text-white/70 hover:text-white"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
