//JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出
// class Scheduler {
//   constructor () {
//     this.queue = [];
//     this.count = 0;
//   }

//   async add(promiseCreator) {
//     this.count >= 2 ? await new Promise(resolve => this.queue.push(resolve)) : '';
//     this.count++; 
//     const res = await promiseCreator(); 
//     this.count--; 
//     this.queue.length && this.queue.shift()(); 
//     return res; 
//   }
// }

// class Scheduler {
//   constructor(limit = 2) {
//     this.limit = limit;
//     this.currentIndex = 0;
//     this.queue = [];
//   }

//   next() {
//     this.currentIndex++;
//     this.queue.shift()().then(() => {
//       this.currentIndex--;
//       if (this.queue.length) {
//         this.next();
//       }
//     })
//   }

//   add (promiseCreator) {
//     return new Promise(resolve => {
//       const wrapper = () => promiseCreator().then(resolve);
//       this.queue.push(wrapper);
//       if (this.currentIndex < this.limit) {
//         this.next();
//       }
//     })
//   }
}

class Scheduler {
  constructor (limit = 2) {
    this.queue = [];
    this.limit = limit;
    this.currentIndex = 0;
  }

  run () {
    this.currentIndex++;
    this.queue.shift()().then(() => {
      this.currentIndex--;
      if (this.queue.length) {
        this.run();
      }
    })
  }

