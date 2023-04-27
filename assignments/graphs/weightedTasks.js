"use strict";

import { Union } from "../../Union/union";

export const isInMST = (g, edge) => {
  const minPQ = g.sort((a, b) => a[2] - b[2]);

  const [start, end] = edge;

  const overall = findTotal(false, start, end);
  const inc = findTotal(true, start, end);
  return overall === inc;
  function findTotal(include, a, b) {
    const union = new Union(g.length);
    let total = 0;

    if (include) {
      for (let edge of minPQ) {
        const [v, w, weight] = edge;
        if (v === a && w === b) {
          union.union(a, b);
          total += weight;
          break;
        }
      }
    }
    for (let edge of minPQ) {
      const [v, w, weight] = edge;
      if (!union.isConnected(v, w)) {
        union.union(v, w);
        total += weight;
      }
    }
    return total;
  }
};

export const minimumBottleneckMST = g => {
  const minPQ = g.sort((a, b) => a[2] - b[2]);
  const union = new Union(g.length);
  const mst = [];

  for (let edge of minPQ) {
    const [start, end] = edge;
    if (!union.isConnected(start, end)) {
      union.union(start, end);
      mst.push(edge);
    }
  }
  return mst[mst.length - 1][2];
};

// untested

const minWeightFeedbackEdge = g => {
  const minPQ = g.sort((a, b) => a[2] - b[2]);
  const union = new Union(g.length);
  const feedbackEdges = [];
  for (let edge of minPQ) {
    const [start, end] = edge;
    if (union.isConnected(start, end)) {
      feedbackEdges.push(edge);
    } else {
      union.union(start, end);
    }
  }
  return feedbackEdges.sort((a, b) => a[2] - b[2])[0];
};

export const minimumMonotonicPath = (g, s, d) => {
  const distTo = Array(g.length).fill(Infinity);
  const edgeTo = Array(g.length).fill(Infinity);

  const minPQ = [[s, 0.0]];
  distTo[s] = 0;
  edgeTo[d] = Infinity;
  while (minPQ.length) {
    let min = minPQ.shift();
    const [node] = min;
    for (let edge of g[node]) {
      const [start, end, weight] = edge;
      if (distTo[end] > distTo[start] + weight) {
        distTo[end] = distTo[start] + weight;
        edgeTo[end] = weight;
        minPQ.push([end, distTo[end]]);
        minPQ.sort((a, b) => a[1] - b[1]);
      }
    }
  }
  return distTo[d] || -1;
};

export const secondShortestPath = (g, s, target) => {
  const [path, length] = shortest(g, s, target);
  const filteredGraph = deleteEdges(
    g,
    path.map(item => item[0])
  );
  const [secondPath, secondLength] = shortest(filteredGraph, s, target);

  return secondLength;
  function deleteEdges(graph, inputEdges) {
    return graph.map((edges, v) => {
      const filtered = edges.filter(item => !inputEdges.includes(item));
      return filtered;
    });
  }
  function shortest(G, start, dest) {
    const distTo = Array(G.length).fill(Infinity);
    const edgeTo = Array(G.length).fill();
    const path = [];
    const minPQ = [[start, 0.0]];
    distTo[start] = 0;
    while (minPQ.length) {
      const min = minPQ.shift();
      const [node] = min;
      for (let edge of G[node]) {
        const [start, end, weight] = edge;
        if (distTo[end] > distTo[start] + weight) {
          distTo[end] = distTo[start] + weight;
          edgeTo[end] = [edge, start];
          minPQ.push([end, distTo[end]]);
          minPQ.sort((a, b) => a[1] - b[1]);
        }
      }
    }
    let curr = edgeTo[dest];

    while (curr) {
      path.push(curr);
      curr = edgeTo[curr[1]];
    }
    return [path, distTo[dest]];
  }
};
