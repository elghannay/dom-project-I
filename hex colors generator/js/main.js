'use strict';
const span = document.querySelector('span');
const btn = document.getElementById('btn');

let colors = [
  'a',
  'b',
  'c',
  'd',
  'e',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
];
let random;
btn.addEventListener('click', generateHex);
function generateHex() {
  // console.log(random);
  let hex = '#';
  for (let index = 0; index < 6; index++) {
    random = Math.floor(Math.random() * colors.length);
    hex = hex + colors[random];
  }
  span.textContent = hex;
  document.body.style.backgroundColor = hex;
}
