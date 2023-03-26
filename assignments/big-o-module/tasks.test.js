import { bitonicSearch, threeSum } from "./tasks";

describe("BigO Tasks", () => {
  describe("3Sum", () => {
    const arr = [30, -40, -20, -10, 40, 0, 10, 5];
    test("should return true if there such numbers", () => {
      expect(threeSum(arr, 0)).toBe(true);
      expect(threeSum(arr, 5)).toBe(true);
      expect(threeSum(arr, 10)).toBe(true);
    });
    test("should return false if there are no such numbers ", () => {
      expect(threeSum(arr, 100)).toBe(false);
      expect(threeSum(arr, 150)).toBe(false);
      expect(threeSum(arr, 200)).toBe(false);
      expect(threeSum(arr, 350)).toBe(false);
      expect(threeSum(arr, -100)).toBe(false);
      expect(threeSum(arr, -250)).toBe(false);
    });
  });
  describe("Bitonic search", () => {
    const arr = [-8, 1, 2, 3, 4, 5, -2, -3];

    test("should return target", () => {
      expect(bitonicSearch(arr, -2)).toEqual(-2);
      expect(bitonicSearch(arr, 1)).toEqual(1);
      expect(bitonicSearch(arr, 5)).toEqual(5);
    });
    test("should return null if there is no such target", () => {
      expect(bitonicSearch(arr, 100)).toBeNull();
      expect(bitonicSearch(arr, -1)).toBeNull();
    });
  });
});
