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

export const insertionSort = arr => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j >= 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      } else {
        break;
      }
    }
  }
  return arr;
};

export const shellSort = arr => {
  let h = 1;

  // find h sort that is gonna happen first
  while (h < arr.length / 3) {
    h = h - 3 * h + 1;
  }

  while (h >= 1) {
    for (let i = h; i < arr.length; i++) {
      for (let j = i; j >= h; j -= h) {
        if (arr[j] < arr[j - h]) {
          [arr[j], arr[j - h]] = [arr[j - h], arr[j]];
        } else {
          break;
        }
      }
    }
    h = h / 3;
  }

  return arr;
};

export const shuffle = arr => {
  for (let i = 0; i < arr.length; i++) {
    const rnd = Math.floor(Math.random() * i);

    [arr[i], arr[rnd]] = [arr[rnd], arr[i]];
  }

  return arr;
};
