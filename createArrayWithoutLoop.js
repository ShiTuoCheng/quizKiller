/*不用循环生成数组，并且每个元素的值等于它的下标*/
/*jshint esversion:6 */

// 文膜 \口.口/
Array(10).fill('naive').reduce((a, c, i) => a.concat(i), []);

// 换个膜法
Array(10).fill('navie').map((v, i) => v = i);

// low的膜
const arr = [];
let count = 0;

const fillArray = len => {
  const timer = setTimeout(() => {
    count++;
    if(count > len){
      clearTimeout(timer);
    }else {
      arr.push(count);
      fillArray(len);
    }
  }, 0);
};

//to-do
