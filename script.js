document.addEventListener('DOMContentLoaded', function() {
    let products = document.querySelector('.products')
  async function fetchProducts(url) {
    try{
    let data = await fetch(url);
    let response = await data.json();
    console.log(response);


    for (let i = 0; i < response.length; i++){
        let description = response[i].description;
    
     products.innerHTML +=`
        <div class="products">
                <img src="${response[i].image}" alt="" class="product--img">
                 <div class="product--content">
                    
                 <h4 class="product--category">${response[i].category}</h4>
                 </div>

        </div>
    `;
    }

}catch(err){
    console.log(err);
}


  };
  fetchProducts('https://fakestoreapi.com/products?limit=8');
});

document.addEventListener('DOMContentLoaded', function() {
    let products = document.querySelector('.category')
  async function fetchProducts(url) {
    try{
    let data = await fetch(url);
    let response = await data.json();
    console.log(response);


    for (let i = 0; i < response.length; i++){
        let description = response[i].description;
    
     products.innerHTML +=`
        <div class="category">
                <img src="${response[i].image}" alt="" class="product--img">
                 <h4 class="product--category">${response[i].category}</h4>
                 </div>

        </div>
    `;
    }

}catch(err){
    console.log(err);
}


  };
  fetchProducts('https://fakestoreapi.com/products/categories');
});