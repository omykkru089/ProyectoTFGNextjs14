"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useSession } from "next-auth/react"
import { useNotification } from "../app/ui/notification"

type CartItem = {
  id: number
  nombre: string
  precio: number
  cantidad: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  updateQuantity: (id: number, quantity: number) => void
  removeItem: (id: number) => void
  saveCart: () => Promise<void>
  loadCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { readonly children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { data: session } = useSession()
  const { showNotification } = useNotification()

  useEffect(() => {
    if (session) {
      loadCart()
    }
  }, [session])

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prevItems, { ...newItem, cantidad: 1 }]
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, cantidad: Math.max(0, quantity) } : item))
    )
  }

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const saveCart = async () => {
    if (!session?.user?.id) {
      showNotification("Debes iniciar sesión para guardar el carrito", "error")
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify({
          userId: session.user.id,
          fecha_creacion: new Date(),
          estado: 'pendiente',
        }),
      })
      console.log(response, "Fetch hacia pedidos en saveCart conseguido")

      if (!response.ok) {
        throw new Error('Error al crear el pedido')
      }

      const pedido = await response.json()

      for (const item of items) {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/carrito`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.token}`,
          },
          body: JSON.stringify({
            id: Date.now(), // Generamos un ID único
            pedido: pedido.id,
            juegoId: item.id,
            cantidad: item.cantidad,
          }),
        })
      }
      console.log("Items guardados en carrito")
      if (!items) {
        throw new Error('Error al crear el pedido')
      }

      showNotification("Carrito guardado correctamente", "success")
      setItems([]) // Limpiamos el carrito local después de guardarlo
    } catch (error) {
      console.error('Error al guardar el carrito:', error)
      showNotification("Error al guardar el carrito", "error")
    }
  }

  const loadCart = async () => {
    if (!session?.user?.id) {
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pedidos/${session.user.id}`,{
        headers: {
          Authorization: `Bearer ${session.user.token}`,
      }
    })
      console.log(response, "Fetch hacia pedidos en loadCart conseguido")
      if (!response.ok) {
        throw new Error('Error al cargar los pedidos')
      }

      const pedidos = await response.json()
      const lastPedido = pedidos[pedidos.length - 1] // Obtenemos el último pedido

      if (lastPedido) {
        const carritoResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/carrito/${lastPedido.id}`,{
          headers: {
            Authorization: `Bearer ${session.user.token}`,
        }
      })
        console.log(carritoResponse)
        if (carritoResponse.ok) {
          const carritoItems = await carritoResponse.json()
          console.log(carritoItems, "Items del carrito")
          setItems(carritoItems.map((item: any) => ({
            id: item.juego.id,
            nombre: item.juego.nombre,
            precio: item.juego.precio,
            cantidad: item.cantidad,
          })))
        }
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error)
      showNotification("Error al cargar el carrito", "error")
    }
  }

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, saveCart, loadCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}