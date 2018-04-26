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