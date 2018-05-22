/*jshint esversion:6 */
/**
 * 斐波那契数列实现
 */

const fibonachi = (n, a = 0, b = 1) => {

  if(n === 1) return 1;
  if(n === 0) return 0;
  return fibonachi(n - 1, a, a + b);
};