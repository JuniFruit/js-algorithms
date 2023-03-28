import { basicMergeSort } from "./mergeSort";

describe("Elementary sorts", () => {
  let input = [];
  let input2 = [];
  let input3 = [];
  beforeEach(() => {
    input = [1, 2, 6, 3, 1, 6, 3];
    input2 = [700, 300, 132, 57, 23, 10, 4, 1];
    input3 = [14, 52, 16, 100, 18, 20, 21, 55, 88, 92, 123];
  });
  afterEach(() => {
    input = [];
    input2 = [];
    input3 = [];
  });

  test("basic merge should return items in the ascending order", () => {
    expect(basicMergeSort(input)).toEqual([1, 1, 2, 3, 3, 6, 6]);

    expect(basicMergeSort(input3)).toEqual([
      14, 16, 18, 20, 21, 52, 55, 88, 92, 100, 123,
    ]);
  });
});
