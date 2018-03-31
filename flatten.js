/* 展平数组 */
/*[1, [2, [3, [4]], 5]] */
/*jshint esversion:6 */
let arr = [[1, 2], 3, [[[4], 5]]]; // 数组展平
let res = [];
function flatten (arr) {
  [...arr].map((v) => {
    if(Array.isArray(v)){
      flatten(v);
    }else{
      res.push(v);
    }
  });
}

flatten(arr);
