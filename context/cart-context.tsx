"use client";

import { createContext, useContext, useState } from "react";
import { useNotification } from "../app/ui/notification";
import { useSession } from "next-auth/react";

type CartItem = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  dispositivo: string; // Agregar el tipo de dispositivo
  plataforma: string; // Agregar el tipo de plataforma
};

type CartContextType = {
  items: CartItem[];
  addToCart: (juegoId: number, cantidad: number) => Promise<void>;
  removeFromCart: (carritoId: number) => Promise<void>;
  updateQuantity: (carritoId: number, cantidad: number) => Promise<void>;
  fetchCart: () => Promise<void>; // Agregar fetchCart al tipo
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { showNotification } = useNotification();
  const { data: session } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);

  // Definir la función fetchCart
  const fetchCart = async () => {
    if (!session) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/carrito`, {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 404) {
          setItems([]);
          return;
        }
        throw new Error("Error al cargar el carrito");
      }

      const data = await res.json();

      // Procesar los datos para incluir los campos del juego
      const processedItems = data.map((item: any) => ({
        id: item.id,
        nombre: item.juego.nombre,
        precio: item.juego.precio,
        cantidad: item.cantidad,
        plataforma: item.juego.plataforma.nombre, // Incluir la plataforma
        dispositivo: item.juego.dispositivo, // Incluir el dispositivo
      }));

      setItems(processedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (juegoId: number, cantidad: number) => {
    if (!session) {
      showNotification("Tiene que iniciar sesión para poder agregar juegos al carrito", "error");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/carrito`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({ juegoId, cantidad }),
      });

      if (!res.ok) {
        throw new Error("Error al agregar el juego al carrito");
      }

      const newItem = await res.json();
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === newItem.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === newItem.id
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item
          );
        }
        return [...prevItems, newItem];
      });

      showNotification("Juego añadido correctamente", "success");
    } catch (error) {
      console.error(error);
      showNotification("No se pudo agregar el juego al carrito", "error");
    }
  };

  const updateQuantity = async (carritoId: number, cantidad: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/carrito/${carritoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({ cantidad }),
      });
  
      if (!res.ok) {
        throw new Error("Error al actualizar la cantidad del producto");
      }
  
      const updatedItem = await res.json();
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === carritoId ? { ...item, cantidad: updatedItem.cantidad } : item
        )
      );
      showNotification("Juego modificado correctamente", "success");
    } catch (error) {
      console.error(error);
      showNotification("No se pudo actualizar la cantidad del producto", "error");
    }
  };

  const removeFromCart = async (carritoId: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/carrito/${carritoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Error al eliminar el producto del carrito");
      }

      setItems((prevItems) => prevItems.filter((item) => item.id !== carritoId));
      showNotification("Juego eliminado correctamente", "success");
    } catch (error) {
      console.error(error);
      showNotification("No se pudo eliminar el producto del carrito", "error");
    }
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};