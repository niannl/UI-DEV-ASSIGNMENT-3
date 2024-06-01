
const bagContainer = document.querySelector(".bag-pop-up");
const backgroundShadow = document.querySelector(".background-shadow");
const bagTitle = document.querySelector(".bag-title");

let subtotal = 0;
let totalItems = 0;

// Retrieve items from local storage or initialise empty object
const bagItems = JSON.parse(localStorage.getItem("bagItems")) || {};

// Execute after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    updateSubtotal();
    updateBagTitle();
    bagLocalStorage();
    totalItems = localStorage.getItem("totalItems") ? parseInt(localStorage.getItem("totalItems")) : 0;
});

// Populate bag from local storage
function bagLocalStorage() {
    const productList = document.querySelector('.product-list');
    for (const [productId, product] of Object.entries(bagItems)) {
        const template = document.getElementById("product-list-template");
        const newItem = template.content.cloneNode(true).querySelector(".product-list-item");
        newItem.setAttribute("data-product-id", productId);
        newItem.querySelector(".bag-product-name").textContent = product.name;
        newItem.querySelector(".bag-product-price").textContent = `$${product.price.toFixed(2)}`;
        newItem.querySelector(".bag-image").src = product.image;
        newItem.querySelector(".quantity-display").value = product.quantity;
        productList.appendChild(newItem);
    }
}

// Show bag container with transition effect
function showBagContainer(){
    bagContainer.style.opacity = '0';
    bagContainer.style.transform = 'translate(-50%, -50%)';

    bagContainer.style.display = "block"; 
    backgroundShadow.style.display = "block";

    setTimeout(function(){
        bagContainer.style.opacity = '1';
        bagContainer.style.transform = 'translate(-50%, 0)';
    }, 30)
}

// Hide bag container
function hideBagContainer(){
    bagContainer.style.display = "none";
    backgroundShadow.style.display = "none";
}

// Update subtotal of all products in bag
function updateSubtotal(){
    subtotal = Object.values(bagItems).reduce((acc, item) => acc + item.price * item.quantity, 0);
    const subtotalElement = document.querySelector(".subtotal-bag p:last-child");
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
}

// Update bag title to show correct number of items in bag
function updateBagTitle(){
    let totalQuantity = 0;
    for (let productId in bagItems) {
        totalQuantity += bagItems[productId].quantity;
    }
    bagTitle.textContent = `My Bag (${totalQuantity})`;

    document.querySelector('.bag-item-count').textContent = totalQuantity;

};

// Increase quantity of item
function increaseQuantity(element) {  
    var input = element.previousElementSibling;
    var currentValue = parseInt(input.value, 10);
    input.value = currentValue + 1;
  
    handleQuantityChange(input);
}

// Decrease quantity of item 
function decreaseQuantity(element) {
    var input = element.nextElementSibling;
    var currentValue = parseInt(input.value, 10);
    if (currentValue > 1) {
      input.value = currentValue - 1;
    }

    handleQuantityChange(input);
}

// handle the quantity change of item
function handleQuantityChange(input) {
    const productId = input.closest('.product-list-item').dataset.productId;
    const product = bagItems[productId];
    const oldQuantity = product.quantity;
    const newQuantity = parseInt(input.value);

    if (!isNaN(newQuantity) && newQuantity > 0) {
        product.quantity = newQuantity;
        subtotal += product.price * (newQuantity - oldQuantity);
        updateSubtotal();
        totalItems += newQuantity - oldQuantity;
        updateBagTitle();
        localStorage.setItem('bagItems', JSON.stringify(bagItems));
    } else {
        input.value = oldQuantity;
    }
}

// Add an item to bag
function addToBag(productId){
    const productElement = document.querySelector(`[data-product-id="${productId}"]`);
    const productName = productElement.querySelector(".product-page-title").textContent;
    const productPriceText = productElement.querySelector(".product-page-price").textContent;
    const productPrice = parseFloat(productPriceText.replace(/[^0-9.]/g, ''));
    const productImage = productElement.getAttribute('data-bag-image');

    showBagContainer();
    // Check if item is already in bag
    const existingItem = document.querySelector(`.product-list-item[data-product-id="${productId}"]`);
    if (existingItem) {
        // Update quantity
        const quantityInput = existingItem.querySelector(".quantity-adjust input");
        const newQuantity = parseInt(quantityInput.value) + 1;
        quantityInput.value = newQuantity;
        bagItems[productId].quantity = newQuantity;
    } else {
        // Add new item to bag
        bagItems[productId] = {
            name: productName,
            price: productPrice,
            quantity: 1,
            image: productImage
        };
        
        // Clone the existing list item
        const template = document.getElementById("product-list-template");
        const newItem = template.content.cloneNode(true).querySelector(".product-list-item");
        newItem.setAttribute("data-product-id", productId);
        newItem.querySelector(".bag-product-name").textContent = productName;
        newItem.querySelector(".bag-product-price").textContent = `$${productPrice.toFixed(2)}`;
        newItem.querySelector(".bag-image").src = productImage;
        newItem.querySelector(".quantity-adjust input").value = "1";
        document.querySelector(".product-list").appendChild(newItem);
    }

    subtotal += productPrice;
    updateSubtotal();
    updateBagTitle();

    localStorage.setItem('bagItems', JSON.stringify(bagItems));   
}

// Function to remove product from bag
function removeProduct(button) {
    const productId = button.closest(".product-list-item").dataset.productId;
    const product = bagItems[productId];
    const productElement = document.querySelector(`.product-list-item[data-product-id="${productId}"]`);

    // Update subtotal, remove product from bagItems
    subtotal -= product.price * product.quantity;
    delete bagItems[productId];
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    
    productElement.remove();
    updateSubtotal();
    updateBagTitle();
}




