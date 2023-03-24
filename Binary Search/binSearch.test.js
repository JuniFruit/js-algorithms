import { binarySearch } from "./binSearch";
describe("Binary Search algorithm", () => {
  let arr = [1, 2, 5, 7, 15, 22, 42, 55];

  test("should return result within lgN tries", () => {
    const { val, count } = binarySearch(arr, 55);
    expect(val).toEqual(55);
    expect(count).toEqual(3);
  });
  test("should return result first try if the target is in the middle", () => {
    const { val, count } = binarySearch(arr, 7);
    expect(val).toEqual(7);
    expect(count).toEqual(1);
  });
  test("should return null and number of tries if the target doesnt exist", () => {
    const { val, count } = binarySearch(arr, 29);
    expect(val).toBeNull();
    expect(count).toEqual(3);
  });
});
