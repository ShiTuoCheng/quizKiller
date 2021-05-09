const test = [10,9,2,5,3,7,101,18];

const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let mid = (left + right) >> 1;
    if (target < arr[mid]) {
      right = mid - 1;
    }

    if (target > arr[mid]) {
      left = mid + 1;
    }

    if (target === arr[mid]) {
      return mid;
    }
  }
}

const test = [1,4,3,4,2,3];
const LengthOfLIS1 = (arr) => {
  const result = new Array(arr.length).fill(1);
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        result[i] = Math.max(result[i], result[j] + 1);
      }
    }
  }
  console.log(result);
}

console.log(LengthOfLIS1(test));


// const test = [10,9,2,5,3,7,101,18];
const LengthOfLIS2 = (arr) => {
  const result = [arr[0]];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item > result[result.length - 1]) {
      result.push(item);
    } else {
      // 二分查找
      let leftIndex = 0;
      let rightIndex = result.length - 1;
      while (leftIndex < rightIndex) {
        let midIndex = (rightIndex + leftIndex) >> 1;
        if (result[midIndex] < arr[i]) {
          leftIndex = midIndex + 1;
        } else {
          rightIndex = midIndex;
        }
      }
      result[leftIndex] = arr[i];
    }
  }
  console.log(result);
  return result.length;
}