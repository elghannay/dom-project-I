const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const email = document.getElementById('email');
const form = document.getElementById('form');
const button = document.querySelector('button');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, password, password2, email]);
})

function checkRequired(inputArray) {
    inputArray.forEach(input => {
        capitalized = input.id.charAt(0).toUpperCase() + input.id.slice(1);
        if (input.value.trim() === '')
            showError(input, `${capitalized} is required`);
        else
            showSuccess(input)
    });
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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