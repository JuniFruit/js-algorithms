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
