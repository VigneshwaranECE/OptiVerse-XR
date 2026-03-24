import {
  ArrowDown,
  ArrowRightLeft,
  ChevronDown,
  CloudUpload,
  Eye,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";

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

export default function CompressPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-gradient-to-b from-[#111634] via-[#0b1027] to-[#080b1d] px-5 pt-6 pb-24 text-white">
      <div className="absolute left-[-140px] top-[-60px] h-[420px] w-[420px] rounded-full bg-[#4F46E5]/18 blur-[130px]" />
      <div className="absolute bottom-[16%] left-[22%] h-[260px] w-[260px] rounded-full bg-[#06B6D4]/14 blur-[120px]" />
      <div className="absolute bottom-[-80px] right-[-60px] h-[360px] w-[360px] rounded-full bg-[#8B5CF6]/14 blur-[130px]" />

      <section className="relative z-10 w-full max-w-[820px] text-center">
        <h1 className="mt-2 text-[1.7rem] font-extrabold tracking-tight md:text-[2.2rem]">
          Compress Model
        </h1>
        <p className="mt-2 text-[0.88rem] text-[#AAB5D5]">
          Optimize 3D assets for XR experiences
        </p>
      </section>

      <section className="relative z-10 mt-6 w-full max-w-[630px]">
        <label className="group flex min-h-[190px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-5 py-6 text-center shadow-[0_24px_80px_rgba(2,6,23,0.35)] backdrop-blur-2xl transition duration-300 hover:border-cyan-300/25 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))]">
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

          <div className="mt-5 flex max-w-[520px] flex-wrap justify-center gap-1.5">
            {formats.map((format) => (
              <span
                key={format}
                className="rounded-[9px] border border-white/10 bg-white/4 px-2.5 py-1 text-[0.72rem] font-medium tracking-[0.04em] text-[#C1CBE0]"
              >
                {format}
              </span>
            ))}
          </div>
        </label>
      </section>

      <section className="relative z-10 mt-9 w-full max-w-[860px]">
        <details className="group rounded-[17px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-[18px] py-3 shadow-[0_18px_60px_rgba(2,6,23,0.28)] backdrop-blur-2xl">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-[0.86rem] font-semibold text-white marker:content-none">
            <span>About Compress 3D Models</span>
            <ChevronDown size={17} className="shrink-0 text-[#AEB8D3] transition duration-300 group-open:rotate-180" />
          </summary>
          <p className="mt-2.5 max-w-[740px] text-[0.8rem] leading-6 text-[#B8C3DD]">
            Upload your model to prepare it for WebXR, VR, AR, and MR workflows.
            OptiVerse XR is designed to reduce file size while preserving visual
            quality, making your assets faster to load and easier to ship across
            immersive platforms.
          </p>
        </details>
      </section>

      <FloatingDock />
    </main>
  );
}

function FloatingDock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 px-4">
      <div className="mx-auto w-full max-w-fit overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <nav className="pointer-events-auto mx-auto flex min-w-[296px] items-center gap-2 rounded-[26px] border border-white/10 bg-[#0a0b17]/92 px-2 py-1 pr-3 shadow-[0_20px_50px_rgba(2,6,23,0.55)] backdrop-blur-2xl">
          <Link
            href="/"
            className="flex h-[30px] w-11 items-center justify-center rounded-full text-white/60 transition duration-300 hover:bg-white/6 hover:text-white"
            aria-label="Home"
          >
            <HomeIcon size={15} strokeWidth={2.2} />
          </Link>
          <DockDivider />
          <Link
            href="/compress"
            className="flex min-w-[102px] items-center gap-2 rounded-[16px] bg-[linear-gradient(90deg,#8B5CF6_0%,#16C7F3_100%)] px-3 py-1.5 text-[0.82rem] font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.4)]"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-[11px] bg-white/8">
              <ArrowDown size={15} strokeWidth={2.2} />
            </span>
            <span>Compress</span>
          </Link>
          <DockIconButton icon={<ArrowRightLeft size={24} strokeWidth={2} />} label="Swap" />
          <DockIconButton icon={<Eye size={24} strokeWidth={2} />} label="Preview" />
        </nav>
      </div>
    </div>
  );
}

function DockDivider() {
  return <div className="h-[18px] w-px bg-white/14" aria-hidden="true" />;
}

function DockIconButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-[30px] w-11 items-center justify-center rounded-full text-white/60 transition duration-300 hover:bg-white/6 hover:text-white"
    >
      {icon}
    </button>
  );
}
