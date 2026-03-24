import { ArrowDown, ArrowRightLeft, Box, Eye, HomeIcon, Zap } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";

type StatProps = {
  title: string;
  desc: string;
};

type FeatureProps = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

type CardProps = {
  title: string;
  desc: string;
  titleClassName: string;
};

type ContactItemProps = {
  icon: React.ReactNode;
  iconClassName: string;
  label: string;
  value: string;
  href: string;
};

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center gap-6 overflow-hidden bg-gradient-to-b from-[#0b0f2a] to-[#050816] px-6 pt-12 pb-36 text-white">
      <div className="absolute top-0 left-[-100px] h-[400px] w-[400px] rounded-full bg-blue-500/14 blur-[120px]" />
      <div className="absolute right-[-100px] bottom-0 h-[400px] w-[400px] rounded-full bg-purple-500/14 blur-[120px]" />

      <section className="z-10 max-w-5xl text-center">
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#18263d]/90 px-3.5 py-2.5 shadow-[0_8px_18px_rgba(5,8,22,0.24)] backdrop-blur-xl">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#38BDF8] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_4px_10px_rgba(56,189,248,0.16)]">
            <Box size={15} className="text-white" />
          </div>
          <span className="text-[1.05rem] font-semibold leading-none tracking-[-0.03em] text-[#F4F7FB]">
            OptiVerse XR
          </span>
        </div>

        <h1 className="text-4xl font-extrabold leading-[0.98] tracking-tight md:text-[68px]">
          Optimize 3D for <br />
          <span className="bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
            Extended Reality
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-[660px] text-base leading-relaxed font-medium text-gray-400 md:text-lg">
          Compress and optimize 3D assets for VR, AR &amp; MR. Up to 90% file size
          reduction with client-side processing.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#0EA5E9] px-8 py-3.5 text-base font-semibold shadow-[0_0_16px_rgba(124,58,237,0.22)] transition duration-300 hover:scale-105 hover:shadow-[0_0_22px_rgba(124,58,237,0.34)]">
            <Zap size={17} className="text-white" strokeWidth={2.4} /> Start Optimizing
          </button>
          <button className="rounded-2xl border border-white/10 bg-[#1e293b]/50 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-[#1e293b]/80">
            View Models
          </button>
        </div>
      </section>

      <section className="relative z-10 grid w-full max-w-[620px] grid-cols-2 gap-1 overflow-hidden rounded-[28px] border border-white/5 bg-[#0a0f1d]/40 px-3 py-6 shadow-2xl backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_18%_50%,rgba(34,211,238,0.12),transparent_42%),radial-gradient(circle_at_82%_20%,rgba(168,85,247,0.1),transparent_38%)] md:grid-cols-4">
        <Stat title="90%" desc="Size Reduction" />
        <Stat title="13+" desc="File Formats" />
        <Stat title="100%" desc="Client-Side" />
        <Stat title="Free" desc="Forever" />
      </section>

      <section className="z-10 grid w-full max-w-[860px] grid-cols-1 gap-3 md:grid-cols-4">
        <Feature
          title="13+ Format Support"
          desc="GLB, FBX, OBJ, USDZ, DAE & more"
          icon={<PackageTile />}
        />
        <Feature
          title="XR Optimized"
          desc="Perfect for VR/AR/MR apps"
          icon={<WandTile />}
        />
        <Feature
          title="Texture Compression"
          desc="WebP, JPEG quality control"
          icon={<ImageTile />}
        />
        <Feature
          title="100% Private"
          desc="Browser-only processing"
          icon={<LockTile />}
        />
      </section>

      <section className="z-10 mt-3 w-full max-w-[1040px] text-center">
        <h2 className="mb-8 text-3xl font-semibold">Built for Modern 3D Workflows</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card
            title="Game Development"
            desc="Drastically reduce build sizes for Unity and Unreal Engine. Optimize assets for mobile games and reduce draw calls automatically."
            titleClassName="bg-gradient-to-r from-[#A855F7] to-[#818CF8] bg-clip-text text-transparent"
          />
          <Card
            title="E-Commerce & Web"
            desc="Ensure instant load times for 3D product configurators. Convert heavy CAD files to web-ready GLB format in seconds."
            titleClassName="bg-gradient-to-r from-[#38BDF8] to-[#00E5FF] bg-clip-text text-transparent"
          />
          <Card
            title="VR & AR Experiences"
            desc="Hit 90fps on standalone headsets like Meta Quest 3 and Apple Vision Pro by optimizing geometry and textures specifically for XR."
            titleClassName="bg-gradient-to-r from-[#22C55E] to-[#00F5A0] bg-clip-text text-transparent"
          />
        </div>
      </section>

      <section className="z-10 w-full max-w-[960px] text-center">
        <h2 className="mb-7 text-[2rem] font-semibold tracking-tight">Why OptiVerse XR?</h2>
        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] px-10 py-10 backdrop-blur-xl">
          <p className="mx-auto max-w-[760px] text-[1.05rem] leading-relaxed text-[#CFD5E6]">
            OptiVerse XR is built on a simple promise:{" "}
            <span className="font-semibold text-white">
              Your files never leave your device.
            </span>
          </p>
          <p className="mx-auto mt-6 max-w-[820px] text-[1rem] leading-[1.75] text-[#B8C0D4]">
            Unlike other tools that upload your proprietary assets to a cloud server,
            OptiVerse XR uses advanced WebAssembly technology (Meshopt, DRACO, KTX2)
            to process everything locally in your browser. This means standard-grade
            security for your intellectual property and zero latency transfer times.
          </p>
        </div>
      </section>

      <section className="z-10 w-full max-w-[900px] text-center">
        <h2 className="text-[1.75rem] font-semibold tracking-tight">Contact Us</h2>
        <p className="mt-3 text-[0.92rem] text-[#AEB9CF]">
          Have questions or feedback? We&apos;d love to hear from you.
        </p>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-5 text-left backdrop-blur-xl">
            <h3 className="text-[1.5rem] font-semibold">Get in Touch</h3>
            <div className="mt-5 space-y-3.5">
              <ContactItem
                icon={<HiOutlineEnvelope className="text-[1.7rem] text-white" />}
                iconClassName="bg-[linear-gradient(145deg,#A855F7_0%,#7C3AED_100%)]"
                label="EMAIL"
                value="vigneshsaran2596@gmail.com"
                href="mailto:vigneshsaran2596@gmail.com"
              />
              <ContactItem
                icon={<FaLinkedinIn className="text-[1.65rem] text-white" />}
                iconClassName="bg-[linear-gradient(145deg,#1DA1F2_0%,#0A66C2_100%)]"
                label="LINKEDIN"
                value="Vigneshwaran B"
                href="https://www.linkedin.com/"
              />
            </div>
          </div>

          <div className="flex h-full flex-col rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-6 text-left backdrop-blur-xl md:p-7">
            <div>
              <h3 className="text-[1.5rem] font-semibold leading-tight">About the Creator</h3>
            </div>
            <div className="mt-6 flex items-start gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-[16px] bg-[linear-gradient(145deg,#17C8D1_0%,#12B981_100%)] shadow-[0_18px_36px_rgba(20,184,166,0.18)]">
                <div className="relative z-10">
                  <CreatorLogo />
                </div>
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <h4 className="text-[1.3rem] font-semibold leading-tight">Vigneshwaran B</h4>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-[#9DB2D5]">
                  XR Developer &amp; Real-Time 3D Creator
                </p>
                <p className="mt-4 max-w-[340px] text-[0.88rem] leading-[1.75] text-[#C2CDE0]">
                  Turning ideas into interactive 3D experiences using Unity,
                  Blender, and WebXR. Exploring the future of spatial computing
                  through AR, VR, and immersive web technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="z-10 mt-16 w-full border-t border-white/8 pt-6">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#7C3AED] to-[#38BDF8] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]">
              <Box size={16} className="text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[0.98rem] font-semibold text-white">OptiVerse XR</span>
              <span className="text-[0.88rem] text-[#8F96AE]">© 2026</span>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.98rem] text-[#9CA8C3]">
            <a href="#" className="transition hover:text-white">About Us</a>
            <a href="#" className="transition hover:text-white">Blog</a>
            <a href="#" className="transition hover:text-white">Privacy Policy</a>
            <a href="#" className="transition hover:text-white">Terms of Service</a>
            <a href="#" className="transition hover:text-white">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/6 bg-white/6 text-[#A9B1C8] transition hover:bg-white/10 hover:text-white"
            >
              <FooterLinkedIn />
            </a>
            <a
              href="mailto:vigneshsaran2596@gmail.com"
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/6 bg-white/6 text-[#A9B1C8] transition hover:bg-white/10 hover:text-white"
            >
              <HiOutlineEnvelope className="text-[1.35rem]" />
            </a>
          </div>
        </div>
      </footer>

      <FloatingDock />
    </main>
  );
}

function FloatingDock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-10 z-30 px-4">
      <div className="mx-auto w-full max-w-fit overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <nav className="pointer-events-auto mx-auto flex min-w-[360px] items-center gap-3 rounded-[32px] border border-white/10 bg-[#0a0b17]/92 px-2.5 py-1 pr-5 shadow-[0_20px_50px_rgba(2,6,23,0.55)] backdrop-blur-2xl">
          <a
            href="#"
            className="flex min-w-[120px] items-center gap-2.5 rounded-[20px] bg-[linear-gradient(90deg,#8B5CF6_0%,#16C7F3_100%)] px-[18px] py-2 text-[0.98rem] font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.4)]"
          >
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[14px] bg-white/8">
              <HomeIcon size={17} strokeWidth={2.2} />
            </span>
            <span>Home</span>
          </a>
          <DockDivider />
          <DockIconButton icon={<ArrowDown size={24} strokeWidth={2} />} label="Download" />
          <DockIconButton icon={<ArrowRightLeft size={24} strokeWidth={2} />} label="Swap" />
          <DockIconButton icon={<Eye size={24} strokeWidth={2} />} label="Preview" />
        </nav>
      </div>
    </div>
  );
}

