import SectionHeader from "../components/SectionHeader";

const gameMoves = ["U", "D", "R", "L", "F", "B"];

export default function Guide() {
  return (
    <section className="section">
      <SectionHeader
        title="User Manual"
        subtitle="Learn how to use every part of CubeLab in a few minutes."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <article id="quick-start" className="glass rounded-2xl p-6 scroll-mt-24">
          <h3 className="font-display text-2xl">Quick Start</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-white/80">
            <li>Open Solver to enter your cube colors.</li>
            <li>Click Solve Cube to generate moves.</li>
            <li>Use Move Stepper to follow the solution step by step.</li>
            <li>Open Game mode to practice speed solves.</li>
          </ol>
        </article>

        <article id="solver" className="glass rounded-2xl p-6 scroll-mt-24">
          <h3 className="font-display text-2xl">Solver Page</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/80">
            <li>Select a color from the palette.</li>
            <li>Click stickers on the cube net to paint all 54 stickers.</li>
            <li>Use Reset for a solved cube template.</li>
            <li>Use Export JSON and Import JSON to save/load progress.</li>
            <li>Use Copy Share Link to share your current cube state.</li>
          </ul>
        </article>

        <article id="image-assist" className="glass rounded-2xl p-6 scroll-mt-24">
          <h3 className="font-display text-2xl">Image Assist</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/80">
            <li>Upload a face photo in the Upload Panel.</li>
            <li>Pick the 9 sticker colors using the overlay grid.</li>
            <li>Choose the correct face key (U, R, F, D, L, B).</li>
            <li>Apply the detected colors to the selected face.</li>
            <li>Repeat for all six faces, then solve.</li>
          </ul>
        </article>

        <article id="game" className="glass rounded-2xl p-6 scroll-mt-24">
          <h3 className="font-display text-2xl">3D Game Mode</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/80">
            <li>Click Scramble to start a challenge.</li>
            <li>Use the move buttons or keyboard.</li>
            <li>
              Keyboard controls: {gameMoves.join(" ")} and hold Shift for prime
              moves.
            </li>
            <li>Track your time and total moves live.</li>
            <li>Use Auto Solve when you want a guided finish.</li>
          </ul>
        </article>
      </div>

      <div id="tips" className="mt-8 glass rounded-2xl p-6 scroll-mt-24">
        <h3 className="font-display text-2xl">Tips for Best Results</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/80">
          <li>Keep cube color entry consistent with your real cube orientation.</li>
          <li>In image mode, use bright light and avoid strong shadows.</li>
          <li>If solver shows validation error, re-check color counts and centers.</li>
          <li>Practice in Game mode before speed runs for better finger memory.</li>
        </ul>
      </div>
    </section>
  );
}
