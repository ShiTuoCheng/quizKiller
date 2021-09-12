function request() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({data: 'request'});
    }, 1000);
  });
}

co(function* getData() {
  var result = yield request();
  // 1s后打印 {data: "request"}
  console.log(result)
})

// 实现co函数
function co (gen) {
  const ctx = this;
  const args = Array.prototype.slice.call(arguments, 1);
  gen = gen.apply(ctx, args);
  return new Promise((resolve, reject) => {
    function next (ret) {
      if (ret.done) {
        resolve(ret.value);
      }
      const promise = ret.value;
      if (promise && typeof promise.then === 'function') {
        promise.then(res => {
          const ret = gen.next(res);
          next(ret);
        })
      }
    }

    const ret = gen.next();
    next(ret);
  })
}