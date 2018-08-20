/*jshint esversion:6 */
/**
 * 实现一个截留函数
 */

// 传入要执行的函数， 以及等待时间
function throttle1(fun, await = 1000) {
  let timer;
  let previous; // 缓存上次执行的时间
  // 尖头函数没有arguments属性, 没有this, 所以不用。
  return function(){

    let context = this;
    now = +new Date();
    let argus = arguments;

    if(!previous){
      previous = now;
      fun.apply(context, argus);
    }else if(previous && now < previous + await ){
      clearTimeout(timer);
      timer = setTimeout(() => {
        previous = now;
        fun.apply(context, argus);
      }, await);
    }
  };
}

function throttle2(fun, await = 1000) {

  let timer;
  let previous = 0;

  return function(){

    let context = this;
    let now = +new Date();
    let argus = arguments;

    clearTimeout(timer);
    if(now - previous >= await){

      previous = now;
      fun.apply(context, argus);
    }else{

      timer = setTimeout(() => {
        fun.apply(context, argus);
      }, await);
    }
  };
}

const throttle3 = (fun, await = 1000) => {
  
  let previous = 0;

  return function(){
    let now = Date.now();
    let args = arguments;
    if (now - previous > await) {
      fun.apply(context, args);
    }
  }
}

