import { createContext, useState, useEffect } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart')
        return storedCart ? JSON.parse(storedCart) : []
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item._id === product._id)

            if (existing) {
                return prev.map(item =>
                    item._id === product._id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
            } else {
                return [...prev, { ...product, qty: 1 }]
            }
        })
    }

    const increaseQty = (id) => {
        setCart(prev =>
            prev.map(item =>
                item._id === id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            )
        )
    }

    const decreaseQty = (id) => {
        setCart(prev =>
            prev
                .map(item =>
                    item._id === id
                        ? { ...item, qty: item.qty - 1 }
                        : item
                )
                .filter(item => item.qty > 0)
        )
    }

    const clearCart = () => setCart([])

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQty,
                decreaseQty,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
