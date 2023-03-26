export const selectionSort = arr => {
  for (let i = 0; i < arr.length; i++) {
    let ind = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[ind]) ind = j;
    }
    if (ind !== i) {
      [arr[i], arr[ind]] = [arr[ind], arr[i]];
    }
  }
  return arr;
};
