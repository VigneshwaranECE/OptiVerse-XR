import { ArrowDown, ArrowRightLeft, Eye, HomeIcon } from "lucide-react";
import Link from "next/link";

type FloatingDockProps = {
  active: "home" | "compress" | "convert" | "view";
};

export default function FloatingDock({ active }: FloatingDockProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 px-4">
      <div className="mx-auto w-full max-w-fit overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <nav className="pointer-events-auto mx-auto flex min-w-[360px] items-center gap-3 rounded-[32px] border border-white/10 bg-[#0a0b17]/92 px-2.5 py-1 pr-5 shadow-[0_14px_34px_rgba(2,6,23,0.42)] backdrop-blur-2xl">
          <DockLink
            href="/"
            label="Home"
            active={active === "home"}
            icon={<HomeIcon size={18} strokeWidth={2.2} />}
          />
          <DockDivider />
          <DockLink
            href="/compress"
            label="Compress"
            active={active === "compress"}
            icon={<ArrowDown size={18} strokeWidth={2.2} />}
          />
          <DockLink
            href="/convert"
            label="Convert"
            active={active === "convert"}
            icon={<ArrowRightLeft size={18} strokeWidth={2.2} />}
          />
          <DockLink
            href="/view"
            label="View"
            active={active === "view"}
            icon={<Eye size={18} strokeWidth={2.2} />}
          />
        </nav>
      </div>
    </div>
  );
}

function DockLink({
  href,
  label,
  active,
  icon,
}: {
  href: string;
  label: string;
  active: boolean;
  icon: React.ReactNode;
}) {
  if (active) {
    return (
      <Link
        href={href}
        className="flex min-w-[128px] items-center gap-2.5 rounded-[20px] bg-[linear-gradient(90deg,#8B5CF6_0%,#16C7F3_100%)] px-[18px] py-2 text-[0.98rem] font-semibold text-white shadow-[0_0_12px_rgba(139,92,246,0.2)]"
      >
        <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[14px] bg-white/8">
          {icon}
        </span>
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-8 w-14 items-center justify-center rounded-full text-white/60 transition duration-300 hover:bg-white/6 hover:text-white"
    >
      {icon}
    </Link>
  );
}

function DockDivider() {
  return <div className="h-6 w-px bg-white/14" aria-hidden="true" />;
}
