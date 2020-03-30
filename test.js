//JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出
class Scheduler {
  constructor () {
    this.queue = [];
    this.count = 0;
  }

  async add(promiseCreator) {
    this.count >= 2 ? await new Promise(resolve => this.queue.push(resolve)) : '';
    this.count++; 
    const res = await promiseCreator(); 
    this.count--; 
    this.queue.length && this.queue.shift()(); 
    return res; 
  }
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')

// output: 2 3 1 4

// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4

function myNew (fun, ...argus) {
  const temp = {};
  temp.__proto__ = fun.prototype;
  const res = fn.apply(temp, argus);
  return typeof res === 'object' ? res : temp;
}

Function.prototype.myApply = function (context, argus) {
  const fn = Symbol('fn');
  const ctx = context || window;
  ctx[fn] = this;
  const res = ctx[fn](argus);
  delete ctx[fn];
  return res;
}

Function.prototype.myBind = function (context, argus) {
  const self = this;
  function fbound () {
    const newArgs = [...argus, ...arguments];
    return self.apply(this instanceof fbound ? this : context, newArgs);
  }
  fbound.prototype = Object.create(this.prototype);
  return fbound;
}

Object.prototype.myCreate = function (proto) {
  function tmp(){};
  tmp.prototype = proto;
  return new tmp();
}

function myInstanceof (a, b) {
  a = a.__proto__;
  while(true) {
    if (a === null) return false;
    if (a === b.prototype) return true;
    a = a.__proto__;
  }
}

// 原型继承
function Child() {
}

function Parent(name) {
  this.name = name;
}

Child.prototype = new Parent();

const child = new Child()

// 构造函数继承
function Parent(name) {
  this.name = name;
}

function Child() {
  Parent.call(this, name)
}

// 组合继承
function Parent (name) {
  this.name = name;
}

function Child(name) {
  Parent.call(Child, name);
}

Child.prototype = new Parent(name);
Child.prototype.constructor = Child;

// 寄生组合继承
function Parent (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child (name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;


var child1 = new Child('kevin', '18');

console.log(child1);

// 输入: "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

function findLengthOfMaxCommonStr(str) {
  const len = str.length;
  let maxLen = 0;
  let subStr = '';
  for (let i = 0; i < str.length; i++) {
    const currentStr = str[i];
    const findIndex = subStr.indexOf(currentStr);
    if (findIndex > -1) {
      subStr = subStr.substring(findIndex+1);
    }
    subStr += currentStr;
    if (maxLen < subStr.length) {
      maxLen = subStr.length;
    }
  }

  return maxLen;
}

// 冒泡
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i ++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}


Object.prototype.myCreate = (target) => {
  function f() {};
  f.prototype = target;
  return new f();
}

function myNew (fn, ...argus) {
  const temp = {};
  temp.__proto__ = fn.prototype;
  const res = fn.apply(temp, argus);
  return typeof res === 'object' ? res : temp;
}

Function.prototype.myApply = (context, argus) => {
  context = context || window;
  const fn = Symbol('fn');
  context[fn] = this;
  const res = context[fn](argus);
  delete context[fn];
  return res;
}

Function.prototype.myBind = (context, argus) => {
  const self = this;
  function fbound() {
    const newArgs = [...argus, ...arguments];
    return self.apply(this instanceof fbound ? this : context, newArgs); 
  }
  fbound.prototype = Object.create(this.prototype);
  return fbound;
}

function myInstanceof (a, b) {
  a = a.__proto__;
  while(true) {
    if (a === null) return false;
    if (a === b.prototype) return true;
    a = a.__proto__;
  }
}

// 构造函数继承
function Child () {

}

function Parent() {
  Child.call(this)
}
// 原型继承
function Child () {

}

function Parent () {
  this.colors = ['red', 'white'];
}

Child.prototype = new Parent();
// 组合继承
function Parent() {
  this.colors = ['red', 'white'];
}

function Child () {
  Parent.call(this);
}

Child.prototype = new Parent();
// 寄生式组合继承
function Parent() {
  this.colors = ['red', 'white'];
}

function Child () {
  Parent.call(this);
}

Child.prototype = Object.create(Parent.prototype);
// reduce实现
Array.prototype.myReduce = (cb, initVal) => {
  const arr = [].slice.call(this);
  let i = initVal === void 0 ? 1: 0;
  let res;
  initVal = initVal === void 0 ? arr[0] : initVal;
  for (i; i < arr.length; i++) {
    res = cb.call(initVal, arr[i], i, arr);
  }
  return res;
}
// 防抖
function debounce (fn, await) {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, arguments);
    }, await);
  }
}
// 截流
function throttle (fn, await) {
  let lastTime;
  return function() {
    const now = +new Date();
    if (lastTime - now > await) {
      fn.call(this, arguments);
      lastTime = now;
    }
  }
}

// map
Array.prototype.myMap = (cb) => {
  const arr = [].slice.call(this);
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    res.push(cb.call(this, item, i, arr));
  }
  return res;
}

