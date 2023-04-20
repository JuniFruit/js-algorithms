"use strict";

export const basicMergeSort = arr => {
  function merge(left, right) {
    let resultArray = [],
      leftIndex = 0,
      rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  function sort(arr) {
    if (arr.length < 2) return arr;
    let mid = arr.length >> 1;
    const left = sort(arr.splice(0, mid));
    const right = sort(arr);

    return merge(left, right);
  }

  return sort(arr);
};

// Comparators

class MyArray {
  constructor(arr) {
    this.arr = arr;
  }

  mySort(comparator) {
    for (let i = 1; i < this.arr.length; i++) {
      for (let j = i; j >= 0; j--) {
        if (comparator(this.arr[j], this.arr[j - 1]) < 0) {
          [this.arr[j - 1], this.arr[j]] = [this.arr[j], this.arr[j - 1]];
        } else {
          break;
        }
      }
    }
  }
}

const arr = new MyArray([1, 2, 3, 4, 5]);
arr.mySort((a, b) => a - b);
// console.log(arr.arr);