  add (promiseCreator) {
    return new Promise(resolve => {
      const wrapper = () => promiseCreator().then(resolve);
      this.queue.push(wrapper);
      if (this.currentIndex <= this.limit) {
        this.run();
      }
    })
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

// 大数相加


let a = "9007199254740991";
let b = "1234567899999999999";

function bigNumAdd(a, b){
  const max = Math.max(a.length, b.length);
  a = a.padStart(max, 0);
  b = b.padStart(max, 0);

  let tmp = 0;
  let plus = 0; // 进位
  let sum = '';
  for (let i = max - 1; i >= 0; i--) {
    tmp =  Number(a[i]) + Number(b[j]) + plus;
    plus = Math.floor(tmp / 10);
    sum = tmp % 10 + sum;
  }
  if (plus === 1) {
    sum = '1' + sum;
  }
  return sum
}

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


multi(1)(2)(3)(4,5);

function util(argus) {
  console.log(argus);
  return argus.reduce((a, c) => {
    return a + c;
  }, 0);
}

function multi(...x) {
  let sum = util(x);
  const multiFn = function (...y) {
    sum += util(y);
    return multiFn;
  }

  multiFn.toString = function() {
    return sum;
  }

  return multiFn;
}

function myCurry(fn, ...argus) {
  const context = this;
  argus = argus || [];
  return function () {
    const newArgs = [...argus, ...arguments];
    if (newArgs.length < fn.length) {
      return myCurry.apply(context, fn, newArgs);
    } else {
      return fn.apply(context, newArgs);
    }
  }
}

function apply (ctx, ...argus) {

}

function myInstanceof (a, b) {
  a = a.__proto__;
  while (true) {
    if (a === null) return false;
    if (a === b.prototype) return true;
    a = a.__proto__;
  }
}

Object.prototype.create = target => {
  function tmp () {};
  tmp.prototype = target;
  return new tmp();
}

function myNew (ctor, ...argus) {
  const tmp = Object.create(ctor);
  const res = ctor.apply(tmp, argus);
  return typeof tmp === 'object' ? res : tmp;
}

// sum(1), sum(1,2,3,4), sum(1)(2)(3),  console.log(sum(1)(2,3)(4)) = 10
function util (argus) {
  return argus.reduce((a, c) => a += c , 0)
};

function sum (...x) {
  let result = util(x);
  const sumFn = function (...y) {
    result += util(y);
    return sumFn;
  }

  // sumFn.toString = function () {
  //   return result;
  // }

  return sumFn;
}

//chain = new Chain, new Chain.eat().sleep(5).eat().sleep(6).work()

class Chain {
  constructor () {
    this.tasks = [];
    setTimeout(() => {
      this.next();
    }, 0);
  }

  eat() {
    const cb = _ => {
      console.log("i'm eating");
      this.next();
    }
    this.tasks.push(cb);
    return this;
  }

  work () {
    const cb = _ => {
      console.log("i'm working");
      this.next();
    }
    this.tasks.push(cb);
    return this;
  }

  sleep(timer) {
    const cb = _ => { 
      setTimeout(() => {
        console.log('sleeping end');
        this.next();
      }, timer * 1000);
    }
    this.tasks.push(cb);
    return this;
  }

  next () {
    const fn = this.tasks.shift();
    fn && fn();
  }
}

const chain = new Chain();
chain.eat().sleep(5).eat().sleep(6).work();

//sum(1)(2)(3)()

function curry (fn, args) {
  const context = this;
  args = args || [];
  return function () {
    const newArgs = [...args, ...arguments];
    if (fn.length > newArgs.length) {
      return curry.call(context, fn, newArgs);
    } else {
      return fn.apply(context, args);
    }
  }
}

function sumFn(a, b, c) {
  return a + b + c;
}

const sum = curry(sumFn);

sum(1)(2)(3)

// sum(1)(2)(3).valueOf()
class Queue {
  constructor() {
    this.tasks = [];
  }

  task (timer, cb) {
    this.tasks.push({
      timer,
      cb
    });
    return this;
  }

  start() {
    let accumulate = 0;
    for (let i = 0; i < this.tasks.length; i++) {
      const {timer, cb} = this.tasks[i];
      accumulate += timer;
      setTimeout(() => {
        cb();
      }, accumulate); 
    }
  }
}


new Queue()
.task(1000, ()=>{
    console.log(1);
})
.task(2000, ()=>{
    console.log(2);
})
.task(1000, ()=>{
    console.log(3);
})
.start();

// versions是一个项目的版本号列表，因多人维护，不规则
// var versions=['1.45.0','1.5','6','3.3.3.3.3.3.3']
// 要求从小到大排序，注意'1.45'比'1.5'大
// sorted=['1.5','1.45.0','3.3.3.3.3.3','6']

function sorted (versions) {

  return versions.sort((a, b) => {
    a = a.split('.');
    b = b.split('.');

    const max = Math.max(a.length, b.length);

    for (let i = 0; i < max; i++) {
      const x = a[i] ? parseInt(a[i]) : 0;
      const y = b[i] ? parseInt(b[i]) : 0;

      if (x > y) {
        return 1;
      } else if (x < y) {
        return -1;
      }
    }
  })
}

// 二叉树的遍历
function preTranverse(root) {
  if (root === null) return;
  console.log(root.value);
  preTranverse(root.left);

  preTranverse(root.right);
}

function request(urls, maxNumber, callback) {
  const tasks = {};
  const groupNum = Math.ceil(urls.length / maxNumber);
  function wrapRequest(url) {
    return fetch(url, {
      method: 'get'
    })
  }
  
  for (let i = 0; i < groupNum; i++) {
    tasks[i] = urls.slice(i * max, (i + 1) * maxNumber).map(url => wrapRequest(url));
  }

  let currentIndex = 0;
  const run = () => {
    Promise.all(tasks[currentIndex])
      .then(res => {
        currentIndex++;
        if (tasks[currentIndex]) {
          run()
        } else if (groupNum === currentIndex) {
          callback && callback();
        }
      })
  }
}

let urls = [
  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2580986389,1527418707&fm=27&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1995874357,4132437942&fm=27&gp=0.jpg',
  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2640393967,721831803&fm=27&gp=0.jpg',
  'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1548525155,1032715394&fm=27&gp=0.jpg',
  'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2434600655,2612296260&fm=27&gp=0.jpg',
  'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2160840192,133594931&fm=27&gp=0.jpg'
];
let max = 4;
let callback = () => {
  console.log('全部请求完成');
};
request(urls,max,callback);

// 89689678578
function thousands(value) {
  const tmp = value.split('');
  const result = [];
  for (let i = 0; i < tmp.length; i++) {
    const item = tmp[i];
    result.push(item)
    if (i % 3 === 0) {
      result.push(',');
    }
  }
  return result;
}

thousands('89689678578')

// eventbus
class EventBus {
  constructor() {
    this._events = Object.create(null);
  }

  $on (name, cb) {
    this._events || (this._events[name] = []).push(cb);
  }

  $emit (name) {
    const argus = [].slice.call(arguments, 1);
    this._events[name].forEach(cb => {
      cb.apply(this, argus);
    });
  }

  $off (name) {
    this._events[name] = null;
  }

  $once (name, fn) {
    this.$on(name, function once() {
      fn.call(this, arguments);
      this.$off(name);
    })
  }
}

Promise.prototype.all = promises => {
  const result = [];
  let currentIndex = 0;
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then((res) => {
        result.push(res);
        currentIndex++;
        if (currentIndex === promises.length) {
          resolve(result);
        }
      })
    });
  });
}