function DockDivider() {
  return <div className="h-6 w-px bg-white/14" aria-hidden="true" />;
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
      className="flex h-8 w-14 items-center justify-center rounded-full text-white/60 transition duration-300 hover:bg-white/6 hover:text-white"
    >
      {icon}
    </button>
  );
}

function Stat({ title, desc }: StatProps) {
  return (
    <div className="text-center">
      <h2 className="text-[2rem] font-bold text-blue-400">{title}</h2>
      <p className="mt-1 text-[0.95rem] text-gray-400">{desc}</p>
    </div>
  );
}

function Feature({ title, desc, icon }: FeatureProps) {
  return (
    <div className="relative flex flex-col items-center gap-1.5 overflow-hidden rounded-[22px] border border-white/5 bg-[#111827]/50 p-3.5 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-2 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_18%_35%,rgba(56,189,248,0.1),transparent_40%),radial-gradient(circle_at_85%_25%,rgba(168,85,247,0.08),transparent_38%)]">
      {icon}
      <div className="relative z-10 space-y-1.5">
        <h3 className="text-[0.9rem] font-bold leading-tight">{title}</h3>
        <p className="text-[0.8rem] leading-relaxed text-gray-500">{desc}</p>
      </div>
    </div>
  );
}

function IconTile({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[15px] border border-white/10 ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.24),transparent_38%)]" />
      <div className="absolute inset-x-2 bottom-1 h-3 rounded-full bg-black/10 blur-md" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function PackageTile() {
  return (
    <IconTile className="bg-[linear-gradient(145deg,#C86BFF_0%,#9858FF_58%,#6A35F0_100%)]">
      <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="boxTop" x1="8" y1="4" x2="16" y2="9" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE7BA" />
            <stop offset="1" stopColor="#F0BE74" />
          </linearGradient>
          <linearGradient id="boxLeft" x1="6" y1="8" x2="12" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor="#DAA56B" />
            <stop offset="1" stopColor="#B87635" />
          </linearGradient>
          <linearGradient id="boxRight" x1="12" y1="8" x2="18" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C98E59" />
            <stop offset="1" stopColor="#975728" />
          </linearGradient>
        </defs>
        <path d="M12 3.2 5.7 6.8 12 10.5l6.3-3.7L12 3.2Z" fill="url(#boxTop)" />
        <path d="M5.7 6.8v7.7L12 18.1v-7.6L5.7 6.8Z" fill="url(#boxLeft)" />
        <path d="M18.3 6.8v7.7L12 18.1v-7.6l6.3-3.7Z" fill="url(#boxRight)" />
        <path d="M9.3 5.1 15.4 8.6" stroke="#FFF6D8" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M9.4 11.9v2.8" stroke="#EBC483" strokeWidth="1.1" strokeLinecap="round" />
        <path
          d="M12 3.2 5.7 6.8 12 10.5l6.3-3.7L12 3.2Zm0 0v7.3M5.7 6.8v7.7L12 18.1l6.3-3.6V6.8"
          stroke="#FFF3CF"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    </IconTile>
  );
}

