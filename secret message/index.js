document.querySelector('.form').addEventListener('submit', (event) => {
  event.preventDefault();
  let message = document.querySelector('.message-input').value;
  let link = document.querySelector('.link-input').value;
  console.log(message);
  let encoded = btoa(message);
  link = encoded;
});