// 得出最长的没有重复字符的子串长度
function findMaxLen (str) {
  let tmpStr = '';
  let max = 0;

  for (let i = 0; i < str.length; i++) {
    const string = str[i];
    const findIndex = tmpStr.indexOf(string);

    if (findIndex > -1) {
      tmpStr = tmpStr.substring(findIndex + 1);
    }

    tmpStr += string;
    if (tmpStr.length > max) {
      max = tmpStr.length;
    }
  }

  return max;
}// chain = new Chain().eat().sleep(5).eat().sleep(6).work()
class Chain {
  constructor () {
    this.tasks = [];
    setTimeout(() => {
      let promise = Promise.resolve();
      while(this.tasks.length) {
        const fn = this.tasks.shift();
        promise = promise.then(() => new Promise(fn));
      }
    }, 0);
  }

  eat () {
    const fn = resolve => {
      console.log("i'm eating");
      resolve();
    }
    this.tasks.push(fn);
    return this;
  }

  sleep(timer) {
    const fn = resolve => {
      setTimeout(resolve, timer * 1000);
    }
    this.tasks.push(fn);
    return this;
  }
}

class Chain {
  constructor () {
    this.tasks = [];
    setTimeout(() => {
      this.next();
    }, 0);
  }
  eat () {
    const fn = () => {
      console.log('eating');
      this.next();
    }
    this.tasks.push(fn);
    return this;
  }
  sleep (timer) {
    const fn = () => {
      setTimeout(() => {
        console.log('sleeping end...');
        this.next();
      }, timer * 1000);
    }
    this.tasks.push(fn);
    return this;
  }
  next () {
    const fn = this.tasks.shift();
    fn && fn();
  }
}

// [2,3,4,5], 5

function findSpecIndex (arr, target) {
  const map = {};
  arr.forEach((v, i) => {
    map[v] = i;
  });
  
  for (const [k, i] of Object.entries(map)) {
    if (map[target - k]) {
      return [i, map[target - k]]
    }
  }
}

var versions=['1.45.0','1.5','6','3.3.3.3.3.3.3']

function versionSorted (versions) {
  return versions.sort((a, b) => {
    a = a.split('.');
    b = b.split('.');
    const max = Math.max(a.length, b.length);

    for (let i = 0; i < max; i++) {
      const x = a[i] ? parseInt(a[i]) : 0;
      const y = b[i] ? parseInt(b[i]) : 0;
      if (x > y) {
        return 1;
      } else if (x < y) {
        return -1;
      }
    }
  })
}

// 分解因数
function PrimeSplit(num, count){
  while( count < num && num % count != 0 ){
    //获取该数最小质数公约数
    count ++;
  }
  if(count < num){
    console.log(count + "*");
    //获取商的最小质数公约数
    PrimeSplit(num/count, 2);
  }else{
    //如果商和最小质数公约数相同，那么说明是他本身，循环结束。
    console.log(count);
  }
}

process.nextTick(() => {console.log('nextTick')});
Promise.resolve().then(()=> {console.log('promise1');}).then(()=> { console.log('promise2'); }); 
setImmediate(() => {console.log('setImmediate')});
console.log('end') 

function request(urls, maxNumber, callback) {
  const groupNum = Math.ceil(urls.length / maxNumber);
  const group = {};
  function wrapRequest (url) {
    return fetch(url, {
      method:'get'
    });
  }

  for (let i = 0; i < groupNum; i++) {
    const i = groupNum[i];
    group[i] = urls.slice(i * maxNumber, (i + 1) * maxNumber).map(url => wrapRequest(url))
  }

  let currentIndex = 0;
  function run () {
    Promise.all(group[currentIndex])
      .then(res => {
        currentIndex += 1;
        if (groupNum !== currentIndex) {
          run();
        } else {
          callback && callback();
        }
      })
  }
  run();
}

