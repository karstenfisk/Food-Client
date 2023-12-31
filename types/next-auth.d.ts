import NextAuth from "next-auth";
import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
    token: string;
  }
}
