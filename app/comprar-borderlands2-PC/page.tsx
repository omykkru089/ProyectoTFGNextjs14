import Link from 'next/link';


import Image from 'next/image';
import { Header } from '../ui/header';
import { Footer } from '../ui/footer';
import "./styles/csspage.css"
export default function Page() {
  
  return (
    
      <main className='w-full h-full bg-[#1f1f1f] '>
        
        <header><Header></Header></header>
        
        <section className='flex items-center justify-center gap-[50px] pt-[20px]'>

          <article>
          <div className="relative max-w-[500px]">
            <div className="flex [aspect-ratio:15/9] overflow-hidden [scroll-snap-type:x_mandatory] rounded-[20px] [box-shadow:0px_0px_8px_#B99DE7]">
              <iframe id='img-0' className='w-[300px] h-[300px] flex-[1_0_100%] object-cover [scroll-snap-align:start]' width="500px" height="300px" src="https://www.youtube.com/embed/5TW0wJTFLiw?si=AT6oN5kR9_5iVwu6?&playlist=5TW0wJTFLiw&autoplay=0&loop=1" title="Trailer-Borderlands-2" ></iframe>
              <Image id="img-1" width={700} height={700} src="/borderlands-2-pc-1.jpg" className='w-[300px] h-[300px] flex-[1_0_100%] object-cover [scroll-snap-align:start]' alt='imagen1'></Image>
              <Image id="img-2" width={700} height={700} src="/borderlands-2-pc-2.jpg" className='w-[300px] h-[300px] flex-[1_0_100%] object-cover [scroll-snap-align:start]' alt='imagen1'></Image>
              <Image id="img-3" width={700} height={700} src="/borderlands-2-pc-3.jpg" className='w-[300px] h-[300px] flex-[1_0_100%] object-cover [scroll-snap-align:start]' alt='imagen1'></Image>
            </div>
            <div className="flex absolute bottom-[3%] left-2/4 [transform:translatex(-50%)] z-[1]">
              <Link href="#img-1" className='relative w-[15px] h-[15px] rounded-[50%] bg-[white] mr-[15px] opacity-[70%] [transition:opacity_ease_250rem] hover:opacity-100'></Link>
              <Link href="#img-2" className='relative w-[15px] h-[15px] rounded-[50%] bg-[white] mr-[15px] opacity-[70%] [transition:opacity_ease_250rem] hover:opacity-100'></Link>
              <Link href="#img-3" className='relative w-[15px] h-[15px] rounded-[50%] bg-[white] mr-[15px] opacity-[70%] [transition:opacity_ease_250rem] hover:opacity-100'></Link>
              <Link href="#img-0" className='relative w-[15px] h-[15px] rounded-[50%] bg-[white] mr-[15px] opacity-[70%] [transition:opacity_ease_250rem] hover:opacity-100'></Link>
            </div>
          </div>
          </article>
          <article>
            <div className='w-[400px] h-[300px] bg-[#ece4f92c] rounded-[2rem] [box-shadow:0px_0px_10px_#B99DE7] relative'>
            <div className=' relative grid place-content-center font-extrabold text-3xl text-[#fff] pt-2 [filter:drop-shadow(0px_0px_10px_#50307C)] '>Borderlands 2</div>
            <div className='border-b-[2px] border-[#c5c5c5] pb-1 w-[80%] relative left-[10%]'></div>
              <div className='grid place-content-center w-full text-[#2C1C43]'>
                <div className=' flex gap-2 mt-3 bg-[#ffffff5b] p-4 rounded-md border-[3px] border-[solid] border-[#A167D8] relative'>
                  <span className='[filter:drop-shadow(0px_0px_2px_#A167D8)] '><Link href="#" className='hover:text-[#DDBBF7] [transition:0.2s]'>Steam</Link></span> 
                  <img src="/check.png" alt="check" className='w-2.5 h-2.5 pt-[7px] mr-[-4px] [filter:drop-shadow(0px_0px_2px_green)]'/>
                  <span className='flex flex-row top [filter:drop-shadow(0px_0px_2px_#A167D8)]'>En stock</span> 
                  <img src="/check.png" alt="check" className='w-2.5 h-2.5 pt-[7px] mr-[-4px] [filter:drop-shadow(0px_0px_2px_green)]'/>
                  <span className='flex flex-row [filter:drop-shadow(0px_0px_2px_#A167D8)]'>Descarga digital</span>
                </div>
              </div>

              <div className='flex'>
              <div className="module">
                  <div className="trigger">
                    <span>Plataformas</span>
                    <ul className="locations">
                      <li><Link href="#">PC</Link></li>
                      <li><Link href="#">Xbox</Link></li>
                      <li><Link href="#">Playstation</Link></li>
                      <li><Link href="#">Nintendo</Link></li>
                    </ul>
                   </div>
                </div>
                <div className="module">
                  <div className="trigger">
                    <span>Ediciones</span>
                    <ul className="locations">
                      <li><Link href="#">Standard Edition</Link></li>
                      <li><Link href="#">GOTY Edition</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className=' relative flex justify-center text-[#19ff38] text-3xl font-bold top-14 mb-[15px] border-[1px] rounded-lg pb-[2px] border-green-300 w-[85px] left-[40%] '><span className='[filter:drop-shadow(0px_0px_4px_green)]'>15€</span></div>
              <div className='grid place-content-center relative top-[24%]'><button className="w-80 text-[#fff] cursor-pointer border-[1px] border-[solid] border-[black] rounded-[4px] px-[0.3em] py-[0.3em] bg-[black] [transition:0.2s] mt-[-15px] hover:-translate-x-[0] hover:-translate-y-1 hover:bg-[#DDBBF7] hover:[box-shadow:0_0.25rem_#000] active:translate-x-[0] active:[box-shadow:none]">Comprar Ahora!</button></div>
    
            </div>  
          </article>
        </section>
        <section className=' w-[100%] mb-10 '>
        <div className='border-t-[3px] border-[#50307c60] mt-[40px] w-[80%] ml-[10%] rounded-full'></div>
          <article className='ml-[10%] pt-5 '>
            <h3 className='text-3xl font-bold text-[#805facb2] underline mb-2'>Descripcion</h3> 
            <div className='border-b-[1px] border-[#3e3546] mt-2 mb-3 w-[89%]'></div>
            <p className='w-[80%] text-[#6b6b6b] pl-[20px]'>Borderlands 2 es un shooter en primera persona con elementos de rol, desarrollado por Gearbox Software y lanzado en 2012. Ambientado en el caótico planeta Pandora, 
              la historia sigue a cuatro nuevos Cazadores de la Cámara que deben derrotar a Jack el Guapo, el tiránico líder de la corporación Hyperion. Con un vasto arsenal de armas generadas proceduralmente, 
              un mundo abierto lleno de peligros y personajes carismáticos, el juego combina acción frenética, exploración y un característico humor irreverente. Su modo cooperativo permite jugar con hasta cuatro 
              personas, potenciando la estrategia y el combate dinámico. Con múltiples expansiones y un estilo visual cel-shaded, Borderlands 2 es una experiencia intensa y adictiva, considerada una de las mejores 
              secuelas en la historia de los videojuegos.
            </p>
            <div className='border-b-[1px] border-[#3e3546] mt-2 mb-3 w-[89%]'></div>
            <p className='text-3xl font-bold text-[#805facb2] mb-2'>Axton</p>
            <p className='w-[80%] text-[#6b6b6b] pl-[20px]'>-  Este personaje se trata de un soldado la cual su habilidad es una torreta aliada que te ayuda a eliminar a los enemigos cercanos, en cualquier nivel del personaje es muy util la habilidad</p>
            <div className='border-b-[1px] border-[#3e3546] mt-2 mb-3 w-[89%]'></div>
            <p className='text-3xl font-bold text-[#805facb2] mb-2'>Zer0</p>
            <p className='w-[80%] text-[#6b6b6b] pl-[20px]'>- Este personaje es como un ninja, su habilidad trata de hacerte invisible durante unos 5 segundos en los cuales eres completamente imperceptible hacia tus enemigos, este personaje es un experto en armas a larga distancia como son los francotiradores</p>
            <div className='border-b-[1px] border-[#3e3546] mt-2 mb-3 w-[89%]'></div>
            <p className='text-3xl font-bold text-[#805facb2] mb-2'>Maya</p>
            <p className='w-[80%] text-[#6b6b6b] pl-[20px]'>- Este personaje es un ser de una raza mitica en el mundo de Pandora, LAS SIRENAS... tienen poderes increibles capaces de inmovilizar y debilitar a tus enemigos, si quieres jugar en modo "Facil" este es tu personaje</p>
            <div className='border-b-[1px] border-[#3e3546] mt-2 mb-3 w-[89%]'></div>
            <p className='text-3xl font-bold text-[#805facb2] mb-2'>Salvador</p>
            <p className='w-[80%] text-[#6b6b6b] pl-[20px]'>- Este personaje es la definicion de divertirse sin saber que estas haciendo, si solo quieres disparar tiros sea donde sea, como sea sin saber a donde irán a caer, este es tu personaje, su habilidad es poder tener 2 armas en ambas manos para tener mayor DPS que otros</p>
            <div className='border-b-[1px] border-[#3e3546] mt-2 mb-3 w-[89%]'></div>
            <p className='text-3xl font-bold text-[#805facb2] mb-2'>Gaige</p>
            <p className='w-[80%] text-[#6b6b6b] pl-[20px]'>- Este personaje puede ser familiar directo de Axton, esta señorita te permite usar en vez de una torreta te permite invocar un robot mecanomante que te permite hacer mucho daño mientras te cura al estar un@ a poca vida</p>
            <div className='border-b-[1px] border-[#3e3546] mt-2 mb-3 w-[89%]'></div>
            <p className='text-3xl font-bold text-[#805facb2] mb-2'>Krieg</p>
            <p className='w-[80%] text-[#6b6b6b] pl-[20px]'>- Este personaje... un lunatico que solo quiere matar y matar y matar y matar, hasta que se muera su objetivo y si puede lo perseguia hasta en el mismisimo infierno, su habilidad es invocar una sierra de una mano que te permite ocasionar mucho daño cuerpo a cuerpo</p>
          </article>
        </section >
        <section className='mb-[20px]'>
          <article className='grid place-content-center gap-5'>
          <iframe className='w-[1000px] h-[500px] rounded-xl' width="1000px" height="300px" src="https://www.youtube.com/embed/5TW0wJTFLiw?si=AT6oN5kR9_5iVwu6?&playlist=5TW0wJTFLiw&autoplay=0&loop=1" title="Trailer-Borderlands-2" ></iframe>
          <div className='grid grid-cols-2 gap-5'>
          <Image width={700} height={700} src="/borderlands-2-pc-1.jpg" className='w-[500px]  object-cover rounded-xl' alt='imagen1'></Image>
          <Image width={700} height={700} src="/borderlands-2-pc-2.jpg" className='w-[500px]  object-cover rounded-xl' alt='imagen2'></Image>
          <Image width={700} height={700} src="/borderlands-2-pc-3.jpg" className='w-[500px]  object-cover rounded-xl' alt='imagen3'></Image>
          <Image width={700} height={700} src="/borderlands-2-pc-4.jpg" className='w-[500px]  object-cover rounded-xl' alt='imagen3'></Image>
          </div>
          </article>
        </section>
        <span className='w-full  flex justify-center  align-middle text-[#DDBBF7] underline font-bold text-3xl mb-5'>Windows</span>
        <section className='w-full flex justify-center align-middle gap-6 mb-[30px]'>
          
          <article className='w-[32vw]'>
            <h1 className='text-[#805facb2] text-xl font-bold'>Requisitos Minimos</h1>
            <ul className='text-[#838383] font-normal text-sm '>
              <li className='mb-[2px]'>OS *:Windows XP SP3</li>
              <li className='mb-[2px]'>Processor:2.4 GHz Dual Core Processor</li>
              <li className='mb-[2px]'>Memory:2 GB(XP)/ 2 GB(Vista)</li>
              <li className='mb-[2px]'>Hard Disk Space:13 GB free</li>
              <li className='mb-[2px]'>Video Memory:256 MB</li>
              <li className='mb-[2px]'>Video Card:NVIDIA GeForce 8500 /ATI Radeon HD 2600</li>
              <li className='mb-[2px]'>Sound:DirectX 9.0c Compatible</li>
              <li>Other Requirements:Initial installation requires one-time internet connection for Steam authentication; software installations required (included with the game) include Steam Client, DirectX 9, Microsoft .NET 4 Framework, Visual C++ Redistributable 2005, Visual C++ Redistributable 2008, Visual C++ Redistributable 2010, and AMD CPU Drivers (XP Only/AMD Only)</li>
            </ul>
          </article>
          <article className='w-[32vw]'>
            <h1 className='text-[#805facb2] text-xl font-bold'>Requisitos Recomendados</h1>
            <ul className='text-[#838383] font-normal text-sm'>
              <li className='mb-[2px]'>OS *:Windows XP SP3/Vista/Win 7</li>
              <li className='mb-[2px]'>Processor:2.3 GHz Quad Core processor</li>
              <li className='mb-[2px]'>Memory:2 GB</li>
              <li className='mb-[2px]'>Hard Disk Space:20 GB free</li>
              <li className='mb-[2px]'>Video Memory:512MB</li>
              <li className='mb-[2px]'>Video Card:NVIDIA GeForce GTX 560 / ATI Radeon HD 5850</li>
              <li className='mb-[2px]'>Sound:DirectX 9.0c Compatible</li>
              <li >Other Requirements:Initial installation requires one-time internet connection for Steam authentication; software installations required (included with the game) include Steam Client, DirectX 9, Microsoft .NET 4 Framework, Visual C++ Redistributable 2005, Visual C++ Redistributable 2008, Visual C++ Redistributable 2010, and AMD CPU Drivers (XP Only/AMD Only)</li>
            </ul>
          </article>
        </section>
        
        <footer ><Footer></Footer></footer>
      </main>
       
  );
}
