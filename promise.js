/*jshint esversion: 6 */
/**
 * shituocheng
 * 手动实现一个promise
 */

// class _promise {
//   constructor(fn) {
//     this.value = null;
//     this.reason = null;
//     this.state = 'pending';
//     this.fullfilledCbs = [];
//     this.rejectedCbs = [];

//     const resolve = value => {
//       setTimeout(() => {
//         if (this.state === 'pending') {
//           this.state = 'fullfilled';
//           this.value = value;
//           this.fullfilledCbs.forEach(cb => cb());
//         }
//       });
//     }

//     const reject = reason => {
//       setTimeout(() => {
//         if (this.state === 'pending') {
//           this.state = 'rejected';
//           this.reason = reason;
//           this.rejectedCbs.forEach(cb => cb());
//         }
//       });
//     }

//     try {
//       fn(resove, reject)
//     } catch(err) {
//       reject(err);
//     }
//   }

//   then(onFullfilled, onRejected) {
//     onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : value => value;
//     onRejected = typeof onRejected === 'function' ? onRejected : err => {
//       throw err;
//     }

//     let retPromise;

//     if (this.state === 'fullfilled') {
//       return retPromise = new _Promise((resolve, reject) => {
//         setTimeout(() => {
//           try {
//             let x = onFullfilled(this.value);
//             resolvePromise(retPromise, x, resolve, reject);
//           } catch(err) {
//             reject(err)
//           }
//         });
//       });
//     }

//     if (this.state === 'rejected') {
//       return retPromise = new _Promise((resolve, reject) => {
//         setTimeout(() => {
//           try {
//             let x = onRejected(this.reason);
//             resolvePromise(retPromise, x, resolve, reject);
//           } catch(err) {
//             reject(err)
//           }
//         });
//       });
//     }

//     if (this.state === 'pending') {
//       return retPromise = new _Promise((resolve, reject) => {
//         this.fullfilledCbs.push(value => {
//           try {
//             let x = onFullfilled(value);
//             resolvePromise(retPromise, x, resolve, reject);
//           } catch(err) {
//             reject(err)
//           }
//         });

//         this.rejectedCbs.push(reason => {
//           try {
//             let x = onRejected(reason);
//             resolvePromise(retPromise, x, resolve, reject);
//           } catch(err) {
//             reject(err)
//           }
//         })
//       });
//     }
//   }
// }

// function resolvePromise(promise2, x, resolve, reject) {
//   if (x === promise2) {
//     reject(new Error('循环引用'));
//   }

//   if (x && (typeof x === 'object' || typeof x === 'function')) {
//     let then = x.then;
//     if (typeof then === 'function') {
//       let called = false;
//       then.call(
//         x,
//         y => {
//           if (called) return;
//           called = true;
//           resolvePromise(promise2, y, resolve, reject);
//         },
//         r => {
//           if (called) return;
//           called = true;
//           reject(r);
//         }
//       )
//     }else {
//       resolve(x);
//     }
//   }
// }



class _Promise {
  constructor (fn) {
    this.value = null;
    this.reason = null;
    this.state = 'pending';
    this.fullfilledCbs = [];
    this.rejectedCbs = [];

    const resolve = value => {
      setTimeout(() => {
        if (this.state === 'pending') {
          this.state = 'fullfilled';
          this.fullfilledCbs.forEach(cb => {
            cb && cb(value);
          });
        }
      });
    }

    const reject = reason => {
      setTimeout(() => {
        if (this.state === 'pending') {
          this.state = 'rejected';
          this.rejectedCbs.forEach(cb => {
            cb && cb(reason);
          })
        }
      })
    }

    try {
      fn(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onfullfilled, onrejected) {
    onfullfilled = typeof onfullfilled === 'function' ? onfullfilled : value => value;
    onrejected = typeof onrejected === 'function' ? onrejected : reason => {
      throw reason;
    }

    // 返回promise
    let retPromise;

    if (this.state === 'fullfilled') {
      return (retPromise = new _Promise((resolve, reject) => {
        setTimeout(() => {
          try{
            let x = onfullfilled(this.value);
            resolvePromise(retPromise, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        })
      }));
    }

    if (this.state === 'rejected') {
      return (retPromise = new _Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onrejected(this.reason);
            resolvePromise(retPromise, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      }));
    }

    if (this.state === 'pending') {
      return (retPromise = new _Promise((resolve, reject) => {
        this.fullfilledCbs.push(value => {
          try {
            let x = onFullfilled(value);
            resolvePromose(retPromise, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });

        this.rejectedCbs.push(reason => {
          try {
            let x = onrejected(reason);
            resolvePromise(retPromise, x, resolve, reject);
          } catch(err) {
            reject(err);
          }
        })
      }));
    }
  }
}

function resolvePromise(promise1, x, resolve, reject) {
  if (promise1 === x) {
    reject(new Error('循环引用'));
  }
  
  if (x && (typeof x === 'function' || typeof x === 'object')) {
    let called;
    try {
      let then = x.then || x;
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise1, y, resolve, reject)
          },
          z => {
            if (called) return;
            called = true;
            reject(z);
          }
        );
      } else {
        resolve(x);
      }
    } catch (err) {
      if (called) return;
      called = true;
      reject(err);
    }
  } else {
    resolve(x)
  }
}



// 实现promise all
Promise.prototype.all = arr => {
  const results = [];
  let i = 0;
  return new promise((resolve, reject) => {
    arr.forEach(task => {
      task().then(res => {
        result.push(res);
        i++;

        if (i === arr.length) {
          resolve();
        }
      })
    });
  });
}