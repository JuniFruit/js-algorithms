import { MaxHeap, MinHeap } from "./heaps";

describe("Heaps", () => {
  describe("Min heap", () => {
    test("should instantiate heap with size 0", () => {
      expect(new MinHeap().size()).toBe(0);
    });
    test("should track size when elements are added or removed", () => {
      const mHeap = new MinHeap();
      mHeap.add(5);
      expect(mHeap.size()).toBe(1);
      mHeap.add(11);
      expect(mHeap.size()).toBe(2);
      mHeap.pop();
      expect(mHeap.size()).toBe(1);
    });
    test("should add items and maintain min value at the root", () => {
      const mHeap = new MinHeap();

      mHeap.add(5);
      mHeap.add(2);
      expect(mHeap.heap[1]).toBe(2);
      mHeap.add(10);
      mHeap.add(1);
      expect(mHeap.heap[1]).toBe(1);
    });
    test("should pop min item from the root and maintain the order of the heap", () => {
      const mHeap = new MinHeap();

      mHeap.add(5);
      mHeap.add(2);
      mHeap.add(10);
      mHeap.add(1);
      expect(mHeap.pop()).toBe(1);
      expect(mHeap.pop()).toBe(2);
      expect(mHeap.pop()).toBe(5);
    });
  });
  describe("Max heap", () => {
    test("should instantiate heap with size 0", () => {
      expect(new MaxHeap().size()).toBe(0);
    });
    test("should track size when elements are added or removed", () => {
      const mHeap = new MaxHeap();

      mHeap.add(5);
      expect(mHeap.size()).toBe(1);
      mHeap.add(11);
      expect(mHeap.size()).toBe(2);
      mHeap.pop();
      expect(mHeap.size()).toBe(1);
    });
    test("should add items and maintain max value at the root", () => {
      const mHeap = new MaxHeap();

      mHeap.add(5);
      mHeap.add(2);
      expect(mHeap.heap[1]).toBe(5);
      mHeap.add(10);
      mHeap.add(1);
      expect(mHeap.heap[1]).toBe(10);
    });
    test("should pop max item from the root and maintain the order of the heap", () => {
      const mHeap = new MaxHeap();

      mHeap.add(5);
      mHeap.add(2);
      mHeap.add(10);
      mHeap.add(1);
      expect(mHeap.pop()).toBe(10);
      expect(mHeap.pop()).toBe(5);
      expect(mHeap.pop()).toBe(2);
      mHeap.add(125);
      mHeap.add(Infinity);
      mHeap.add(500);
      expect(mHeap.pop()).toBe(Infinity);
      expect(mHeap.pop()).toBe(500);
      expect(mHeap.pop()).toBe(125);
      mHeap.add(0.251);
      mHeap.add(0.819);
      expect(mHeap.pop()).toBe(1);
      expect(mHeap.pop()).toBe(0.819);
      expect(mHeap.pop()).toBe(0.251);
    });
  });
});
