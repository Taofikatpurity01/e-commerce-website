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
               <div class="product-price-container">
                   <h3 class="product-price"> ${response[i].price}</h3>

               </div>
               </div>

      </div>
  `;
  }

}catch(err){
  console.log(err);
}


};
fetchProducts('https://fakestoreapi.com/products?limit=9');
});

