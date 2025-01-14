import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
      <div class="footer">
      <footer class="footer-container" >
        <div class="containter">
          <div class="links">
            <section class="list">
              <ul>
                <li><Link href="#">Términos y condiciones</Link></li>
                <li><Link href="#">Política de privacidad </Link></li>
                <li><Link href="#">Contacto</Link></li>
                <li><Link href="#">Programa de afiliación</Link></li>
              </ul>
            </section>
            <section class="medias">
              <section class="link">
                <div class="icons">
                  <a href="#" >
                  <Image
                  src="/icons8-facebook.svg" alt="icon of the social web facebook" width={100} height={100}
                  />
                  </a>
                  <a href="#">
                  <Image src="/icons8-instagram.svg" alt="imagen de instagram" width={100} height={100} />
                    </a>
                  <a href="#">
                  <Image src="/icons8-twitter.svg" alt="imagen de twitter" width={100} height={100} />
                  </a>
                  <a href="#">
                  <Image src="/icons8-youtube.svg" alt="imagen de youtube" width={100} height={100} />
                  </a>
                </div>
                <div class="apps">
                  <a href="#">
                  <Image src="/google.png" alt="imagen de google" width={100} height={100} />
                  </a>
                  <a href="#">
                  <Image src="/apple.png" alt="imagen de applestore" width={100} height={100} />
                  </a>
                </div>
              </section>
            </section>
          </div>
          <section class="information">
            <div class="Copyright">Copyright © 2024 GameShop - All rights reserved</div>
            <a href="#">
            <div class="moneda-geo">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg><div>España</div> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
              </svg><div>Español</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg><div>EUR</div>
              </div>
            </a>
            </section>
            
        </div>
      </footer>
      </div>
    );
  }