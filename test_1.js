// 二分查找
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let mid = (left + right) >> 1;
    if (target < arr[mid]) {
      right = mid - 1;
    }

    if (target > arr[mid]) {
      left = mid + 1;
    }

    if (target === arr[mid]) {
      return mid;
    }
  }
  return -1;
}

// instanceof
function _instanceof(a, b) {
  a = a.__proto__;
  while (true) {
    if (a === null) {
      return false;
    }
    if (a === b.prototype) {
      return true;
    }
    a = a.__proto__;
  }
}

// curry
function curry(fn) {
  return function recursive(...args) {
    if (fn.length >= args.length) {
      return fn(args);
    } else {
      return recursive(...newArgs.concat(args));
    }
  };
}

// output: 2 3 1 4

// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4

const timeout = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

class Scheduler {
  constructor(limit = 2) {
    this.limit = limit;
  }
}

// promise all
Promise.prototype.all = function (promiseArr) {
  return new Promise((resolve, reject) => {
    const results = [];
    for (const p of promiseArr) {
      p.then(res => {
        results.push(res);
        if (results.length === promiseArr.length) {
          resolve(results);
        }
      }).catch(err => {
        reject(err);
      });
    }
  });
};

// promise allsettled
Promise.prototype.allSettled = function (promiseArr) {
  return new Promise((resolve, reject) => {
    const result = [];
    for (const p of promiseArr) {
      p.then(res => {
        result.push({
          status: 'fulfilled',
          value: res,
        });
        if (result.length === promiseArr.length) {
          resolve(result);
        }
      }).catch(err => {
        result.push({
          status: 'rejected',
          value: err,
        });
        if (result.length === promiseArr.length) {
          reject(result);
        }
      });
    }
  });
};

// 防抖
const denounce = function (fn, timeout) {
  let id;
  return function () {
    id && clearTimeout(id);
    id = setTimeout(function () {
      fn.call(this, arguments);
    }, timeout);
  };
};

// 截流
const throttle = function (fn, wait) {
  let lastTime = 0;
  return function () {
    let now = Number(new Date());
    if (now - lastTime > wait) {
      fn.call(this, arguments);
    }
    lastTime = now;
  }
}

// 组合寄生继承
function Parent (name) {
  this.name = name;
}

parent.prototype.getName = () => {
  this.name;
}

function Child (name) {
  Parent.call(this);
}

Child.prototype = Object.create(Parent.prototype);
