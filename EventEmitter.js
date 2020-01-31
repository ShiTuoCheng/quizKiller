class EventEmitter {
  constructor () {
    this.events = Object.create(null);
  }

  $on (event, fn) {
    (this.events[event] || (this.events[event] = [])).push(fn);
  }

  $off (event, fn) {
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

  $once (event, fn) {
    this.$on(event, function on () {
      fn.call(this, arguments);
      this.$off(event, on);
    });
  }

  $emit (event) {
    const cbs = this.events[event];
    const args = [...arguments].slice(1);
    if (cbs) {
      cbs.forEach(event => {
        event.apply(this, args);
      })
    }
  }
}