function children() {
  parent.call(this);
}

function parent () {
}

children.prototype = Object.create(parent.prototype);
children.prototype.constructor = children;

function debounce (fn, timer) {
  let timerid;
  return function () {
    timerid && clearTimeout(timerid);
    timerid = setTimeout(() => {
      fn.call(this, arguments);
    }, timer);
  }
};

function apply (ctx, argus) {
  const fn = Symbol('fn');
  ctx = ctx || window;
  ctx[fn] = this;
  const res = ctx[fn](argus);
  delete ctx[fn];
  return res;
}

function throttle (fn, timer) {
  let lastTime;
  return function () {
    let now = +new Date();
    if (!lastTime || lastTime - now >= timer) {
      lastTime = now;
      fn.call(this, arguments);
    }
  }
}

function findSpecIndex (arr, target) {
  const map = {};
  arr.forEach((v, i) => {
    map[v] = i;
  });
  
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];
    if (map[target-v] !== void 0 && map[target] !== i) {
      return [i, map[target-v]]
    }
  }
}

function util (argus) {
  return argus.reduce((a, c) => a + c, 0);
}

function sum(...x) {
  let result = util(x);
  const sumFn = function (...y) {
    result += util(y);
    return sumFn;
  }

  sumFn.toString = function () {
    return result;
  }

  return result;
}

function sum (a) {
  return function (b) {
    return function (c) {
      return a +b + c
    }
  }
}

// dfs
function dfs(node) {
  const stack = [];
  stack.push(node);
  while(stack.length) {
    const current = stack.pop();
    console.log(current.val);
    if (current.left) {
      stack.push(current.left);
    }

    if (current.right) {
      stack.push(current.right);
    }
  }
}

Promise.prototype.allsettle = (promises) => {
  return new Promise((resolve, reject) => {
    let index = 0;
    const result = [];
    promises.forEach(promise => {
      Promise.resolve(promise).then(res => {
        index += 1;
        result.push(res);
        if (promises.length === index) {
          resolve(result);
        }
      }, rej => {
        index += 1;
        result.push(rej);
        if (promises.length === index) {
          reject(result);
        }
      })
    })
  })
}

Function.prototype.mybind = (context, argus) => {
  const self = this;
  function fbound () {
    const newArgs = [...argus, ...arguments];
    return self.apply(this instanceof fbound ? this : context, newArgs);
  }

  fbound.prototype = Object.create(this.prototype);
  return fbound;
}

function quickSort(arr, l, r) {
  if (l >= r) return;
  let left = l;
  let right = r;
  let mid = arr[l];
  while(left < right) {
    while (left < right && arr[left] <= mid) {
      left++;
    }

    while (left < right && arr[right] >= mid) {
      right--;
    }

    [arr[left], arr[right]] = [arr[right], arr[left]];
  }

  [arr[l], arr[left]] = [arr[left], arr[l]];
  quickSort(arr, l , left - 1);
  quickSort(arr, left + 1, r);
}

function findMaxLen (str) {
  let tmp = '';
  let maxLen = 0;
  for (let i = 0; i < str.length; i++) {
    const currentStr = str[i];
    let findIndex = tmp.indexOf(currentStr);
    if (findIndex > -1) {
      tmp = tmp.substring(findIndex + 1);
    }

    tmp += currentStr;
    if (maxLen < tmp.length) {
      maxLen = tmp.length;
    }
  }
  return maxLen;
}

function hasPathSum (root, sum) {
  if (root == null) return null;
  if (root.left == null && root.right == null && root.val == sum) return true;
  return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
}

function fen (num, count = 2) {
  while (num  > count && num % count !== 0) {
    count++;
  }
  if (num > count) {
    fen(num/count, 2);
    console.log(count);
  } else {
    console.log(count);
  }
}

class Chain {
  constructor () {
    this.tasks = [];
    setTimeout(() => {
      this.next();
    }, 0);
  }

