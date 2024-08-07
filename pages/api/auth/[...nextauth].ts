import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET_KEY,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60 * 5, // 5 hours
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "username" },
        password: { label: "password" },
      },
      async authorize(credentials, req) {
        try {
          const result: SuccessResponse<{
            nama: string;
            access_token: string;
          }> = await fetcher({
            url: "/auth/login/operators",
            method: "POST",
            data: credentials,
          });

          return {
            nama: result.data.nama,
            access_token: result.data.access_token,
          };
        } catch (error) {
          throw new Error(JSON.stringify(error));
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.nama = user.nama;
        token.access_token = user.access_token;
      }
      return token;
    },

    session({ session, token }) {
      session.user.nama = token.nama;
      session.user.access_token = token.access_token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
