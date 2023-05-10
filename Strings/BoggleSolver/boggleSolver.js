"use strict";

import { RTries } from "../Rtries";
import fs from "fs";

export class BoggleBoard {
  N = 4;
  board = [];

  createFromInput(arr) {
    this.board = arr;
  }

  getLetter(i, j) {
    return this.board[i][j];
  }
}

export class BoggleSolver {
  words = new RTries();
  results = Object.create(null);
  constructor(dictionary) {
    this.#buildTrie(dictionary);
  }

  #buildTrie(dic) {
    if (!dic || dic.slice(dic.length - 3, dic.length) !== "txt")
      throw new Error(
        "Illegal argument. File is not specified or invalid format (only txt is allowed)"
      );
    const text = fs.readFileSync(dic);
    const byLineArr = text.toString("utf-8").split("\n");
    for (let i = 0; i < byLineArr.length; i++) {
      this.words.put(byLineArr[i].trim(), i + 1);
    }
  }

  solve(gameBoard) {
    this.words.RADIX = 93;
    this.words.START = 65;
    const N = gameBoard.length;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        this.#solve({ i, j }, gameBoard);
      }
    }
  }
  #solve({ i, j }, board) {
    const N = board.length;
    const marked = Array(N)
      .fill(0)
      .map(() => Array(N).fill(false));

    const dfs = (i, j, string) => {
      if (i < 0 || i > N - 1 || j < 0 || j > N - 1) return;
      if (marked[i][j]) return;
      const char = board[i][j] === "Qu" ? "QU" : board[i][j];
      string += char;
      if (this.words.get(string) > -1) {
        this.results[string] = string.length;
      }

      marked[i][j] = true;

      dfs(i, j + 1, string);
      dfs(i, j - 1, string);
      dfs(i + 1, j, string);
      dfs(i - 1, j, string);
      dfs(i + 1, j + 1, string);
      dfs(i + 1, j - 1, string);
      dfs(i - 1, j + 1, string);
      dfs(i - 1, j - 1, string);
      marked[i][j] = false;
    };
    dfs(i, j, "");
  }
  points(word) {
    if (!this.results[word]) return 0;
    else if (word.length < 3) return 0;
    else if (word.length < 5) return 1;
    else if (word.length == 5) return 2;
    else if (word.length == 6) return 3;
    else if (word.length == 7) return 5;
    else return 11;
  }
  getAllWords() {
    return Object.keys(this.results);
  }
}
