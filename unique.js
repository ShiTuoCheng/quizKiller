// 例如：[1，2，4，4，3，3，1，5，3]
// 输出：[1，3，4]
/*jshint esversion: 6 */
let arr = [1, 2, 4, 4, 3, 3, 1, 5, 3];

//low的方法 时间复杂度n^2
const unique1 = (arr) => {
  //创建两个用于缓存
  let num1, num2;
  const result = [];
  for(let i = 0 ; i < arr.length - 1; i++){
    num1 = arr[i];
    for(let j = i + 1 ; j < arr.length; j++){
      num2 = arr[j];
      if(num1 === num2){
        result.push(num1);
      }
    }
  }
  return [...new Set(result)];
};

// map 缓存法 高级函数 low：申请额外内存
const unique2 = (arr) => {
  const result = [], map = {};

  arr.map((v) => {
    if(map[v] === 1){
      result.push(v);
    }

    map[v] = (map[v] || 0) + 1;
  });

  return result;
};

// 整体逻辑：遍历数组并查找元素下标，同时调用lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引
const unique3 = (arr) => {
  const result = [];

  for(let i = 0; i < arr.length; i++){
    if (arr.indexOf(arr[i]) === i && arr.lastIndexOf(arr[i]) !== i){
      result.push(arr[i]);
    }
  }

  return result;
};

const unique3_1 = arr => {

  const res = arr.filter( (v, i, self) => self.indexOf(v) === self.lastIndexOf(v));
  return res;
};
