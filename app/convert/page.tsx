import { ArrowRightLeft, ChevronDown, CloudUpload } from "lucide-react";
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

const inputFormats = ["FBX", "OBJ", "STL", "PLY", "GLB", "GLTF"];
const outputFormats = ["GLB", "GLTF", "OBJ", "STL"];

export default function ConvertPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-gradient-to-b from-[#111634] via-[#0b1027] to-[#080b1d] px-5 pt-6 pb-24 text-white">
      <div className="absolute left-[-140px] top-[-60px] h-[420px] w-[420px] rounded-full bg-[#4F46E5]/10 blur-[110px]" />
      <div className="absolute bottom-[16%] left-[22%] h-[260px] w-[260px] rounded-full bg-[#06B6D4]/8 blur-[100px]" />
      <div className="absolute bottom-[-80px] right-[-60px] h-[360px] w-[360px] rounded-full bg-[#8B5CF6]/8 blur-[110px]" />

      <section className="relative z-10 w-full max-w-[820px] text-center">
        <h1 className="mt-2 text-[1.7rem] font-extrabold tracking-tight md:text-[2.2rem]">
          Convert Format
        </h1>
        <p className="mt-2 text-[0.88rem] text-[#AAB5D5]">
          Convert between 3D model formats
        </p>
      </section>

      <section className="relative z-10 mt-6 w-full max-w-[820px]">
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

      <section className="relative z-10 mt-7 w-full max-w-[820px] rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-3.5 shadow-[0_18px_46px_rgba(2,6,23,0.24)] backdrop-blur-2xl">
        <div className="grid gap-4 md:grid-cols-2">
          <FormatBlock title="Input Formats" items={inputFormats} />
          <FormatBlock title="Output Formats" items={outputFormats} output />
        </div>
      </section>

      <section className="relative z-10 mt-9 w-full max-w-[860px]">
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-[17px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-[18px] py-4 text-left text-[0.86rem] font-semibold text-white shadow-[0_18px_60px_rgba(2,6,23,0.28)] backdrop-blur-2xl marker:content-none">
            <span>About Convert 3D Models</span>
            <ChevronDown size={17} className="shrink-0 text-[#AEB8D3] transition duration-300 group-open:rotate-180" />
          </summary>
          <div className="mt-3 rounded-[17px] border border-white/10 bg-[linear-gradient(180deg,rgba(34,53,78,0.85),rgba(24,38,58,0.82))] px-5 py-4 text-left shadow-[0_18px_60px_rgba(2,6,23,0.28)] backdrop-blur-2xl">
            <div className="space-y-2.5 text-[0.92rem] leading-8 text-[#E2E8F6]">
              <div>
                <h3 className="text-[1.08rem] font-extrabold uppercase tracking-[0.05em] text-white">
                  What this tool does
                </h3>
                <p>
                  This tool converts 3D models between GLB, GLTF, OBJ, and STL
                  formats. It parses input geometry and materials, then exports to
                  the selected format using Three.js exporters. Handles FBX, PLY,
                  and other formats as input by loading them into a scene graph
                  before conversion.
                </p>
              </div>
              <div>
                <h3 className="text-[1.08rem] font-extrabold uppercase tracking-[0.05em] text-white">
                  When to use it
                </h3>
                <p>
                  Use format conversion when integrating assets across different XR
                  pipelines. GLB is required for WebXR and most AR frameworks. OBJ
                  is useful for CAD workflows or legacy toolchains. STL is needed
                  for 3D printing validation or physics simulation preprocessing.
                  Convert before importing into game engines that lack native
                  support for certain formats.
                </p>
              </div>
              <div>
                <h3 className="text-[1.08rem] font-extrabold uppercase tracking-[0.05em] text-white">
                  What it does not do
                </h3>
                <p>
                  This tool does not optimize geometry or compress textures.
                  Conversion preserves the original mesh density and texture
                  resolution. Does not fix broken normals, non-manifold geometry,
                  or invalid UVs. Material properties may not transfer completely
                  between formats due to specification differences.
                </p>
              </div>
              <div>
                <h3 className="text-[1.08rem] font-extrabold uppercase tracking-[0.05em] text-white">
                  FAQ
                </h3>
                <p>
                  <span className="font-extrabold tracking-[0.03em] text-white">
                    Do I lose data when converting formats?
                  </span>{" "}
                  GLB and GLTF preserve PBR materials and animations. OBJ only
                  stores geometry and basic diffuse color. STL is geometry-only
                  with no material or UV data. Choose output format based on
                  downstream requirements.
                </p>
                <p>
                  <span className="font-extrabold tracking-[0.03em] text-white">
                    Should I convert before or after compression?
                  </span>{" "}
                  Convert to GLB first, then compress. Compression tools work most
                  effectively on GLB input. Converting after compression may
                  reintroduce inefficiencies.
                </p>
                <p>
                  <span className="font-extrabold tracking-[0.03em] text-white">
                    Why does my converted model look different?
                  </span>{" "}
                  Material translation between formats is lossy. GLTF PBR materials
                  do not map directly to OBJ MTL files. Verify material properties
                  in your target application and adjust manually if needed.
                </p>
              </div>
            </div>
          </div>
        </details>
      </section>

      <FloatingDock active="convert" />
    </main>
  );
}

function FormatBlock({
  title,
  items,
  output = false,
}: {
  title: string;
  items: string[];
  output?: boolean;
}) {
  return (
    <div className="rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-3">
      <p className="text-[0.86rem] text-[#D1DAEE]">{title}</p>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`rounded-[8px] px-2.5 py-1 text-[0.82rem] font-semibold ${
              output
                ? "bg-[linear-gradient(90deg,#8B5CF6_0%,#16C7F3_100%)] text-white"
                : "bg-white/8 text-[#D1DAEE]"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
