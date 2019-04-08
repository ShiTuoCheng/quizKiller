const _map = (cb, arr) => {
  arr.reduce((a, c, ci, arr) => {
    cb(c, ci);
    return [...a, c];
  }, []);
}

_map((v, i) => {
  console.log(v);
  console.warn(i);
}, [1,2,3,4,5])