import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'
import './Shop.css'
import { Link } from 'react-router-dom';


const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([])
    useEffect(()=>{
        fetch(`products.json`)
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);



useEffect(()=>{
    const storeCart = getShoppingCart()
    const savedCart = [];
    // step 1: get id of the addedProduct 
    for(const id in storeCart){
        // step 2: get product form products state by using id 
      const addedProduct  = products.find(product => product.id === id);
  
     if(addedProduct){
        // step 3: add quantity 
        const quantity = storeCart[id];
        addedProduct.quantity = quantity;
        // step 4:  add the added Product to save cart 
        savedCart.push(addedProduct);
     }
    
    }
    // step 5: set the cart 
    setCart(savedCart)
},[products])

    const handleAddToCart = (product) =>{
        let newCart = [];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exsit update quantity by 1 
      //   3. quantity 
     const exists = cart.find(pd => pd.id === product.id)
      if(!exists){
        product.quantity = 1;
        newCart = [...cart, product]
    }
    else{
        exists.quantity = exists.quantity + 1 ;
        const remaining = cart.filter(pd => pd.id !== product.id);
        newCart = [...remaining,exists];
    }
        setCart(newCart)
        addToDb(product.id)

     }

     const handleClearCart = ()=> {
      setCart([])
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
        <div className="products-container">
       {
        products.map(product => <Product 
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
            >
            </Product>)
       }
        </div>
        <div className="cart-container">
  <Cart cart={cart}
  handleClearCart={handleClearCart}
  >
    <Link to={'/order'}>

        <button className='btn-proceed'><span>Review Order</span> <FontAwesomeIcon  icon={faArrowRight} /></button>
    </Link>
  </Cart>
        </div>
        </div>
    );
};

export default Shop;