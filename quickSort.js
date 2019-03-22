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

const qs = (arr, l, r) => {
  if (l >= r) return;
  let left = l;
  let right = r;

  let middle = arr[l];

  while(left < right) {
    while(left < right && arr[right] >= middle) {
      right--;
    }

    while(left < right && arr[left] <= middle) {
      left++;
    }

    [arr[left], arr[right]] = [arr[right], arr[left]];
  }

  [arr[l], arr[left]] = [arr[left], arr[l]];
  qs(arr, l, left - 1);
  qs(arr, right + 1, r);
}

const arr = [2,1,4,5,3];

qs(arr, 0, 4);

console.log(arr);