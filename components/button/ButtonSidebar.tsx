import Link from "next/link";
import { useRouter } from "next/router";

interface ButtonSidebarProps {
  label: string;
  path: string;
  className?: string;
  icon: React.ReactNode;
}

export default function ButtonSidebar({
  label,
  path,
  className,
  icon,
}: ButtonSidebarProps) {
  const router = useRouter();

  console.log(router.asPath);
  return (
    <Link
      href={path}
      className={`flex h-10 items-center justify-between rounded-xl px-3 py-2 ${
        router.asPath.includes(path)
          ? "bg-emerald-600 text-white hover:bg-emerald-600/90"
          : "bg-transparent text-foreground-600 hover:bg-foreground-200"
      } ${className}`}
    >
      <div className="flex flex-1 items-center gap-2">
        <>{icon}</>
        <div className="text-sm font-semibold">{label}</div>
      </div>
    </Link>
  );
}
