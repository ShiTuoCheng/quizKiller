/* jshint esversion: 6 */
/**
 * 快速排序
 */

// 交换函数
const swap = (array, i, j) => {
  if(!Array.isArray(array)) return;
  [array[i], array[j]] = [array[j], array[i]];
};

// 分区操作
// const partition = (array, low, high) => {

//   // 取个基准
//   let pivot = array[low]

//   while(low < high){

//     while(low < high && array[high] > pivot){
//       --high;
//     }
//     // 交换一下
//     array[low] = array[high];

//     while(low < high && array[low] <= pivot){
//       ++low;
//     }
//     // 交换一下
//     array[high] = array[low];
//   }

//   array[low] = pivot;
//   return low; 
// };

// // 快速排序
// const quickSort = (arr, low, high) => {

//   if(low < high){

//     let pivot = partition(arr, low, high);
//     quickSort(arr, low, pivot - 1);
//     quickSort(arr, pivot + 1, high);
//   }

//   return arr;
// }

const arr = [2,3,1,4,5];

const partition = (arr, low, high) => {

  let pivot = arr[low];

  while(low < high){

    while (low < high && arr[low] <= pivot  ) {
      ++low;
    }

    // 交换
    arr[high] = arr[low];

    while(low < high && pivot < arr[high]){
      --high;
    }

    arr[low] = arr[high];
  }

  arr[low] = pivot;
  return low;
};

const quickSort = (arr, low, high) => {

  if(low < high){

    let pivot = partition(arr, low, high);
    quickSort(arr, pivot + 1, high);
    quickSort(arr, low, pivot - 1);
  }

  return arr;
};

// const partition = (arr, low, high) => {

//   let pivot = arr[low];

//   while(low < high){

//     while(low < high && arr[high] > pivot){

//       --high;
//     }

//     arr[low] = arr[high];

//     while(low < high && arr[low] <= pivot){

//       ++low;
//     }

//     arr[high] = arr[low];
//   }

//   arr[low] = pivot;
//   return low;
// }

// const quickSort = (arr, low, high) => {

//   if(low < high){

//     let pivot = partition(arr, low, high);

//     quickSort(arr, low, pivot - 1);
//     quickSort(arr, pivot + 1, high);
//   }

//   return arr;
// }



console.log(quickSort(arr, 0, 4));