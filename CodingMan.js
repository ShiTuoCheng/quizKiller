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

CodingMan('Peter').sleepFirst(5).eat('supper');