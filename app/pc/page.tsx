"use client";

import { useEffect, useState } from "react";
import { Header } from "../ui/header";
import { Footer } from "../ui/footer";
import { Juego } from "@/app/lib/definitions";
import Link from "next/link";

export default function PCPage() {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [plataformas, setPlataformas] = useState<string[]>([]);
  const [currentPlatform, setCurrentPlatform] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 5 filas x 3 columnas

  useEffect(() => {
    const fetchData = async () => {
      const juegosRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/juegos`);
      const plataformasRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plataformas`);
      const juegosData = await juegosRes.json();
      const plataformasData = await plataformasRes.json();

      // Filtrar juegos y plataformas para PC
      const juegosPC = juegosData.filter((juego: Juego) => juego.dispositivo === "PC");
      const plataformasPC = plataformasData
        .filter((plataforma: any) => plataforma.dispositivos === "PC")
        .map((plataforma: any) => plataforma.nombre);

      setJuegos(juegosPC);
      setPlataformas(plataformasPC);
    };

    fetchData();
  }, []);

  // Filtrar juegos por plataforma seleccionada
  const filteredJuegos = currentPlatform
    ? juegos.filter((juego) => juego.plataforma.nombre === currentPlatform)
    : juegos;

  // Calcular los juegos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJuegos = filteredJuegos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredJuegos.length / itemsPerPage);

  return (
    <div>
      <Header />
      <main className="bg-[#0D0D0D] min-h-screen text-[#fff]">
        <div className="container mx-auto px-4 py-8">
          <nav className="grid place-content-center [transition:all_1.5s]">
  <h1 className="text-2xl font-bold mb-4 grid place-content-center">Juegos de PC</h1>
  <ul
    className="
      flex flex-wrap justify-center gap-2
      bg-[#ffffff36] p-4 mb-12 rounded-lg shadow-md
      w-full max-w-[500px] mx-auto
      tablet:gap-6 [transition:all_0.3s]
    "
  >
    {plataformas.map((plataforma, index) => (
      <li key={index}>
        <button
          onClick={() => {
            setCurrentPlatform(plataforma === currentPlatform ? null : plataforma);
            setCurrentPage(1); // Reiniciar a la primera página
          }}
          className={`${
            plataforma === currentPlatform
              ? "text-purple-400 font-medium transition-all"
              : "text-white font-normal transition-all"
          }`}
        >
          {plataforma}
        </button>
      </li>
    ))}
  </ul>
</nav>
          <section
            className="
              grid 
              grid-cols-1 
              min-[480px]:grid-cols-[220px_220px]
              min-[480px]:relative
              min-[760px]:right-0
              min-[480px]:right-[30%]
              [transition:all_0.5s]
              tablet:grid-cols-3
              desktop:grid-cols-4
              gap-2 
              w-full 
              
              
            "
          >
            {currentJuegos.map((juego) => (
              <article
                key={juego.id}
                className="
                  rounded-lg 
                  [transition:all_0.5s]
                  overflow-hidden 
                  mb-4 
                  w-full 
                  h-[180px] 
                  min-[480px]:h-[170px] 
                  tablet:h-[200px] 
                  tablet:w-[230px]
                  flex flex-col
                "
              >
                <Link href={`${juego.link[0]}`}>
                  <img
                    src={juego.imagen_de_portada[0]}
                    alt={juego.nombre}
                    className="w-full h-[140px] object-cover rounded-t-md"
                  />
                </Link>
                <div className="flex justify-between items-center px-2 py-1">
                  <h3 className="text-base font-normal truncate">{juego.nombre}</h3>
                  <p className="text-base font-semibold">{juego.precio}€</p>
                </div>
              </article>
            ))}
          </section>
          <div className="pagination grid place-content-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 ${
                  currentPage === index + 1 ? "bg-purple-600 rounded text-white" : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}