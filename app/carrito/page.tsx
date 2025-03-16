"use client"

import { useCart } from "../../context/cart-context"
import { Header } from "../ui/header"
import { Button } from "../ui/components/button"
import { useSession } from "next-auth/react"
import { useNotification } from "../ui/notification"
import { useEffect } from "react"

export default function CarritoPage() {
    const { items, updateQuantity, removeItem, saveCart, loadCart } = useCart()
    const { data: session } = useSession()
    const { showNotification } = useNotification()
  
    useEffect(() => {
      if (session) {
        loadCart()
      }
    }, [session])
  
    const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  
    const handleSaveCart = async () => {
      if (!session) {
        showNotification("Debes iniciar sesión para guardar el carrito", "error")
        return
      }
      await saveCart()
    }
  
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>
          {items.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <>
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center justify-between border-b py-4">
                  <div>
                    <h2 className="text-xl">{item.nombre}</h2>
                    <p className="text-gray-600">{item.precio}€</p>
                  </div>
                  <div className="flex items-center">
                    <Button onClick={() => updateQuantity(item.id, item.cantidad - 1)}>-</Button>
                    <span className="mx-2">{item.cantidad}</span>
                    <Button onClick={() => updateQuantity(item.id, item.cantidad + 1)}>+</Button>
                    <Button variant="destructive" className="ml-4" onClick={() => removeItem()}>
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-8">
                <p className="text-2xl font-bold">Total: {total.toFixed(2)}€</p>
                <Button className="mt-4" onClick={handleSaveCart}>
                  Guardar Carrito
                </Button>
              </div>
            </>
          )}
        </main>
      </>
    )
}