const insertSort = arr => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j > 0 && arr[j] < arr[j-1]; j--) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr [j]];
    }
  }
}
const test = [3,1,2,3,4];

insertSort(test);

console.log(test)