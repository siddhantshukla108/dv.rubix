import SectionHeader from "../components/SectionHeader";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <section className="section">
      <div className="glass rounded-3xl p-8 sm:p-12">
        <SectionHeader
          title="Solve, Play, and Master the Cube"
          subtitle="Manual input, image detection, step-by-step solutions, and a real-time 3D game."
        />
        <div className="flex flex-wrap items-center gap-4">
          <a href="/solver" className="btn btn-primary">Start Solving</a>
          <a href="/game" className="btn btn-secondary">Launch 3D Game</a>
          <a href="/guide" className="btn btn-secondary">Read User Manual</a>
          <ThemeToggle />
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {[
          {
            title: "Manual Solver",
            body: "Paint every sticker, validate the cube, and get Kociemba moves step-by-step."
          },
          {
            title: "Image Detection",
            body: "Upload a cube face image and use the built-in color picker grid to fill stickers quickly."
          },
          {
            title: "3D Game",
            body: "Scramble, time your solves, and rotate faces with keyboard shortcuts."
          },
          {
            title: "Leaderboard",
            body: "Track best times, moves, and shareable solve stats."
          }
        ].map((card) => (
          <div key={card.title} className="glass rounded-2xl p-6">
            <h3 className="font-display text-xl">{card.title}</h3>
            <p className="mt-2 text-sm text-white/70">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
