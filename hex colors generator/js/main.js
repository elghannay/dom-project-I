'use strict';
const btn = document.getElementById('btn');
let colors = ['#24324F', '#457ABF', '#1CA68A', '#FFD769', '#FF3E4C'];
btn.addEventListener('click', function() {
  let random = Math.floor(Math.random() * colors.length);
  console.log(random);
  document.body.style.backgroundColor = colors[random];
});
