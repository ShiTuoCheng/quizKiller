
// 调整为大顶堆
const maxHeapify = (arr, index, heapSize) => {
  let iMax = index, // 
      iLeft = 2 * index + 1, // 左子树
      iRight = (index + 1) * 2; // 右子树

  if (iLeft < heapSize && arr[index] < arr[iLeft]) {
    iMax = iLeft;
  }

  if (iRight < heapSize && arr[index] > arr[iRight]) {
    iMax = iRight;
  }

  if (iMax !== index) {
    [arr[iMax], arr[index]] = [arr[index], arr[iMax]];
    maxHeapify(arr, iMax, heapSize);
  }
}

// 创建大顶堆
const buildMaxHeap = (arr, heapSize) => {
  let i, iParent = Math.floor(heapSize / 2);
  for (i=iParent; i>=0; i--) {
    maxHeapify(arr, i, heapSize);
  }
}

// 堆排序
const heapSort = (arr, heapSize) => {
  let i;
  buildMaxHeap(arr, heapSize);
  for (i=heapSize-1; i>0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    maxHeapify(arr, 0, i);
  }
};