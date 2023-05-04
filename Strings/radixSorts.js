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

export const boyenMoore = (str, pat) => {
  const N = str.length;
  const M = pat.length;
  const R = 258;

  const right = Array(R).fill(-1);

  for (let j = 0; j < M; j++) {
    right[pat.charCodeAt(j)] = j;
  }

  let skip;

  for (let i = 0; i < N - M; i += skip) {
    skip = 0;

    for (let j = M - 1; j >= 0; j--) {
      if (pat.charAt(j) !== str.charAt(j + i)) {
        skip = Math.max(1, j - right[str.charCodeAt(j + i)]);
        break;
      }
    }
    if (skip === 0) return i;
  }

  return N;
};

export const rabinKarp = (str, pat) => {
  const R = 256;
  const Q = 997;
  const M = pat.length;
  const N = str.length;

  let RM = 1;
  for (let i = 1; i <= M - 1; i++) {
    RM = (RM * R) % Q;
  }
  const patHash = hash(pat, M);
  let textHash = hash(str, M);
  if (patHash === textHash) return 0;

  for (let i = M; i < N; i++) {
    //prettier-ignore
    textHash = (textHash + Q - RM * str.charCodeAt(i - M) % Q) % Q;
    textHash = (textHash * R + str.charCodeAt(i)) % Q;
    if (patHash === textHash) return i - M + 1;
  }
  return N;

  function hash(str, len) {
    let h = 0;
    for (let i = 0; i < len; i++) {
      h = (R * h + str.charCodeAt(i)) % Q;
    }
    return h;
  }
};
