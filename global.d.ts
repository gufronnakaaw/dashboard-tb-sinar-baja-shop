import "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    nama: string;
    access_token: string;
  }
}

declare module "next-auth" {
  interface User {
    nama: string;
    access_token: string;
    id?: string;
  }

  interface Session {
    user: {
      nama: string;
      access_token: string;
    };
  }
}
