import { countInversions, mergeWithSmallAux } from "./mergeSortTasks";

describe("Merge sort questions", () => {
  describe("Merge with small aux array", () => {
    let input = [];
    let input2 = [];
    beforeEach(() => {
      input = [1, 2, 3, 4];
      input2 = [5, 12, 16, 100];
    });

    afterEach(() => {
      input = [];
      input2 = [];
    });

    test("should return sorted array ", () => {
      expect(mergeWithSmallAux(input, input2)).toEqual([
        1, 2, 3, 4, 5, 12, 16, 100,
      ]);
    });
    test("should return sorted array ", () => {
      expect(mergeWithSmallAux(input2, input)).toEqual([
        1, 2, 3, 4, 5, 12, 16, 100,
      ]);
    });
    test("should return sorted array ", () => {
      expect(mergeWithSmallAux(input, [...input])).toEqual([
        1, 1, 2, 2, 3, 3, 4, 4,
      ]);
    });
  });

  describe("Count inversions", () => {
    test("should return number of inversions within an array", () => {
      const input = [1, 5, 2, 7, 3, 19, 12];
      expect(countInversions(input)).toBe(4);
    });
    test("should return number of inversions within an array", () => {
      const input = [1, 5, 2, 7, 3, 19, 12, 22, 18];
      expect(countInversions(input)).toBe(6);
    });
    test("should return number of inversions within an array", () => {
      const input = [2, 4, 1, 3, 5];
      expect(countInversions(input)).toBe(3);
    });
    test("should return number of inversions within an array", () => {
      const input = [8, 4, 2, 1];
      expect(countInversions(input)).toBe(6);
    });
  });
  //   describe("Shuffle linked list", () => {
  //     test("should return uniformly shuffled linked list", () => {});
  //   });
});
