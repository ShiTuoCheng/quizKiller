/*jshint esversion: 6 */
/**
 * 1s后执行10， 等1s后输出20， 再等1s后输出30
 */

const task = (params) => {

  return new Promise(res => {
    setTimeout(() => {

      console.log(params);
      res();
    }, 1000);
  });
};

async function test(arr) {
  
  for (const item of arr) {
    await task(item);
    // console.log(i);
  }
}

let task2;

// function * task1(arr) {

//   yield arr[0];
//   yield arr[1];
//   yield arr[2];
// }

// const test2 = task1([10, 20, 30]);

// do {
//   setTimeout(() => {

//     task2 = test2.next();
//     console.log(task2.value);
//   }, 1000);
// } while (!task2.done);