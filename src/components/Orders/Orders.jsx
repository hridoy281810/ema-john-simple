import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/reviewItem';
import './Order.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);
    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product._id !== id);
        console.log('asjdopifjasdf',remaining)
        setCart(remaining)
        removeFromDb(id)
    }
    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItem
                        key={product._id} product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                    ></ReviewItem>)
                }

            </div>

            <div className='cart-container'>

                <Cart cart={cart}
                    handleClearCart={handleClearCart}>
                    <Link to={'/checkout'}>
                        <button className='btn-proceed'><span>Proceed Checkout </span><FontAwesomeIcon className='proceed-icon' icon={faCreditCard} /></button>
                    </Link>
                </Cart>
            </div>

         

        </div>
    );
};

export default Orders;