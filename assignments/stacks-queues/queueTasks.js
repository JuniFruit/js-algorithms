export class Deque {
  constructor() {
    this.deque = [];
    this.size = 0;
    this.tail = 0;
    this.head = 0;
  }
  isEmpty() {
    return this.size === 0;
  }
  checkSize() {
    return this.size;
  }
  addLast(item) {
    if (this.size >= this.deque.length) this.#resize(this.size * 2);
    this.deque[this.tail] = item;
    this.tail++;
    this.size++;
  }
  removeLast() {
    if (this.size < 1) return null;
    const lastItem = this.deque[this.tail - 1];
    this.deque[this.tail - 1] = null;
    this.tail--;
    this.size--;
    if (this.size === Math.floor(this.deque.length / 4))
      this.#resize(this.size);
    return lastItem;
  }
  addFirst(item) {
    let currEl = this.deque[this.head];
    if (this.size >= this.deque.length) this.#resize(this.size * 2);
    this.tail++;
    this.size++;
    if (currEl) {
      let prev = this.deque[this.head];
      this.deque.forEach((_, ind) => {
        if (this.deque[ind + 1] === undefined) return;
        let temp = this.deque[ind + 1];
        this.deque[ind + 1] = prev;
        prev = temp;
      });
    }
    this.deque[this.head] = item;
  }

  removeFirst() {
    if (this.size < 1) return null;
    const popped = this.deque[this.head];
    this.size--;
    this.tail--;
    if (this.size > 0) {
      this.deque.forEach((_, ind) => {
        this.deque[ind] = this.deque[ind + 1] || null;
      });
    }
    if (this.size === Math.floor(this.deque.length / 4))
      this.#resize(this.size);
    return popped;
  }

  #resize(n) {
    const newArr = Array(n)
      .fill(null)
      .map((item, ind) => {
        if (this.deque[ind]) return this.deque[ind];
        return item;
      });
    this.deque = newArr;
  }
}

export class RandomizedQueue {
  constructor() {
    this.queue = new Deque();
  }

  isEmpty() {
    return this.queue.size === 0;
  }

  sample() {
    return this.queue.deque[this.#random()];
  }

  checkSize() {
    return this.queue.checkSize();
  }

  dequeue() {
    if (this.queue.checkSize() < 1) return null;
    const prevLast = this.queue.deque[this.queue.tail - 1];
    const randInd = this.#random();
    this.queue.deque[this.queue.tail - 1] = this.queue.deque[randInd];
    this.queue.deque[randInd] = prevLast;
    return this.queue.removeLast();
  }
  enqueue(val) {
    return this.queue.addFirst(val);
  }

  #random() {
    return Math.floor(Math.random() * this.queue.size) + 1;
  }
}