// curry
function myCurry (fn ,argus) {
  argus = argus || [];
  const context = this;
  return function() {
    const newArgus = [...argus, ...arguments];
    if (fn.length > newArgus.length) {
      return myCurry.call(context, fn, newArgus);
    } else {
      return fn.apply(context, newArgus);
    }
  }
} 

function argsSum(args){ 
  return args.reduce((pre, cur) => { 
    return pre + cur 
  }) 
} 
function add(...args1){ 
  let sum1 = argsSum(args1) 
  let fn = function(...args2){ 
    let sum2 = argsSum(args2) 
    return add(sum1 + sum2) 
  } 
  fn.toString = function(){ 
    return sum1 
  } 
  return fn 
}

add(1)(2)(3)(4, 5)

function addSum (args) {
  return args.reduce((a, c) => a + c, 0);
}

function add (...args1) {
  let sum = addSum(args1);
  function sumFn (...args2) {
    const tmp = addSum(args2);
    sum += tmp;
    return sumFn;
  }

  sumFn.toString = function () {
    return sum
  }

  return sumFn;
}

function myInstanceof (a, b) {
  a = a.__proto__;
  while(true) {
    if (a === b.prototype) return true;
    if (a === null) return false;
    a = a.__proto__;
  }
}

Object.prototype.myApply = (ctx, args) => {
  const fn = Symbol('fn');
  const context = ctx || window;
  context[fn] = this;
  const res = context[fn](args);
  delete context[fn];
  return res;
}

Object.prototype.myBind = (ctx, args) => {
  const self = this;
  function fbound() {
    const newArgs = [...args, ...arguments];
    return self.apply(this instanceof fbound ? this : ctx, newArgs);
  }

  fbound.prototype = Object.create(this.prototype);
  return fbound;
}

Object.prototype.create = (target) => {
  function tmp () {};
  tmp.prototype = target;
  return new tmp();
}

function myNew (ctor, ...argus) {
  const tmp = {};
  temp.__proto__ = ctor.prototype;
  const res = ctor.apply(tmp, argus)
  return typeof res === 'object' ? res : tmp;
} 

function Child () {}
function Parent () {}

Child.prototype = new Parent();

function debounce (fn, await) {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, await);
  }
}

function throttle (fn, await) {
  let lastTime;
  return function () {
    let now = +new Date();
    if (!lastTime || now - lastTime >= await) {
      fn.apply(this, arguments);
      lastTime = now;
    }
  }
}

Array.prototype.myMap = function (cb) {
  const arr = [].slice.call(this);
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    res.push(cb.call(this, item, i, arr))
  }
  return res;
}

function myCurry (fn, args) { 
  const context = this;
  args = args || [];
  return function () {
    const newArgs = [...args, ...arguments];
    if (newArgs.length < fn.length ) {
      return myCurry.apply(context, fn, newArgs);
    } else {
      return fn.apply(context, newArgs);
    }
  }
}

class _Promise {
  constructor (fn) {
    this.value = '';
    this.reason = '';
    this.state = 'pending';
    this.fullfilledCbs = [];
    this.rejectedCbs = [];

    function resolve (value) {
      if (this.state === 'pending') {
        setTimeout(() => {
          this.state = 'fullfilled';
          this.value = value;
          this.fullfilledCbs.forEach(cb => cb(value));
        }, 0);
      }
    }

    function reject (reason) {
      if (this.state === 'pending') {
        setTimeout(() => {
          this.state = 'rejected';
          this.reason = reason;
          this.rejectedCbs.forEach(cb => cb(reason));
        }, 0);
      }
    }

    try {
      fn(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFullfilled, onRejected) {
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw new Error(reason);
    }

    new Promise((resolve, reject) => {
      function fullfilledFn(value) {
        try {
          const x = onFullfilled(value);
          typeof x.then === 'function' ? x.then(resolve, reject) : resolve(value);
        } catch (error) {
          reject(error);
        }
      };

      function rejectedFn(reason) {
        try {
          const x = onRejected(reason);
          typeof x.then === 'function' ? x.then(resolve, reject) : resolve(reason);
        } catch (error) {
          reject(error);
        }
      }

      if (this.state === 'pending') {
        this.rejectedCbs.push(rejectedFn);
        this.fullfilledCbs.push(fullfilledFn);
      }

      if (this.state === 'fullfilled') {
        fullfilledFn(this.value);
      }

      if (this.state === 'rejetced') {
        rejectedFn(this.reason);
      }
    })
  }
}

Promise.prototype.finally = function (cb) {
  const P = this;
  return P.then(
    value => Promise.resolve(cb()).then(value),
    reason => Promise.resolve(cb()).then(() => {throw reason})
  )
}

Promise.prototype.all = function (arr) {
  const res = [];
  let i = 0;
  return new Promise((resolve, reject) => {
    arr.forEach(v => {
      v.then(resp => {
        i += 1;
        res.push(resp);
        if (i === arr.length) {
          resolve(res);
        }
      }).catch(err => {
        reject(err);
      })
    })
  })
}


