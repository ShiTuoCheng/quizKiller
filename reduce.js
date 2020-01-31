Array.propotype.reduce = (cb, initialValue) => {
  const arr = Array.prototype.slice.call(this);
  const previousValue = initalValue === void 0 ? arr[0] : initialValue;
  const startIndex = initialValue === void 0 ? 1 : 0;

  for (let i = startIndex; i < arr.length; i++) {
    cb.call(null, previousValue, i, this);
  }

  return res;
};