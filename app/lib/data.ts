import { useSession } from "next-auth/react"



export async function fetchJuego() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/juegos`, {
            cache:"no-store",
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            }
        });
        if (!res.ok) {
            throw new Error("Error al obtener los datos");
          }
        
          const data = await res.json();
          return data; // Asegúrate de devolver los datos
    } 
  
  