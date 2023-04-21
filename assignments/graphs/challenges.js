"use strict";

import { Paths, reverseGraph } from "../../Graphs/graphs";

export const findCycle = (input, src) => {
  const visited = Array(input.length).fill(false);
  const recStack = Array(input.length).fill(false);

  for (let i = 0; i < input.length; i++) {
    if (dfs(i)) {
      return true;
    }
  }
  return false;

  function dfs(start) {
    if (recStack[start]) {
      return true;
    }
    if (visited[start]) {
      return false;
    }

    recStack[start] = true;
    visited[start] = true;
    const children = input[start];

    for (let i = 0; i < children.length; i++) {
      if (dfs(children[i])) {
        return true;
      }
    }
    recStack[start] = false;
    return false;
  }
};

export const findCycleNodes = (input, src) => {
  //   const visited = Array(input.length).fill(false);
  //   const recStack = Array(input.length).fill(false);
  //   const edgeTo = [];
  //   for (let i = 0; i < input.length; i++) {
  //     if (dfs(i, src)) {
  //       return edgeTo;
  //     }
  //   }
  //   return [];
  //   function dfs(start, prev) {
  //     edgeTo[start] = prev;
  //     if (recStack[start]) {
  //       return true;
  //     }
  //     if (visited[start]) {
  //       return false;
  //     }
  //     recStack[start] = true;
  //     visited[start] = true;
  //     const children = input[start];
  //     for (let i = 0; i < children.length; i++) {
  //       if (dfs(children[i], start)) {
  //         return true;
  //       }
  //     }
  //     edgeTo[start] = null;
  //     recStack[start] = false;
  //     return false;
  //   }
};

export const findEulereanCycle = input => {
  const visited = Array(input.length).fill(false);

  if (!isConnected()) return false;

  let odd = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i].length % 2 !== 0) odd++;
  }
  return odd >= 2 ? false : true;

  function isConnected() {
    // let i;
    // for (i = 0; i < input.length; i++) {
    //   if (input[i].length !== 0) break;
    // }

    // if (i === input.length) return true;

    dfs(0);

    for (let i = 0; i < visited.length; i++) {
      if (!visited[i] && input[i].length > 0) return false;
    }
    return true;
  }

  function dfs(start) {
    visited[start] = true;
    for (let v of input[start]) {
      if (!visited[v]) {
        dfs(v);
      }
    }
  }
};

export const findShortestCycle = graph => {
  const revG = reverseGraph(graph);
  let length = graph.length + 1;
  const stackRes = [];

  class BFS {
    marked = [];
    distances = [];
    edgeTo = [];
    start;
    constructor(graph, start) {
      this.start = start;
      this.#bfs(graph, start);
    }

    #bfs(g, src) {
      this.marked = Array(g.length).fill(false);
      this.distances = Array(g.length).fill(Infinity);

      const queue = [src];
      this.distances[src] = 0;
      while (queue.length) {
        const curr = queue.shift();
        this.marked[curr] = true;
        for (let v of g[curr]) {
          if (!this.marked[v]) {
            queue.push(v);
            this.distances[v] = this.distances[curr] + 1;
            this.edgeTo[v] = curr;
          }
        }
      }
    }

    hasPath(to) {
      return this.marked[to];
    }
    distTo(to) {
      return this.distances[to];
    }
    pathTo(to) {
      const path = [];
      let curr = to;
      while (curr !== this.start) {
        path.push(curr);
        curr = this.edgeTo[curr];
      }
      path.push(curr);
      return path.reverse();
    }
  }
  for (let v = 0; v < graph.length; v++) {
    const traversed = new BFS(graph, v);

    for (let w of revG[v]) {
      if (traversed.hasPath(w) && traversed.distTo(w) + 1 < length) {
        length = traversed.distTo(w) + 1;
        let cycle = [];
        for (let x of traversed.pathTo(w)) {
          cycle.push(x);
        }
        cycle.push(v);
        stackRes.push(cycle);
      }
    }
  }
  return stackRes.pop();
};

export const reachableVertex = graph => {
  let marked = Array(graph.length).fill(false);
  let found = -1;

  for (let i = 0; i < graph.length; i++) {
    let count = 0;
    for (let j = 0; j < graph.length; j++) {
      if (j === i) continue;
      dfs(j);
      if (!marked[i]) break;
      count++;
      marked = Array(graph.length).fill(false);
    }
    if (count === graph.length - 1) {
      found = i;
      break;
    }
  }
  return found;

  function dfs(start) {
    marked[start] = true;
    for (let v of graph[start]) {
      if (!marked[v]) {
        dfs(v);
      }
    }
  }
};
