import React from 'react';
import './Cart.css'

const Cart = ({cart}) => {
    // const cart = props; option 1
    // const {cart} = props; option 2

console.log(cart)

let total = 0;
let shipping = 0
for (const product of cart){
    total = total + product.price;
    shipping = shipping + product.shipping
}
const tex = total*7/100;
const GrandTotal = total - tex;
    return (
        <div className='cart'>
        <h4>Order Summary</h4>
        <p>selected Item: {cart.length}</p> 
        <p>Total Price: ${total} </p>
        <p>Total Shipping: {shipping} </p>
        <p>Tax: ${tex.toFixed(2)} </p>
        <h6>Grand Total: ${GrandTotal.toFixed(2)}  </h6>
        </div>
    );
};

export default Cart;