  eat () {
    const fn = _ => {
      console.log("i'm eating");
      this.next();
    }
    this.tasks.push(fn);
    return this;
  }

  sleeping (timer) {
    const fn = _ => {
      console.log('sleeping start');
      setTimeout(() => {
        console.log('sleeping end');
        this.next();
      }, timer * 1000);
    }
    this.tasks.push(fn);
    return this;
  }

  next () {
    const fn = this.tasks.shift();
    fn && fn();
  }
}

const mailRegex = /(a-zA-Z0-9_-)+@(a-zA-Z0-9_-)+(\.[a-zA-Z0-9_-])/

class EventBus {
  constructor () {
    this._events = Object.create(null);
  }

  $on (event, fn) {
    this._events[event] || (this._events[event]).push(fn);
  }

  $off (event) {
    this._events[event] = null;
  }

  $emit(event) {
    if (!this._events[event]) return;
    const args = [].slice.call(arguments, 1);
    this._events[event].forEach(cb => {
      cb && cb(args);
    })
  }

  $once (event, fn) {
    this.$on(event, function on () {
      fn.call(this, argumetns);
      this.$off(event);
    })
  }
}

function request (urls, maxNumber, callback) {
  function wrapRequest (url) {
    return fetch(url, {
      method: 'get'
    });
  }

  const groupNum = Math.ceil(urls.length/maxNumber);
  const requestGroup = {};
  let index = 0;

  for (let i = 0; i < groupNum.length; i++) {
    requestGroup[i] = urls.slice(i * maxNumber, (i + 1) * maxNumber).map(url => wrapRequest(url));
  }

  function run () {
    Promise.all(requestGroup[index])
      .then(res => {
        index += 1;
        if (index === groupNum) {
          callback();
        } else {
          run();
        }
      });
  }

  run();
}

function thousands (num) {
  return num.replace(/\B(?=(\d{3})+$)/g, ',');
}

function arrStr(arr) {
  const result = [[arr[0]]];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const next = arr[i + 1];

    if (current + 1 == next) {
      (result[result.length - 1]).push(next);
    } else {
      next && result.push([next]);
    }
  }
  
  return result.map(v => v.length > 1 ? `${v[0]}->${v[v.length - 1]}` : v[0]);
}

function quickSort(arr, l, r) {
  if (l > r) return;
  let left = l;
  let right = r;
  let mid = arr[l];
  while(left < right) {
    while(left < right && arr[right] >= mid) {
      right--;
    }

    while(left < right && arr[left] <= mid) {
      left++;
    }

    [arr[left], arr[right]] = [arr[right], arr[left]];
  }

  [arr[l], arr[left]] = [arr[left], arr[l]];
  quickSort(arr, l, left - 1);
  quickSort(arr, right + 1, r);
}

const arr = [2,1,4,5,3];

quickSort(arr, 0, 4);

console.log(arr);

function Dog(name, color) {    
  this.name = name;
  this.color = color;
  this.bark = function() {        
    console.log(`hello ${this.name}`)    
  }
}
Dog.prototype.bark = function () {    
  console.log(`hi ${this.name}`)
};
  
let dog = new Dog('Chop', 'Red');
dog.bark();
dog.__proto__.bark.call(dog);

function ajax (url, method, data) {
  const request = new XMLHttpRequest();
  request.send(data)
  request.open(method, url, true);
  request.onreadystatechange = function () {
    if (request.readyState !== 4) {

    }
  }
}

function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let middle = Math.ceil((start + end) / 2);
    if (arr[middle] > target) {
      end = middle - 1;
    }
    
    if (arr[middle] < target) {
      start = middle + 1;
    }
  }
}

function shuffle (arr) {
  let i = arr.length
  while(i) {
    let j = Math.floor(Math.random() * i--);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function throttle (fn, await) {
  let lastTime = null;
  return function () {
    let now = +new Date();
    if (now - lastTime >= await) {
      fn.apply(this, arguments);
      lastTime = now;
    }
  }
}

new Promise((resolve, reject) => {
  throw new Error()
}).catch(err => {
  console.log(err);
}).then(res => {
  console.warn(res);
})





