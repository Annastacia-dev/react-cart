# Implementing Cart Functionality in React JS

## Introduction
In this tutorial, we will be implementing a cart functionality in React JS. We will be using React Hooks to manage the state of the cart. We will be using the Context API to pass the cart state to the components that need it. We will be using the Local Storage API to persist the cart state in the browser.We will also be using Tailwind CSS to style our application.

## Prerequisites
To follow along with this tutorial, you will need to have the following installed on your machine:
- Node.js
- npm

## Getting Started
To get started, we will create a new React application using vite. To do this, run the following command in your terminal:

```bash
npm create vite@latest
```

You will be prompted to enter the name of your project. Enter the name of your project and press enter. In this tutorial, we will be naming our project `react-cart`. You will also be prompted to select a framework. Select `React` and press enter. You will also be prompted to select a variant. Select `Javascript` and press enter. This will create a new React application in a folder named `react-cart`. To start the application, navigate to the `react-cart` folder `cd react-card` and run the following command in your terminal:

```bash
npm run dev
```

This will start the application in development mode. You can now open the application in your browser by navigating to `http://localhost:5173`.

## Installing Tailwind CSS
To install Tailwind CSS, run the following command in your terminal:

```bash
npm install -D tailwindcss postcss autoprefixer
```
```bash
npx tailwindcss init -p
```

This will create a `tailwind.config.js` file in the root of your project. Open the `tailwind.config.js` file and add the following code to it:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Next, let's clean up the `index.css` file in the `src` folder. Open the `index.css` file and remove all the code in it. Next, add the following code to the `index.css` file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Let's also clear up the `App.jsx` file in the `src` folder so that it looks like this:

```jsx
function App() {
  return (
    <>
    </>
  )
}
```
You can also delete the `App.css` file in the `src` folder.

## Creating the Products Component
Let's create a new folder named `components` in the `src` folder. Inside the `components` folder, create a new file named `Products.jsx`.
We will be using the [Dummy Json](https://dummyjson.com/docs/products) to get the products that we will be displaying in our application. To fetch the products, we will be using the `useEffect` hook. We will also be using the `useState` hook to store the products in the state. Let's import the `useEffect` and `useState` hooks from the `react` package. Add the following code to the `Products.jsx` file:

```jsx
import { useEffect, useState } from "react";
```

Create a new function named `Products` and export it. Add the following code to the `Products.jsx` file:

```jsx
export default function Products() {
  return (
    <>
    </>
  )
}
```


Let's initialize the state of the products. Add the following code to the `Products.jsx` file:

```jsx
const [products, setProducts] = useState([]);
```

Next, let's fetch the products.We will use an `async` function to fetch the products. Add the following code to the `Products.jsx` file:


```jsx
async function getProducts() {
    const response = await fetch('https://dummyjson.com/products')  // fetch the products
    const data = await response.json() // convert the response to json
    setProducts(data.products) // set the products in the state to the products we fetched
  }
```

Next, let's call the `getProducts` function in the `useEffect` hook. Add the following code to the `Products.jsx` file:

```jsx
useEffect(() => {
    getProducts()
  }, [])
```

Next, let's display the products in the `Products` component. In the return statement of the `Products` component, add the following code:

```jsx
<div className='flex flex-col justify-center bg-gray-100'>
  <div className='flex justify-between items-center px-20 py-5'>
    <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Shop</h1>
    <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Cart</h1>
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
            <button className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'>Add to cart</button>
          </div>
        </div>
      ))
    }
  </div>
</div>
```
This will display a card for each product. Each card will display the product image, title, description, and price. Each card will also have a button that will be used to add the product to the cart.

Navigate to `App.jsx` and import the `Products` component. Add the following code to the `App.jsx` file:

```jsx
import Products from './components/Products'
```

Next, let's display the `Products` component in the `App` component. In the return statement of the `App` component, add the following code:

```jsx
<Products />
```

Your `App.jsx` file should now look like this:

```jsx
import Products from './components/Products'

function App() {
  return (
    <Products />
  )
}

export default App
```

Your `Products.jsx` file should now look like this:

```jsx
import { useState, useEffect } from 'react'


export default function Products() {
  const [products, setProducts] = useState([])

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
        <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Cart</h1>
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
                <button className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'>Add to cart</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
```

Open the application in your browser and you should see the products displayed.
![Products]('./public/cart.png')













