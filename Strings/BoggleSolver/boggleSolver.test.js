import { BoggleBoard, BoggleSolver } from "./boggleSolver";
import path from "path";

describe("Boggle Solver", () => {
  const input = [
    ["A", "T", "E", "E"],
    ["A", "P", "Y", "O"],
    ["T", "I", "N", "U"],
    ["E", "D", "S", "E"],
  ];
  const input2 = [
    ["S", "N", "R", "T"],
    ["O", "I", "E", "L"],
    ["E", "Qu", "T", "T"],
    ["R", "S", "A", "T"],
  ];
  const best = [
    ["G", "N", "E", "S"],
    ["S", "R", "I", "P"],
    ["E", "T", "A", "L"],
    ["T", "S", "E", "B"],
  ];
  describe("Boggle Board", () => {
    test("createFromInput should initialize board from input ", () => {
      const board = new BoggleBoard();
      board.createFromInput(input);

      expect(board.board).toEqual(input);
    });
    test("getLetter should return character by its index", () => {
      const board = new BoggleBoard();
      board.createFromInput(input2);

      expect(board.getLetter(0, 0)).toBe("S");
      expect(board.getLetter(3, 3)).toBe("T");
    });
  });

  describe("Boggle Solver", () => {
    const file = path.resolve("Strings", "BoggleSolver", "dictionary.txt");
    const fileExtended = path.resolve("Strings", "BoggleSolver", "dictionaryExtended.txt");
    test("constructor should initialize a trie of words out of dictionary, throw an exception if no file or invalid file format ", () => {
      const errorText =
        "Illegal argument. File is not specified or invalid format (only txt is allowed)";
      expect(() => new BoggleSolver()).toThrow(errorText);
      expect(() => new BoggleSolver("./file.tmx")).toThrow(errorText);

      const solver = new BoggleSolver(file);
      expect(solver.words.get("ZOO")).toBe(6012);
      expect(solver.words.get("ZOOLOGY")).toBe(6013);
    });
    const solver = new BoggleSolver(file);
    solver.solve(input);
    test("solve should find all possible words on a given board ", () => {
      expect(solver.results["PI"]).toBe(2);
    });
    test("points should return number of point current word is worth", () => {
      expect(solver.points("PI")).toBe(0);
    });
    test("getAllWords should return array of all possible words on the board ", () => {
      expect(solver.getAllWords().length).toBeTruthy();
    });

    test("should score 4540 points on the best board", async () => {
      const start = new Date();
      const solver = new BoggleSolver(fileExtended);
      solver.solve(best);

      expect(new Date() - start).toBeLessThan(2000);
      let points = 0;
      for (let word of solver.getAllWords()) {
        points += solver.points(word);
      }
      expect(points).toBe(4540);
    });
  });
});
