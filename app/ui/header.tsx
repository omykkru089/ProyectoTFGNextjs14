"use client"
import Image from "next/image";
import Link from "next/link";
import ButtonAuth from "./ButtonAuth";


export function Header() {


    return (
      <header className="menu-completo">
        <Link href="/"><Image src="/GameShop.png" alt="icono de la web" width={120} height={120}></Image></Link>
            <div className="menu-plataformas">
                <nav >
                    <Link href="#">
                    <Image src="/iconPC.png" alt="icono de pc" width={20} height={20}></Image>
                    PC
                    </Link>
                    <Link href="#">
                    <Image src="/iconXbox.png" alt="icono de xbox" width={20} height={20}></Image>
                    Xbox
                    </Link>
                    <Link href="#">
                    <Image src="/iconPS.png" alt="icono de xbox" width={20} height={20}></Image>
                    PlayStation
                    </Link>
                    <Link href="#">
                    <Image src="/iconNS.png" alt="icono de xbox" width={20} height={20}></Image>
                    Nintendo 
                    </Link>
                </nav>
            </div>
            <div className="menu-auth">
                <div><ButtonAuth></ButtonAuth></div>
            </div>
      </header>
    );
  }