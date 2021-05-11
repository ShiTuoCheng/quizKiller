/* 展平数组 */
/* [1, [2, [3, [4]], 5]] */
/* jshint esversion:6 */
let arr = [[1, 2], 3, [[[4], 5]]]; // 数组展平
let res = [];
function flatten(arr) {
  [...arr].map(v => {
    if (Array.isArray(v)) {
      flatten(v);
    } else {
      res.push(v);
    }
  });
}

flatten(arr);

function flatten2(arr) {
  return arr.reduce((a, c, i) => {
    if (Array.isArray(c)) {
      return [...a, ...flatten2(c)];
    } else {
      return [...a, c];
    }
  }, []);
}

console.log(flatten2(arr));
