import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';


const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([])
    const [itemPerPage,setItemPerPage] = useState(9)
    const [currentPage,setCurrentPage]  = useState(0)
    const {totalProducts} = useLoaderData()
   
    const totalPages = Math.ceil(totalProducts / itemPerPage)
    const pageNumbers = [...Array(totalPages).keys()]
    
    // const pageNumbers = [];
    // for(let i = 1; i<= totalPages; i++){
    //     pageNumbers.push(i)
    // }
    console.log(totalProducts)
    // useEffect(()=>{
    //     fetch(`http://localhost:5000/products`)
    //     .then(res => res.json())
    //     .then(data => setProducts(data))
    // },[]);

    useEffect(()=>{
       async function fetchData(){
        const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemPerPage}`);
        const data = await response.json();
        setProducts(data)
       }
       fetchData();
    },[currentPage,itemPerPage]);


useEffect(()=>{
    const storeCart = getShoppingCart()
    const ids = Object.keys(storeCart)
 
    fetch(`http://localhost:5000/productsByIds`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    })
    .then(res => res.json())
.then(cartProducts => {
    const savedCart = [];
    // step 1: get id of the addedProduct 
    for(const id in storeCart){
        // step 2: get product form products state by using id 
      const addedProduct  = cartProducts.find(product => product._id === id);
  
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
})

   
},[])

    const handleAddToCart = (product) =>{
        let newCart = [];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exsit update quantity by 1 
      //   3. quantity 
     const exists = cart.find(pd => pd._id === product._id)
      if(!exists){
        product.quantity = 1;
        newCart = [...cart, product]
    }
    else{
        exists.quantity = exists.quantity + 1 ;
        const remaining = cart.filter(pd => pd._id !== product._id);
        newCart = [...remaining,exists];
    }
        setCart(newCart)
        addToDb(product._id)

     }

     const handleClearCart = ()=> {
      setCart([])
        deleteShoppingCart()
    }

    const options = [3,6,9,12,20]

   const handleSelectChange = event =>{
    setItemPerPage(parseInt(event.target.value));
    setCurrentPage(0)
   }

    return (
       <>
        <div className='shop-container'>
        <div className="products-container">
       {
        products.map(product => <Product 
            key={product._id}
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
        {/* pagination */}
        <div className='pagination'>
            <p>Current Pge: {currentPage} and item per page: {itemPerPage}</p>
            {
                pageNumbers.map(number => <button
                className={currentPage === number ? 'selected': ''}
                    onClick={()=> setCurrentPage(number)}
                    key={number} >{number}</button>)
            }
            <select value={itemPerPage} onChange={handleSelectChange}>
                {
                    options.map(option =>(
                        <option key={option} value={option}>
                     {option}
                        </option>
                    ))
                }

            </select>
        </div>
       </>
    );
};

export default Shop;