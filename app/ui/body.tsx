'use client'
import { useEffect, useState } from 'react';
import Link from "next/link";
import { fetchCategorias, fetchDesarrolladores, fetchEditoriales, fetchJuego, fetchPlataforma } from "../lib/data";
import { barlow,  montserrat,  } from '../ui/fonts';
import { juego } from "../lib/definitions"; {/*categoria,desarrollador,editorial,plataforma*/}

export function Body() {
  const [juegos, setJuegos] = useState<juego[]>([]); // Estado para guardar los datos
  // const [categoria, setCategorias] = useState<categoria[]>([]); // Estado para guardar los datos
  // const [desarrollador, setDesarrolladores] = useState<desarrollador[]>([]); // Estado para guardar los datos
  // const [editorial, setEditoriales] = useState<editorial[]>([]); // Estado para guardar los datos
  // const [plataforma, setPlataformas] = useState<plataforma[]>([]); // Estado para guardar los datos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    // Llama a fetchJuego y actualiza el estado
    const fetchData = async () => {
      try {
        const data = await fetchJuego(); fetchPlataforma(); fetchCategorias(); fetchEditoriales(); fetchDesarrolladores();
        setJuegos(data); // Guarda los datos en el estado
        // setCategorias(data); // Guarda los datos en el estado
        // setDesarrolladores(data); // Guarda los datos en el estado
        // setEditoriales(data); // Guarda los datos en el estado
        // setPlataformas(data); // Guarda los datos en el estado
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
    <div className=" grid place-items-center w-full bg-[#0D0D0D]">
      {juegos.map((juego, index, ) => (
        <section
          key={index}
        >
          <Link href={juego.link} className="grid grid-cols-[200px_200px_150px] grid-rows-[100px_120px_50px] gap-x-[12px] gap-y-[17px] p-[10px] bg-[#1f1f1f] pt-[20px] [box-shadow:0px_15px_20px_#640F8C] z-0 mb-[-20px]">
          <div className="col-span-2 row-span-2 rounded-[25px] [transition:.3s] hover:scale-[1.02]">
          <img className='rounded-[25px] pl-2 bg-cover w-[405px] h-[240px] z-20 transition-opacity scale-[1.03]' src={juego.imagen_de_portada} alt={`${juego.nombre} imagen de portada`} /> 
          <iframe className='rounded-[25px] pl-2 mb-20 bg-cover w-[405px] h-[240px] relative top-[-240px] opacity-0 z-10 transition-opacity scale-[1.035] hover:opacity-100' src={juego.video}></iframe>
          </div>
          <div className={`${montserrat.className} grid place-items-center text-[#fff] text-2xl font-bold col-start-1 row-start-3 bg-[#9f86c0a4] rounded-[15px] pb-0 [box-shadow:0px_0px_7px_#9F86C0]`}>
          {juego.nombre} {/* Ejemplo: Mostrar el nombre del juego */}
          </div>
          <div className={`${montserrat.className} grid place-items-center text-[#fff] text-3xl font-bold col-start-2 row-start-3 bg-[#9F86C0a4] rounded-[15px] pb-[2px] [box-shadow:0px_0px_7px_#9F86C0]`}>
          {juego.plataforma.nombre} {/* Ejemplo: Mostrar el nombre de la plataforma */}
          </div>
          <div className={`${barlow.className} grid place-items-center text-[black] text-[35px] col-start-3 row-start-1 bg-[#00ff00]  rounded-[15px] mt-[4.2rem] h-[70px] [box-shadow:0px_0px_7px_green]`}>
          {juego.precio} {/* Ejemplo: Mostrar el precio del juego */}
          </div>
          <div className={`${barlow.className} grid place-items-center text-[black] text-base font-bold col-start-3 row-start-1 h-[60px] bg-[#FFF703] rounded-[15px] [box-shadow:0px_0px_7px_yellow]`}>
          {juego.categoria.nombre} {/* Ejemplo: Mostrar el nombre de la categoria */}
          </div>
          <div className="z-100 col-start-3 row-start-2 row-end-6 bg-[#3CCBFF] relative top-[28px] rounded-[15px] h-[160px] [box-shadow:0px_0px_7px_lightblue]">
          {juego.carrito} {/* Ejemplo: Mostrar el carrito del juego */}
          </div>
          </Link>
        </section>
      ))}
    </div>
  );
  }