function WandTile() {
  return (
    <IconTile className="bg-[linear-gradient(145deg,#28D0FF_0%,#1DA8FF_56%,#226DFF_100%)]">
      <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="wandHead" x1="10" y1="8" x2="18" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF59D6" />
            <stop offset="1" stopColor="#72D4FF" />
          </linearGradient>
        </defs>
        <path d="M6 16.9c.8 0 1.4.6 1.4 1.4S6.8 19.7 6 19.7s-1.4-.6-1.4-1.4S5.2 16.9 6 16.9Z" fill="#AEEBFF" />
        <path d="M7.2 15.8 15.7 7.3" stroke="#D9F5FF" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="m15.2 6.9 1.9-1.9a1.5 1.5 0 0 1 2.1 0l.8.8a1.5 1.5 0 0 1 0 2.1l-1.9 1.9"
          stroke="url(#wandHead)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="m6 17 1.3-1.3m8.4-8.4 1.3-1.3" stroke="#7B4CFF" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M6.2 8.3h2.2M7.3 7.2v2.2M15.8 5.8H18M16.9 4.7V7M16.5 12.8h2.6M17.8 11.5V14"
          stroke="#D8F4FF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </IconTile>
  );
}

function ImageTile() {
  return (
    <IconTile className="bg-[linear-gradient(145deg,#31E8B4_0%,#18D8A2_56%,#06B88A_100%)]">
      <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4.5" y="5.5" width="15" height="13" rx="2.5" fill="#82F0DD" />
        <rect x="4.5" y="5.5" width="15" height="13" rx="2.5" stroke="#FFF2A8" strokeWidth="1.4" />
        <path d="M5.7 7.2h12.6v4.2H5.7z" fill="#9DDCFF" />
        <circle cx="15.8" cy="9.2" r="1.5" fill="#FFB84C" />
        <path d="m6.8 16.5 3.2-3.3 2.2 1.9 2.6-3.1 3 4.5H6.8Z" fill="#51C16B" />
        <path
          d="m6.8 16.5 3.2-3.3 2.2 1.9 2.6-3.1 3 4.5"
          stroke="#FFF2A8"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </IconTile>
  );
}

