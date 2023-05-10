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
      string += board[i][j];
      if (board[i][j] === "Qu") string = string[string.length - 1].toUpperCase();
      if (this.words.get(string) > -1) {
        this.results[string] = string.length;
      }
      const startWithArr = this.words.startWith(string);
      if (startWithArr.length === 0) return;
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
    const fromResults = this.results[word];
    if (!fromResults) return 0;
    switch (fromResults) {
      case 1:
        return 0;
      case 2:
        return 0;
      case 3:
        return 1;
      case 4:
        return 1;
      case 5:
        return 2;
      case 6:
        return 3;
      default:
        return 11;
    }
  }
  getAllWords() {
    return Object.keys(this.results);
  }
}
