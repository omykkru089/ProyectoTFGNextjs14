'use client'
import { useEffect, useState } from 'react';
import Link from "next/link";
import { getGames } from '../lib/api';
import { barlow,  montserrat,  } from '../ui/fonts';
import {juego } from "../lib/definitions";
import GameSkeleton from "../ui/Skeletons/GameSkeleton";
import { useNotification } from './notification';
import { useCart } from '@/context/cart-context';

export function Body() {
  const [juegos, setGames] = useState<juego>([]); // Estado para guardar los datos
  const [isLoading, setIsLoading] = useState(true)
  const { showNotification } = useNotification()
  const { addItem } = useCart()

  useEffect(() => {
    fetchGames()
  }, [])

  async function fetchGames() {
    try {
      const data = await getGames()
      setGames(data)
    } catch (error) {
      console.error("Error fetching games:", error)
      showNotification("No se pudieron cargar los juegos", "error")
    } finally {
      setIsLoading(false); // Termina el estado de carga
    }
  };

  async function handleAddToCart(juego) {
    try {
     addItem({
        id: juego.id,
      nombre: juego.nombre,
      precio: juego.precio,
      cantidad: 1,
      })
      showNotification("Juego añadido al carrito", "success")
    } catch (error) {
      console.error("Error adding to cart:", error)
      showNotification("No se pudo añadir el juego al carrito", "error")
    }
  }

  if (isLoading) {
        return <div className=" grid place-items-center w-full bg-[#0D0D0D]"><div className="flex flex-col p-[10px] bg-[#1f1f1f] w-[590px] pt-[20px] mb-[-20px] "><GameSkeleton/><GameSkeleton/><GameSkeleton/></div></div> 
  }


  return (
    <div className=" grid place-items-center w-full bg-[#0D0D0D]">
      {juegos.map((juego, index ) => (
        <section className='grid grid-cols-[200px_200px_150px] grid-rows-[100px_120px_90px] gap-x-[12px] gap-y-[17px] p-[20px] bg-[#1f1f1f] pt-[20px] [box-shadow:0px_15px_20px_#640F8C] z-0 mb-[-40px] '
          key={index}
        >
          <Link href="{juego.link}" className="grid grid-cols-[200px_200px_150px] grid-rows-[100px_120px_90px] gap-x-[12px] gap-y-[17px] bg-[#1f1f1f]  ">
          <div className="col-span-2 row-span-2 rounded-[25px] [transition:.3s] hover:scale-[1.02]">
          <img className='rounded-[25px] pl-2 bg-cover w-[405px] h-[240px] z-20 transition-opacity scale-[1.03]' src={juego.imagen_de_portada} alt={`${juego.nombre} imagen de portada`} /> 
          <iframe className='rounded-[25px] pl-2 mb-20 bg-cover w-[405px] h-[240px] relative top-[-240px] opacity-0 z-10 transition-opacity scale-[1.035] hover:opacity-100' src={juego.video}></iframe>
          </div>
          <div className={`${montserrat.className} grid place-items-center text-[#fff] text-xl font-bold col-start-3 row-start-2 h-[50px] right-1 relative top-[20px] bg-[#9f86c0a4] rounded-[15px] pb-0 [box-shadow:0px_0px_7px_#9F86C0]`}>
          {juego.nombre} {/* Ejemplo: Mostrar el nombre del juego */}
          </div>
          <div className={`${montserrat.className} grid place-items-center text-[#fff] text-3xl font-bold col-start-3 row-start-2 h-[50px] right-1 relative top-[75px] bg-[#9F86C0a4] rounded-[15px] pb-[2px] [box-shadow:0px_0px_7px_#9F86C0]`}>
          {juego.plataforma.nombre} {/* Ejemplo: Mostrar el nombre de la plataforma */}
          </div>
          <div className={`${barlow.className} grid place-items-center text-[white] text-[35px] col-start-3 row-start-1 border-[2px] border-[solid] border-[#00ff00] bg-[#77ff7750] rounded-[15px] mt-[4.35rem] h-[60px] [box-shadow:0px_0px_7px_green] pb-[4px]`}>
          {juego.precio}€ {/* Ejemplo: Mostrar el precio del juego */}
          </div>
          <div className={`${barlow.className} grid place-items-center text-[white] text-base font-bold col-start-3 row-start-1 h-[60px] border-[2px] border-[solid] border-[#FFF703] bg-[#fffa6770] rounded-[15px] [box-shadow:0px_0px_7px_yellow] pb-[]`}>
          {juego.categoria.nombre} {/* Ejemplo: Mostrar el nombre de la categoria */}
          </div>
          
          </Link>
          <button className='z-20 w-[35.5rem] col-start-1 row-start-2 row-end-3 mt-[8rem] bg-[#3CCBFF] relative top-[10px] left-1 rounded-[15px] h-[55px] [box-shadow:0px_0px_7px_lightblue] grid place-content-center pb-[1px] pr-[10px]"' onClick={() => handleAddToCart(juego)}><img src="/carro-de-la-compra3.png" alt="Icono de carrito" className='w-[50px] h-[50px] '></img></button>
        </section>
      ))}
    </div>
  );
  }