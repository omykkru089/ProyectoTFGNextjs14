"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import UserSkeleton from "../ui/Skeletons/UserSkeleton";
import { Suspense } from "react";
import { useCart } from "@/context/cart-context";
import { Save } from "lucide-react";
export default function ButtonAuth() {

  const { items, saveCart } = useCart()

const handleSignOut = async () => {
    await signOut();
    window.location.href = '/'; // Redirigir a la pantalla de inicio
  };

  const itemCount = items.reduce((sum, item) => sum + item.cantidad, 0)
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Suspense><div className="ml-[2.08rem]"><UserSkeleton></UserSkeleton></div></Suspense>;
  }

  if (session) {
    const isAdmin = session.user?.role === "admin";
    return (
      <div className="flex  items-center justify-center gap-[20px]">
        {isAdmin && ( <Link href="/panel-de-administracion" className="bg-[#9f86c070] mr-[90px] p-[0.35rem] rounded-[5px] hover:[transition:.1s] hover:bg-[#9f86c0d3] absolute right-[100px]"><button>Administración</button></Link> )}
        <button className="relative right-[5.5rem]" onClick={saveCart}><Save/></button>
        <div className="relative w-[38px] h-[38px] right-[100px] rounded-sm">
          <Link href="/carrito">
          <img src="/carrito-de-compras (1).png" alt="iconcarrito" className="w-full h-full  object-contain relative bottom-[30px]" />
          <div className="relative text-[#bb88ff] bg-[#ebdcff] rounded-full w-[20px] h-[20px] grid place-content-center bottom-[270%] left-6">{itemCount}</div>
          </Link>
        </div>
        
        <div className="relative right-[105px] bottom-[15px] w-0 h-[20px] mt-0 z-20">                  
          <ul className="flex items-center ">
            <li className="relative group">
              <Link href="/sobre-mi" className="flex items-center hover:text-gray-300">
                <button className="h-[48px] w-[48px] bg-white rounded-full overflow-hidden border-2 border-purple-500">
                <img src="https://plus.unsplash.com/premium_vector-1727955579185-ed12a1c678de?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="iconUser"  className="w-full h-full object-cover pb-32"/>  
                </button> 
              </Link>
              <ul className="absolute z-20 right-0 mt-[14px] w-[135.5px] hidden bg-[#ddbbf770] rounded-b-md shadow-lg group-hover:block">
                <li><div className="block px-4 py-2 ">{session.user?.email}</div></li>
                <li><Link href="/sobre-mi" className="block px-4 py-2 hover:bg-[#ddbbf790]">Sobre mi</Link></li>
                <li><Link href="#" className="block px-4 py-2 hover:bg-[#ddbbf790] rounded-b-md"><button onClick={handleSignOut}>Cerrar Sesión</button></Link></li>
              </ul>
            </li>
          </ul>
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