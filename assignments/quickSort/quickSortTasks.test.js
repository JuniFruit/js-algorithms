import { nutsAndBolts, selectK } from "./quickSortTasks";

describe("Quick sort tasks", () => {
  test("Nuts and bolts should return two sorted arrays", () => {
    const nuts = ["@", "#", "$", "%", "^", "&"];
    const bolts = ["$", "%", "&", "^", "@", "#"];

    nutsAndBolts(nuts, bolts);
    expect(nuts).toEqual(["#", "$", "%", "&", "@", "^"]);
    expect(bolts).toEqual(["#", "$", "%", "&", "@", "^"]);
  });
  test("Selection in two sorted arrays should return k-th element at the sorted array", () => {
    const arr1 = [2, 3, 6, 7, 9];
    const arr2 = [1, 4, 8, 10];
    const k = 5;
    expect(selectK(arr1, arr2, k)).toBe(6);
  });
  test("Decimal dominants should return arr of values occured n/10 times within n input arr", () => {});
});
