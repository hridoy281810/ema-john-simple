import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const storeCart = getShoppingCart();
  const ids = Object.keys(storeCart)
    console.log(ids)

    const loaderProducts = await fetch(`http://localhost:5000/productsByIds`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    });
    const products = await loaderProducts.json();
    console.log('products by ids',products)

  
    const saveCart = [];
for(const id in storeCart){
    const addedProduct = products.find(pd => pd._id === id);
    if(addedProduct){
const quantity = storeCart[id];
addedProduct.quantity = quantity;
saveCart.push(addedProduct);

    }
}
// if you need to send tow thinks
// return  [products,saveCart]
// another option 
// return {products,saveCart}

    return saveCart;

}
export default cartProductsLoader;