"use strict";

export class Percolation {
  sizes = [];
  open = [];
  ids = [];

  constructor(size) {
    this.size = size;
    this.dim = Math.sqrt(size - 2);
    this.nodeZeroId = size - 1;
    this.nodeEndId = size;
    for (let i = 1; i <= size; i++) {
      this.sizes[i] = 1;
      this.open[i] = false;
      this.ids[i] = i;
    }
  }

  findRoot(val) {
    while (this.ids[val] !== val) {
      val = this.ids[val];
    }
    return val;
  }

  isOpen(val) {
    return this.open[val];
  }

  openSite(val) {
    this.open[val] = true;
  }

  isConnected(p, v) {
    return this.findRoot(p) === this.findRoot(v);
  }

  openAndConnect(p) {
    if (!this.isOpen(p)) {
      this.openSite(p);

      this.getAllNeighbors(p).forEach(item => {
        if (this.isOpen(p)) {
          this.union(p, item);
        }
      });
      return true;
    }
    return false;
  }

  getAllNeighbors(p) {
    const line = Math.ceil(p / this.dim);
    const column = p % this.dim === 0 ? this.dim : p % this.dim;

    const neighbors = [];
    if (line > 1) {
      const nPreviousLine = this.dim * (line - 2) + column;
      neighbors.push(nPreviousLine);
    } else {
      neighbors.push(this.nodeZeroId);
    }
    if (line < this.dim) {
      const nNextLine = this.dim * line + column;
      neighbors.push(nNextLine);
    } else {
      neighbors.push(this.nodeEndId);
    }
    if (column > 1) {
      const nPreviousColumn = this.dim * (line - 1) + column - 1;
      neighbors.push(nPreviousColumn);
    }
    if (column < this.dim) {
      const nNextColumn = this.dim * (line - 1) + column + 1;
      neighbors.push(nNextColumn);
    }
    return neighbors;
  }

  union(from, to) {
    let rFrom = this.findRoot(from);
    let rTo = this.findRoot(to);

    if (rFrom !== rTo) {
      if (this.sizes[rFrom] < this.sizes[rTo]) {
        this.ids[rFrom] = rTo;
        this.sizes[rTo] += this.sizes[rFrom];
      } else {
        this.ids[rTo] = rFrom;
        this.sizes[rFrom] += this.sizes[rTo];
      }
    }
  }

  isPercolating() {
    return this.isConnected(this.nodeZeroId, this.nodeEndId);
  }
}

export class PercolationStats {
  constructor(size, trials) {
    this.trials = trials;
    this.size = size * size;
  }

  start() {
    let sumRatios = 0;
    for (let i = 1; i <= this.trials; i++) {
      let counter = 0;
      let percolation = new Percolation(this.size + 2);
      while (!percolation.isPercolating()) {
        let isOpen = percolation.openAndConnect(this.#randomSite(this.size));
        if (isOpen) {
          counter++;
        }
      }

      let ratio = counter / this.size;
      sumRatios += ratio;
    }
    return sumRatios / this.trials;
  }
  #randomSite(max) {
    return Math.round(Math.random() * max) + 1;
  }
}

void (() => {
  const result = new PercolationStats(10, 3).start();
  console.log(`Average ${result}`);
})();
