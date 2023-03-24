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

export const bitonicSearch = (arr, target) => {};
