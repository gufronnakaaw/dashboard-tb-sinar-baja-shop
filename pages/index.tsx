import { Button } from "@nextui-org/react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-4">
      <h4>Home page</h4>
      <Button
        variant="solid"
        color="secondary"
        onClick={() => (window.location.href = "/dashboard")}
        className="font-semibold"
      >
        Go to Dashboard
      </Button>
    </div>
  );
}
