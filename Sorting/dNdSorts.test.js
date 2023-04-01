import { basicMergeSort } from "./mergeSort";
import { quickSort, quickSelect, ThreeWayQuickSort } from "./quickSort";
// import { Point, CollinearFinder } from "./collinear/collinearPoints";
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
  test("quick sort should return items in the ascending order", () => {
    expect(quickSort(input2)).toEqual([1, 2, 3, 5, 7, 12, 18, 19, 22]);

    expect(quickSort(input3)).toEqual([
      14, 16, 18, 20, 21, 52, 55, 88, 92, 100, 123,
    ]);
  });
  test("quick select should return k-th smallest element from n distinct keys array", () => {
    expect(quickSelect([7, 10, 4, 3, 20, 15], 3)).toBe(7);
    expect(quickSelect(input2, 3)).toBe(3);

    expect(quickSelect(input3, 5)).toBe(21);
  });
  test("3 way quick sort should return items in the ascending order", () => {
    expect(ThreeWayQuickSort(input2)).toEqual([1, 2, 3, 5, 7, 12, 18, 19, 22]);

    expect(ThreeWayQuickSort(input3)).toEqual([
      14, 16, 18, 20, 21, 52, 55, 88, 92, 100, 123,
    ]);
    expect(ThreeWayQuickSort(input)).toEqual([1, 1, 2, 3, 3, 6, 6]);
  });
});

// describe("Collinear points", () => {
//   describe("Point class", () => {
//     test("should instantiate class with given coords", () => {
//       const point = new Point(1, 1);
//       expect(point.x).toBe(1);
//       expect(point.y).toBe(1);
//     });
//     test("compareTo() should compare two points by y-coordinates, breaking ties by x-coordinates", () => {
//       const point = new Point(1, 1);
//       const point2 = new Point(4, 4);
//       const point3 = new Point(4, 3);
//       expect(point.compareTo(point2)).toBeLessThan(0);
//       expect(point2.compareTo(point3)).toBeGreaterThan(0);
//     });
//     test("slopeTo() should compare the slope between this point and that point", () => {
//       const point = new Point(1, 1);
//       const point2 = new Point(4, 4);
//       const point3 = new Point(4, 3);
//       const point4 = new Point(3, 4);
//       expect(point.slopeTo(point2)).toBe(1);
//       expect(point2.slopeTo(point3)).toBe(-Infinity);
//       expect(point2.slopeTo(point4)).toBe(-0);
//       expect(point2.slopeTo(point2)).toBe(Infinity);
//     });
//     test("slopeOrder() should compare two points by slopes they make with this point", () => {
//       const point = new Point(1, 1);
//       const point2 = new Point(4, 4);
//       const point3 = new Point(4, 3);
//       expect(point.slopeOrder(point2, point3)).toBe(0);
//       expect(point2.slopeOrder(point3, point2)).toBe(-1);
//     });
//   });
//   describe("Collinear Finder", () => {
//     test("segments() should return correct line segments arr", () => {
//       const map = [
//         [4000, 30000],
//         [3500, 28000],
//         [3000, 26000],
//         [2000, 22000],
//         [1000, 18000],
//         [13000, 21000],
//         [23000, 16000],
//         [28000, 13500],
//         [28000, 5000],
//         [28000, 1000],
//       ];
//       const points = map.map(item => new Point(item[0], item[1]));
//       const finder = new CollinearFinder(points);
//       const segments = finder.segments();
//       expect(segments.length).toBe(2);
//       expect(segments[0].p.x).toBe(4000);
//       expect(segments[0].p.y).toBe(30000);
//       expect(segments[0].q.x).toBe(1000);
//       expect(segments[0].q.y).toBe(18000);

//       expect(segments[1].p.x).toBe(3000);
//       expect(segments[1].p.y).toBe(26000);
//       expect(segments[1].q.x).toBe(28000);
//       expect(segments[1].q.y).toBe(13500);
//     });
//   });
// });
