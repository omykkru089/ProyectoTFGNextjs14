export type juego = {
  id:number;
  nombre: string;
  descripcion: string;
  categoria?: string;
  plataforma?: string;
  precio: string;
  fecha_de_lanzamiento?: string;
  desarrollador: string;
  editorial: string;
  clasificacion_por_edad: string;
  idiomas : string;
  imagen_de_portada?: string;
  requisitos_del_sistema: string;
  popularidad: string;
  link: string;
  carrito: string
  };
  

  export type plataforma = {
    id: number;
    nombre: string;
    descripcion: string;
    fundador: string;
    anio_de_lanzamiento: string;
    tipos_de_medios_compatibles: string;
    };
    
    export type categoria = {
    id: number;
    nombre: string;
    descripcion: string;
      };

    export type desarrollador = {
      id: number;
      nombre: string;
      descripcion: string;
      pais_origen: string;
      anio_fundacion: string;
      sitio_web: string;
      };
      
      export type editorial = {
    id: number;
    nombre: string;
    descripcion: string;
    pais_origen: string;
    anio_fundacion: string;
    sitio_web: string;
        };
        