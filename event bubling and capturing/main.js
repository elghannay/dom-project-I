const container = document.getElementById('container');
const ul = document.getElementById('ul');

container.addEventListener(
  'click',
  () => {
    console.log('this is the container');
  },
  true
);
ul.addEventListener(
  'click',
  () => {
    console.log('this is an unordered list');
  },
  true
);
document.querySelectorAll('li').forEach(function(element) {
  element.addEventListener('click', function() {
    console.log('this is a list item');
  });
}, true);
//convert a Node list to array
const li = document.getElementsByTagName('li');
betterLi = [...li];
console.log(betterLi);
console.log(li);
