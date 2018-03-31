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
