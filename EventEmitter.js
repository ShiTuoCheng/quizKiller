class EventEmitter {
  constructor() {
    this.events = Object.create(null);
  }

  $on(event, fn) {
    (this.events[event] || (this.events[event] = [])).push(fn);
  }

  $off(event, fn) {
    if (event && !fn) {
      this.events[event] = null;
      return;
    }

    if (event && fn) {
      const i = (this.events[event] || []).length;
      while (i--) {
        const cb = this.events[event][i];
        if (cb === fn) {
          this.events[event].splice(i, 1);
          break;
        }
      }
    }
  }

  $once(event, fn) {
    this.$on(event, function on() {
      fn.call(this, arguments);
      this.$off(event, on);
    });
  }

  $emit(event) {
    const cbs = this.events[event];
    const args = [...arguments].slice(1);
    if (cbs) {
      cbs.forEach(event => {
        event.apply(this, args);
      });
    }
  }
}

class EventBus {
  constructor() {
    this._events = {};
  }

  on(event, fn) {
    (this._events[event] || (this._events[event] = [])).push(fn);
  }

  off(event) {
    this._events[event] = null;
  }

  once(event, fn) {
    this.on(event, function () {
      fn.call(this, arguments);
      this.off(event);
    });
  }

  emit(event) {
    const argus = [].slice.call(arguments, 1);
    const fns = this._events[event];
    if (Array.isArray(fns)) {
      fns.forEach(fn => {
        fn.call(this, argus);
      });
    }
  }
}

function myNew(construct, ...args) {
  const temp = {};
  temp.__proto__ = construct.prototype;
  const res = construct.apply(temp, args);
  return typeof res === 'object' ? res : temp;
}

class Scheduler {
  constructor(limit = 2) {
    this.limit = limit;
    this.currentIndex = 0;
    this.queue = [];
  }

  next() {
    this.currentIndex++;
    this.queue
      .shift()()
      .then(() => {
        this.currentIndex--;
        if (this.queue.length) {
          this.next();
        }
      });
  }

  add(promiseCreator) {
    return new Promise(resolve => {
      const wrapper = () => promiseCreator().then(resolve);
      this.queue.push(wrapper);
      if (this.currentIndex <= this.limit) {
        this.next();
      }
    });
  }
}
