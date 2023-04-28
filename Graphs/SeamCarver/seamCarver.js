"use strict";

export class SeamCarver {
  vertPath = [];
  horPath = [];
  constructor(picture) {
    this.pixels = picture;
    this.width = picture[0].length;
    this.height = picture.length;
  }

  energy(x, y) {
    const borderEnergy = 1000;
    if (x === this.width - 1 || x === 0) {
      return borderEnergy;
    }
    if (y === this.height - 1 || y === 0) {
      return borderEnergy;
    }
    const xR = this.pixels[y][x + 1];
    const xL = this.pixels[y][x - 1];
    const yT = this.pixels[y - 1][x];
    const yB = this.pixels[y + 1][x];
    return Math.sqrt(this.#countGradient(xL, xR) + this.#countGradient(yB, yT));
  }
  #countGradient(coord1, coord2) {
    const [r1, g1, b1] = coord1;
    const [r2, g2, b2] = coord2;

    return Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2);
  }

  findHorizontalSeam() {
    let min = Infinity;
    let path;
    for (let i = 0; i < this.height - 1; i++) {
      const [p, len] = this.#shortest([0, i], false);
      if (min > len) {
        min = len;
        path = p;
      }
    }
    this.horPath = path;
    return path;
  }
  findVerticalSeam() {
    let min = Infinity;
    let path;
    for (let i = 0; i < this.width - 1; i++) {
      const [p, len] = this.#shortest([i, 0]);
      if (min > len) {
        min = len;
        path = p;
      }
    }
    this.vertPath = path;
    return path;
  }

  #shortest(start, isVertical = true) {
    const edgeTo = {};
    const distTo = {};
    const path = [];
    const minPQ = [[start, 0]];
    distTo[start.join(",")] = this.energy(start[0], start[1]);

    while (minPQ.length) {
      const min = minPQ.shift();
      const [node] = min;
      const [currX, currY] = node;
      for (let n of isVertical
        ? this.#getVertNeighbors(currX, currY)
        : this.#getHorNeighbors(currX, currY)) {
        const endDist = distTo[n.join(",")] === undefined ? Infinity : distTo[n.join(",")];
        const startDist = distTo[node.join(",")] === undefined ? Infinity : distTo[node.join(",")];
        const [nX, nY] = n;
        const weight = this.energy(nX, nY);
        if (endDist > startDist + weight) {
          distTo[n.join(",")] = startDist + weight;
          edgeTo[n.join(",")] = node;
          minPQ.push([n, distTo[n.join(",")]]);
          minPQ.sort((a, b) => a[1] - b[1]);
        }
      }
    }

    const minLenCoord = this.#findMinCoord(distTo, isVertical);
    let curr = minLenCoord;
    while (edgeTo[curr.join(",")]) {
      path.unshift(edgeTo[curr.join(",")]);
      curr = edgeTo[curr.join(",")];
    }
    path.push(minLenCoord);
    return [path, distTo[minLenCoord.join(",")]];
  }
  #findMinCoord(distTo, isVertical = true) {
    let min = Infinity;
    let coord;
    const condition = isVertical ? this.width : this.height;
    for (let i = 0; i < condition; i++) {
      const currLen = isVertical
        ? distTo[`${i},${this.height - 1}`]
        : distTo[`${this.width - 1},${i}`];

      if (min > currLen) {
        min = currLen;
        coord = isVertical ? [i, this.height - 1] : [this.width - 1, i];
      }
    }
    return coord;
  }

  #getHorNeighbors(x, y) {
    const neighbors = [];

    if (x < this.width - 1) {
      if (y === 0) {
        neighbors.push([x + 1, y + 1]);
      }
      if (y === this.height - 1) {
        neighbors.push([x + 1, y - 1]);
      }
      if (y < this.height - 1 && y > 0) {
        neighbors.push([x + 1, y - 1]);
        neighbors.push([x + 1, y + 1]);
      }
      neighbors.push([x + 1, y]);
    }
    return neighbors;
  }

  #getVertNeighbors(x, y) {
    const neighbors = [];

    if (y < this.height - 1) {
      if (x === 0) {
        neighbors.push([x + 1, y + 1]);
      }
      if (x === this.width - 1) {
        neighbors.push([x - 1, y + 1]);
      }
      if (x < this.width - 1 && x > 0) {
        neighbors.push([x - 1, y + 1]);
        neighbors.push([x + 1, y + 1]);
      }
      neighbors.push([x, y + 1]);
    }
    return neighbors;
  }

  removeHorizontalSeam() {
    for (let i = 0; i < this.horPath.length; i++) {
      let [x, y] = this.horPath[i];

      this.pixels[y][x] = undefined;
      this.#swapY(x, y);
    }
    this.pixels.length = this.height - 1;
  }

  #swapY(x, y) {
    if (y < this.height - 1) {
      [this.pixels[y][x], this.pixels[y + 1][x]] = [this.pixels[y + 1][x], this.pixels[y][x]];
      this.#swapY(x, y + 1);
    }
  }

  removeVerticalSeam() {
    for (let i = 0; i < this.vertPath.length; i++) {
      let [x, y] = this.vertPath[i];

      this.pixels[y][x] = undefined;
      this.pixels[y] = this.pixels[y].filter(item => !!item);
    }
    this.#updateSize();
  }

  #updateSize() {
    this.width = this.pixels[0].length;
    this.height = this.pixels.length;
  }
}
