import { ChevronDown, CloudUpload } from "lucide-react";
import FloatingDock from "../components/FloatingDock";

const formats = [
  "GLB",
  "GLTF",
  "FBX",
  "OBJ",
  "STL",
  "PLY",
  "DAE",
  "3DS",
  "USDZ",
  "VOX",
  "PCD",
  "BVH",
  "3MF",
];

export default function ViewPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-gradient-to-b from-[#111634] via-[#0b1027] to-[#080b1d] px-5 pt-6 pb-24 text-white">
      <div className="absolute left-[-140px] top-[-60px] h-[420px] w-[420px] rounded-full bg-[#4F46E5]/10 blur-[110px]" />
      <div className="absolute bottom-[16%] left-[22%] h-[260px] w-[260px] rounded-full bg-[#06B6D4]/8 blur-[100px]" />
      <div className="absolute bottom-[-80px] right-[-60px] h-[360px] w-[360px] rounded-full bg-[#8B5CF6]/8 blur-[110px]" />

      <section className="relative z-10 w-full max-w-[820px] text-center">
        <h1 className="mt-2 text-[1.7rem] font-extrabold tracking-tight md:text-[2.2rem]">
          View Model
        </h1>
        <p className="mt-2 text-[0.88rem] text-[#AAB5D5]">
          Preview any 3D model in your browser
        </p>
      </section>

      <section className="relative z-10 mt-6 w-full max-w-[700px]">
        <label className="group flex min-h-[190px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] pt-6 text-center shadow-[0_18px_46px_rgba(2,6,23,0.24)] backdrop-blur-2xl transition duration-300 hover:border-cyan-300/20 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))]">
          <input type="file" className="sr-only" />
          <div className="flex h-[58px] w-[58px] items-center justify-center rounded-[16px] bg-[linear-gradient(135deg,#4C4AA8_0%,#2B4D86_58%,#155E87_100%)]">
            <div className="scale-y-90">
              <CloudUpload size={31} strokeWidth={2.05} className="text-white" />
            </div>
          </div>
          <h2 className="mt-4 text-[1.18rem] font-bold tracking-tight text-white">
            Drop your 3D model here
          </h2>
          <p className="mt-1.5 text-[0.84rem] text-[#9FB0D4]">or click to browse</p>

          <div className="mt-4 w-full bg-transparent px-3 pt-3 pb-5">
            <div className="flex flex-nowrap justify-center gap-1">
              {formats.map((format) => (
                <span
                  key={format}
                  className="shrink-0 rounded-[8px] bg-white/4 px-2 py-[5px] text-[0.66rem] font-medium tracking-[0.03em] text-[#C1CBE0]"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>
        </label>
      </section>

      <section className="relative z-10 mt-7 grid w-full max-w-[700px] gap-3 md:grid-cols-3">
        <TipCard icon={<span className="text-[1.6rem]">🖱️</span>} label="Drag to rotate" />
        <TipCard icon={<span className="text-[1.55rem]">🔍</span>} label="Scroll to zoom" />
        <TipCard icon={<span className="text-[1.55rem]">✋</span>} label="Right-click pan" />
      </section>

      <section className="relative z-10 mt-9 w-full max-w-[860px]">
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-[17px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-[18px] py-4 text-left text-[0.86rem] font-semibold text-white shadow-[0_18px_60px_rgba(2,6,23,0.28)] backdrop-blur-2xl marker:content-none">
            <span>About 3D Model Viewer</span>
            <ChevronDown size={17} className="shrink-0 text-[#AEB8D3] transition duration-300 group-open:rotate-180" />
          </summary>
          <div className="mt-3 rounded-[17px] border border-white/10 bg-[linear-gradient(180deg,rgba(34,53,78,0.85),rgba(24,38,58,0.82))] px-5 py-4 text-left shadow-[0_18px_60px_rgba(2,6,23,0.28)] backdrop-blur-2xl">
            <div className="space-y-2.5 text-[0.92rem] leading-8 text-[#E2E8F6]">
              <div>
                <h3 className="text-[1.08rem] font-extrabold uppercase tracking-[0.05em] text-white">
                  What this tool does
                </h3>
                <p>
                  This tool renders 3D models directly in the browser using WebGL.
                  It supports GLB, GLTF, FBX, OBJ, STL, and PLY formats. Provides
                  orbit controls for inspection, automatic camera framing, and PBR
                  material rendering. Runs entirely client-side with no server
                  uploads.
                </p>
              </div>
              <div>
                <h3 className="text-[1.08rem] font-extrabold uppercase tracking-[0.05em] text-white">
                  When to use it
                </h3>
                <p>
                  Use the viewer for quick visual validation before deploying to XR
                  devices. Useful for checking mesh integrity, material appearance,
                  and scale after compression or conversion. Helps identify issues
                  like inverted normals, missing textures, or incorrect
                  transformations without opening a full 3D editor or game engine.
                </p>
              </div>
              <div>
                <h3 className="text-[1.08rem] font-extrabold uppercase tracking-[0.05em] text-white">
                  What it does not do
                </h3>
                <p>
                  This tool does not replicate XR runtime environments. Lighting and
                  rendering differ from Unity, Unreal, or native AR frameworks.
                  Does not test performance, draw call counts, or memory usage.
                  Cannot validate physics colliders, animation controllers, or
                  runtime scripts. Not a replacement for device testing.
                </p>
              </div>
              <div>
                <h3 className="text-[1.08rem] font-extrabold uppercase tracking-[0.05em] text-white">
                  FAQ
                </h3>
                <p>
                  <span className="font-extrabold tracking-[0.03em] text-white">
                    Why does my model look different than in Unity?
                  </span>{" "}
                  Browser WebGL uses different default lighting and tone mapping
                  than game engines. Material properties like roughness and
                  metalness may appear different. Use this viewer for geometry
                  validation, not final material approval.
                </p>
                <p>
                  <span className="font-extrabold tracking-[0.03em] text-white">
                    Can I test animations?
                  </span>{" "}
                  The viewer displays static meshes only. Animation playback is not
                  supported. Export a single frame or use your target engine for
                  animation testing.
                </p>
                <p>
                  <span className="font-extrabold tracking-[0.03em] text-white">
                    What if my model does not load?
                  </span>{" "}
                  Check file size limits (browser memory constraints apply above
                  100MB). Verify the file is not corrupted. Some proprietary FBX
                  features or non-standard GLTF extensions may fail to parse.
                </p>
              </div>
            </div>
          </div>
        </details>
      </section>

      <FloatingDock active="view" />
    </main>
  );
}

function TipCard({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-5 py-4 text-center shadow-[0_18px_60px_rgba(2,6,23,0.25)] backdrop-blur-2xl">
      <div className="flex justify-center text-white">{icon}</div>
      <p className="mt-2.5 text-[0.84rem] text-[#D5DDF0]">{label}</p>
    </div>
  );
}
