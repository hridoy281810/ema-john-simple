import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/Shop/shop';
import HomeLayout from './components/Layout/HomeLayout';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import cartProductsLoader from './Loaders/CardProductsLoaders';
import Checkout from './components/Checkout/Checkout';
import SignUp from './components/SignUp/SignUp';
import AuthProvider from './components/providers/AuthProvider';
import Privetroutes from './routes/Privetroutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout></HomeLayout>,
    children: [
      {
path:'/',
element:<Shop></Shop>,
loader: ()=> fetch(`http://localhost:5000/totalProducts`)
      },
      {
path:'order',
element:<Orders></Orders>,
loader: cartProductsLoader
      },
      {
path:'inventory',
element:<Privetroutes><Inventory></Inventory></Privetroutes>
      },
      {
path:'checkout',
element:<Privetroutes><Checkout></Checkout></Privetroutes>
      },
      {
path:'login',
element:<Login></Login>
      },
      {
path:'signup',
element:<SignUp></SignUp>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>,
)
