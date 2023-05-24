"use strict";

export const placeQueens = num => {
  const board = Array(num)
    .fill(0)
    .map(_ => Array(num).fill(0));

  backtrack(0);
  return board;

  function backtrack(col) {
    if (col >= num) return true;

    for (let i = 0; i < num; i++) {
      if (isSafe(i, col)) {
        board[i][col] = 1;

        if (backtrack(col + 1)) return true;

        board[i][col] = 0;
      }
    }
    return false;
  }
  function isSafe(row, col) {
    let i = 0;
    let j = 0;
    // check leftside of current row
    for (i = 0; i < col; i++) {
      if (board[row][i] === 1) return false;
    }

    // check upper left diagonal
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false;
    }

    // check bottom left diagonal
    for (i = row, j = col; i < num && j >= 0; i++, j--) {
      if (board[i][j] === 1) return false;
    }
    return true;
  }
};

export const stringPermutations = str => {
  const seen = {};

  permute(str, 0, str.length);
  return Object.keys(seen);

  function permute(s, l, r) {
    for (let i = l; i < r; i++) {
      seen[s] = true;
      s = swap(s, l, i);
      permute(s, l + 1, r);
      s = swap(s, l, i);
    }
  }

  function swap(s, l, r) {
    const arr = s.split("");
    [arr[l], arr[r]] = [arr[r], arr[l]];
    return arr.join("");
  }
};
