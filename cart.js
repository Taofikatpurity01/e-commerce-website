document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');

    fetch('https://fakestoreapi.com/carts/1')
        .then(response => response.json())
        .then(carts => {
            const cart = carts.products; // Assuming you're showing the first cart, adjust as necessary
            const cartLocal = JSON.parse(localStorage.getItem('cart')) || [];
            // cartCount.innerHTML = cart.length
            // console.log(cart)

            cartLocal.forEach(item => {
                fetch(`https://fakestoreapi.com/products/${item.productId}`)
                    .then(response => response.json())
                    .then(product => {
                        const cartItem = document.createElement('div');
                        cartItem.classList.add('cart-item');
                        cartItem.dataset.productId = item.productId;

                        cartItem.innerHTML = `
                            <div>
                                <h2>${product.title}</h2>
                                <p>Price: $${product.price}</p>
                                <div class="cart-controls">
                                    <button class="quantity-btn decrease-btn">-</button>
                                    <p>Quantity: <span class="quantity">${item.quantity}</span></p>
                                    <button class="quantity-btn increase-btn">+</button>
                                </div>
                                <p>Total: $<span class="total">${(item.quantity * product.price).toFixed(2)}</span></p>
                            </div>
                            <button class="remove-btn" data-id="${product.id}" >Remove</button>
                        `;

                        cartItemsContainer.appendChild(cartItem);
                        calculateTotalAmount()

                        // Quantity buttons functionality
                        const decreaseBtn = cartItem.querySelector('.decrease-btn');
                        const increaseBtn = cartItem.querySelector('.increase-btn');
                        const quantityDisplay = cartItem.querySelector('.quantity');
                        const totalDisplay = cartItem.querySelector('.total');

                        decreaseBtn.addEventListener('click', () => {
                            let quantity = parseInt(quantityDisplay.textContent);
                            if (quantity > 1) {
                                quantity--;
                                quantityDisplay.textContent = quantity;
                                totalDisplay.textContent = (quantity * product.price).toFixed(2);
                                updateCart(item.productId, quantity);
                            }
                        });

                        increaseBtn.addEventListener('click', () => {
                            let quantity = parseInt(quantityDisplay.textContent);
                            quantity++;
                            quantityDisplay.textContent = quantity;
                            totalDisplay.textContent = (quantity * product.price).toFixed(2);
                            updateCart(item.productId, quantity);
                        });

                        // Remove from cart functionality
                        const removeBtn = cartItem.querySelector('.remove-btn');
                        removeBtn.addEventListener('click', () => {
                            const productId = removeBtn.getAttribute('data-id');
                            cartItem.remove();
                            removeFromCart(productId);
                        });
                    });
            });
        })
        .catch(error => console.error('Error fetching cart items:', error));
});


function updateCart(productId, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    calculateTotalAmount()
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    calculateTotalAmount()
    // window.location.reload()
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length
    document.getElementById('cart-count').textContent = cartCount;
}

const totalAmountElement = document.querySelector('.total_amount')

function calculateTotalAmount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = 0;

    cart.forEach(item => {
        fetch(`https://fakestoreapi.com/products/${item.productId}`)
            .then(response => response.json())
            .then(product => {
                totalAmount += item.quantity * product.price;
                // const totalDiv = document.createElement('div');
                // totalDiv.id = 'total-amount';
                totalAmountElement.textContent = `${totalAmount.toFixed(2)}`;
                
                // Remove the old total amount display before appending the new one
                const existingTotalDiv = document.getElementById('total-amount');
                if (existingTotalDiv) {
                    existingTotalDiv.remove();
                }
                
                cartItemsContainer.appendChild(totalDiv);
            });
    });
}

