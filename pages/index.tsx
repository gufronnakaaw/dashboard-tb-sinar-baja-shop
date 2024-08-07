import { Button, Input } from "@nextui-org/react";
import { Key, User } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Toast from "react-hot-toast";

export default function HomePage() {
  const [input, setInput] = useState({});
  const router = useRouter();

  async function handleLogin() {
    if (Object.keys(input).length < 2) return;

    const result = await signIn("credentials", {
      ...input,
      redirect: false,
    });

    if (result?.error) {
      const { error } = JSON.parse(result?.error);

      Toast.error(error.message);
    }

    if (result?.ok) {
      return router.push("/dashboard");
    }
  }

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
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
                  <User
                    weight="bold"
                    size={20}
                    className="text-foreground-400"
                  />
                }
                classNames={{
                  input: "text-sm placeholder:text-sm",
                }}
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  })
                }
                autoComplete="off"
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
                  <Key
                    weight="bold"
                    size={20}
                    className="text-foreground-400"
                  />
                }
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  })
                }
                autoComplete="off"
              />
            </div>

            <Button
              variant="solid"
              size="lg"
              onClick={handleLogin}
              className="bg-emerald-600 text-sm font-semibold text-white"
            >
              Login Sekarang
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
