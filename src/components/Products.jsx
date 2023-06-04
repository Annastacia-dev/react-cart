import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../context/cart.jsx'
import Cart from './Cart.jsx'


export default function Products() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([])
  const { cartItems, addToCart } = useContext(CartContext)

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  async function getProducts() {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()
    setProducts(data.products)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='flex flex-col justify-center bg-gray-100'>
      <div className='flex justify-between items-center px-20 py-5'>
        <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Shop</h1>
        {!isOpen && <button className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
          onClick={toggle}
        >Cart ({cartItems.length})</button>}
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10'>
        {
          products.map(product => (
            <div key={product.id} className='bg-white shadow-md rounded-lg px-10 py-10'>
              <img src={product.thumbnail} alt={product.title} className='rounded-md h-48' />
              <div className='mt-4'>
                <h1 className='text-lg uppercase font-bold'>{product.title}</h1>
                <p className='mt-2 text-gray-600 text-sm'>{product.description.slice(0, 40)}...</p>
                <p className='mt-2 text-gray-600'>${product.price}</p>
              </div>
              <div className='mt-6 flex justify-between items-center'>
                <button className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
                  onClick={() => {
                    addToCart(product)
                  }
                  }
                >Add to cart</button>
              </div>
            </div>
          ))
        }
      </div>
      <Cart isOpen={isOpen} toggle={toggle} />
    </div>
  )
}
