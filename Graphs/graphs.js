"use strict";

export class Graph {
  graph = [];
  vertices = 0;

  create(vertices) {
    this.vertices = vertices;
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
