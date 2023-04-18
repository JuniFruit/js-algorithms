import { BST, Node } from "../../Tables/tables";
import { fourSum, isBST } from "./tablesAssignments";

describe("Table Assignments", () => {
  test("isBST should check if a given tree is a binary search tree and return boolean", () => {
    const tree = new BST();
    tree.put(2, "H");
    tree.put(4, "P");
    tree.put(1, "L");

    expect(isBST(tree)).toBe(true);
    const tree2 = new Node(2, "P");
    tree2.left = new Node(1, "L");
    tree2.left.left = new Node(4, "M");
    tree2.right = new Node(3, "Q");
    tree2.right.left = new Node(8, "J");
    expect(isBST(tree2)).toBe(false);
  });
  test("4Sum should return 4 distinct integers that add up to the target sum", () => {
    const nums = [2, 7, 4, 0, 9, 5, 1, 3];
    const target = 20;

    expect(fourSum(nums, target)).toEqual([4, 0, 7, 9]);
  });
});
