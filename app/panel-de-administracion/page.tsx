'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { users } from '../lib/definitions';
import { fetchUsuarios } from '../lib/data';
import SwaggerUI from "swagger-ui-react"
import 'swagger-ui-react/swagger-ui.css'

const Page = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<users | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsuarios();
        console.log('Usuarios obtenidos:', data); // Agregar este log
        const currentUser = data.find((u: users) => u.email === session?.user?.email);
        console.log('Usuario actual:', currentUser); // Agregar este log
        setUser(currentUser || null);
      } catch (err) {
        console.log(err);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/'; // Redirigir a la pantalla de inicio
  };


  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>No estás autenticado</p>;
  }

  return (
    <>
      {user ? (
        <>
          <header className='h-[50px] w-full flex z-20  bg-gray-950 fixed'>
            <Link href="/"><Image src="/GameShop.png" alt="icono de la web" width={400} height={400} className='w-[100px] h-[80px] relative  top-[-15px]'></Image></Link>
            <h1 className='text-white absolute right-[32px] top-[11px]'>{user.nombre}</h1>
          </header>
    <div className="flex h-screen">
      <nav className="w-[150px] h-[100%] bg-[#edd7fd] p-4 fixed">
        <ul className="space-y-4 mt-12 relative grid place-content-between h-[93%] w-[100%]">
          <li>
            <Link href="/sobre-mi">
              <div className="block p-2 w-[100%] hover:bg-[#A167D8] hover:text-white rounded">Sobre Mi</div>
            </Link>
          </li>
          <li>
            <Link href="#" >
                <button onClick={handleSignOut} className=' w-[120px] text-start p-2 relative hover:bg-[#A167D8] hover:text-white rounded'>Cerrar Sesión</button>
            </Link>
          </li>
        </ul>
      </nav>
      <main className="w-[80%] grid place-content-cente ml-[15%]">
        <h1>Panel de Administración</h1>
        <div id='users'>
        <SwaggerUI url='/swagger/swagger.yaml'/>
        </div>
      </main>
    </div>
        </>
      ) : (
        <p>No se encontró el usuario</p>
      )}
    </>
  );
};

export default Page;