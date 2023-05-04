"use strict";

export const cyclicRotation = (str, str2) => {
  const map = [];

  if (str.length !== str2.length) return false;

  const N = str.length;

  for (let i = 0; i < N; i++) {
    map.push(str.substring(i, N));
  }

  for (let i = 0; i < map.length; i++) {
    let suffix = map[i];
    let sLen = suffix.length;
    if (str === str2.substring(sLen, N) + suffix) return true;
  }
  return false;
};

export const tandemRepeat = (str, tandem) => {
  const M = tandem.length;

  let count = 0;
  let currStr = str;
  while (true) {
    let found = findInd(currStr, tandem);
    if (found > -1) {
      count++;
      currStr = currStr.slice(found + M, currStr.length);
    } else {
      break;
    }
  }
  return count === 0 ? -1 : tandem.repeat(count);

  function findInd(str, pat) {
    const N = str.length;
    const M = pat.length;
    const R = 256;
    const right = Array(R).fill(-1);

    for (let i = 0; i < M; i++) {
      right[pat.charCodeAt(i)] = i;
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
    return -1;
  }
};
