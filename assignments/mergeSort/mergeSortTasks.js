// Question 1;

export const mergeWithSmallAux = (sorted, sorted2) => {
  const len = sorted.length + sorted2.length;
  const half = Math.floor(len / 2);
  const aux = Array(half);

  function merge() {
    for (let k = 0; k < half; k++) {
      aux[k] = sorted[k];
    }
    let i = 0;
    let j = half;
    let k = 0;
    while (k < len) {
      if (i >= half) {
        sorted = sorted.concat(sorted2.splice(j - half, sorted2.length));
        break;
      } else if (j >= len) {
        sorted = sorted.concat(aux.splice(i, aux.length));
        break;
      } else if (aux[i] <= sorted2[j - half]) {
        sorted[k++] = aux[i++];
      } else {
        sorted[k++] = sorted2[j - half];
        j++;
      }
    }
  }
  merge();
  return sorted;
};

// Question 2

export const countInversions = arr => {
  function sort(arr) {
    if (arr.length < 2) return [arr, 0];
    let mid = Math.floor(arr.length / 2);
    const [left, count1] = sort(arr.splice(0, mid));
    const [right, count2] = sort(arr);
    const [merged, count3] = merge(left, right);
    return [merged, count1 + count2 + count3];
  }

  function merge(left, right) {
    const aux = [];
    let count = 0;
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        aux.push(left.shift());
      } else {
        aux.push(right.shift());
        count += left.length;
      }
    }

    return [[...aux, ...left, ...right], count];
  }
  const [sorted, count] = sort(arr);
  return count;
};
