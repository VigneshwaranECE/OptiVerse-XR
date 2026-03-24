'use client'

import { ChevronDown, CloudUpload, Gem, Hash, ImageIcon, Rocket, Scale, ScanSearch, Settings2, Sparkles } from "lucide-react";
import { useId, useState } from "react";

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

type CompressionMode = "quality" | "balanced" | "maximum";

type UploadedFile = {
  name: string;
  sizeLabel: string;
  ext: string;
};

export default function CompressExperience() {
  const inputId = useId();
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [mode, setMode] = useState<CompressionMode>("quality");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toUpperCase() ?? "3D";
    setUploadedFile({
      name: file.name,
      sizeLabel: formatBytes(file.size),
      ext,
    });
  }

  return (
    <>
      <section className="relative z-10 w-full max-w-[780px] text-center">
        <h1 className="mt-1 text-[1.38rem] font-extrabold tracking-tight md:text-[1.78rem]">
          Compress Model
        </h1>
        <p className="mt-1 text-[0.76rem] text-[#AAB5D5]">
          Optimize 3D assets for XR experiences
        </p>
      </section>

      {!uploadedFile ? (
        <section className="relative z-10 mt-6 w-full max-w-[700px]">
          <label
            htmlFor={inputId}
            className="group flex min-h-[190px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] pt-6 text-center shadow-[0_18px_46px_rgba(2,6,23,0.24)] backdrop-blur-2xl transition duration-300 hover:border-cyan-300/20 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))]"
          >
            <input
              id={inputId}
              type="file"
              className="sr-only"
              accept=".glb,.gltf,.fbx,.obj,.stl,.ply,.dae,.3ds,.usdz,.vox,.pcd,.bvh,.3mf"
              onChange={handleFileChange}
            />
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
                    className={`shrink-0 rounded-[8px] bg-white/4 font-medium tracking-[0.03em] text-[#C1CBE0] ${
                      format === "PCD" || format === "BVH" || format === "3MF"
                        ? "px-2.5 py-[6px] text-[0.7rem]"
                        : "px-2 py-[5px] text-[0.66rem]"
                    }`}
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </label>
        </section>
      ) : (
        <section className="relative z-10 mt-4 w-full max-w-[1100px]">
          <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_372px]">
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-[linear-gradient(180deg,rgba(38,55,78,0.88),rgba(29,43,63,0.82))] px-3.5 py-3 shadow-[0_14px_34px_rgba(2,6,23,0.2)] backdrop-blur-2xl">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[linear-gradient(135deg,#8B5CF6_0%,#22C1F0_100%)]">
                  <Gem size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[0.82rem] font-bold text-white">{uploadedFile.name}</p>
                  <p className="mt-0.5 text-[0.7rem] text-[#96A8C9]">{uploadedFile.sizeLabel}</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#12111d] shadow-[0_14px_34px_rgba(2,6,23,0.2)]">
                <div className="relative min-h-[456px] overflow-hidden bg-[radial-gradient(circle_at_50%_62%,rgba(139,92,246,0.12),transparent_28%),linear-gradient(180deg,#12111d_0%,#12111d_100%)]">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(127,86,217,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(127,86,217,0.14)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:linear-gradient(to_bottom,transparent_8%,black_24%,black_100%)]" />
                  <div className="absolute inset-x-0 top-1/2 h-px bg-[#8B5CF6]/80" />
                  <div className="absolute inset-y-[30%] left-1/2 w-px bg-[#8B5CF6]/80" />
                  <div className="absolute inset-x-[14%] bottom-[34%] h-[1px] bg-[#8B5CF6]/40 blur-[1px]" />
                  <div className="absolute bottom-3 left-3 rounded-[11px] border border-white/8 bg-white/5 px-2.5 py-1.5 text-[0.72rem] text-[#AEB8D3] backdrop-blur-md">
                    Rotate • Scroll zoom
                  </div>
                </div>
              </div>
            </div>

          <div className="flex h-full flex-col">
            <div className="rounded-[16px] border border-white/10 bg-[linear-gradient(180deg,rgba(38,55,78,0.88),rgba(29,43,63,0.82))] px-3.5 py-2.5 shadow-[0_14px_34px_rgba(2,6,23,0.2)] backdrop-blur-2xl">
              <h3 className="text-[0.86rem] font-bold text-white">Optimization Level</h3>
              <div className="mt-2 space-y-1.5">
                  <LevelOption
                    title="Quality"
                    subtitle="Minimal"
                    icon={<Sparkles size={16} />}
                    accentClass="bg-[linear-gradient(135deg,#14B8A6_0%,#22C55E_100%)]"
                    selected={mode === "quality"}
                    highlight={mode === "quality"}
                    onClick={() => setMode("quality")}
                  />
                  <LevelOption
                    title="Balanced"
                    subtitle="Optimal"
                    icon={<ScaleIcon />}
                    accentClass="bg-[linear-gradient(90deg,#8B5CF6_0%,#A855F7_100%)]"
                    selected={mode === "balanced"}
                    highlight={mode === "balanced"}
                    onClick={() => setMode("balanced")}
                  />
                  <LevelOption
                    title="Maximum"
                    subtitle="Smallest"
                    icon={<Rocket size={16} />}
                    accentClass="bg-[linear-gradient(135deg,#F97316_0%,#EC4899_100%)]"
                    selected={mode === "maximum"}
                    highlight={mode === "maximum"}
                    onClick={() => setMode("maximum")}
                  />
              </div>
            </div>

            <div className="mt-2.5 rounded-[16px] border border-white/10 bg-[linear-gradient(180deg,rgba(38,55,78,0.88),rgba(29,43,63,0.82))] px-3.5 py-2.5 shadow-[0_14px_34px_rgba(2,6,23,0.2)] backdrop-blur-2xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/8 text-[#D6E0F3]">
                  <Settings2 size={17} />
                  </div>
                  <h3 className="text-[0.9rem] font-bold text-white">Advanced</h3>
                </div>
                <div className="mt-2 divide-y divide-white/10">
                  <AdvancedRow icon={<ScanSearch size={18} />} label="Geometry" />
                  <AdvancedRow icon={<NumberIcon />} label="Quantization" />
                  <AdvancedRow icon={<TextureIcon />} label="Textures" />
                </div>
              </div>

              <div className="pt-2.5">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-[16px] bg-[linear-gradient(90deg,#8B5CF6_0%,#22C1F0_100%)] px-4 py-2.5 text-[0.88rem] font-bold text-white shadow-[0_10px_24px_rgba(34,193,240,0.16)] transition hover:brightness-105"
              >
                <span className="text-[0.92rem]">⚡</span>
                Optimize Now
              </button>

              <button
                type="button"
                onClick={() => setUploadedFile(null)}
                className="mt-2.5 w-full rounded-[14px] border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[0.82rem] font-semibold text-[#D8E0F0] transition hover:bg-white/[0.07]"
              >
                Start Over
              </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {!uploadedFile ? (
        <section className="relative z-10 mt-6 w-full max-w-[1100px]">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-[17px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-[18px] py-4 text-left text-[0.86rem] font-semibold text-white shadow-[0_18px_60px_rgba(2,6,23,0.28)] backdrop-blur-2xl marker:content-none">
              <span>About Compress 3D Models</span>
              <ChevronDown size={17} className="shrink-0 text-[#AEB8D3] transition duration-300 group-open:rotate-180" />
            </summary>
            <div className="mt-3 rounded-[17px] border border-white/10 bg-[linear-gradient(180deg,rgba(34,53,78,0.85),rgba(24,38,58,0.82))] px-5 py-4 text-left shadow-[0_18px_60px_rgba(2,6,23,0.28)] backdrop-blur-2xl">
              <div className="space-y-2.5 text-[0.92rem] leading-8 text-[#E2E8F6]">
                <div>
                  <h3 className="text-[1.08rem] font-extrabold uppercase tracking-[0.05em] text-white">
                    What this tool does
                  </h3>
                  <p>
                    This tool reduces 3D model file size through mesh optimization and
                    texture compression. It processes GLB, GLTF, FBX, OBJ, STL, and PLY
                    formats using quantization, vertex welding, and accessor
                    deduplication. Output is always GLB format.
                  </p>
                </div>
                <div>
                  <h3 className="text-[1.08rem] font-extrabold uppercase tracking-[0.05em] text-white">
                    When to use it
                  </h3>
                  <p>
                    Use compression when deploying models to mobile AR, standalone VR
                    headsets, or WebXR environments where bandwidth and memory
                    constraints exist. Effective for reducing download times in
                    web-based XR experiences and improving runtime performance on
                    resource-limited devices. Most useful for models exceeding 10MB or
                    containing high-resolution textures above 2K.
                  </p>
                </div>
                <div>
                  <h3 className="text-[1.08rem] font-extrabold uppercase tracking-[0.05em] text-white">
                    What it does not do
                  </h3>
                  <p>
                    This tool does not redesign topology, retarget animations, or
                    modify UV layouts. It preserves the original mesh structure while
                    reducing precision and removing redundant data. Does not perform
                    LOD generation or automatic material simplification beyond texture
                    resizing.
                  </p>
                </div>
                <div>
                  <h3 className="text-[1.08rem] font-extrabold uppercase tracking-[0.05em] text-white">
                    FAQ
                  </h3>
                  <p>
                    <span className="font-extrabold tracking-[0.03em] text-white">
                      Does compression affect visual quality?
                    </span>{" "}
                    Quantization reduces vertex precision but remains visually
                    identical in most XR contexts. Texture compression introduces
                    minimal artifacts at quality settings above 70.
                  </p>
                  <p>
                    <span className="font-extrabold tracking-[0.03em] text-white">
                      Can I compress already optimized models?
                    </span>{" "}
                    Yes, but gains diminish. Models exported from game engines with
                    optimization enabled typically see 10-20% reduction versus 40-60%
                    for unoptimized CAD or photogrammetry exports.
                  </p>
                  <p>
                    <span className="font-extrabold tracking-[0.03em] text-white">
                      What compression ratio should I target?
                    </span>{" "}
                    For mobile AR, aim for 50-70% reduction. WebXR can tolerate
                    30-50%. Standalone headsets with local storage can use 20-40%
                    compression for quality preservation.
                  </p>
                </div>
              </div>
            </div>
          </details>
        </section>
      ) : (
        <section className="relative z-10 mt-6 w-full max-w-[1100px]">
          <div />
        </section>
      )}
    </>
  );
}

function LevelOption({
  title,
  subtitle,
  icon,
  accentClass,
  selected,
  highlight = false,
  onClick,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentClass: string;
  selected: boolean;
  highlight?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-[15px] border px-3.5 py-2.5 text-left transition ${
        highlight
          ? accentClass.includes("#14B8A6")
            ? "border-transparent bg-[linear-gradient(90deg,#14B8A6_0%,#16C7B0_100%)] shadow-[0_10px_24px_rgba(20,184,166,0.16)]"
            : accentClass.includes("#F97316")
              ? "border-transparent bg-[linear-gradient(90deg,#FF7A18_0%,#FF5C64_48%,#EC4899_100%)] shadow-[0_10px_24px_rgba(236,72,153,0.16)]"
              : "border-transparent bg-[linear-gradient(90deg,#8B5CF6_0%,#A855F7_100%)] shadow-[0_10px_24px_rgba(139,92,246,0.18)]"
          : "border-white/8 bg-white/[0.03] hover:bg-white/[0.05]"
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div className={`flex h-[30px] w-[30px] items-center justify-center rounded-[10px] text-white ${accentClass}`}>
          {icon}
        </div>
        <div>
          <p className="text-[0.84rem] font-bold text-white">{title}</p>
          <p className={`text-[0.72rem] ${highlight ? "text-white/82" : "text-[#93A6C7]"}`}>{subtitle}</p>
        </div>
      </div>
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
          selected
            ? `border-white bg-white ${
                highlight && accentClass.includes("#14B8A6")
                  ? "text-[#14B8A6]"
                  : highlight && accentClass.includes("#F97316")
                    ? "text-[#EC4899]"
                    : "text-[#8B5CF6]"
              }`
            : "border-white/30 bg-transparent text-transparent"
        }`}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-current" />
      </div>
    </button>
  );
}

function AdvancedRow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between py-3 text-left transition hover:text-white"
    >
      <div className="flex items-center gap-3.5">
        <div className="text-[#D7DDF0]">{icon}</div>
        <span className="text-[0.82rem] font-semibold text-white">{label}</span>
      </div>
      <ChevronDown size={17} className="text-[#93A6C7]" />
    </button>
  );
}

function ScaleIcon() {
  return <Scale size={15} strokeWidth={2.2} />;
}

function NumberIcon() {
  return <Hash size={15} strokeWidth={2.2} />;
}

function TextureIcon() {
  return <ImageIcon size={15} strokeWidth={2.1} />;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(2)} ${units[unitIndex]}`;
}
