import React from 'react';
import './Cart.css'

const Cart = ({cart}) => {
    // const cart = props; option 1
    // const {cart} = props; option 2

console.log(cart)

let total = 0;
let shipping = 0
let quantity = 0 ;
for (const product of cart){
    // 1. quantity 
    // if(product.quantity === 0 ){
    //     product.quantity = 1 ;
    // }

    // // 2. quantity 
    // product.quantity = product.quantity || 1;
    
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping
    quantity = quantity + product.quantity
}
const tex = total*7/100;
const GrandTotal = total - tex;
// localStorage.setItem(cart)
    return (
        <div className='cart'>
        <h4>Order Summary</h4>
        <p>selected Item: {quantity}</p> 
        <p>Total Price: ${total} </p>
        <p>Total Shipping: {shipping} </p>
        <p>Tax: ${tex.toFixed(2)} </p>
        <h6>Grand Total: ${GrandTotal.toFixed(2)}  </h6>
        </div>
    );
};

export default Cart;