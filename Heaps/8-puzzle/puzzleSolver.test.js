import { Board, Solver } from "./puzzleSolver";
import { jest } from "@jest/globals";

describe("Puzzle Solver", () => {
  describe("Board", () => {
    const input = [
      [0, 1, 3],
      [4, 2, 5],
      [7, 8, 6],
    ];
    const input2 = [
      [1, 0, 3],
      [4, 2, 5],
      [7, 8, 6],
    ];
    const input3 = [
      [1, 2, 3],
      [4, 0, 5],
      [7, 8, 6],
    ];
    const input4 = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 0],
    ];
    const input5 = [
      [8, 1, 3],
      [4, 0, 2],
      [7, 6, 5],
    ];
    const input6 = [
      [4, 1, 3],
      [0, 2, 5],
      [7, 8, 6],
    ];

    test("isEqual should compare boards and return boolean ", () => {
      const board = new Board(input);
      const board2 = new Board(input2);
      const board3 = new Board(input3);

      expect(board.isEqual(board2)).toBe(false);
      expect(board2.isEqual(board3)).toBe(false);
      expect(board.isEqual(board)).toBe(true);
    });

    test("isGoal should check if board is solved and return boolean", () => {
      const board = new Board(input);
      const board2 = new Board(input4);
      expect(board.isGoal()).toBe(false);
      expect(board2.isGoal()).toBe(true);
    });
    test("dimension should return n of the grid ", () => {
      const board = new Board(input);
      expect(board.dimension()).toBe(3);
    });
    test("manhattan should return manhattan distance to goal board ", () => {
      const board = new Board(input);
      const board2 = new Board(input3);
      const board3 = new Board(input5);
      expect(board.manhattan()).toBe(4);
      expect(board2.manhattan()).toBe(2);
      expect(board3.manhattan()).toBe(10);
    });
    test("hamming should return hamming distance to goal board", () => {
      const board = new Board(input);
      const board2 = new Board(input5);
      expect(board.hamming()).toBe(4);
      expect(board2.hamming()).toBe(5);
    });
    test("neighbors should return neighbor boards in arr ", () => {
      const board = new Board(input);
      const neighbors = board.neighbors();

      expect(neighbors[0].tiles).toEqual(input2);
      expect(neighbors[1].tiles).toEqual(input6);

      const board2 = new Board(input3);
      const neighbors2 = board2.neighbors();
      expect(neighbors2[0].tiles).toEqual([
        [1, 2, 3],
        [0, 4, 5],
        [7, 8, 6],
      ]);
      expect(neighbors2[1].tiles).toEqual([
        [1, 2, 3],
        [4, 5, 0],
        [7, 8, 6],
      ]);
      expect(neighbors2[2].tiles).toEqual([
        [1, 0, 3],
        [4, 2, 5],
        [7, 8, 6],
      ]);
      expect(neighbors2[3].tiles).toEqual([
        [1, 2, 3],
        [4, 8, 5],
        [7, 0, 6],
      ]);
    });
  });

  describe("Solver", () => {
    const initial = [
      [0, 1, 3],
      [4, 2, 5],
      [7, 8, 6],
    ];

    test("solution should return array of boards in a shortest solution; [] if unsolvable ", () => {
      const second = [
        [1, 0, 3],
        [4, 2, 5],
        [7, 8, 6],
      ];
      const third = [
        [1, 2, 3],
        [4, 0, 5],
        [7, 8, 6],
      ];
      const forth = [
        [1, 2, 3],
        [4, 5, 0],
        [7, 8, 6],
      ];
      const final = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0],
      ];

      const board = new Board(initial);

      const solver = new Solver(board);
      const solution = solver.solution();
      expect(solution[0].tiles).toEqual(second);
      expect(solution[1].tiles).toEqual(third);
      expect(solution[2].tiles).toEqual(forth);
      expect(solution[3].tiles).toEqual(final);
    });
    test("isSolvable should check if board can be solved and return boolean ", () => {
      const board = new Board(initial);
      const board2 = new Board([
        [1, 2, 3],
        [4, 5, 6],
        [8, 7, 0],
      ]);
      const solver = new Solver(board);
      jest.spyOn(Solver.prototype, "_solve").mockImplementationOnce(() => []);
      const solver2 = new Solver(board2);
      expect(solver.isSolvable()).toBe(true);
      expect(solver2.isSolvable()).toBe(false);
    });
    test("moves should return smallest number of moves to solve the puzzle ", () => {
      const board = new Board(initial);
      const solver = new Solver(board);

      expect(solver.moves()).toBe(4);
    });
  });
});
