const linkForm = document.querySelector('.link-form');
const messageForm = document.querySelector('.message-form');
let messageInput = document.querySelector('.message-input');
let messageShow = document.querySelector('.message-show');
let linkInput = document.querySelector('.link-input');

const { hash } = window.location;

const decoded = atob(hash.replace('#', ''));
if (decoded) {
  messageShow.classList.remove('hide');
  messageForm.classList.add('hide');
  document.querySelector('.message-show h1').innerHTML = decoded;
}

document.querySelector('.message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  let encoded = btoa(messageInput.value);
  linkInput.value = `${window.location}#${encoded}`;
  linkInput.select();

  linkForm.classList.remove('hide');
  messageForm.classList.add('hide');
});
