"use strict";

class MinHeap {
  constructor() {
    this.heap = [null];
    this.n = 0;
  }

  size() {
    return this.n;
  }

  isEmpty() {
    return this.n === 0;
  }

  pop() {
    if (this.isEmpty()) return;
    [this.heap[this.n], this.heap[1]] = [this.heap[1], this.heap[this.n]];
    const popped = this.heap.pop();
    this.n--;
    this.#heapifyDown();
    return popped;
  }

  add(val) {
    this.heap[++this.n] = val;
    this.#bubbleUp();
  }
  isAlreadyAdded(board) {
    return this.heap.some(item => !!item && item.isEqual(board));
  }

  #bubbleUp() {
    let curr = this.n;
    while (
      this.heap[curr] &&
      this.heap[curr].compareTo(this.heap[this.#parent(curr)]) < 0
    ) {
      [this.heap[curr], this.heap[this.#parent(curr)]] = [
        this.heap[this.#parent(curr)],
        this.heap[curr],
      ];
      curr = this.#parent(curr);
    }
  }

  #parent(ind) {
    return ind >> 1;
  }

  #leftChild(ind) {
    return ind * 2;
  }

  #rightChild(ind) {
    return ind * 2 + 1;
  }

  #exists(ind) {
    return !!this.heap[ind];
  }

  #canSwap(ind) {
    return (
      (this.#exists(this.#leftChild(ind)) &&
        this.heap[this.#leftChild(ind)].compareTo(this.heap[ind])) < 0 ||
      (this.#exists(this.#rightChild(ind)) &&
        this.heap[this.#rightChild(ind)].compareTo(this.heap[ind])) < 0
    );
  }

  #heapifyDown(start = 1) {
    let currentInd = start;
    while (this.#canSwap(currentInd)) {
      let leftChild = this.#leftChild(currentInd);
      let rightChild = this.#rightChild(currentInd);
      if (
        this.#exists(rightChild) &&
        this.heap[leftChild].compareTo(this.heap[rightChild]) > 0
      ) {
        // prettier-ignore
        [this.heap[rightChild], this.heap[currentInd]] = [this.heap[currentInd],this.heap[rightChild]];
        currentInd = rightChild;
      } else {
        // prettier-ignore
        [this.heap[leftChild], this.heap[currentInd]] = [this.heap[currentInd],this.heap[leftChild]];
        currentInd = leftChild;
      }
    }
  }
}

export class Board {
  tiles = [];
  moves = Infinity;
  priority = 0;
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
      [neighbor.tiles[blank.y][blank.x], neighbor.tiles[blank.y][blank.x + 1]] =
        [
          neighbor.tiles[blank.y][blank.x + 1],
          neighbor.tiles[blank.y][blank.x],
        ];
      this.neighborsArr.push(neighbor);
    }
    if (blank.x === this.dimension() - 1) {
      const neighbor = new Board(this.#makeCopy());
      [neighbor.tiles[blank.y][blank.x], neighbor.tiles[blank.y][blank.x - 1]] =
        [
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
      ][(bottom.tiles[blank.y + 1][blank.x], bottom.tiles[blank.y][blank.x])] =
        [bottom.tiles[blank.y][blank.x], bottom.tiles[blank.y + 1][blank.x]];
      this.neighborsArr.push(upper, bottom);
    }
    if (blank.y === 0) {
      const neighbor = new Board(this.#makeCopy());
      [neighbor.tiles[blank.y][blank.x], neighbor.tiles[blank.y + 1][blank.x]] =
        [
          neighbor.tiles[blank.y + 1][blank.x],
          neighbor.tiles[blank.y][blank.x],
        ];
      this.neighborsArr.push(neighbor);
    }
    if (blank.y === this.dimension()) {
      const neighbor = new Board(this.#makeCopy());
      [neighbor.tiles[blank.y][blank.x], neighbor.tiles[blank.y - 1][blank.x]] =
        [
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
  minPQ = new MinHeap();
  constructor(board) {
    this.board = board;
  }

  isSolvable() {}

  moves() {}

  solution() {
    this.minPQ.add(this.board);
    this.board.moves = 0;
    this.board.countPriority();
    const visited = [];

    while (!this.minPQ.isEmpty()) {
      let current = this.minPQ.pop();

      if (current.isGoal()) {
        return visited;
      }
      visited.push(current);
      const neighbors = current.neighbors();
      //   console.log(neighbors);
      for (let neighbor of neighbors) {
        if (!visited.some(node => node.isEqual(neighbor))) {
          const tentative_moves = current.moves + 1;
          if (this.minPQ.isAlreadyAdded(neighbor)) {
            if (tentative_moves < neighbor.moves) {
              neighbor.moves = tentative_moves;
            }
          } else {
            neighbor.moves = tentative_moves;
            neighbor.countPriority();
            this.minPQ.add(neighbor);
          }
        }
      }
    }
    return [];
  }
}
