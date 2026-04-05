import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Solver from "./pages/Solver";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import Guide from "./pages/Guide";

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar />
      <main className="px-4 pb-16 sm:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solver" element={<Solver />} />
          <Route path="/game" element={<Game />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
