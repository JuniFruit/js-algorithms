import { RandomizedQueue, Deque } from "./queueTasks";
describe("Queue tasks", () => {
  describe("Deque", () => {
    test("method isEmpty should return boolean whether Deque is empty or not", () => {
      expect(new Deque().isEmpty()).toBe(true);
    });
    test("method addLast should add item to the end of the Deque ", () => {
      const deque = new Deque();
      deque.addLast(5);
      expect(deque.deque).toEqual([5]);
      deque.addLast(7);
      expect(deque.deque).toEqual([5, 7]);
    });
    test("method removeLast should return last item and remove it from the end of the Deque ", () => {
      const deque = new Deque();
      deque.addLast(5);
      deque.addLast(7);
      expect(deque.removeLast()).toBe(7);
      expect(deque.deque).toEqual([5, null]);
    });
    test("method addFirst should add item to the front of the Deque ", () => {
      const deque = new Deque();
      deque.addFirst(5);
      expect(deque.deque).toEqual([5]);
      deque.addFirst(7);
      expect(deque.deque).toEqual([7, 5]);
    });
    test("cannot remove elements from an empty Deque", () => {
      const deque = new Deque();
      expect(deque.removeFirst()).toBeNull();
      expect(deque.removeLast()).toBeNull();
    });
    test("method removeFirst should return first item and remove it from the front of the Deque ", () => {
      const deque = new Deque();
      deque.addFirst(5);
      deque.addFirst(7);
      expect(deque.removeFirst()).toBe(7);
      expect(deque.deque).toEqual([5, null]);
    });
    test("method checkSize should return num size of the Deque ", () => {
      const deque = new Deque();
      deque.addFirst(5);
      expect(deque.checkSize()).toBe(1);
      deque.addLast(7);
      expect(deque.checkSize()).toBe(2);
    });
    test("should perform operations correctly ", () => {
      const deque = new Deque();
      deque.addFirst(5);
      expect(deque.checkSize()).toBe(1);
      expect(deque.deque).toEqual([5]);
      deque.addLast(7);
      expect(deque.checkSize()).toBe(2);
      expect(deque.deque).toEqual([5, 7]);
      deque.addLast(6);
      expect(deque.deque).toEqual([5, 7, 6, null]);
      deque.addFirst(10);
      expect(deque.deque).toEqual([10, 5, 7, 6]);
      deque.addLast(20);
      expect(deque.deque).toEqual([10, 5, 7, 6, 20, null, null, null]);
      expect(deque.removeFirst()).toBe(10);
      expect(deque.deque).toEqual([5, 7, 6, 20, null, null, null, null]);
      expect(deque.removeLast()).toBe(20);
      expect(deque.deque).toEqual([5, 7, 6, null, null, null, null, null]);
      expect(deque.checkSize()).toBe(3);
      deque.removeLast();
      expect(deque.deque).toEqual([5, 7]);
    });
  });
  describe("Randomized Queue", () => {});
});
