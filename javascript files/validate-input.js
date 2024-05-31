
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

// Function to validate an individual input field
function validateField(field, validationFn, message) {
    if (!validationFn(field.value)) {
        displayError(field, message);
        return false;
    } else {
        clearError(field);
        return true;
    }
}

// Validation functions
function notEmpty(value) {
    return value.trim() !== "";
}

function validName(value) {
    return value.trim().length > 1;
}

function validPhoneNumber(value) {
    return /^\d{10,11}$/.test(value);
}

function validEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validPostcode(value){
    return /^\d{4}$/.test(value);
}

function validYear(value){
    return /^\d{2,4}$/.test(value);
}

function validCardNumber(value){
    return /^\d{16}$/.test(value);
}

function validYear2(value){
    return /^(2\d{1}|2\d{3})$/.test(value);
    
}

function validCvv(value){
    return /^\d{3}$/.test(value);
}

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
    isValid = validateField(cardName, notEmpty, "This field is required") && isValid;
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

