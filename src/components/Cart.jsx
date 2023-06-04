import PropTypes from 'prop-types'
import { useContext } from 'react'
import { CartContext } from '../context/cart.jsx'

export default function Cart ({isOpen, toggle}) {

  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)


  return (
    isOpen && (
      <div className="flex-col flex items-center fixed inset-0 left-1/4 bg-white dark:bg-black gap-8  p-10  text-black dark:text-white font-normal uppercase text-sm">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="absolute right-16 top-10">
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={toggle}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div className="flex justify-between items-center" key={item.id}>
              <div className="flex gap-4">
                <img src={item.thumbnail} alt={item.title} className="rounded-md h-24" />
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold">{item.title}</h1>
                  <p className="text-gray-600">{item.price}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    addToCart(item)
                  }}
                >
                  +
                </button>
                <p>{item.quantity}</p>
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    removeFromCart(item)
                  }}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
        {
          cartItems.length > 0 ? (
            <div className="flex flex-col justify-between items-center">
          <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={() => {
              clearCart()
            }}
          >
            Clear cart
          </button>
        </div>
          ) : (
            <h1 className="text-lg font-bold">Your cart is empty</h1>
          )
        }
      </div>
    )
  )
}

Cart.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
}

