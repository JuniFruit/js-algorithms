import { keyIndexedSort } from "./radixSorts";

describe("Radix sorts", () => {
  test("keyIndexedSort should return sorted arr by key ", () => {
    const input = [1, 1, 5, 5, 2, 2, 2, 4, 4];
    expect(keyIndexedSort(input)).toEqual([1, 1, 2, 2, 2, 4, 4, 5, 5]);
  });
});
