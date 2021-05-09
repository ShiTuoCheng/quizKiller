/*jshint esversion: 6 */
/**
 * 实现函数柯理化
 */

function curry(fun) {

  let args = [].slice.call(arguments, 1);
  let context = this;

  return function() {

    let newArgs = [...args, ...arguments];
    fun.apply(context, newArgs);
  };
}

function curry(fn, args) {
  var length = fn.length;
  var args = args || [];
  return function(){
      newArgs = args.concat(Array.prototype.slice.call(arguments));
      if(newArgs.length < length){
          return curry.call(this,fn,newArgs);
      }else{
          return fn.apply(this,newArgs);
      }
  }
}
function multiFn(a, b, c) {
  return a * b * c;
}
var multi = () => curry(multiFn);
multi(2)(3)(4)();
multi(2,3,4);
multi(2)(3,4);
multi(2,3)(4);

function curry1 (fn, args) {
  const args = args || [];
  const context = this;
  return function () {
    const newArgs = [...args, [].slice.apply(arguments)];
    if (newArgs.length < fn.length) {
      curry1.call(context, fn, newArgs);
    } else {
      fn.apply(context, newArgs)
    }
  }
}

function curry2 (fn, ...args) {
  return (...newArgs) => {
    return fn(...args, ...newArgs)
  }
}

add(1, 2, 3);

multi(1)(2)(3)(4)(5)

function multi(x) {
  let sum = x;
  const tmp = function (y) {
    sum *= y;
    return tmp;
  }

  tmp.toString = function() {
    return sum;
  }

  return tmp;
}


var multi = () => _curry(multiFn);
multi(2)(3)(4)();
multi(2,3,4);
multi(2)(3,4);
multi(2,3)(4);

function curry2(fn) {
  return function recursive(...args) {
    if (fn.length >= args.length) {
      return fn(args);
    } else {
      return recursive(...params.concat(args));
    }
  }
}

