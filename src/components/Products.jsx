import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../context/cart.jsx'
import Cart from './Cart.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Products() {
  const [showModal, setshowModal] = useState(false);
  const [products, setProducts] = useState([])
  const { cartItems, addToCart , removeFromCart} = useContext(CartContext)

  const toggle = () => {
    setshowModal(!showModal);
  };

  async function getProducts() {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()
    setProducts(data.products)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const notifyAddedToCart = (item) => toast.success(`${item.title} added to cart!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: {
      backgroundColor: '#fff',
      color: '#000',
    }
    });

  const notifyRemovedFromCart = (item) => toast.error(`${item.title} removed from cart!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: {
      backgroundColor: '#000',
      color: '#fff',
    }
    });

    const handleRemoveFromCart = (product) => {
      removeFromCart(product);
      notifyRemovedFromCart(product);
    };

  return (
    <div className='flex flex-col justify-center bg-gray-100'>
      <ToastContainer />
      <div className='flex justify-between items-center px-20 py-5'>
        <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Shop</h1>
        {!showModal && <button className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
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
                {
                  !cartItems.find(item => item.id === product.id) ? (
                    <button className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
                      onClick={() => {
                        addToCart(product)
                        notifyAddedToCart(product)
                      }
                      }
                      >
                        Add to cart
                      </button>
                  ) : (
                    <div className="flex gap-4">
                    <button
                      className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                      onClick={() => {
                        addToCart(product)
                      }}
                    >
                      +
                    </button>
                    <p className='text-gray-600'>{cartItems.find(item => item.id === product.id).quantity}</p>
                    <button
                      className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                      onClick={() => {
                        const cartItem = cartItems.find((item) => item.id === product.id);
                        if (cartItem.quantity === 1) {
                          handleRemoveFromCart(product);
                        } else {
                          removeFromCart(product);
                        }
                      }}
                    >
                      -
                    </button>
                  </div>
                  )
                }
              </div>
            </div>
          ))
        }
      </div>
      <Cart showModal={showModal} toggle={toggle} />
    </div>
  )
}
