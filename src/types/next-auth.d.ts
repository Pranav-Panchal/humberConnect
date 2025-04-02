import NextAuth, { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

// ✅ Extend Session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
  }
}

// ✅ Extend JWT token type
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    name: string;
    email: string;
  }
}
