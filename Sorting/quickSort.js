"use strict";

import { shuffle } from "./elementarySorts";

export const quickSort = inputArr => {
  function partitioning(arr, l, r) {
    let i = l;
    let j = r + 1;
    while (true) {
      while (arr[++i] < arr[l]) {
        if (i === r) break;
      }

      while (arr[--j] > arr[l]) {
        if (j === l) break;
      }
      if (i >= j) break;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    [arr[l], arr[j]] = [arr[j], arr[l]];
    return j;
  }

  function sort(arr, l, r) {
    if (r <= l) return;
    let j = partitioning(arr, l, r);

    sort(arr, l, j - 1);
    sort(arr, j + 1, r);
  }
  shuffle(inputArr);
  sort(inputArr, 0, inputArr.length - 1);
  return inputArr;
};

export const quickSelect = (input, k) => {
  shuffle(input);

  let left = 0;
  let right = input.length - 1;
  while (left < right) {
    let pivot = partitioning(input, left, right);
    if (pivot > k - 1) {
      right = pivot - 1;
    } else if (pivot < k - 1) {
      left = pivot + 1;
    } else if (pivot === k - 1) {
      return input[k - 1];
    }
  }
  return input[k - 1];

  function partitioning(arr, l, r) {
    let i = l;
    let j = r + 1;
    while (true) {
      while (arr[++i] < arr[l]) {
        if (r === i) break;
      }
      while (arr[--j] > arr[l]) {
        if (j === l) break;
      }
      if (i >= j) break;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    [arr[l], arr[j]] = [arr[j], arr[l]];
    return j;
  }
};

export const ThreeWayQuickSort = arr => {
  function sort(a, l, r) {
    if (r <= l) return;

    let lt = l;
    let gt = r;
    let pivotElement = a[l];
    let i = l;

    while (i <= gt) {
      if (pivotElement > a[i]) {
        [a[i], a[lt]] = [a[lt], a[i]];
        i++;
        lt++;
      } else if (pivotElement < a[i]) {
        [a[i], a[gt]] = [a[gt], a[i]];
        gt--;
      } else {
        i++;
      }
    }

    sort(a, l, lt - 1);
    sort(a, gt + 1, r);
  }

  sort(arr, 0, arr.length - 1);
  return arr;
};
