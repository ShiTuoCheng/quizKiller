const test = [2, 1, 3, 6, 4, 7, 5, 8, 9, 0,2,3,4,5,6,7,8,9,0];

function shellSort(arr) {
  var len = arr.length,
      temp,
      gap = 1;
  while(gap < len/3) {   
    console.log(gap)       //动态定义间隔序列
      gap =gap*3+1;
      console.warn(gap);
  }
  for (gap; gap > 0; gap = Math.floor(gap/3)) {
      for (var i = gap; i < len; i++) {
          temp = arr[i];
          for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
              arr[j+gap] = arr[j];
          }
          arr[j+gap] = temp;
      }
  }
  return arr;
}

const shellSort1 = arr => {
    const len = arr.length;
    let gap = 1;

    while (gap < len/3) {
        gap = gap * 3 + 1; // 1, 4, 13, 40 ...
    }

    while (gap >= 1) {
        for (let i = gap; i < len; i++) {
            for (let j = i - 1; j >= 0 && arr[j] < arr[j - gap]; j -= gap) {
                [arr[j], arr[j-gap]] = [arr[j-gap], arr[j]];
            }
        }
        gap = gap/3;
    }

    return arr;
}

shellSort1(test)

console.log(shellSort1(test));
