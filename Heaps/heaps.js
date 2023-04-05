"use strict";

export class MinHeap {
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

  #bubbleUp() {
    let curr = this.n;
    while (this.heap[curr] && this.heap[curr] < this.heap[this.#parent(curr)]) {
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
    return this.heap[ind] !== undefined || this.heap[ind] !== null;
  }

  #canSwap(ind) {
    return (
      (this.#exists(this.#leftChild(ind)) &&
        this.heap[this.#leftChild(ind)] < this.heap[ind]) ||
      (this.#exists(this.#rightChild(ind)) &&
        this.heap[this.#rightChild(ind)] < this.heap[ind])
    );
  }

  #heapifyDown() {
    let currentInd = 1;
    while (this.#canSwap(currentInd)) {
      let leftChild = this.#leftChild(currentInd);
      let rightChild = this.#rightChild(currentInd);
      if (
        this.#exists(rightChild) &&
        this.heap[leftChild] > this.heap[rightChild]
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

export class MaxHeap {
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

  #bubbleUp() {
    let curr = this.n;

    while (
      this.heap[curr] &&
      this.heap[this.#parent(curr)] !== null &&
      this.heap[curr] > this.heap[this.#parent(curr)]
    ) {
      //prettier-ignore
      [this.heap[curr], this.heap[this.#parent(curr)]] = [this.heap[this.#parent(curr)],this.heap[curr]];
      curr = this.#parent(curr);
    }
  }

  #heapifyDown() {
    let currentInd = 1;
    while (this.#canSwap(currentInd)) {
      let leftChild = this.#leftChild(currentInd);
      let rightChild = this.#rightChild(currentInd);
      if (
        this.#exists(rightChild) &&
        this.heap[leftChild] < this.heap[rightChild]
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
    return this.heap[ind] !== undefined || this.heap[ind] !== null;
  }

  #canSwap(ind) {
    return (
      (this.#exists(this.#leftChild(ind)) &&
        this.heap[this.#leftChild(ind)] > this.heap[ind]) ||
      (this.#exists(this.#rightChild(ind)) &&
        this.heap[this.#rightChild(ind)] > this.heap[ind])
    );
  }
}
