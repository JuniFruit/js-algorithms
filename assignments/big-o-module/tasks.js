"use strict";

import { binarySearch } from "../../Binary Search/binSearch";

// Question 1
// 3-SUM in quadratic time

export const threeSum = (arr, sum) => {
  const sorted = arr.sort((a, b) => a - b);

  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      const { val } = binarySearch(sorted, sum - (sorted[i] + sorted[j]));
      if (val !== null && val !== sorted[i] && val !== sorted[j]) return true;
    }
  }
  return false;
};

// Question 2
// Bitonic search

export const bitonicSearch = (arr, target) => {
  function findBitonic(arr, l, r) {
    let mid = (l + r) >> 1;
    let point = -1;
    if (arr[mid - 1] < arr[mid] && arr[mid] > arr[mid + 1]) {
      return mid;
    } else if (arr[mid] > arr[mid - 1] && arr[mid] < arr[mid + 1]) {
      point = findBitonic(arr, mid, r);
    } else if (arr[mid] < arr[mid - 1] && arr[mid] > arr[mid + 1]) {
      point = findBitonic(arr, l, mid);
    }
    return point;
  }
  const bitonicPoint = findBitonic(arr, 0, arr.length - 1);
  function ascendingBiSearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      let mid = (left + right) >> 1;

      if (arr[mid] === target) {
        return arr[mid];
      } else if (arr[mid] > target) {
        right = mid - 1;
      } else if (arr[mid] < target) {
        left = mid + 1;
      }
    }
    return null;
  }

  function descendingBiSearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      let mid = (left + right) >> 1;

      if (arr[mid] === target) {
        return arr[mid];
      } else if (arr[mid] > target) {
        left = mid + 1;
      } else if (arr[mid] < target) {
        right = mid - 1;
      }
    }
    return null;
  }

  let found = null;
  if (arr[bitonicPoint] < target) {
    return null;
  } else if (arr[bitonicPoint] === target) {
    return arr[bitonicPoint];
  } else if (arr[bitonicPoint] > target) {
    found = ascendingBiSearch(arr.slice(0, bitonicPoint), target);
    if (found) return found;

    found = descendingBiSearch(arr.slice(bitonicPoint + 1, arr.length), target);
    if (found) return found;
    return null;
  }
};
