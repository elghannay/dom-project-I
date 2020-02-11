'use strict';
//local vs global scope
console.log(a);
var a = 1;
// closures example 1
function sayHello() {
  let a = 1;
  let b = 'hello there';
  return function() {
    console.log(a, b);
  };
}
sayHello()();
// or you can => let hi = sayHello() and then hi()
