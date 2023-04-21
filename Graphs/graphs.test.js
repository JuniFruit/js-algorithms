import { BFSPath, Connectivity, Graph, Paths, topologicalSort } from "./graphs";

describe("Graphs", () => {
  describe("Graph", () => {
    let graph;
    beforeEach(() => {
      graph = new Graph();
    });
    afterEach(() => {
      graph = undefined;
    });
    test("create should create empty graph of given vertices ", () => {
      graph.create(10);

      expect(graph.graph.length).toBe(10);
      expect(graph.graph[0]).toEqual([]);
    });

    test("addVertex should add vertex to graph, if vertex already exists, return undefined ", () => {
      graph.create(10);

      expect(graph.addVertex(5)).toBe(undefined);
      graph.addVertex(10);
      expect(graph.graph[10]).toEqual([]);
    });
    test("addEdge should add connection between vertices", () => {
      graph.create(10);
      graph.addEdge(0, 5);
      expect(graph.graph[0]).toEqual([5]);
      expect(graph.graph[5]).toEqual([0]);
    });
  });
  describe("Paths", () => {
    let graph;

    beforeEach(() => {
      graph = new Graph();
      graph.create(11);
      graph.addEdge(0, 6);
      graph.addEdge(0, 2);
      graph.addEdge(0, 1);
      graph.addEdge(0, 5);
      graph.addEdge(6, 4);
      graph.addEdge(4, 5);
      graph.addEdge(5, 3);
      graph.addEdge(7, 8);
      graph.addEdge(9, 10);
    });
    afterEach(() => {
      graph = undefined;
    });

    test("constructor should traverse all the vertices", () => {
      const traversed = new Paths(graph, 0);

      expect(traversed.marked.length).toBe(7);
    });
    test("hasPath should return boolean if path to vertex exist or not", () => {
      const traversed = new Paths(graph, 0);

      expect(traversed.hasPath(4)).toBe(true);
      expect(traversed.hasPath(12)).toBe(false);
    });
    test("path should return array of vertices arranged in order to represent a path to a vertex ", () => {
      const traversed = new Paths(graph, 0);

      expect(traversed.getPath(5)).toEqual([0, 6, 4, 5]);
      expect(traversed.getPath(2)).toEqual([0, 2]);
      expect(traversed.getPath(6)).toEqual([0, 6]);
    });
  });
  describe("Connectivity", () => {
    let graph;

    beforeEach(() => {
      graph = new Graph();
      graph.create(11);
      graph.addVertex(10);
      graph.addEdge(0, 6);
      graph.addEdge(0, 2);
      graph.addEdge(0, 1);
      graph.addEdge(0, 5);
      graph.addEdge(6, 4);
      graph.addEdge(4, 5);
      graph.addEdge(5, 3);
      graph.addEdge(7, 8);
      graph.addEdge(9, 10);
    });
    afterEach(() => {
      graph = undefined;
    });
    test("isConnected should return boolean if given vertices are connected or not", () => {
      const conn = new Connectivity(graph);

      expect(conn.isConnected(0, 6)).toBe(true);
      expect(conn.isConnected(0, 7)).toBe(false);
      expect(conn.isConnected(9, 1)).toBe(false);
    });
    test("count should number of connected graphs", () => {
      const conn = new Connectivity(graph);

      expect(conn.connectedCount()).toBe(3);
    });
  });
  describe("Directed graphs", () => {
    let diGraph;

    beforeEach(() => {
      diGraph = new Graph();
      diGraph.create(7, true);
      diGraph.addEdge(0, 1);
      diGraph.addEdge(0, 2);
      diGraph.addEdge(0, 5);
      diGraph.addEdge(1, 4);
      diGraph.addEdge(5, 2);
      diGraph.addEdge(3, 2);
      diGraph.addEdge(3, 5);
      diGraph.addEdge(3, 4);
      diGraph.addEdge(3, 6);
      diGraph.addEdge(6, 4);
      diGraph.addEdge(6, 0);
    });

    afterEach(() => {
      diGraph = undefined;
    });

    test("topologicalSort should return items in order ", () => {
      expect(topologicalSort(diGraph.graph)).toEqual([4, 1, 2, 5, 0, 6, 3]);
    });
    test("BFS path should traverse graph and have distances to all vertices", () => {
      const traversed = new BFSPath(diGraph, 0);
      expect(traversed.distTo(4)).toBe(2);
      expect(traversed.distTo(5)).toBe(1);
      expect(traversed.hasPath(5)).toBe(true);
      expect(traversed.hasPath(3)).toBe(false);
      expect(traversed.pathTo(4)).toEqual([0, 1, 4]);
    });
  });
});
