import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { COLOR_MAP } from "../utils/cubeColors";
import { DoubleSide } from "three";

// Helper to get sticker color
function getStickerColor(face, idx, cubeState) {
  return COLOR_MAP[cubeState[face][idx]].hex;
}

// 3D position and orientation for each face
const FACE_CONFIGS = [
  // U, R, F, D, L, B
  { face: 0, normal: [0, 1, 0], pos: [0, 1.5, 0], rot: [Math.PI / 2, 0, 0] },
  { face: 1, normal: [1, 0, 0], pos: [1.5, 0, 0], rot: [0, -Math.PI / 2, 0] },
  { face: 2, normal: [0, 0, 1], pos: [0, 0, 1.5], rot: [0, 0, 0] },
  { face: 3, normal: [0, -1, 0], pos: [0, -1.5, 0], rot: [-Math.PI / 2, 0, 0] },
  { face: 4, normal: [-1, 0, 0], pos: [-1.5, 0, 0], rot: [0, Math.PI / 2, 0] },
  { face: 5, normal: [0, 0, -1], pos: [0, 0, -1.5], rot: [0, Math.PI, 0] }
];


function Stickers({ cubeState }) {
  // For each face, render 9 stickers
  return (
    <group>
      {FACE_CONFIGS.map((cfg) => {
        const { pos, rot, face } = cfg;
        return (
          <group key={face} position={pos} rotation={rot}>
            {[...Array(9)].map((_, i) => {
              // 3x3 grid: i = row*3 + col
              const row = Math.floor(i / 3);
              const col = i % 3;
              // Center stickers at (0,0), spacing 0.55
              const x = (col - 1) * 0.55;
              const y = (1 - row) * 0.55;
              return (
                <group key={i} position={[x, y, 0.01]}>
                  {/* Sticker */}
                  <mesh>
                    <planeGeometry args={[0.48, 0.48]} />
                    <meshStandardMaterial color={getStickerColor(face, i, cubeState)} side={DoubleSide} />
                  </mesh>
                  {/* Border */}
                  <mesh>
                    <planeGeometry args={[0.5, 0.5]} />
                    <meshStandardMaterial color="#111" wireframe={true} side={DoubleSide} />
                  </mesh>
                </group>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

export default function CubeScene({ cubeState }) {
  return (
    <div className="relative flex flex-col items-center justify-center bg-white/95 rounded-2xl shadow-xl border border-gray-200 py-6" style={{ minHeight: 420 }}>
      <div className="w-full flex items-center justify-center" style={{ minHeight: 340 }}>
        <Canvas camera={{ position: [4, 4, 4], fov: 45 }} style={{ background: "linear-gradient(180deg, #f8fafc 60%, #e0e7ef 100%)", borderRadius: "1rem", boxShadow: "0 8px 32px #0002" }}>
          <ambientLight intensity={1.25} />
          <directionalLight position={[6, 6, 6]} intensity={1.35} />
          <directionalLight position={[-5, 3, -3]} intensity={0.55} />
          <mesh rotation={[0.4, 0.6, 0]}>
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            <meshStandardMaterial color="#0f172a" transparent opacity={0.35} />
          </mesh>
          <Stickers cubeState={cubeState} />
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>
      <div className="mt-2 text-xs text-gray-500">Drag to rotate view. Use controls on the right to make moves.</div>
    </div>
  );
}
