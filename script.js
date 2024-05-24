
const bagContainer = document.querySelector(".bag-pop-up");
const backgroundShadow = document.querySelector(".background-shadow");
const bagTitle = document.querySelector(".bag-title");
let subtotal = 0;
let totalItems = 0;
const bagItems = {};

function showBagContainer(){
    bagContainer.style.display = "block"; 
    backgroundShadow.style.display = "block";
}

function hideBagContainer(){
    bagContainer.style.display = "none";
    backgroundShadow.style.display = "none";
}

function updateSubtotal(){
    const subtotalElement = document.querySelector(".subtotal-bag p:last-child");
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`
}

function updateBagTitle(){
    bagTitle.textContent = `My Bag (${totalItems})`;
};


function increaseQuantity(element) {
    
    var input = element.previousElementSibling;
    
    
    var currentValue = parseInt(input.value, 10);
    input.value = currentValue + 1;
  
    handleQuantityChange(input);
}

//input.value updating but not dusplaying correcntly 

function decreaseQuantity(element) {
    
    var input = element.nextElementSibling;
    
    
    var currentValue = parseInt(input.value, 10);
    if (currentValue > 1) {
      input.value = currentValue - 1;
    }

    handleQuantityChange(input);

}

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
    } else {
        input.value = oldQuantity;
    }


    console.log(`Product ID: ${productId}`);
    console.log(`Old Quantity: ${oldQuantity}`);
    console.log(`New Quantity: ${newQuantity}`);
    console.log(`Input value: ${input.value}`);
}



function removeProduct(productId) {
    const productElement = document.querySelector(`.product-list-item[data-product-id="${productId}"]`);
    const product = bagItems[productId];
    subtotal -= product.price * product.quantity;
    delete bagItems[productId];
    productElement.remove();
    updateSubtotal();
    totalItems = 0;
    updateBagTitle();
}

function addToBag(productId){
        const productElement = document.querySelector(`[data-product-id="${productId}"]`);
        const productName = productElement.querySelector(".product-page-title").textContent;
        const productPriceText = productElement.querySelector(".product-page-price").textContent;
        const productPrice = parseFloat(productPriceText.replace(/[^0-9.]/g, ''));

        showBagContainer();
        // Check if the item is already in the bag
        const existingItem = document.querySelector(`.product-list-item[data-product-id="${productId}"]`);
        if (existingItem) {
            // Update quantity
            const quantityInput = existingItem.querySelector(".quantity-adjust input");
            const newQuantity = parseInt(quantityInput.value) + 1;
            quantityInput.value = newQuantity;
            bagItems[productId].quantity = newQuantity;
        } else {
            // Add new item to the bag
            bagItems[productId] = {
                name: productName,
                price: productPrice,
                quantity: 1
            };
            
            // Clone the existing list item
            const template = document.getElementById("product-list-template");
            const newItem = template.content.cloneNode(true).querySelector(".product-list-item");
            newItem.setAttribute("data-product-id", productId);
            newItem.querySelector(".product-name").textContent = productName;
            newItem.querySelector(".product-price").textContent = `$${productPrice.toFixed(2)}`;
            newItem.querySelector(".quantity-adjust input").value = "1";
            document.querySelector(".product-list").appendChild(newItem);
        }

        // Update totals
        subtotal += productPrice;
        updateSubtotal();
        totalItems++;
        updateBagTitle();
    }

function removeProduct(button) {
    const productId = button.closest(".product-list-item").dataset.productId;
    const product = bagItems[productId];
    const productElement = document.querySelector(`.product-list-item[data-product-id="${productId}"]`);

    subtotal -= product.price * product.quantity;
    delete bagItems[productId];
    productElement.remove();
    updateSubtotal();
    totalItems--;
    updateBagTitle();
}




