import Link from "next/link";

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
  return (
    <Link
      href={path}
      className={`flex h-10 items-center justify-between rounded-xl bg-secondary px-3 py-2 text-white hover:bg-secondary/90 ${className}`}
    >
      <div className="flex flex-1 items-center gap-2">
        <>{icon}</>
        <div className="text-sm font-semibold">{label}</div>
      </div>
    </Link>
  );
}
