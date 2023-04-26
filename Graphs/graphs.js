"use strict";

import { MinHeapWithComparator } from "../Heaps/heaps";
import { Union } from "../Union/union";

export class Graph {
  graph = [];
  vertices = 0;

  create(vertices, isDirected = false) {
    this.vertices = vertices;
    this.isDirected = isDirected;
    this.graph = new Array(this.vertices);
    for (let i = 0; i < this.vertices; i++) {
      this.graph[i] = new Array();
    }
  }

  addVertex(vertex) {
    if (this.graph[vertex]) return;
    this.graph[vertex] = [];
  }
  addEdge(vertex, to) {
    this.graph[vertex].push(to);
    !this.isDirected && this.graph[to].push(vertex);
  }
  deleteEdge(vertex, edge) {
    ///
  }
}

export class Paths {
  marked = [];
  path = [];
  start;
  graph;

  constructor(graph, start) {
    this.start = start;
    this.graph = graph;
    this.#dfs(graph.graph, start);
  }

  #dfs(graph, start) {
    this.marked.push(start);
    for (let V of graph[start]) {
      if (!this.marked.includes(V)) {
        this.#dfs(graph, V);
        this.path[V] = start;
      }
    }
  }

  hasPath(to) {
    return this.marked.includes(to);
  }
  getPath(to) {
    if (!this.hasPath(to)) return null;
    const result = [];
    let curr = to;

    while (curr !== this.start) {
      result.push(curr);
      curr = this.path[curr];
    }
    result.push(curr);
    return result.reverse();
  }
}

export class Connectivity {
  marked = [];
  id = [];
  start;
  count = 0;
  graph;

  constructor(graph, start) {
    this.start = start;
    this.graph = graph;
    this.#connectivity(graph.graph);
  }

  #dfs(graph, start) {
    this.marked.push(start);
    this.id[start] = this.count;
    for (let V of graph[start]) {
      if (!this.marked.includes(V)) {
        this.#dfs(graph, V);
      }
    }
  }

  #connectivity(graph) {
    for (let i = 0; i < graph.length; i++) {
      if (!this.marked.includes(i)) {
        this.#dfs(graph, i);
        this.count++;
      }
    }
  }

  isConnected(vertex, to) {
    return this.id[vertex] === this.id[to];
  }
  connectedCount() {
    return this.count;
  }
}

export const topologicalSort = graph => {
  const marked = Array(graph.length).fill(false);
  const result = [];

  for (let i = 0; i < graph.length; i++) {
    if (!marked[i]) dfs(i);
  }
  return result;
  function dfs(start) {
    marked[start] = true;
    for (let v of graph[start]) {
      if (!marked[v]) {
        dfs(v);
      }
    }
    result.push(start);
  }
};

export class BFSPath {
  marked = [];
  distance = [];
  edgeTo = [];
  graph;
  start;
  constructor(graph, start) {
    this.graph = graph;
    this.start = start;
    this.marked = Array(graph.length).fill(false);
    this.distance = Array(graph.length).fill(Infinity);
    this.#bfs(graph, start);
  }

  #bfs(g, src) {
    const queue = [src];
    this.distance[src] = 0;
    while (queue.length) {
      let curr = queue.shift();
      this.marked[curr] = true;
      for (let v of g[curr]) {
        if (isNaN(v)) continue;
        if (!this.marked[v]) {
          queue.push(v);
          this.distance[v] = this.distance[curr] + 1;
          this.edgeTo[v] = curr;
        }
      }
    }
  }
  hasPath(to) {
    return this.marked[to];
  }

  distTo(v) {
    return this.distance[v];
  }
  pathTo(v) {
    const path = [];
    let curr = v;
    while (curr !== this.start) {
      path.push(curr);
      curr = this.edgeTo[curr];
    }
    path.push(curr);
    return path.reverse();
  }
}

export const reverseGraph = input => {
  const map = new Map();

  for (let i = 0; i < input.length; i++) {
    for (let v of input[i]) {
      let list = map.get(v);
      if (!list) {
        list = [];
        list.push(i);
      } else if (!list.includes(i)) {
        list.push(i);
      }
      map.set(v, list);
    }
  }
  const result = [];
  for (let key of map.keys()) {
    result[key] = map.get(key);
  }
  return result;
};

export class Edge {
  constructor(start, end, weight = 1) {
    this.start = start;
    this.end = end;
    this.weight = weight;
  }

  either() {
    return this.start;
  }
  other(current) {
    if (current === this.start) return this.end;
    return this.start;
  }
  compareTo(vertex) {
    if (!vertex) return 0;
    return this.weight - vertex.weight;
  }
}

export class WeightedGraph {
  graph = [];

  constructor(size) {
    this.size = size;

    for (let i = 0; i < size; i++) {
      this.graph[i] = [];
    }
  }

  addEdge(edge) {
    let v = edge.either();
    let w = edge.other(v);

    this.graph[v].push(edge);
    this.graph[w].push(edge);
  }

  adj(vertex) {
    return this.graph[vertex];
  }
}

export const kruskalAlg = g => {
  const minPQ = new MinHeapWithComparator();
  for (let edges of g) {
    for (let edge of edges) {
      minPQ.add(edge);
    }
  }

  const mst = [];
  const union = new Union(g.length);

  while (!minPQ.isEmpty() && mst.length < g.length - 1) {
    let min = minPQ.pop();
    let v = min.either();
    let w = min.other(v);
    if (!union.isConnected(v, w)) {
      mst.push(min);
      union.union(v, w);
    }
  }
  return mst;
};

export const primAlg = g => {
  const minPQ = new MinHeapWithComparator();
  const marked = Array(g.length).fill(false);
  const mst = [];
  visit(g, 0);
  while (!minPQ.isEmpty()) {
    const edge = minPQ.pop();
    const v = edge.either();
    const w = edge.other(v);
    if (marked[v] && marked[w]) continue;
    mst.push(edge);
    if (!marked[v]) visit(g, v);
    if (!marked[w]) visit(g, w);
  }
  return mst;

  function visit(graph, start) {
    marked[start] = true;
    for (let edge of graph[start]) {
      if (!marked[edge.other(start)]) {
        minPQ.add(edge);
      }
    }
  }
};
