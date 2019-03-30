const selectSort = arr => {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[min] > arr [j]) min = j;
      [arr[min], arr[i]] = [arr[i], arr[min]];
    }
  }
}

const arr = [2,5,1,3];

selectSort(arr);

console.log(arr);