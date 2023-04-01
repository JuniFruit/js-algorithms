// Question 1

export const nutsAndBolts = (arr1, arr2) => {
  const merged = arr1.concat(arr2);

  sort(merged, 0, merged.length - 1);

  let arrI = 0;
  let arrII = 0;

  for (let i = 0; i < merged.length; i++) {
    const isOdd = i % 2 !== 0;
    if (isOdd) {
      arr1[arrI++] = merged[i];
    } else {
      arr2[arrII++] = merged[i];
    }
  }

  function sort(a, l, r) {
    if (r <= l) return;
    let pivot = a[l];
    let i = l;
    let gt = r;
    let lt = l;

    while (i <= gt) {
      if (a[i] < pivot) {
        [a[i], a[lt]] = [a[lt], a[i]];
        i++;
        lt++;
      } else if (a[i] > pivot) {
        [a[i], a[gt]] = [a[gt], a[i]];
        gt--;
      } else {
        i++;
      }
    }
    sort(a, l, lt - 1);
    sort(a, gt + 1, r);
  }
};

// Question 2

export const selectK = (arr1, arr2, k) => {
  const shiftedK = k - 1;
  const concat = arr1.concat(arr2);

  return sort(concat, 0, concat.length - 1);

  function sort(a, l, r) {
    let i = l;
    let j = r;

    while (l < r) {
      let pivot = partitioning(a, i, j);

      if (pivot < shiftedK) {
        i = pivot + 1;
      } else if (pivot > shiftedK) {
        j = pivot - 1;
      } else {
        return a[shiftedK];
      }
    }
    return a[shiftedK];
  }

  function partitioning(arr, l, r) {
    let i = l;
    let j = r + 1;
    let pivot = arr[l];
    while (true) {
      while (arr[++i] < pivot) {
        if (i === r) break;
      }

      while (arr[--j] > pivot) {
        if (j === l) break;
      }

      if (j <= i) break;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    [arr[j], arr[l]] = [arr[l], arr[j]];
    return j;
  }
};

// Question 3

export const decimalDominants = arr => {};
