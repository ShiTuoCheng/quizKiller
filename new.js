/**
 * 模拟new函数
 */
/* jshint esversion: 6 */

function _new(Fun){
  let temp, res;

  // 若传入的不是函数类型直接返回
  if(typeof Fun !== 'function'){
    return;
  }

  // 指向构造函数原型
  Reflect.setPrototypeOf(temp, Fun.prototype);

  // 改变this并将参数传过去
  res = Fun.apply(temp, [].apply.slice(arguments, 1));

  return res;

}

function new1(fun) {
  let tmp = {};

  if (typeof fun !== 'function') {
    return;
  }

  tmp.__proto__ = fun.prototype;
  const res = fun.apply(tmp, [].apply.slice(arguments, 1));
  return typeof res === 'object' ? res : tmp
}
