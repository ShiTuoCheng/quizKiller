Function.prototype.myCall = function (ctx, argus) {
  const context = ctx || window;
  const fn = Symbol('fn');
  context[fn] = this;
  const res = context[fn](argus);
  delete context[fn];
  return res;
}

Function.prototype.bind = function (ctx, argus) {
  const self = this;
  function bound () {
    const newArgs = argus.concat([...arguments]);
    return self.apply(this instanceof bound ? this : ctx, newArgs);
  }

  bound.prototype = Object.create(this.prototype);
  return bound;
}