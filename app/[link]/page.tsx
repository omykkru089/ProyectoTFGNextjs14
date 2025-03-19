import { Footer } from "../ui/footer";
import { Header } from "../ui/header";
import Link from "next/link";
import { Juego } from "../lib/definitions";
import Image from "next/image";
import { useCart } from "../../context/cart-context";
import { useNotification } from "../ui/notification";

interface Params {
  link: string;
}

async function fetchDataByLink(link: string): Promise<Juego | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/juegos/link/${link}`);

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Error al obtener los datos del juego con link: ${link}`);
    }

    const data = await res.json();
    return {
      id: data.id,
      imagen_de_portada: data.imagen_de_portada,
      nombre: data.nombre,
      link: data.link,
      precio: data.precio,
      descripcion: data.descripcion,
      categoria: data.categoria,
      fecha_de_lanzamiento: data.fecha_de_lanzamiento,
      desarrollador: data.desarrolladora,
      plataforma: data.plataforma,
      video: data.video,
      editorial: data.editorial,
      clasificacion_por_edad: data.clasificacion_por_edad,
      idiomas: data.idiomas,
      requisitos_del_sistema: data.requisitos_del_sistema,
      popularidad: data.popularidad,
      carrito: data.carrito,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Page({ params }: { readonly params: Params }) {
  const { addToCartFromDetail } = useCart();
  const { showNotification } = useNotification();

  async function handleAddToCart(juego: Juego) {
    try {
      await addToCartFromDetail(juego, 1); // Agregar 1 unidad del juego al carrito
    } catch (error) {
      console.error("Error adding to cart:", error);
      showNotification("No se pudo añadir el juego al carrito", "error");
    }
  }

  const { link } = params;
  const juego = await fetchDataByLink(link);

  if (!juego) {
    return (
      <div className="w-full h-screen bg-black flex flex-col justify-center items-center gap-y-6">
        <h1 className="text-[#fff] text-9xl"><code>Error 404</code></h1>
        <h1 className="text-[#ff1c1c] text-6xl mb-[8rem]"><code>Página no encontrada</code></h1>
        <p className="text-[#fff] text-4xl underline">
          <Link href="/">Volver a la pagina principal</Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full h-full bg-black grid place-content-center gap-y-6">
        <div>
          <section className="flex items-center justify-center gap-[50px] pt-[20px]">
            <article>
              <div className="relative max-w-[500px]">
                <div className="flex [aspect-ratio:15/9] overflow-hidden [scroll-snap-type:x_mandatory] rounded-[20px] [box-shadow:0px_0px_8px_#B99DE7]">
                  <iframe
                    className="w-[1000px] h-[400px] rounded-xl"
                    width="800px"
                    height="300px"
                    src={Array.isArray(juego.video) && juego.video[1] ? juego.video[1] : ""}
                    title={juego.nombre}
                  ></iframe>
                  <Image
                    id="img-1"
                    width={700}
                    height={700}
                    src={juego.imagen_de_portada}
                    className="w-[300px] h-[300px] flex-[1_0_100%] object-cover [scroll-snap-align:start]"
                    alt={juego.nombre}
                  />
                </div>
              </div>
            </article>
          </section>
          <button onClick={() => handleAddToCart(juego)} className="w-80 text-[#fff] cursor-pointer border-[1px] border-[solid] border-[black] rounded-[4px] px-[0.3em] py-[0.3em] bg-[black] [transition:0.2s] mt-[-15px] hover:-translate-x-[0] hover:-translate-y-1 hover:bg-[#DDBBF7] hover:[box-shadow:0_0.25rem_#000] active:translate-x-[0] active:[box-shadow:none]">
            Comprar Ahora!
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}