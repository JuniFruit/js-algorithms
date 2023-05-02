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
