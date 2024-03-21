import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/libs/db";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  // debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET as string,
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_ID as string,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user || !user.password) {
          throw new Error("Email does not exist");
        }

        if (user && (await bcrypt.compare(password, user.password!))) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  // callbacks: {
  //   async jwt({ token, user }) {
  //     if(user) token.role = user.role;
  //     return token;
  //   },
  //   //for client side
  //   async session({ session, token }) {
  //     if(session?.user) session.user.role = token.role;
  //     return session;
  //   },
  // },
};

export default authOptions;
