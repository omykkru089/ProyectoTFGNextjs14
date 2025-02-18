"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    const isAdmin = session.user?.role === "admin";
    return (
      <>
        Signed in as {session.user?.email}  <br />
        <button
          onClick={() => signOut()}
          className="bg-[#9f86c070] mr-[20px] p-[0.35rem] rounded-[5px] hover:[transition:.1s] hover:bg-[#9f86c0d3]"
        >
          Cerrar Sesión
        </button>

        {isAdmin && (
          <Link href="/admin">
            <button
              className="bg-[#9f86c070] mr-[20px] p-[0.35rem] rounded-[5px] hover:[transition:.1s] hover:bg-[#9f86c0d3]"
            >
              Panel de Administración
            </button>
          </Link>
        )}
        
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