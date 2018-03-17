/*jshint esversion:6 */
const arr = [1,2,3,4,5,6,7,8,9,10];

const shuffle = arr => {
  let i = arr.length;

  while(i){
    let j = Math.floor(Math.random() * i--);

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

const shuffle_1 = arr => {
  for(let i = arr.length-1; i > 0; i--){
    let j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};