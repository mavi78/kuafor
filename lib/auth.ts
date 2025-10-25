import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/validation/auth";
import { verifyPassword } from "@/lib/utils/password";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate input with Zod
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email },
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              role: true,
              password_hash: true,
            },
          });

          if (!user) {
            throw new Error("Geçersiz e-posta veya şifre");
          }

          // Verify password
          const isValid = await verifyPassword(password, user.password_hash);

          if (!isValid) {
            throw new Error("Geçersiz e-posta veya şifre");
          }

          // Return user object without password_hash
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            // Invalid credentials format
            return null;
          }
          // Re-throw other errors
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // On first sign-in, add user role to token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID and role to session
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.phone = token.phone as string | null;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);

// Helper to get session in server components (Next.js App Router)
export { getServerSession } from "next-auth/next";

// Extend NextAuth types for TypeScript
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      phone?: string | null;
      role: string;
    };
  }

  interface User {
    id: string;
    role: string;
    phone?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    phone?: string | null;
  }
}
