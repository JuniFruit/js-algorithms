import { basicMergeSort } from "./mergeSort";
import { Point, CollinearFinder } from "./collinearPoints";
describe("Divide and conquer sorts", () => {
  let input = [];
  let input2 = [];
  let input3 = [];
  beforeEach(() => {
    input = [1, 2, 6, 3, 1, 6, 3];
    input2 = [1, 5, 2, 7, 3, 19, 12, 22, 18];
    input3 = [14, 52, 16, 100, 18, 20, 21, 55, 88, 92, 123];
  });
  afterEach(() => {
    input = [];
    input2 = [];
    input3 = [];
  });

  test("basic merge should return items in the ascending order", () => {
    expect(basicMergeSort(input)).toEqual([1, 1, 2, 3, 3, 6, 6]);
    expect(basicMergeSort(input2)).toEqual([1, 2, 3, 5, 7, 12, 18, 19, 22]);

    expect(basicMergeSort(input3)).toEqual([
      14, 16, 18, 20, 21, 52, 55, 88, 92, 100, 123,
    ]);
  });
});

describe("Collinear points", () => {
  describe("Point class", () => {
    test("should instantiate class with given coords", () => {
      const point = new Point(1, 1);
      expect(point.x).toBe(1);
      expect(point.y).toBe(1);
    });
    test("compareTo() should compare two points by y-coordinates, breaking ties by x-coordinates", () => {
      const point = new Point(1, 1);
      const point2 = new Point(4, 4);
      const point3 = new Point(4, 3);
      expect(point.compareTo(point2)).toBeLessThan(0);
      expect(point2.compareTo(point3)).toBeGreaterThan(0);
    });
    test("slopeTo() should compare the slope between this point and that point", () => {
      const point = new Point(1, 1);
      const point2 = new Point(4, 4);
      const point3 = new Point(4, 3);
      const point4 = new Point(3, 4);
      expect(point.slopeTo(point2)).toBe(1);
      expect(point2.slopeTo(point3)).toBe(-Infinity);
      expect(point2.slopeTo(point4)).toBe(-0);
      expect(point2.slopeTo(point2)).toBe(Infinity);
    });
    test("slopeOrder() should compare two points by slopes they make with this point", () => {
      const point = new Point(1, 1);
      const point2 = new Point(4, 4);
      const point3 = new Point(4, 3);
      expect(point.slopeOrder(point2, point3)).toBe(0);
      expect(point2.slopeOrder(point3, point2)).toBe(-1);
    });
  });
});
