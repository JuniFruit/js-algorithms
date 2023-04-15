import { KdTree, Point, RectHV } from "./KdTree";
import { BST, RedBlackBST } from "./tables";

describe("Tables", () => {
  describe("Binary search tree table", () => {
    let tree;
    beforeEach(() => {
      tree = new BST();
    });
    afterEach(() => {
      tree = undefined;
    });
    test("put should add node to the correct side", () => {
      tree.put(2, "S");
      expect(tree.root.value).toBe("S");
      tree.put(3, "H");
      expect(tree.root.right.value).toBe("H");
      tree.put(1, "M");
      expect(tree.root.left.value).toBe("M");
    });
    test("delete should remove an item according to Hibbard deletion ", () => {
      tree.put(2, "S");
      tree.put(1, "H");
      tree.put(7, "M");
      tree.put(4, "O");
      tree.put(8, "P");

      tree.delete(1);
      expect(tree.root.left).toBe(null);
      tree.delete(7);
      expect(tree.root.right.value).toBe("P");
      expect(tree.root.right.left.value).toBe("O");
    });
    test("deleteMin should remove an item at the minimum key ", () => {
      tree.put(2, "S");
      tree.put(1, "H");
      tree.put(7, "M");
      tree.put(4, "O");
      tree.put(8, "P");

      tree.deleteMin();
      expect(tree.root.left).toBe(null);
    });
    test("get should return a node associated with the key ", () => {
      tree.put(2, "S");
      tree.put(1, "H");
      tree.put(7, "M");
      tree.put(4, "O");
      tree.put(8, "P");

      expect(tree.get(8).value).toBe("P");
      expect(tree.get(7).value).toBe("M");
      expect(tree.get(1).value).toBe("H");
      expect(tree.get(15)).toBe(null);
    });
    test("getMin and getMax should return largest and smallest keys respectively ", () => {
      tree.put(2, "S");
      tree.put(1, "H");
      tree.put(7, "M");
      tree.put(4, "O");
      tree.put(8, "P");

      expect(tree.getMin()).toBe(1);
      expect(tree.getMax()).toBe(8);
    });
    test("floor should return largest key less than provided key ", () => {
      tree.put(2, "S");
      tree.put(1, "H");
      tree.put(7, "M");
      tree.put(4, "O");
      tree.put(8, "P");

      expect(tree.floor(8)).toBe(7);
      expect(tree.floor(4)).toBe(2);
    });
    test("iterate should return keys in order ", () => {
      tree.put(2, "S");
      tree.put(1, "H");
      tree.put(7, "M");
      tree.put(4, "O");
      tree.put(8, "P");

      expect(tree.iterate()).toEqual([1, 2, 4, 7, 8]);
    });
    test("size should return correct size of the tree ", () => {
      tree.put(2, "S");
      tree.put(1, "H");
      tree.put(7, "M");
      tree.put(4, "O");
      tree.put(8, "P");

      expect(tree.size()).toBe(5);
      tree.delete();
      expect(tree.size()).toBe(4);
      tree.deleteMin();
      expect(tree.size()).toBe(3);
    });
  });
  describe("Red black binary search tree", () => {
    let tree;

    beforeEach(() => {
      tree = new RedBlackBST();
    });

    afterEach(() => {
      tree = undefined;
    });

    test("put should insert node and keep tree in left lean Red Black order ", () => {
      tree.put(6, "H");
      expect(tree.root.value).toBe("H");
      tree.put(4, "L");
      expect(tree.root.left.value).toBe("L");
      tree.put(2, "M");
      expect(tree.root.value).toBe("L");
      expect(tree.root.left.value).toBe("M");
      expect(tree.root.right.value).toBe("H");
      tree.put(5, "O");
      expect(tree.root.right.left.value).toBe("O");
      tree.put(3, "J");
      expect(tree.root.left.value).toBe("J");
      expect(tree.root.left.left.value).toBe("M");
    });

    test("getMin and getMax should return largest and smallest keys respectively ", () => {
      tree.put(2, "S");
      tree.put(1, "H");
      tree.put(7, "M");
      tree.put(4, "O");
      tree.put(8, "P");

      expect(tree.getMin()).toBe(1);
      expect(tree.getMax()).toBe(8);
    });
    test("floor should return largest key less than provided key ", () => {
      tree.put(2, "S");
      tree.put(1, "H");
      tree.put(7, "M");
      tree.put(4, "O");
      tree.put(8, "P");

      expect(tree.floor(8)).toBe(7);
      expect(tree.floor(4)).toBe(2);
    });
  });
  describe("Kd tree", () => {
    let tree;
    const points = [
      new Point(7, 2),
      new Point(5, 4),
      new Point(2, 3),
      new Point(4, 7),
      new Point(9, 6),
    ];
    beforeEach(() => {
      tree = new KdTree();
    });
    afterEach(() => {
      tree = undefined;
    });

    test("insert should put points in the tree and maintain nodes in strictly alternating sequence", () => {
      points.forEach(p => tree.insert(p));

      expect(tree.root.val).toEqual(points[0]);
      expect(tree.root.left.val).toEqual(points[1]);
      expect(tree.root.left.left.val).toEqual(points[2]);
      expect(tree.root.left.right.val).toEqual(points[3]);
      expect(tree.root.right.val).toEqual(points[4]);
    });
    test("size returns the number size of the tree", () => {
      points.forEach(p => tree.insert(p));
      expect(tree.size()).toBe(5);
    });
    test("contains should return boolean if the point is in the tree or not", () => {
      points.forEach(p => tree.insert(p));
      const point = new Point(12, 15);
      expect(tree.contains(points[0])).toBe(true);
      expect(tree.contains(point)).toBe(false);
    });
    test("range should return set of points that are inside the rectangle (or on the boundary)", () => {
      points.forEach(p => tree.insert(p));
      const rect = new RectHV(2, 2, 7, 4);
      const range = tree.range(rect);
      expect(range.length).toBe(3);
      expect(range[0]).toEqual(points[0]);
      expect(range[1]).toEqual(points[1]);
      expect(range[2]).toEqual(points[2]);
    });
    test("nearest should return nearest neighbor in the set to point p; null if the set is empty", () => {
      points.forEach(p => tree.insert(p));
      const point = new Point(8, 5);
      expect(tree.nearest(point)).toEqual(points[4]);
    });
  });
});
