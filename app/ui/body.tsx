'use client'
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { fetchJuego } from "../lib/data";
import { useSession } from "next-auth/react";
import { bilbo, carter_One, josefin_sans, lexend_giga, lusitana, montserrat, sigmar_One } from '../ui/fonts';


export function Body() {
  const [juegos, setJuegos] = useState([]); // Estado para guardar los datos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    // Llama a fetchJuego y actualiza el estado
    const fetchData = async () => {
      try {
        const data = await fetchJuego();
        setJuegos(data); // Guarda los datos en el estado
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Termina el estado de carga
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex self-center justify-self-center grid place-items-center w-full bg-[#0D0D0D]">
      {juegos.map((juego, index) => (
        <section
          key={index}
        >
          <a href={juego.link} className="grid grid-cols-[200px_200px_150px] grid-rows-[100px_120px_100px] gap-x-[12px] gap-y-[17px] p-[10px] bg-[#1f1f1f] pt-[10px] pb-[1px] [box-shadow:0px_15px_20px_#640F8C]">
          <div className="col-span-2 row-span-2 rounded-[25px] [transition:.3s] hover:scale-[1.02]">
          <img className='rounded-[25px] pl-2 bg-cover w-[405px] h-[240px] z-20 transition-opacity scale-[1.03]' src={juego.imagen_de_portada} alt={`${juego.nombre} imagen de portada`} /> 
          <iframe className='rounded-[25px] pl-2 mb-20 bg-cover w-[405px] h-[240px] relative top-[-240px] opacity-0 z-10 transition-opacity scale-[1.035] hover:opacity-100 z-10' src={juego.video} frameborder="0" allowfullscreen ></iframe>
          </div>
          <div className={`${montserrat.className} grid place-items-center text-[#fff] text-xl font-bold col-start-1 row-start-3 bg-[#9F86C0] rounded-[15px] pb-1`}>
          {juego.nombre} {/* Ejemplo: Mostrar el nombre del juego */}
          </div>
          <div className={`${montserrat.className} grid place-items-center text-[#fff] text-4xl font-bold col-start-2 row-start-3 bg-[#9F86C0] rounded-[15px] pb-2`}>
          {juego.plataforma.nombre} {/* Ejemplo: Mostrar el nombre del juego */}
          </div>
          <div className="z-10 col-start-3 row-start-3 row-end-6 bg-[#3CCBFF] relative -top-[30px] rounded-[15px]">
          {juego.carrito} {/* Ejemplo: Mostrar el nombre del juego */}
          </div>
          <div className={`${carter_One.className} grid place-items-center text-[black] text-6xl col-start-3 row-start-2 bg-[#4FFF5A] h-[90px] rounded-[15px] pt-0`}>
          {juego.precio} {/* Ejemplo: Mostrar el nombre del juego */}
          </div>
          <div className={`${montserrat.className} grid place-items-center text-[black] text-sm font-bold col-start-3 row-start-1 bg-[#FFF703] rounded-[15px]`}>
          {juego.categoria.nombre} {/* Ejemplo: Mostrar el nombre del juego */}
          </div>
          </a>
        </section>
      ))}
    </div>
  );
  }