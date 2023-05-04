import { cyclicRotation, tandemRepeat } from "./stringSortsTasks";

describe("String sorts tasks", () => {
  test("cyclicRotation should return boolean whether two strings are cyclic rotations of each other ", () => {
    expect(cyclicRotation("breakwinter", "winterbreak")).toBe(true);
    expect(cyclicRotation("aabbbb", "bbbbaa")).toBe(true);
    expect(cyclicRotation("overflow", "flowby")).toBe(false);
  });
  test("tandemRepeat should return a tandem repeat of b within s of maximum length ", () => {
    expect(tandemRepeat("abcabcababcaba", "abcab")).toBe("abcababcab");
  });
});
