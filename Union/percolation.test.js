import { Percolation } from "./percolation";
import { PercolationStats } from "./percolation";
describe("Percolation.js", () => {
  test("instantiating with a size should give correct ids, open, sizes arrs", () => {
    expect(new Percolation(5).ids).toEqual([, 1, 2, 3, 4, 5]);
    //prettier-ignore
    expect(new Percolation(5).open).toEqual([,false,false,false,false,false]);
    expect(new Percolation(5).sizes).toEqual([, 1, 1, 1, 1, 1]);
  });

  test("method isOpen return boolean", () => {
    expect(new Percolation(5).isOpen(2)).toEqual(false);
  });

  test("method findRoot returns root val from array", () => {
    expect(new Percolation(5).findRoot(2)).toEqual(2);
  });

  describe("method union(val, val)", () => {
    let preloc = undefined;

    beforeEach(() => {
      preloc = new Percolation(5);
    });

    afterEach(() => {
      preloc = undefined;
    });

    test("should connect roots", () => {
      preloc.union(2, 4);
      expect(preloc.ids).toEqual([, 1, 2, 3, 2, 5]);
      preloc.union(1, 1);
      expect(preloc.ids).toEqual([, 1, 2, 3, 2, 5]);
    });
    test("should and keeps track of depth", () => {
      preloc.union(2, 4);
      expect(preloc.sizes).toEqual([, 1, 2, 1, 1, 1]);
    });
    test("should connect small tree to the root of a big tree", () => {
      preloc = new Percolation(10);
      preloc.union(2, 4);
      preloc.union(3, 4);
      expect(preloc.ids).toEqual([, 1, 2, 2, 2, 5, 6, 7, 8, 9, 10]);

      preloc.union(1, 2);
      preloc.union(2, 1);

      expect(preloc.ids).toEqual([, 2, 2, 2, 2, 5, 6, 7, 8, 9, 10]);

      preloc.union(9, 8);
      preloc.union(8, 1);

      expect(preloc.ids).toEqual([, 2, 2, 2, 2, 5, 6, 7, 9, 2, 10]);
    });
  });

  test("method isConnected returns boolean if two value are connected or not", () => {
    let percolation = new Percolation(10);
    expect(percolation.isConnected(2, 4)).toBe(false);
    percolation.union(2, 4);
    percolation.union(3, 4);
    percolation.union(1, 2);
    percolation.union(2, 1);
    expect(percolation.isConnected(1, 4)).toBe(true);
    expect(percolation.isConnected(8, 1)).toBe(false);
  });
});

describe("Percolation unit", () => {
  test("should return average 0.4 < avg < 0.7", () => {
    const result = new PercolationStats(10, 3).start();
    const isInBounds = result < 0.7 && result > 0.4;

    expect(isInBounds).toBe(true);
  });
});
