import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser, getUserById } from "./data/user";
import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null;

        // Check if the user exists
        const user = await getUser(credentials.email as string);

        if (!user) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // console.log({ session, token });

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.role = token.role as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const data = await getUserById(token.sub);

      if (!data) return token; // Handle null case

      token.role = data.role;

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
