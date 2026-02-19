import { createContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])

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

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQty,
                decreaseQty
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
