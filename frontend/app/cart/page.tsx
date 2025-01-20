'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { getCart, updateCartItem, removeFromCart } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

export default function CartPage() {
  const { cart, setCart, updateCartItemQuantity, removeFromCart: removeFromCartStore } = useStore()
  const { toast } = useToast()

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await getCart()
      setCart(response.data.cart)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch cart. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    try {
      await updateCartItem(id, quantity)
      updateCartItemQuantity(id, quantity)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update quantity. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleRemoveItem = async (id: string) => {
    try {
      await removeFromCart(id)
      removeFromCartStore(id)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove item from cart. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your cart is empty.</p>
          <Image
            src="/placeholder.svg"
            alt="Empty Cart"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className="w-1/3">
                      <Image
                        src={item.designLink || "/placeholder.svg"}
                        alt={item.name}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-4">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="btn-hover"
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="btn-hover"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive" onClick={() => handleRemoveItem(item.id)} className="btn-hover">
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$XX.XX</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$X.XX</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>$XX.XX</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full btn-hover">Proceed to Checkout</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

