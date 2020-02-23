// 设计一个简单的任务队列, 要求分别在 1,3,4 秒后打印出 "1", "2", "3"

class Queue {
  constructor () {
    this.queue = [];
    this.time = 0;
  }

  task(timer, fn) {
    this.queue.push({ fn, timer: this.time });
    this.time += timer;
    return this;
  }

  start () {
    this.queue.forEach(task => {
      setTimeout(() => {
        task.fn();
      }, task.timer);
    });
  }
}