document.addEventListener('DOMContentLoaded', function () {
    // Retrieve cart items from local storage
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Display cart items and total on the checkout page
    var checkoutSummary = document.getElementById('checkout-summary');

    cartItems.forEach(function (item) {
        var itemContainer = document.createElement('thead');
        itemContainer.innerHTML = `
            <td>
            <img src="${item.imageSrc}" alt="Product Image" style="width: 50px; height: 50px; margin-right: 10px;">
            </td>
            <td>
            <span>${item.productName}</span>
            </td>
            <td>
            <span>${item.quantity}</span>
            </td>
            <td> Rp.${item.totalPrice.toLocaleString()}</td>
        `;
        itemContainer.classList.add('checkout-item');
        checkoutSummary.appendChild(itemContainer);
    });

    // Calculate and display the total price
    var total = cartItems.reduce(function (acc, item) {
        return acc + item.totalPrice;
    }, 0);

    var totalContainer = document.createElement('th');
    totalContainer.innerHTML = `
    <div>
    <div class="total-label has-text-weight-bold">Total : Rp.${total.toLocaleString()}</div>
    </div>
    `;
    totalContainer.classList.add('checkout-total');
    checkoutSummary.appendChild(totalContainer);

    // Get the order button element
    var orderButton = document.getElementById('order-button');

    // Add a click event listener to the order button
    orderButton.addEventListener('click', function () {
        // Generate WhatsApp link with the total price
        var whatsappLink = generateWhatsAppLink(total);

        // Open WhatsApp chat in a new tab
        window.open(whatsappLink, '_blank');

        // You can perform additional actions here, such as clearing the cart
        localStorage.removeItem('cartItems'); // Clear the cart
        checkoutSummary.innerHTML = '<p>Order placed successfully!</p>';
    });
});

// Function to generate a WhatsApp link with the total price
function generateWhatsAppLink(total) {
    var phoneNumber = '62895326369830'; // Replace with your WhatsApp business number
    var message = 'Halo, saya ingin memesan. Total: Rp.' + total.toLocaleString();

    // Encode the message for a URL
    var encodedMessage = encodeURIComponent(message);

    // Generate the WhatsApp link
    var whatsappLink = 'https://api.whatsapp.com/send?phone=' + phoneNumber + '&text=' + encodedMessage;

    return whatsappLink;
}
