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
