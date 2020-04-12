const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const email = document.getElementById('email');
const form = document.getElementById('form');
const button = document.querySelector('button');

//#region functions definitions 

function matchingPass(password, password2) {
    if (password.value !== password2.value) {
        showError(password2, 'your passwords do not match');
    }
    else if (password.value === password2.value && password.value !== '')
        showSuccess(password2)
}

function checkLength(input, min, max) {
    if (input.value.length > max)
        showError(input, `your ${input.id} is more than ${max} characters`);
    else if (input.value.length < min)
        showError(input, `your ${input.id} is less than ${min} characters`);
}

function checkRequired(inputArray) {
    inputArray.forEach(input => {
        capitalized = input.id.charAt(0).toUpperCase() + input.id.slice(1);
        if (input.value.trim() === '')
            if (capitalized === 'Password2')
                showError(input, `please re-enter the password`);
            else
                showError(input, `${capitalized} is required`);
        else
            showSuccess(input)
    });
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email.value.trim()).toLowerCase()))
        showSuccess(email);
    else
        showError(email, 'please enter a valid email')
}

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    formControl.querySelector('small').innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
//#endregion end functions definitions 

form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRequired([username, password, password2, email]);
    checkLength(username, 3, 10);
    checkLength(password, 6, 25);
    isValidEmail(email);
    matchingPass(password, password2)
})

