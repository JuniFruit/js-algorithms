import { selectionSort } from "./selectionSort";

describe("Selection sort", () => {
  test("should return items in an ascending order", () => {
    const input = [1, 2, 6, 3, 1, 6, 3];

    expect(selectionSort(input)).toEqual([1, 1, 2, 3, 3, 6, 6]);

    const input2 = [1, 2, 3, 4, 5, 6];
    expect(selectionSort(input2)).toEqual([1, 2, 3, 4, 5, 6]);

    const input3 = [100, 6, 7, 3, 1, 2];
    expect(selectionSort(input3)).toEqual([1, 2, 3, 6, 7, 100]);
  });
});
