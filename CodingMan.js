/*jshint esversion:6 */
const CodingMan = (name) => {
  class man {
    constructor() {
      if (new.target === man) {
        setTimeout(() => console.log(`Hi! This is ${name}`));
      }
    }

    sleep(time) {
      let now = +new Date();
      let delay = time * 1000;
      setTimeout(() => {
        while (+new Date() - now < delay) {}
        console.log(`wake up after ${time}`);
      });
      return man;
    }

    static eat(food) {
      setTimeout(() => {
        console.log(`Eat ${food}~`);
      });

      return man;
    }

    sleepFirst(time) {
      let now = new Date();
      let delay = time * 1000;
      while (+new Date() - now < delay) {} // 阻塞当前主线程
      console.log(`Wake up after ${time}`);
      return man;
    }
  }

  return new man(name);
};

class CodingMan2 {

  constructor(name){
    this.name = name;
    this.sayName();
    this.queue = Promise.resolve();
  }

  sayName(){
    console.log(`Hi! This is ${this.name}`);
  }

  sleep(time){

    this.queue = this.queue.then(() => {
      return new Promise(res => {

        // microtask 执行res
        setTimeout(() => {

          res();
        }, 1000 * time);
      });
    });

    return this;
  }

  eat(food){

    this.queue.then(() => {
      console.log(`${this.name} eat ${food}`);
    })
  }

}

CodingMan('Peter').sleepFirst(5).eat('supper');
