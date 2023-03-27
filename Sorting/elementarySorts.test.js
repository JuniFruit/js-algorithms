import {
  selectionSort,
  insertionSort,
  shellSort,
  shuffle,
} from "./elementarySorts.js";

describe("Elementary sorts", () => {
  let input = [];
  let input2 = [];
  let input3 = [];
  let input4 = [];
  beforeEach(() => {
    input = [1, 2, 6, 3, 1, 6, 3];
    input2 = [1, 2, 3, 4, 5, 6];
    input3 = [100, 6, 7, 3, 1, 2];
    input4 = [700, 300, 132, 57, 23, 10, 4, 1];
  });
  afterEach(() => {
    input = [];
    input2 = [];
    input3 = [];
    input4 = [];
  });

  test("Selection sort should return items in the ascending order", () => {
    expect(selectionSort(input)).toEqual([1, 1, 2, 3, 3, 6, 6]);

    expect(selectionSort(input2)).toEqual([1, 2, 3, 4, 5, 6]);

    expect(selectionSort(input3)).toEqual([1, 2, 3, 6, 7, 100]);
  });
  test("Insertion sort should return items in the ascending order", () => {
    expect(insertionSort(input)).toEqual([1, 1, 2, 3, 3, 6, 6]);

    expect(insertionSort(input2)).toEqual([1, 2, 3, 4, 5, 6]);

    expect(insertionSort(input3)).toEqual([1, 2, 3, 6, 7, 100]);
  });
  test("Shell sort should return items in the ascending order", () => {
    expect(shellSort(input)).toEqual([1, 1, 2, 3, 3, 6, 6]);

    expect(shellSort(input2)).toEqual([1, 2, 3, 4, 5, 6]);

    expect(shellSort(input3)).toEqual([1, 2, 3, 6, 7, 100]);
    expect(shellSort(input4)).toEqual(input4.reverse());
  });
  test("Shuffle should return randomly sorted arr", () => {
    // not a valid test

    expect(shuffle(input3)).toBeTruthy();
  });
});
