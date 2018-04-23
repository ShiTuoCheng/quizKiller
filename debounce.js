/*jshint esversion: 6 */
/**
 * 当事件触发之后，必须等待某一个时间(N)之后，回调函数才会执行，假若再等待的时间内，事件又触发了则重新再等待时间N，直到事件N内事件不被触发，那么最后一次触发过了事件N后，执行函数。
 */


function debounce1(func, await = 1000){

  let timer;
  return function() {
    let context = this;
    let argus = arguments;
    
    clearTimeout(timer);
    timer = setTimeout(() => {

      func.apply(context, argus);
    }, await);
  };
}