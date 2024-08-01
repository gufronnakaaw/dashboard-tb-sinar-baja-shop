import { Button, Input } from "@nextui-org/react";
import { Key, User } from "@phosphor-icons/react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="grid h-screen w-full grid-cols-2 gap-8 overflow-hidden p-24">
      <div className="flex items-center justify-center">
        <Image
          priority
          src="/img/login-img.svg"
          alt="login img"
          width={1000}
          height={1000}
          className="h-auto w-[500px]"
        />
      </div>

      <div className="relative flex items-center">
        <div className="absolute -right-[250px] -top-[250px] h-[400px] w-[400px] rounded-full bg-emerald-600/20 blur-[62px]"></div>

        <div className="relative grid w-full max-w-[450px] gap-8">
          <div>
            <h1 className="text-[24px] font-semibold capitalize text-foreground">
              Masuk ke dashboard 👋
            </h1>
            <p className="text-foreground-600">
              Silahkan login untuk mengatur semuanya.
            </p>
          </div>

          <div className="grid gap-2">
            <Input
              type="text"
              variant="flat"
              color="default"
              size="lg"
              labelPlacement="outside"
              placeholder="Username"
              name="username"
              endContent={
                <User weight="bold" size={20} className="text-foreground-400" />
              }
              classNames={{
                input: "text-sm placeholder:text-sm",
              }}
            />

            <Input
              isRequired
              type="password"
              variant="flat"
              color="default"
              size="lg"
              labelPlacement="outside"
              placeholder="Password"
              name="password"
              endContent={
                <Key weight="bold" size={20} className="text-foreground-400" />
              }
              classNames={{
                input: "text-sm placeholder:text-sm",
              }}
            />
          </div>

          <Button
            variant="solid"
            size="lg"
            onClick={() => (window.location.href = "/dashboard")}
            className="bg-emerald-600 text-sm font-semibold text-white"
          >
            Login Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
}