function LockTile() {
  return (
    <IconTile className="bg-[linear-gradient(145deg,#FFB734_0%,#FF784A_54%,#FF4D95_100%)]">
      <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7" y="10" width="10" height="8" rx="2.3" fill="#FFC84A" />
        <path
          d="M8.5 10V8.4a3.5 3.5 0 1 1 7 0V10"
          stroke="#FFE39C"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <rect x="6.5" y="10" width="11" height="8.5" rx="2.2" stroke="#FFE39C" strokeWidth="1.6" />
        <rect x="10.7" y="12.8" width="1.6" height="2.5" rx=".8" fill="#AA6022" />
      </svg>
    </IconTile>
  );
}

function Card({ title, desc, titleClassName }: CardProps) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-7 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-2">
      <h3 className={`mb-5 text-[1.05rem] font-semibold ${titleClassName}`}>{title}</h3>
      <p className="text-[0.98rem] leading-[1.55] text-[#C7CEDD]">{desc}</p>
    </div>
  );
}

function FooterLinkedIn() {
  return (
    <FaLinkedinIn className="text-[1.45rem]" aria-hidden="true" />
  );
}

function CreatorLogo() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="18" r="8.2" fill="#F7B267" />
      <path d="M24.7 17.1c1.1-5.2 13.5-5.9 14.7 0v3.4H24.7v-3.4Z" fill="#D57E1F" />
      <circle cx="29.3" cy="18.2" r="0.95" fill="#1F2937" />
      <circle cx="34.7" cy="18.2" r="0.95" fill="#1F2937" />
      <path d="M29.8 21.4c1.1.8 3.3.8 4.4 0" stroke="#A54A14" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M27.4 27.4h9.2c2.8 0 5 2.2 5 5v4H22.4v-4c0-2.8 2.2-5 5-5Z" fill="#B794F4" />
      <path d="M27.8 33.5 24.7 36" stroke="#F7B267" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M36.2 33.5 39.3 36" stroke="#F7B267" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="18.5" y="35.8" width="27" height="10.5" rx="2.6" fill="#B58AF5" />
      <rect x="20.1" y="37.2" width="23.8" height="7.4" rx="1.7" fill="#C7A8FF" />
      <circle cx="32" cy="40.8" r="0.9" fill="#5B4B7A" />
    </svg>
  );
}

function ContactItem({
  icon,
  iconClassName,
  label,
  value,
  href,
}: ContactItemProps) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="flex items-center gap-3.5 rounded-[16px] bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(76,205,196,0.06))] px-3.5 py-3 shadow-[0_0_0_rgba(56,189,248,0)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_22px_rgba(56,189,248,0.16)]"
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${iconClassName}`}>
        {icon}
      </div>
      <div>
        <p className="text-[0.78rem] font-semibold tracking-[0.12em] text-[#7E8EAA]">{label}</p>
        <p className="mt-1 text-[0.9rem] font-semibold text-white">{value}</p>
      </div>
    </a>
  );
}
