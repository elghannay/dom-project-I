const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const email = document.getElementById('email');
const form = document.getElementById('form');
const button = document.querySelector('button');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (username.value === '')
        showError(username, 'username is required');
    else
        showSuccess(username);


    if (email.value === '')
        showError(email, 'Email is required');
    else if (!isValidEmail(email.value))
        showError(email, 'please enter a valid email')
    else
        showSuccess(email);


    if (password.value === '')
        showError(password, 'password is required');
    else
        showSuccess(password);


    if (password2.value === '')
        showError(password2, 'please enter a matching password');
    else
        showSuccess(password2);
})

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


