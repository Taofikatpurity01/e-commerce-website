document.addEventListener('DOMContentLoaded', function() {
    let products = document.querySelector('.products')
  async function fetchProducts(url) {
    try{
    let data = await fetch(url);
    let response = await data.json();
    console.log(response);


    for (let i = 0; i < response.length; i++){
        let description = response[i].description;
        let title = response[i].title;
        // let newproduct = document.createElement
    
     products.innerHTML +=`
        <div class="product">
                <img src="${response[i].image}" alt="" class="product--img">
                 <div class="product--content">
                    
                 <h2 class="product--title"> ${title.length > 40 ? title.substring(0, 40).concat(' ...more') : title }</h2>
                 <h4 class="product--category">${response[i].category}</h4>
                 <p class="product--description"> ${description.length > 70 ? description.substring(0, 70).concat(' ...more') : description }</p>
                 <div class="product-price-container">
                     <h3 class="product-price"> ${response[i].price}</h3>
                     <a href="#!" data-productId=" ${response[i].id}" class="add-to-cart">Add To Cart</a>
                 </div>
                 </div>

        </div>
    `;
    }

}catch(err){
    console.log(err);
}


  };
  fetchProducts('https://fakestoreapi.com/products');
});

// const addToCart = document.querySelector(".add-to-cart");
// const cartLogo = document.querySelector('#cart-count');
// const urCart = document.querySelector(".ur--cart");
// const list = document.querySelector(".products");
// const listCard = document.querySelector(".product");
// const total = document.querySelector("#total");

// function addToCart(key){

// };
// let iconCart = document.querySelector('.shop-cart');
// let body = document.querySelector('body');
// let btn = document.querySelector('.add-to-cart')

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        let productId = this.getAttribute('data-product-id');
        addToCart(productId);
    });

});
products.addEventListener('click', (event)=>{
    let positionClick = event.target;
    if(positionClick.products.contains('add-to-cart')){
        alert('1')
    }
})
