"use client";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Suspense, useEffect, useState, useRef } from "react";
import { useCart } from "@/context/cart-context";
import UserSkeleton from "./Skeletons/UserSkeleton";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import { useNotification } from "./notification";
import { useSearch } from "@/context/search-context";


export function Header() {
  const { items, fetchCart } = useCart();
  const { data: session, status } = useSession();
  const [itemCount, setItemCount] = useState(0);
  const { search, setSearch } = useSearch();
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session) {
      fetchCart();
    }
  }, [session, fetchCart]);

  useEffect(() => {
    const totalItems = items.reduce((sum: number, item) => sum + item.cantidad, 0);
    setItemCount(totalItems);
  }, [items]);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <header className="bg-[#202020] [transition:all_0.5s] shadow-lg z-0 grid place-content-center grid-cols-[repeat(3,_1fr)] grid-rows-[repeat(2,_1fr)] gap-x-[0px] gap-y-[0px] tablet:flex tablet:justify-between tablet:items-center tablet:px-4 tablet:py-2 ">
      {/* Logo */}
      <Link href="/" className="relative [transition:all_0.5s] w-[64px] h-[64px] min-w-[64px] min-h-[64px] [grid-area:1_/_1_/_2_/_2] tablet:w-24 tablet:h-24">
        <Image
          src="/GameShop.png"
          alt="GameShop Logo"
          width={120}
          height={120}
          className="w-full h-full [transition:all_0.5s] object-cover object-center relative left-20 max-[370px]:left-8  tablet:left-0"
        />
      </Link>

      {/* Buscador */}
      <div className="relative [transition:all_0.5s] flex items-center  w-fit self-center  left-32 max-[370px]:left-24 tablet:left-0 justify-center mr-2 [grid-area:1_/_2_/_2_/_3]">
        <button
          className="p-2"
          onClick={() => {
            setShowInput((v) => !v);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
        >
          <svg className=" w-8 h-8  tablet:w-10 tablet:h-10 p-2 bg-[#ffffff69] rounded-lg" fill="none" stroke="purple" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
        </button>
        {showInput && (
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="absolute [transition:all_0.5s] left-1/2 -translate-x-1/2 top-[110%] z-50 px-3 py-2 rounded shadow-lg bg-white text-black w-56"
            placeholder="Buscar juegos..."
          />
        )}
      </div>

      {/* Navigation */}
      <nav className="relative [transition:all_0.5s]  tablet:right-8 desktop:right-[6.5rem] flex self-center gap-6   pl-[5px] pr-[20px] tablet:pl-4 tablet:pr-4 tablet:h-[100%] tablet:w-fit  [grid-area:2_/_2_/_3_/_2] tablet:gap-2 bg-[#ffffff39] text-white rounded-lg p-2">
        <Link href="/pc" className="text-white [transition:all_0.5s] flex gap-2 hover:text-purple-300">
          <Image src="/iconPC.png" alt="PC" width={20} height={20} className="w-[16px] h-[16px] max-[370px]:min-h-[24px] max-[370px]:min-w-[24px] relative top-[1px] self-center tablet:h-[20px] tablet:w-[20px]" />
          <span className=" max-[760px]:text-sm max-[370px]:hidden font-bold tablet:font-normal tablet:text-md tablet:inline">PC</span>
        </Link>
        <Link href="/xbox" className="text-white [transition:all_0.5s] flex gap-2 hover:text-purple-300">
          <Image src="/iconXbox.png" alt="Xbox" width={20} height={20} className="w-[16px] h-[16px] max-[370px]:min-h-[24px] max-[370px]:min-w-[24px] relative top-[1px] self-center tablet:h-[20px] tablet:w-[20px] " />
          <span className="max-[760px]:text-sm max-[370px]:hidden font-bold tablet:font-normal tablet:text-md tablet:inline">Xbox</span>
        </Link>
        <Link href="/playstation" className="text-white [transition:all_0.5s] flex gap-2 hover:text-purple-300">
          <Image src="/iconPS.png" alt="PlayStation" width={20} height={20} className="w-[16px] h-[16px] max-[370px]:min-h-[24px] max-[370px]:min-w-[24px] relative top-[1px] self-center tablet:h-[20px] tablet:w-[20px]" />
          <span className="max-[760px]:text-sm max-[370px]:hidden font-bold tablet:font-normal tablet:text-md tablet:inline">PlayStation</span>
        </Link>
        <Link href="/nintendo" className="text-white [transition:all_0.5s] flex gap-2 hover:text-purple-300">
          <Image src="/iconNS.png" alt="Nintendo" width={20} height={20} className="w-[16px] h-[16px] max-[370px]:min-h-[24px] max-[370px]:min-w-[24px] relative top-[1px] self-center tablet:h-[20px] tablet:w-[20px] " />
          <span className="max-[760px]:text-sm max-[370px]:hidden font-bold tablet:font-normal tablet:text-md tablet:inline">Nintendo</span>
        </Link>
      </nav>
      {/* User Actions */}
      <div className="flex [transition:all_0.5s] items-center justify-end gap-0 [grid-area:1_/_3_/_2_/_4]">
        {status === "loading" ? (
          <Suspense>
            <UserSkeleton />
          </Suspense>
        ) : session ? (
          <>
            
            {/* Cart Icon */}
            <div className="relative w-[32px] min-w-[32px] min-h-[32px] tablet:w-10 right-[5.5rem] max-[370px]:right-8  tablet:left-0">
              <Link href="/carrito">
                <img
                  src="/carrito-de-compras (1).png"
                  alt="Carrito"
                  className="w-[32px] min-w-[32px] min-h-[32px] tablet:w-10"
                />
                <div className="absolute -top-2 -right-2 bg-[#ebdcff] text-[#bb88ff] rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </div>
              </Link>
            </div>

            {/* User Dropdown */}
            {/* Admin Panel */}
            {session.user?.role === "admin" && (
              <Dropdown className="gap-2 relative ">
                  <DropdownTrigger className="relative right-[5.5rem] max-[370px]:right-4   tablet:left-0">
                    <Button variant="bordered"> 
                      <img
                      alt="IconUser"
                      src="https://i.fmfile.com/1955hQ3IQgfpfJAh42Rec/IconUser2.png"
                      className="relative inline-block  cursor-pointer rounded-full object-cover object-center w-[32px] min-w-[32px] min-h-[32px] tablet:w-10  max-[370px]:right-4  tablet:left-0 "
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" className="text-white bg-[#9f86c070] rounded-lg p-2">
                    <DropdownItem key="new" href="/sobre-mi" className="hover:bg-[#c8aaef70] [transition:.3s] rounded-lg p-2">Sobre Mí</DropdownItem>
                    <DropdownItem key="delete" href="/panel-de-administracion" className="hover:bg-[#c8aaef70] [transition:.3s] p-2 rounded-lg" color="danger">
                      Administracion
                  </DropdownItem>
                  <DropdownItem key="hr" className="w-full bg-white h-[2px] my-2">
                    <hr ></hr>
                  </DropdownItem>
                    <DropdownItem key="delete" onAction={handleSignOut} className="text-red-500 bg-[#ff7b7b2f] rounded-lg p-2 [transition:.3s] hover:text-red-600 hover:bg-[#ff6e6ea8]" color="danger">
                      
                      Cerrar Sesion
                  </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
            )}

            {session.user?.role === "user" && (
            <div>
                <Dropdown className="gap-2 relative">
                  <DropdownTrigger className="relative right-[5.5rem] max-[370px]:right-4   tablet:left-0">
                    <Button variant="bordered"> 
                      <img
                      alt="IconUser"
                      src="https://i.fmfile.com/1955hQ3IQgfpfJAh42Rec/IconUser2.png"
                      className="relative inline-block  cursor-pointer rounded-full object-cover object-center w-[32px] min-w-[32px] min-h-[32px] tablet:w-10  max-[370px]:right-4  tablet:left-0 "
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" className="text-white bg-[#9f86c070] rounded-lg p-2">
                    <DropdownItem key="new" href="/sobre-mi" className="hover:bg-[#c8aaef70] [transition:.3s] rounded-lg p-2">Sobre Mí</DropdownItem>
                  <DropdownItem key="hr" className="w-full bg-white h-[2px] my-2">
                    <hr ></hr>
                  </DropdownItem>
                    <DropdownItem key="delete" onAction={handleSignOut} className="text-red-500 bg-[#ff7b7b2f] rounded-lg p-2 [transition:.3s] hover:text-red-600 hover:bg-[#ff6e6ea8]" color="danger">
                      
                      Cerrar Sesion
                  </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
            </div>
            )}
          </>
        ) : (
          <div className="flex gap-2 relative right-[5.5rem] max-[370px]:right-8  tablet:left-0">
            <Link
              href="/login"
              className="text-white desktop:bg-[#9f86c070] p-[5px] desktop:px-4 desktop:py-2 rounded hover:bg-[#9f86c0d3]"
            >
              <Image className="w-[32px] min-w-[32px] min-h-[32px] tablet:w-10 desktop:hidden" width={100} height={100} alt="iconlogin" src="/iconlogin.png"></Image>
              <span className="hidden desktop:inline tablet:text-sm desktop:text-lg">Iniciar Sesión</span>
            </Link>
            <Link
              href="/register"
              className="text-white desktop:bg-[#9f86c070] p-[5px] desktop:px-4 desktop:py-2 rounded hover:bg-[#9f86c0d3]"
            >
              <Image className="w-[32px] min-w-[32px] min-h-[32px] tablet:w-10 desktop:hidden" width={100} height={100} alt="iconlogin" src="/iconregister.png"></Image>
              <span className="hidden desktop:inline tablet:text-sm desktop:text-lg">Registrarse</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}