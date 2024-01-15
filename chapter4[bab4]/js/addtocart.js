		
		function updateQuantity(quantityId, change) {
            var quantityElement = document.getElementById(quantityId);
            var currentQuantity = parseInt(quantityElement.innerText);
            var newQuantity = currentQuantity + change;
    
            // Ensure the quantity doesn't go below 1
            newQuantity = Math.max(1, newQuantity);
    
            // Update the quantity in the span element
            quantityElement.innerText = newQuantity;
        }
    
        function buyNow(productName, hargaId, imageSrc, quantityId) {
            // Get the quantity from the span element
            var quantity = parseInt(document.getElementById(quantityId).innerText);
    
            // Get the price from the hargaId span element
            var price = parseInt(document.getElementById(hargaId).innerText);
    
            // Calculate the total price for the product
            var totalPrice = quantity * price;
    
            // Check if the product is already in the cart
            var existingCartItem = findCartItem(productName);
    
            if (existingCartItem) {
                // Product is already in the cart, update the quantity
                existingCartItem.quantity += quantity;
                existingCartItem.element.querySelector('.cart-price span:first-child').innerText = existingCartItem.quantity + ' x';
                
            } else {
                // Product is not in the cart, create a new cart item
                var cartItemHtml = `
                    <div class="media">
                        <figure class="media-left">
                            <p class="image">
                                <img src="${imageSrc}" alt="image">
                            </p>
                        </figure>
                        <div class="media-content">
                            <p class="media-heading"><a href="#!">${productName}</a></p>
                            <div class="cart-price">
                                <span>${quantity} x</span>
                                <span>${price.toLocaleString()}</span>
                            </div>
                        </div>
                        <div class="media-right">
                            <a href="#!" class="delete" onclick="removeFromCart(this)" ></a>
                        </div>
                    </div>
                `;
    
                // Insert the new cart item at the beginning of the cart dropdown
                var cartDropdown = document.getElementById('cart-dropdown');
                cartDropdown.insertAdjacentHTML('afterbegin', cartItemHtml);
                 // Store the product details in local storage
     var cartItem = {
            productName: productName,
            quantity: quantity,
            price: price,
            totalPrice: totalPrice,
            imageSrc: imageSrc
        };
             // Get existing cart items from local storage
             var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Add the new item to the cart
    cartItems.push(cartItem);
    
    // Save the updated cart items back to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
            }
    
            // Update the total price in the cart summary
            updateCartSummary();
    
            // Reset the quantity to 1 for the next product
            document.getElementById(quantityId).innerText = '1';
    
                  // Show SweetAlert notification
                  Swal.fire({
                    icon: 'success',
                    title: 'Produk Di Tambahkan Ke Keranjang!',
                    text: `${productName} Telah ditambahkan ke keranjang belanja Anda.`,
                    showConfirmButton: false,
                    timer: 2000  // Set the duration for the notification
                });
        }
    
        function findCartItem(productName) {
            // Find and return the cart item with the given product name
            var cartItems = document.querySelectorAll('.media-heading a');
            for (var i = 0; i < cartItems.length; i++) {
                if (cartItems[i].innerText === productName) {
                    // Found the existing cart item
                    var cartItemContainer = cartItems[i].closest('.media');
                    return {
                        element: cartItemContainer,
                        quantity: parseInt(cartItemContainer.querySelector('.cart-price span:first-child').innerText)
                    };
                }
            }
            return null; // Product not found in the cart
        }
    
        function updateCartSummary() {
            // Calculate and update the total price in the cart summary
            var cartItems = document.querySelectorAll('.cart-price');
            var total = 0;
            cartItems.forEach(function (item) {
                var quantity = parseInt(item.querySelector('span:first-child').innerText);
                var price = parseInt(item.querySelector('span:last-child').innerText.replace(/[^0-9.-]+/g, ''));
                total += quantity * price;
            });
    
            // Format the total with leading zeros
            var formattedTotal = 'Rp.' + total.toLocaleString(undefined, { minimumFractionDigits: 3 });
    
            // Update the total price in the cart summary
            document.querySelector('.total-price').innerText = formattedTotal;
        }
    
        function removeFromCart(deleteButton) {
            // Remove the parent media element of the clicked delete button
            var cartItem = deleteButton.closest('.media');
            cartItem.remove();
    
            // Update the total price in the cart summary
            updateCartSummary();
        }
    