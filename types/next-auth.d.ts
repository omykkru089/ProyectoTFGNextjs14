import "next-auth";
import { DefaultSession } from "next-auth";


declare module "next-auth" {

  interface User {
    email: string;
    token: string;
    role: string; // Definir el tipo de rol
  }

  interface Session {
    user: {
      email: string;
      token: string;
      role: string;
    } 
  }

  declare module "next-auth/jwt" {
    interface JWT {
      role: string;
    }
  }
}