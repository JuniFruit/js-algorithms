"use strict";

export class Node {
  constructor() {
    this.mid = null;
    this.left = null;
    this.right = null;
    this.val = null;
    this.char = null;
  }
  next(char) {
    if (this.char > char && this.left?.char === char) {
      return this.left;
    } else if (this.char < char && this.right?.char === char) {
      return this.right;
    } else if (this.char === char) {
      return this.mid;
    }
    return null;
  }
}

export class RTries {
  root = null;

  put(key, val) {
    this.root = this.#insert(this.root, key, val, 0);
  }
  #insert(node, key, val, start) {
    const currentChar = key.charAt(start);
    if (!node) {
      node = new Node();
      node.char = currentChar;
    }
    if (node.char > currentChar) {
      node.left = this.#insert(node.left, key, val, start);
    } else if (node.char < currentChar) {
      node.right = this.#insert(node.right, key, val, start);
    } else if (start < key.length - 1) {
      node.mid = this.#insert(node.mid, key, val, start + 1);
    } else {
      node.val = val;
    }
    return node;
  }
  get(key) {
    const result = this.#retrieve(this.root, key, 0);
    if (result < 0) return -1;
    return result.val === null ? -1 : result.val;
  }
  #retrieve(node, key, start) {
    if (!node) return -1;
    const currentChar = key.charAt(start);
    if (node.char > currentChar) {
      return this.#retrieve(node.left, key, start);
    } else if (node.char < currentChar) {
      return this.#retrieve(node.right, key, start);
    } else if (start < key.length - 1) {
      return this.#retrieve(node.mid, key, start + 1);
    } else {
      return node;
    }
  }
  delete(key) {
    this.root = this.#delete(this.root, key, 0);
  }
  #delete(node, key, start) {
    if (!node) throw new Error("Such key doesn't exist");
    const currentChar = key.charAt(start);
    if (node.char > currentChar) {
      node.left = this.#delete(node.left, key, start);
    } else if (node.char < currentChar) {
      node.right = this.#delete(node.right, key, start);
    } else if (start < key.length - 1) {
      node.mid = this.#delete(node.mid, key, start + 1);
    } else {
      node.val = null;
    }
    if (!node.left && !node.right && !node.mid && node.val === null) {
      node = null;
    }
    return node;
  }
  keys() {
    const queue = [];
    this.#collect(this.root, "", queue);
    return queue;
  }
  #collect(node, prefix, queue) {
    const R = 256;

    if (node.val !== null) queue.push(prefix + node.char);
    for (let c = 0; c < R; c++) {
      let currChar = String.fromCharCode(c);
      const nextNode = node.next(currChar);
      if (nextNode) {
        this.#collect(nextNode, node.char === currChar ? prefix + currChar : prefix, queue);
      }
    }
  }
  startWith(prefix) {
    const queue = [];
    const root = this.#retrieve(this.root, prefix, 0);
    this.#collect(root, prefix.slice(0, prefix.length - 1), queue);
    return queue;
  }
}
