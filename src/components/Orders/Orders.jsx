import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/reviewItem';
import './Order.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Shop from '../Shop/Shop';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart,setCart] = useState(savedCart);
    const handleRemoveFromCart = (id)=> {
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining)
        removeFromDb(id)
    }
    const handleClearCart = ()=> {
        setCart([])
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
        <div className='review-container'>  
         {
            cart.map(product => <ReviewItem
            key={product.id} product={product}
            handleRemoveFromCart={handleRemoveFromCart}
            ></ReviewItem>)
         }
        
        </div>
        <div className='cart-container'>
            <Cart cart={cart}
            handleClearCart={handleClearCart}></Cart>
            {/* <Shop handleClearCart={handleClearCart}></Shop> */}
        </div>
        </div>
    );
};

export default Orders;