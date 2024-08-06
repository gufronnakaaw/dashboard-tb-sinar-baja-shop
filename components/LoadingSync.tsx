import { Spinner } from "@nextui-org/react";

export default function LoadingSync() {
  return (
    <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-black opacity-50">
      <div className="grid gap-4">
        <p className="text-[20px] font-bold text-white">
          Sedang melakukan sinkronisasi...
        </p>
        <Spinner size="lg" color="default" />
      </div>
    </div>
  );
}
