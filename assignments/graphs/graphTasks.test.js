import {
  findCycle,
  findCycleNodes,
  findEulereanCycle,
  findShortestCycle,
  reachableVertex,
} from "./challenges";

describe("Graph tasks", () => {
  const graph1 = [[1, 2, 5, 6], [3], [3, 4], [], [5, 6], [], []];
  const graph2 = [[1, 2], [2], [0, 3], [3]];
  const graph3 = [[1, 2, 5, 6], [3], [3, 4], [3], [5, 6], [5], [4, 0]];
  const graph4 = [
    [1, 2, 3, 4],
    [0, 2],
    [0, 1],
    [0, 4],
    [3, 0],
  ];
  const graph5 = [[1, 2, 3, 4], [0, 2, 3], [0, 1], [0, 4, 1], [3]];
  const graph6 = [[1, 7], [2], [3, 0], [4], [0, 5, 7], [6], [], []];
  const graph7 = [[], [0, 2], [0, 3], [0], [0, 5], [3]];
  const graph8 = [[2], [0, 2, 5], [4], [0], [], [3]];

  test("findCycle should find cycle in the graph", () => {
    expect(findCycle(graph1, 0)).toBe(false);
    expect(findCycle(graph2, 0)).toBe(true);
    expect(findCycle(graph3, 0)).toBe(true);
  });
  //   test("findCycleNodes should return nodes that form cycle in the graph", () => {
  //     expect(findCycleNodes(graph1, 0)).toEqual([]);
  //     expect(findCycleNodes(graph2, 0)).toEqual([2, 0, 1]);
  //     expect(findCycleNodes(graph3, 0)).toEqual([]);
  //   });

  test("findEulereanCycle should return boolean if eulerian cycle exists", () => {
    expect(findEulereanCycle(graph4)).toBe(true);
    expect(findEulereanCycle(graph5)).toBe(false);
  });
  test("findShortestCycle should return vertices of shortest cycle in diGraph", () => {
    expect(findShortestCycle(graph6)).toEqual([0, 1, 2, 0]);
  });
  test("reachableVertex should return node that is reachable from every vertex otherwise -1", () => {
    expect(reachableVertex(graph7)).toBe(0);
    expect(reachableVertex(graph6)).toBe(-1);
    expect(reachableVertex(graph8)).toBe(4);
  });
});
