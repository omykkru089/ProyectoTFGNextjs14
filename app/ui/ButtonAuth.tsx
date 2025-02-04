"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.email}  <br />
        <button
          onClick={() => signOut()}
          className="bg-[#9f86c070] mr-[20px] p-[0.35rem] rounded-[5px] hover:[transition:.1s] hover:bg-[#9f86c0d3]"
        >
          Cerrar Sesión
        </button>
        
        <button id="register" className="hidden"></button>
      </>
    );
  }
  return (
    <>
    <Link href={'/login'}>
      <button

      id="login"
        className="bg-[#9f86c070] mr-[20px] p-[0.35rem] rounded-[5px] hover:[transition:.1s] hover:bg-[#9f86c0d3]"
      >
        Iniciar Sesión
      </button></Link>

      <Link href={'/register'}>
      <button
      id="register"
      >
        Registrarse
      </button></Link>
    </>
  );
}