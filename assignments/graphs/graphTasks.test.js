import { findCycle, findEulereanCycle, findShortestCycle, reachableVertex } from "./challenges";
import {
  isInMST,
  minimumBottleneckMST,
  minimumMonotonicPath,
  secondShortestPath,
} from "./weightedTasks";

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

describe("Weighted", () => {
  let graph = [
    [0, 1, 20],
    [0, 2, 5],
    [0, 3, 10],
    [2, 3, 10],
  ];
  let graph2 = [
    [0, 1, 20],
    [0, 2, 5],
    [0, 3, 10],
    [2, 3, 20],
  ];

  let graph3 = [
    [],
    [
      [1, 3, 1.1],
      [1, 5, 2],
      [1, 6, 3.3],
    ],
    [[2, 5, 2.7]],
    [
      [3, 4, 2],
      [3, 5, 1.1],
    ],
    [[4, 2, 2.3]],
    [[5, 6, 2.4]],
    [[6, 2, 3]],
  ];
  let graph4 = [
    [],
    [
      [1, 2, 2.3],
      [1, 3, 3.1],
    ],
    [[2, 3, 3.7]],
    [[3, 4, 1.9]],
    [[4, 5, 2.1]],
  ];
  test("isInMST should return boolean whether edge is in MST or not", () => {
    expect(isInMST(graph, [2, 3])).toBe(true);
    expect(isInMST(graph2, [2, 3])).toBe(false);
  });
  test("minimumBottleneckMST should return number of minimum bottleneck of MST ", () => {
    expect(minimumBottleneckMST(graph)).toBe(20);
    expect(minimumBottleneckMST(graph2)).toBe(20);
  });
  test("minimumMonotonicPath should return number of length of minimum monotonic path in DAG ", () => {
    expect(minimumMonotonicPath(graph3, 1, 2)).toBe(5.4);
    expect(minimumMonotonicPath(graph4, 1, 5)).toBe(-1);
  });
  test("secondShortestPath should return number of second shortest path ", () => {
    expect(secondShortestPath(graph3, 1, 2)).toBe(6.3);
  });
});
