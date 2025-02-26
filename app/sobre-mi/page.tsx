'use client'

import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { users } from '../lib/definitions';
import { fetchUsuarios } from '../lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { DocumentDuplicateIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const SobreMiPage = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<users | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsuarios();
        const currentUser = data.find((u: users) => u.email === session?.user?.email);
        setUser(currentUser || null);
      } catch (err) {
        console.log(err);
      }
    };
    if (session) {
      fetchData();
    }
  }, [session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>No estás autenticado</p>;
  }

  

  return (
    <div  className='h-screen w-full'>
      {user ? (
        <>
        <header className='h-[50px] w-full flex  bg-gray-950'>
        <Link href="/"><Image src="/GameShop.png" alt="icono de la web" width={400} height={400} className='w-[110px] h-[90px] relative  top-[-20px]'></Image></Link>
            <h1 className='text-white absolute right-[32px] top-[1.5%]'>{user.nombre}</h1>
        </header>
        <main className='flex h-[93.2%] w-full'>
        <nav className=' w-[150px] h-[98.6%] bg-[#ECE4F9] pt-[10px] grid'>
            <Link href="/" className='flex self-start font-semibold  hover:bg-[#edd7fd] hover:text-[#A167D8] md:flex-none md:justify-start md:p-2 md:px-3'><HomeIcon className='h-5 w-5 mr-1'/>Home</Link>
            <Link href="#" className='flex self-end text-sm font-semibold  hover:bg-[#edd7fd] hover:text-[#A167D8] md:flex-none md:justify-start md:p-2 md:px-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" /></svg>
                <button onClick={() => signOut()} className='w-full'>Cerrar Sesión</button>
            </Link> 
        </nav>
        <section className='bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black w-full flex flex-col justify-center items-center'>
            <h2 className=' mb-4 text-[#DDBBF7] border-b-2 border-[#c499ff]'>Cambia la Informacion de tú cuenta aqui!👇</h2>
            <form action="" className='bg-[#ffffff21] w-[600px] h-[380px] rounded-3xl flex flex-col justify-center items-center backdrop-filter backdrop-blur-2xl'>
              <div className='flex flex-col p-4  w-[500px] mb-[-20px]'>
                <label htmlFor="nombre" className='text-[#c68cfc] font-bold '>Nombre</label>
                <div className='w-full h-[1.5px] bg-[#c499ff] mb-[10px]'></div>
                <input type="text" id="nombre" name="nombre" placeholder={user.nombre} className='bg-transparent border-2 rounded-xl border-[#cacaca] placeholder:text-white'/>
              </div>
              <div className='flex flex-col p-4  w-[500px] mb-[-20px]'>
                <label htmlFor="email" className='text-[#c68cfc] font-bold '>Email</label>
                <div className='w-full h-[1.5px] bg-[#c499ff] mb-[10px]'></div>
                <input type="email" id="email" name="email" placeholder={user.email} className='bg-transparent border-2 rounded-xl border-[#cacaca] placeholder:text-white'/>
              </div>
              <div className='flex flex-col p-4  w-[500px]'>
                <label htmlFor="password" className='text-[#c68cfc] font-bold '>Contraseña</label>
                <div className='w-full h-[1.6px] bg-[#c499ff] mb-[10px]'></div>
                <input type="password" id="password" name="password" placeholder="Contraseña" className='bg-transparent border-2 rounded-xl border-[#cacaca] placeholder:text-white'/>
              </div>
              <button type="submit" className='w-[40%] bg-[#DDBBF7] rounded-md flex justify-center items-center p-2 hover:bg-[#f4e5ff] transition-[1s] relative'>Enviar</button>
            </form>
            <script>
            
                  document.querySelector('form')
                    .addEventListener('submit', e => {
                      e.preventDefault()
                      const data = Object.fromEntries(
                        new FormData(e.target)
                      )
                      alert(JSON.stringify(data))
                      })
                
            </script>
        </section>
        </main>
        </>
      ) : (
        <p>No se encontró el usuario</p>
      )}
    </div>
  );
}

export default SobreMiPage;