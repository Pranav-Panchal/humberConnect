import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

// ✅ Your existing session augmentation
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
}

// ✅ Add JWT augmentation below (don't remove anything above)
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
  }
}
