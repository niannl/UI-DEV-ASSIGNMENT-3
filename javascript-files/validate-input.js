
// Function to display error messages
function displayError(field, message) {
    var errorField = document.getElementById(field.id + "-error");
    errorField.textContent = message;
    field.classList.add("input-error");
}

// Function to clear error messages
function clearError(field) {
    var errorField = document.getElementById(field.id + "-error");
    errorField.textContent = "";
    field.classList.remove("input-error");
}

// Function to validate individual input fields
function validateField(field, validationFn, message) {
    if (!validationFn(field.value)) {
        displayError(field, message);
        return false;
    } else {
        clearError(field);
        return true;
    }
}

// Not empty string
function notEmpty(value) {
    return value.trim() !== "";
}

// At least 2 characters and only letters and spaces
function validName(value) {
    return /^[A-Za-z\s]{2,}$/.test(value.trim());
}

// Either 10 or 11 digits long
function validPhoneNumber(value) {
    return /^\d{10,11}$/.test(value);
}

// Follows basic email format
function validEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Exactly 4 digits
function validPostcode(value){
    return /^\d{4}$/.test(value);
}

// Exactly 4 digits staring with "2"
function validYear(value){
    return /^2\d{3}$/.test(value);
}

// Exactly 16 digits
function validCardNumber(value){
    return /^\d{16}$/.test(value);
}

// Either 2 or 4 digits in total starting with "2" 
function validYear2(value){
     return /^(2\d{1}|2\d{3})$/.test(value);
    
}

// Exactly 3 digits
function validCvv(value){
    return /^\d{3}$/.test(value);
}

// Drop down not default value
function validDropdown(value){
    return value !== "select";
}

function validateInput(){
    var isValid = true;

    var firstName = document.getElementById("first-name");
    var lastName = document.getElementById("last-name");
    var phoneNumber = document.getElementById("phone-number");
    var email = document.getElementById("email");
    var country = document.getElementById("country");
    var postcode = document.getElementById("postcode");
    var streetAddress = document.getElementById("street-address1");
    var state = document.getElementById("state");
    var cardName = document.getElementById("card-name");
    var cardNumber = document.getElementById("card-number");
    var expiryYear = document.getElementById("exp-year");
    var cvv = document.getElementById("cvv");

    
    isValid = validateField(firstName, validName, "First name must be at least 2 characters") && isValid;
    isValid = validateField(lastName, validName, "Last name must be at least 2 characters") && isValid;
    isValid = validateField(phoneNumber, validPhoneNumber, "Please enter a valid phone number") && isValid;
    isValid = validateField(email, validEmail, "Please enter a valid email address") && isValid;
    isValid = validateField(streetAddress, notEmpty, "This field is required") && isValid;
    isValid = validateField(country, notEmpty, "This field is required") && isValid;
    isValid = validateField(state, validDropdown, "Please select an option") && isValid;
    isValid = validateField(postcode, validPostcode, "Please enter a valid 4-digit postcode") && isValid;
    isValid = validateField(cardName, validName, "Name must be at least 2 characters") && isValid;
    isValid = validateField(cardNumber, validCardNumber, "Please enter valid card number") && isValid;
    isValid = validateField(expiryYear, validYear2, "Please enter a valid expiry date") && isValid;
    isValid = validateField(cvv, validCvv, "Please enter a valid CVV") && isValid;

    return isValid;
}

function submit(event){
    if (!validateInput()) {
        event.preventDefault();
    }
}

function finalSubmit(){
    event.preventDefault;

    if (validateInput()){
        window.location.href="./confirmation-page.html";
    }
}

