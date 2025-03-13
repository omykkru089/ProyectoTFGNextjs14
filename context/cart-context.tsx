"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useSession } from "next-auth/react"
import { useNotification } from "../app/ui/notification"
import Cookies from "js-cookie"


type CartItem = {
  id: number
  juego?: {
    id: number
  }
  nombre?: string
  precio?: number
  cantidad: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  updateQuantity: (id: number, quantity: number) => void
  removeItem: () => void
  saveCart: () => Promise<void>
  loadCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { readonly children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [pedidoId, setPedidoId] = useState<number | null>(null)
  const { data: session } = useSession()
  const { showNotification } = useNotification()

  useEffect(() => {
    loadCart()
  }, [])

  const saveItemsToCookies = (items: CartItem[]) => {
    Cookies.set("cart", JSON.stringify(items), { expires: 7 }) // Guardar en cookies por 7 días
  }

  const loadItemsFromCookies = (): CartItem[] => {
    const cookieItems = Cookies.get("cart")
    return cookieItems ? JSON.parse(cookieItems) : []
  }

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id)
      let updatedItems
      if (existingItem) {
        updatedItems = prevItems.map((item) =>
          item.id === newItem.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      } else {
        updatedItems = [...prevItems, { ...newItem, cantidad: 1 }]
      }
      saveItemsToCookies(updatedItems)
      return updatedItems
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => (item.id === id ? { ...item, cantidad: Math.max(1, quantity) } : item))
      saveItemsToCookies(updatedItems)
      return updatedItems
    })
  }

  const removeItem = async () => {
    if (!session?.user?.id) {
      showNotification("Debes iniciar sesión para eliminar un pedido", "error")
      return
    }

    if (!pedidoId) {
      showNotification("No hay pedido para eliminar", "error")
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pedidos/${pedidoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.user.token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Error al eliminar el pedido')
      }

      setItems([])
      setPedidoId(null)
      Cookies.remove("cart")
      showNotification("Pedido eliminado correctamente", "success")
    } catch (error) {
      console.error('Error al eliminar el pedido:', error)
      showNotification("Error al eliminar el pedido", "error")
    }
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
      setPedidoId(pedido.id)

      for (const item of items) {
        // Verificar si el ítem ya existe en la base de datos
        const existingItemResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/carrito?pedidoId=${pedido.id}&juegoId=${item.juego?.id}`, {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          }
        })

        if (existingItemResponse.ok) {
          const existingItem = await existingItemResponse.json()
          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/carrito/${existingItem.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.user.token}`,
            },
            body: JSON.stringify({
              cantidad: item.cantidad,
            }),
          })
        } else {
          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/carrito`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.user.token}`,
            },
            body: JSON.stringify({
              pedido: pedido.id,
              juegoId: item.id,
              cantidad: item.cantidad,
            }),
          })
        }
      }
      console.log("Items guardados en carrito")
      if (!items) {
        throw new Error('Error al crear el pedido')
      }

      showNotification("Carrito guardado correctamente", "success")
      setItems([]) // Limpiamos el carrito local después de guardarlo
      Cookies.remove("cart") // Limpiamos las cookies después de guardar el carrito
    } catch (error) {
      console.error('Error al guardar el carrito:', error)
      showNotification("Error al guardar el carrito", "error")
    }
  }

  const loadCart = async () => {
    const cookieItems = loadItemsFromCookies()
    setItems(cookieItems)

    if (!session?.user?.id) {
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pedidos/${session.user.id}`, {
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
        setPedidoId(lastPedido.id)

        const carritoResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/carrito/${lastPedido.id}`, {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          }
        })
        console.log(carritoResponse)
        if (carritoResponse.ok) {
          const carritoItems = await carritoResponse.json()
          console.log(carritoItems, "Items del carrito")

          // Combinar ítems de las cookies con los ítems de la base de datos
          const combinedItems = [...carritoItems, ...cookieItems].reduce((acc, item) => {
            const existingItem = acc.find((i) => i.id === item.juego?.id)
            if (existingItem) {
              existingItem.cantidad += item.cantidad
            } else {
              acc.push({
                id: item.juego?.id,
                nombre: item.juego?.nombre,
                precio: item.juego?.precio,
                cantidad: item.cantidad,
              })
            }
            return acc
          }, [])

          setItems(combinedItems)
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