import React from 'react';
import './Review.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'

const ReviewItem = ({ product ,handleRemoveFromCart}) => {
    console.log(product)
    const { img, name, price, quantity ,_id} = product
    return (
        <div className='review-item'>
            <img src={img} alt="img" />
            <div className='review-ifo'>
                <p className='product-title'>{name}</p>
                <p>Price: <span className='orange-text'>${price}</span> </p>
          <p>Order Quantity: <span className='orange-text'>{quantity}</span></p>

            </div>
<button onClick={()=> handleRemoveFromCart(_id)} className='but-delete'><FontAwesomeIcon className='delete-icon' icon={faTrashAlt} /></button>
        </div>
    );
};

export default ReviewItem;