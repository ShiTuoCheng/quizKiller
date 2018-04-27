/*jshint esversion: 6 */
/**
 * shituocheng
 * 手动实现一个promise
 */

class _promise {

  constructor(fun){

    this.status = 'pending';
    this.then = then;
    this.value = null;
    this.reason = null;
    this.fullfilledQueue = [];
    this.rejectedQueue = [];

    const resolve = value => {

      if(this.status === 'pending'){

        this.value = value;
        this.status = 'fullfilled';
        this.fullfilledQueue.forEach(queueItem => queueItem(this.value));
      }
    };

    const reject = reason => {

      if(this.status === 'pending'){

        this.reason = reason;
        this.status = 'rejected';
        this.rejectedQueue.forEach(queueItem => queueItem(this.reason));
      }
    };

    try {
      fun(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFullfilled, onRejected){

    if(this.status === 'fullfilled'){
      onFullfilled(this.value);
    }

    if(this.status === 'rejected'){
      onRejected(this.reason);
    }

    if(this.status === 'pending'){
      this.fullfilledQueue.push(onFullfilled);
      this.rejectedQueue.push(onRejected);
    }
  }
}