/*jshint esversion:6 */
/**
 * destructuringArray([1, [2, 3], 4], '[a, [b], c]') => {a: 1, b: 2, c: 3}
 */

 const destructuringArray = (valArr, keyStr) => {

  const result = {};

  // 获得key
  const keyArr = Array.from(keyStr).filter(v => /(\w+)/.test(v));
  
  // 获得展开数组
  const flattenValArr = flatten(valArr);

  keyArr.forEach((v, i) => {

    result[v] = flattenValArr[i];
  });

  return result;
 };

 // 展开数组
 const flatten = (arr) => {

  return arr.reduce((a, c) => {
    if(Array.isArray(c)){

      return [...a, ...flatten(c)];
    }else{

      return [...a, c];
    }
  }, []);

 };

console.log(destructuringArray([1, [2, 3], 4], '[a, [b], c]'));

// destructuringArray([1, [2, 3], 4], '[a, [b], c]')

const reverse = function (head) {
    
}