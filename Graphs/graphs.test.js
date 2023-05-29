import {
  BFSPath,
  Connectivity,
  Edge,
  Graph,
  Paths,
  WeightedGraph,
  kruskalAlg,
  primAlg,
  topologicalSort,
} from "./graphs";

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

    test("topologicalSort should return items in order", () => {
      expect(topologicalSort(diGraph.graph)).toEqual([4, 1, 2, 5, 0, 6, 3]);
    });
    test("BFS path should traverse graph and have distances to all vertices", () => {
      const traversed = new BFSPath(diGraph.graph, 0);
      expect(traversed.distTo(4)).toBe(2);
      expect(traversed.distTo(5)).toBe(1);
      expect(traversed.hasPath(5)).toBe(true);
      expect(traversed.hasPath(3)).toBe(false);
      expect(traversed.pathTo(4)).toEqual([0, 1, 4]);
    });
  });
  describe("Weighted Graph", () => {
    let graph;

    beforeEach(() => {
      graph = new WeightedGraph(8);
      graph.addEdge(new Edge(0, 7, 0.16));
      graph.addEdge(new Edge(2, 3, 0.17));
      graph.addEdge(new Edge(1, 7, 0.19));
      graph.addEdge(new Edge(0, 2, 0.26));
      graph.addEdge(new Edge(5, 7, 0.28));
      graph.addEdge(new Edge(1, 3, 0.29));
      graph.addEdge(new Edge(1, 5, 0.32));
      graph.addEdge(new Edge(2, 7, 0.34));
      graph.addEdge(new Edge(4, 5, 0.35));
      graph.addEdge(new Edge(1, 2, 0.36));
      graph.addEdge(new Edge(4, 7, 0.37));
      graph.addEdge(new Edge(0, 4, 0.38));
      graph.addEdge(new Edge(6, 2, 0.4));
      graph.addEdge(new Edge(3, 6, 0.52));
      graph.addEdge(new Edge(6, 0, 0.58));
    });
    afterEach(() => {
      graph = undefined;
    });

    test("Kruskal's algorigthm should return MST ", () => {
      const mst = kruskalAlg(graph.graph);

      expect(mst.length).toBe(7);

      expect(mst[0].weight).toBe(0.16);
      expect(mst[1].weight).toBe(0.17);
      expect(mst[2].weight).toBe(0.19);
      expect(mst[3].weight).toBe(0.26);
      expect(mst[4].weight).toBe(0.28);
      expect(mst[5].weight).toBe(0.35);
      expect(mst[6].weight).toBe(0.4);
    });
    test("Prim's algorigthm should return MST ", () => {
      const mst = primAlg(graph.graph);

      expect(mst.length).toBe(7);

      expect(mst[0].weight).toBe(0.16);
      expect(mst[1].weight).toBe(0.19);
      expect(mst[2].weight).toBe(0.26);
      expect(mst[3].weight).toBe(0.17);
      expect(mst[4].weight).toBe(0.28);
      expect(mst[5].weight).toBe(0.35);
      expect(mst[6].weight).toBe(0.4);
    });
  });
});
