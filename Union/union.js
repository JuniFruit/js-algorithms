"use strict";

export class Union {
  constructor(vertices) {
    this.vertices = vertices;
    this.sizes = Array(vertices).fill(0);
    this.ids = Array(vertices)
      .fill(0)
      .map((item, ind) => ind);
  }

  isConnected(v, w) {
    return this.findRoot(v) === this.findRoot(w);
  }
  findRoot(val) {
    while (this.ids[val] !== val) {
      val = this.ids[val];
    }
    return val;
  }
  union(v, w) {
    const i = this.findRoot(v);
    const j = this.findRoot(w);
    if (i === j) return;
    if (this.sizes[i] < this.sizes[j]) {
      this.ids[i] = j;
      this.sizes[j] += this.sizes[i];
    } else {
      this.ids[j] = i;
      this.sizes[i] += this.sizes[j];
    }
  }
}
