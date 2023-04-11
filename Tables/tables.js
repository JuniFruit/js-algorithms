"use strict";

export class Node {
  count = 0;

  constructor(key, value, count) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.count = count;
    this.right = null;
  }

  compareTo(key) {
    return this.key - key;
  }
}

export class BST {
  queue = [];
  constructor(root = null) {
    this.root = root;
  }

  size() {
    return this.#getSize(this.root);
  }

  #getSize(node) {
    if (node === null) return 0;
    return node.count;
  }

  put(key, value) {
    this.root = this.#recursivePut(this.root, key, value);
  }
  #recursivePut(node, key, value) {
    if (node === null) return new Node(key, value, 1);

    if (node.compareTo(key) < 0) {
      node.right = this.#recursivePut(node.right, key, value);
    } else if (node.compareTo(key) > 0) {
      node.left = this.#recursivePut(node.left, key, value);
    } else {
      node.val = val;
    }
    node.count = 1 + this.#getSize(node.left) + this.#getSize(node.right);
    return node;
  }
  get(key) {
    let head = this.root;
    while (head) {
      if (head.compareTo(key) < 0) {
        head = head.right;
      } else if (head.compareTo(key) > 0) {
        head = head.left;
      } else if (head.key === key) {
        return head;
      }
    }
    return null;
  }

  deleteMin() {
    this.#deleteMinKey(this.root);
  }

  #deleteMinKey(node) {
    if (!node.left) return node.right;
    node.left = this.#deleteMinKey(node.left);
    node.count = 1 + this.#getSize(node.left) + this.#getSize(node.right);
    return node;
  }

  delete(key) {
    this.root = this.#deleteKey(this.root, key);
  }
  #deleteKey(node, key) {
    if (!node) return null;
    if (node.compareTo(key) > 0) {
      node.left = this.#deleteKey(node.left, key);
    } else if (node.compareTo(key) < 0) {
      node.right = this.#deleteKey(node.right, key);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      const temp = node;
      node = this.get(this.getMin(node.right));
      node.right = this.#deleteMinKey(temp.right);
      node.left = temp.left;
    }
    node.count = 1 + this.#getSize(node.left) + this.#getSize(node.right);
    return node;
  }
  getMin(root = this.root) {
    let head = root;
    while (head) {
      if (!head.left) return head.key;
      head = head.left;
    }
  }
  getMax(root = this.root) {
    let head = root;
    while (head) {
      if (!head.right) return head.key;
      head = head.right;
    }
  }
  floor(key) {
    const node = this.#getFloor(this.root, key);
    if (!node) return null;
    return node.key;
  }
  #getFloor(node, key) {
    if (!node) return null;

    if (node.compareTo(key) > 0) return this.#getFloor(node.left, key);
    if (node.compareTo(key) < 0) {
      const temp = this.#getFloor(node.right, key);
      if (temp) return temp;
      return node;
    }
  }

  iterate() {
    this.#inorderTraversal(this.root);
    const result = [...this.queue];
    this.queue.length = 0;
    return result;
  }
  #inorderTraversal(node) {
    if (!node) return;
    this.#inorderTraversal(node.left);
    this.queue.push(node.key);
    this.#inorderTraversal(node.right);
  }
}
