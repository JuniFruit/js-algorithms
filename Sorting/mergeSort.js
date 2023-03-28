"use strict";

export const basicMergeSort = arr => {
  function merge(lArr, rArr) {
    const aux = [];

    while (lArr.length && rArr.length) {
      if (lArr[0] <= rArr[0]) {
        aux.push(lArr.shift());
      } else {
        aux.push(rArr.shift());
      }
    }
    aux.push(...lArr, ...rArr);
    return aux;
  }

  function sort(arr) {
    if (arr.length < 2) return arr;
    let mid = Math.floor(arr.length / 2);
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
