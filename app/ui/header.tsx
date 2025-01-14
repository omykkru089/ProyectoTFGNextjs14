import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
      <div class="menu-completo">
        <Image src="/GameShop.png" alt="icono de la web" width={120} height={120}></Image>
            <div class="menu-plataformas">
                <nav >
                    <Link href="#">PC</Link>
                    <Link href="#">Xbox</Link>
                    <Link href="#">PlayStation</Link>
                    <Link href="#">Nintendo Switch</Link>
                </nav>
            </div>
            <div class="menu-auth">
                <a href="#">Iniciar Sesión</a>
                <a href="#">Registrarse</a>
            </div>
      </div>
    );
  }