document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.getElementById('products');
    const cartCount = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.innerHTML = cart.length

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                productCard.innerHTML = `
                    <a href="productDetails.html?id=${product.id}" class="product_link">
                        <img src="${product.image}" alt="${product.title}">
                        <h2>${product.title}</h2>
                        <div class="price-rate">
                            <p>$${product.price}</p>
                            <p>${product.rating.rate}</p>
                        </div>
                    </a>
                    <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
                `;

                productsContainer.appendChild(productCard);
            });

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    addToCart(productId);
                });
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});

function addToCart(productId) {
    fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: 1, // Assuming user ID 1; change as needed
            date: new Date().toISOString(),
            products: [{ productId: productId, quantity: 1 }]
            
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Product added to cart:', data);
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(data.products[0]);
        localStorage.setItem('cart', JSON.stringify(cart))
        // alert('Product added to cart!');

    })
    .catch(error => console.error('Error adding product to cart:', error));
}

// document.addEventListener("DOMContentLoaded", function() {
//     const cartItemsContainer = document.getElementById('cart-items');
//     const cartCount = document.getElementById('cart-count');

//     fetch('https://fakestoreapi.com/carts/1')
//         .then(response => response.json())
//         .then(carts => {
//             const cart = carts.products; // Assuming you're showing the first cart, adjust as necessary
//             cartCount.innerHTML = cart.products.length
//             // console.log(carts.products.length)

//             cart.products.forEach(item => {
//                 fetch(`https://fakestoreapi.com/products/${item.productId}`)
//                     .then(response => response.json())
//                     .then(product => {
//                         const cartItem = document.createElement('div');
//                         cartItem.classList.add('cart-item');
//                         cartItem.dataset.productId = item.productId;

//                         cartItem.innerHTML = `
//                             <div>
//                                 <h2>${product.title}</h2>
//                                 <p>Price: $${product.price}</p>
//                                 <h3>Id: ${product.id}</h3>
//                                 <div class="cart-controls">
//                                     <button class="quantity-btn decrease-btn">-</button>
//                                     <p>Quantity: <span class="quantity">${item.quantity}</span></p>
//                                     <button class="quantity-btn increase-btn">+</button>
//                                 </div>
//                                 <p>Total: $<span class="total">${(item.quantity * product.price).toFixed(2)}</span></p>
//                             </div>
//                             <button class="remove-btn" data-id="${product.id}" >Remove</button>
//                         `;

//                         cartItemsContainer.appendChild(cartItem);

//                         // Quantity buttons functionality
//                         const decreaseBtn = cartItem.querySelector('.decrease-btn');
//                         const increaseBtn = cartItem.querySelector('.increase-btn');
//                         const quantityDisplay = cartItem.querySelector('.quantity');
//                         const totalDisplay = cartItem.querySelector('.total');

//                         decreaseBtn.addEventListener('click', () => {
//                             let quantity = parseInt(quantityDisplay.textContent);
//                             if (quantity > 1) {
//                                 quantity--;
//                                 quantityDisplay.textContent = quantity;
//                                 totalDisplay.textContent = (quantity * product.price).toFixed(2);
//                             }
//                         });

//                         increaseBtn.addEventListener('click', () => {
//                             let quantity = parseInt(quantityDisplay.textContent);
//                             quantity++;
//                             quantityDisplay.textContent = quantity;
//                             totalDisplay.textContent = (quantity * product.price).toFixed(2);
//                         });

//                         // Remove from cart functionality
//                         const removeBtn = cartItem.querySelector('.remove-btn');
//                         removeBtn.addEventListener('click', () => {
//                             const productId = removeBtn.getAttribute('data-id');
//                             cartItem.remove();
//                             // Here you can add code to remove the item from the server-side cart as well.
//                             // Example API call:
//                             // fetch(`https://fakestoreapi.com/carts/remove/${item.productId}`, { method: 'DELETE' })
//                             fetch(`https://fakestoreapi.com/carts/${productId}`,{
//                                 method:"DELETE"
//                             })
//                                 .then(res=>res.json())
//                                 .then(json=>console.log(json))
//                         });
//                     });
//             });
//         })
//         .catch(error => console.error('Error fetching cart items:', error));
// });


