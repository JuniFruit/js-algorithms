export const binarySearch = (arr, target) => {
  let count = 0;
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = (left + right) >> 1;

    let curr = arr[mid];

    if (curr === target) {
      return {
        val: curr,
        count: count === 0 ? count + 1 : count,
      };
    } else if (curr > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
    count++;
  }
  return {
    val: null,
    count,
  };
};
