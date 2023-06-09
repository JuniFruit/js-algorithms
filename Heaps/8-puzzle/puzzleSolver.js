"use strict";

import { MinHeapWithComparator } from "../heaps";

export class Board {
  tiles = [];
  moves = Infinity;
  priority = undefined;
  neighborsArr = [];
  constructor(tiles) {
    this.tiles = tiles;
  }

  isEqual(board) {
    let isEqual = true;
    main: for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        if (this.tiles[i][j] !== board.tiles[i][j]) {
          isEqual = false;
          break main;
        }
      }
    }
    return isEqual;
  }

  compareTo(board) {
    if (!board) return 0;
    return this.priority - board.priority;
  }

  isGoal() {
    return this.manhattan() === 0;
  }

  dimension() {
    return this.tiles.length;
  }

  #manhattanFormula(x0, y0, x1, y1) {
    return Math.abs(x0 - x1) + Math.abs(y0 - y1);
  }
  #get2Dcoord(ind) {
    return {
      x: Math.floor(ind % this.dimension()),
      y: Math.floor(ind / this.dimension()),
    };
  }
  countPriority() {
    this.priority = this.moves + this.manhattan();
  }
  manhattan() {
    let result = 0;
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        let curr = this.tiles[i][j];
        if (curr === 0) continue;
        let targetCoord = this.#get2Dcoord(curr - 1);
        let dist = this.#manhattanFormula(j, i, targetCoord.x, targetCoord.y);
        result += dist;
      }
    }
    return result;
  }
  hamming() {
    let count = 0;
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        let current = this.tiles[i][j];
        let ind = this.#get1Dindex(j, i);
        if (current === 0) continue;
        if (current !== ind + 1) count++;
      }
    }
    return count;
  }

  #get1Dindex(x, y) {
    return y * this.dimension() + x;
  }

  #getNeighbors() {
    const blank = {
      x: 0,
      y: 0,
    };
    main: for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        if (this.tiles[i][j] === 0) {
          blank.x = j;
          blank.y = i;
          break main;
        }
      }
    }
    if (blank.x > 0 && blank.x < this.dimension() - 1) {
      const left = new Board(this.#makeCopy());
      const right = new Board(this.#makeCopy());
      [left.tiles[blank.y][blank.x], left.tiles[blank.y][blank.x - 1]] = [
        left.tiles[blank.y][blank.x - 1],
        left.tiles[blank.y][blank.x],
      ];
      [right.tiles[blank.y][blank.x], right.tiles[blank.y][blank.x + 1]] = [
        right.tiles[blank.y][blank.x + 1],
        right.tiles[blank.y][blank.x],
      ];
      this.neighborsArr.push(left, right);
    }
    if (blank.x === 0) {
      const neighbor = new Board(this.#makeCopy());
      [neighbor.tiles[blank.y][blank.x], neighbor.tiles[blank.y][blank.x + 1]] = [
        neighbor.tiles[blank.y][blank.x + 1],
        neighbor.tiles[blank.y][blank.x],
      ];
      this.neighborsArr.push(neighbor);
    }
    if (blank.x === this.dimension() - 1) {
      const neighbor = new Board(this.#makeCopy());
      [neighbor.tiles[blank.y][blank.x], neighbor.tiles[blank.y][blank.x - 1]] = [
        neighbor.tiles[blank.y][blank.x - 1],
        neighbor.tiles[blank.y][blank.x],
      ];
      this.neighborsArr.push(neighbor);
    }
    if (blank.y > 0 && blank.y < this.dimension() - 1) {
      const upper = new Board(this.#makeCopy());
      const bottom = new Board(this.#makeCopy());
      [upper.tiles[blank.y - 1][blank.x], upper.tiles[blank.y][blank.x]] = [
        upper.tiles[blank.y][blank.x],
        upper.tiles[blank.y - 1][blank.x],
      ];
      [bottom.tiles[blank.y + 1][blank.x], bottom.tiles[blank.y][blank.x]] = [
        bottom.tiles[blank.y][blank.x],
        bottom.tiles[blank.y + 1][blank.x],
      ];
      this.neighborsArr.push(upper, bottom);
    }
    if (blank.y === 0) {
      const neighbor = new Board(this.#makeCopy());
      [neighbor.tiles[blank.y][blank.x], neighbor.tiles[blank.y + 1][blank.x]] = [
        neighbor.tiles[blank.y + 1][blank.x],
        neighbor.tiles[blank.y][blank.x],
      ];
      this.neighborsArr.push(neighbor);
    }
    if (blank.y === this.dimension()) {
      const neighbor = new Board(this.#makeCopy());
      [neighbor.tiles[blank.y][blank.x], neighbor.tiles[blank.y - 1][blank.x]] = [
        neighbor.tiles[blank.y - 1][blank.x],
        neighbor.tiles[blank.y][blank.x],
      ];
      this.neighborsArr.push(neighbor);
    }
  }
  #makeCopy() {
    return this.tiles.map(line => [...line]);
  }

  neighbors() {
    this.#getNeighbors();
    return this.neighborsArr;
  }
}

export class Solver {
  minPQ = new MinHeapWithComparator();
  solvedArr = [];
  constructor(board) {
    this.board = board;
    this._solve();
  }

  isSolvable() {
    let flatten = [];
    let i = 0;
    while (i < this.board.tiles.length) {
      flatten = flatten.concat(this.board.tiles[i++]);
    }

    return countInversions(flatten) % 2 === 0;

    function countInversions(a) {
      const [sorted, count] = sort(a);
      return count;
      function merge(l, r) {
        const aux = [];
        let count = 0;
        while (l.length && r.length) {
          if (l[0] <= r[0]) {
            aux.push(l.shift());
          } else {
            aux.push(r.shift());
            count += l.length;
          }
        }
        return [[...aux, ...l, ...r], count];
      }
      function sort(arr) {
        if (arr.length < 2) return [arr, 0];
        const mid = arr.length >> 1;
        const [left, count1] = sort(arr.splice(0, mid));
        const [right, count2] = sort(arr);
        const [merged, count3] = merge(left, right);
        return [merged, count1 + count2 + count3];
      }
    }
  }

  #backtrack(board) {
    let currentNode = board;
    let boards = [];
    while (currentNode.parent) {
      boards.push(currentNode);
      currentNode = currentNode.parent;
    }
    this.solvedArr = boards.reverse();
  }

  _solve() {
    if (!this.isSolvable()) return [];
    this.minPQ.add(this.board);
    this.board.moves = 0;
    this.board.countPriority();
    const visited = [];

    while (!this.minPQ.isEmpty()) {
      let current = this.minPQ.pop();
      if (current.isGoal()) {
        this.#backtrack(current);
        break;
      }
      visited.push(current);
      const neighbors = current.neighbors();

      for (let neighbor of neighbors) {
        const tentative_moves = current.moves + 1;
        if (tentative_moves < neighbor.moves) {
          neighbor.moves = tentative_moves;
          neighbor.parent = current;
          neighbor.countPriority();
          if (!this.minPQ.isAlreadyAdded(neighbor)) {
            this.minPQ.add(neighbor);
          }
        }
      }
    }
  }

  moves() {
    return this.solvedArr.length;
  }

  solution() {
    return this.solvedArr;
  }
}
