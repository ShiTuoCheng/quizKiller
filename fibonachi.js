/* jshint esversion:6 */
/**
 * 斐波那契数列实现
 */

const fibonachi = (n, a = 0, b = 1) => {
  if (n === 1) {
    return 1;
  }
  if (n === 0) {
    return 0;
  }
  return fibonachi(n - 1, a, a + b);
};

const fi = n => {
  const dp = [];
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[n] = dp[n - 1] + dp[n - 2];
  }
  return dp[n];
};
