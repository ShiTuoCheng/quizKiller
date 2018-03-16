// 如果次数相同 则按照值排序 比如  2, 2, 2和 1, 1, 1  应排序为 [1, 1, 1, 2, 2, 2]
// 比如 [1,2,1,2,1,3,4,5,4,5,5,2,2] => [3, 4, 4, 1, 1, 1, 5, 5, 5, 2, 2, 2, 2]
/*jshint esversion:6 */

let arr = [9, 7, 7, 1, 2, 1, 2, 1, 3, 4, 5, 4, 5, 5, 2, 2];

const sortByTimes = (arr) => {
  const result = [];
  // 其实根本不用promise，我就是想练习一下
  new Promise(
    resolve => {
      const map = {};

      for (let i = 0; i < arr.length; i++) {
        map[arr[i]] = (map[arr[i]] || 0) + 1;
      }

      resolve(map);
    }
  ).then(map => {
    const arr = [];

    for (const key in map) {
      if (map.hasOwnProperty(key)) {
        const item = map[key];
        
        arr.push([key, item]);
      }
    }
    return arr;
  }).then(arr => bubbleSort(arr))
    .then(d => {
      for(let i = 0; i < d.length; i++){
        for(let j = 0; j < d[i][1]; j++){
          result.push(d[i][0]);
        }
      }

      console.log(result);
    });
};

// low 二维数组排序 用了冒泡 low 时间复杂度n^2
const bubbleSort = arr => {
  for(let i = 0; i < arr.length - 1; i++){
    for(let j = 0; j < arr.length - i - 1; j++){

      if(arr[j][1] > arr[j+1][1]){
        swap(j, j+1, arr);
      }
    }
  }

  return arr;
};

const swap = (f, s, arr) => {
  let temp = arr[f];
  arr[f] = arr[s];
  arr[s] = temp;
}; 
