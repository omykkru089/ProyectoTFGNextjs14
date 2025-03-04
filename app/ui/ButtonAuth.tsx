"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import UserSkeleton from "../ui/Skeletons/UserSkeleton";
import { Suspense } from "react";
import "./styles/menuUser.css"
export default function ButtonAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Suspense><div className="ml-[2.08rem]"><UserSkeleton></UserSkeleton></div></Suspense>;
  }

  if (session) {
    const isAdmin = session.user?.role === "admin";
    return (
      <div className="flex  items-center justify-center gap-[20px]">
        {isAdmin && ( <Link href="/panel-de-administracion" className="bg-[#9f86c070] mr-[90px] p-[0.35rem] rounded-[5px] hover:[transition:.1s] hover:bg-[#9f86c0d3] absolute right-[100px]"><button>Administración</button></Link> )}
        <div className="relative w-[38px] h-[38px] right-[100px] rounded-sm">
          <img src="/carrito-de-compras (1).png" alt="iconcarrito" className="w-full h-full  object-contain relative bottom-[30px]" />
        </div>
        
        <div className="module">
                  <div className="trigger">
                    <span>
                    <button className="h-[48px] w-[48px] bg-white rounded-full overflow-hidden border-2 border-purple-500">
                    <img src="https://plus.unsplash.com/premium_vector-1727955579185-ed12a1c678de?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="iconUser"  className="w-full h-full object-cover pb-32"/>  
                    </button> 
                    </span>
                    <ul className="locations">
                    <li><div className="text-black">{session.user?.email}</div></li>
                    <li><Link href="/sobre-mi" ><button >Sobre mi</button></Link></li>
                    <li><Link href="#" ><button onClick={() => signOut()}>Cerrar Sesión</button></Link></li>
                    </ul>
                   </div>
                </div>
        
      </div>
    );
  }

  return (
    <>
    <Link href={'/login'} className="ml-[35px]">
      <button

      id="login"
        className="bg-[#9f86c070] mr-[20px] p-[0.35rem] rounded-[5px] hover:[transition:.1s] hover:bg-[#9f86c0d3] absolute right-[110px] top-[25px] "
      >
        Iniciar Sesión
      </button></Link>

      <Link href={'/register'}>
      <button
      id="register"
      className="bg-[#9f86c070] mr-[20px] p-[0.35rem] rounded-[5px] hover:[transition:.1s] hover:bg-[#9f86c0d3] absolute right-[10px] top-[25px]"
      >
        Registrarse
      </button></Link>
    </>
  );
}