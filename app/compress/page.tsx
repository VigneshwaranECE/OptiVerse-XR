import CompressExperience from "./CompressExperience";
import FloatingDock from "../components/FloatingDock";

export default function CompressPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-gradient-to-b from-[#111634] via-[#0b1027] to-[#080b1d] px-5 pt-6 pb-24 text-white">
      <div className="absolute left-[-140px] top-[-60px] h-[420px] w-[420px] rounded-full bg-[#4F46E5]/10 blur-[110px]" />
      <div className="absolute bottom-[16%] left-[22%] h-[260px] w-[260px] rounded-full bg-[#06B6D4]/8 blur-[100px]" />
      <div className="absolute bottom-[-80px] right-[-60px] h-[360px] w-[360px] rounded-full bg-[#8B5CF6]/8 blur-[110px]" />

      <CompressExperience />

      <FloatingDock active="compress" />
    </main>
  );
}
