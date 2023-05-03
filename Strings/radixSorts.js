"use strict";

export const keyIndexedSort = input => {
  const count = Array(input.length + 1).fill(0);
  const aux = [];

  for (let i = 0; i < input.length; i++) {
    count[input[i] + 1] += 1;
  }

  for (let j = 0; j < count.length - 1; j++) {
    count[j + 1] += count[j];
  }
  for (let k = 0; k < input.length; k++) {
    aux[count[input[k]]++] = input[k];
  }
  input = aux;
  return input;
};

export const lsdSort = (strArr, strLen) => {
  const R = 258;
  const W = strArr.length;
  const aux = [];

  for (let i = strLen - 1; i >= 0; i--) {
    const count = Array(R + 1).fill(0);

    for (let j = 0; j < W; j++) {
      count[strArr[j].charCodeAt(i) + 1]++;
    }
    for (let j = 0; j < R; j++) {
      count[j + 1] += count[j];
    }
    for (let j = 0; j < W; j++) {
      aux[count[strArr[j].charCodeAt(i)]++] = strArr[j];
    }
    for (let j = 0; j < W; j++) {
      strArr[j] = aux[j];
    }
  }
  return strArr;
};

export const nonFixedLsd = input => {
  const N = input.length;

  let W = -Infinity;
  for (let i = 0; i < N; i++) {
    input[i] = input[i].toString();
    W = Math.max(W, input[i].length);
  }

  const findCode = (arr, ind, key) => {
    return isNaN(arr[ind].charCodeAt(key)) ? -1 : arr[ind].charCodeAt(key);
  };

  const R = 258;

  const aux = [];
  for (let d = W - 1; d >= 0; d--) {
    const count = Array(R + 1).fill(0);

    for (let i = 0; i < N; i++) {
      count[findCode(input, i, d) + 2]++;
    }

    for (let i = 0; i < R; i++) {
      count[i + 1] += count[i];
    }

    for (let i = 0; i < N; i++) {
      aux[count[findCode(input, i, d) + 1]++] = input[i];
    }
    for (let i = 0; i < N; i++) {
      input[i] = aux[i];
    }
  }
  return input;
};
