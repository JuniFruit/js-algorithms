import { placeQueens, stringPermutations } from "./backtrackingChallenges";

describe("Backtracking chanllenges", () => {
  test("placeQueens should place all queens on a board so they don't attack each other", () => {
    const res = placeQueens(4);
    expect(res).toEqual([
      [0, 0, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 1, 0, 0],
    ]);
  });

  test("stringPermutations should return all permutations of a given string", () => {
    const res = stringPermutations("ABC");
    const res2 = stringPermutations("XY");
    expect(res).toEqual(["ABC", "ACB", "BAC", "BCA", "CBA", "CAB"]);
    expect(res2).toEqual(["XY", "YX"]);
  });
});
