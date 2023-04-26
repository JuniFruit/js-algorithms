"use strict";

import { BFSPath } from "../graphs.js";

import fs from "fs";
const files = ["./synsets.txt", "./hypernyms.txt", "./outcast.txt"];

let synsetsArr = [];
let hypernymsArr = [];
let outcastArr = [];
// const converted = files.map(file => {
//   const text = fs.readFileSync(file);
//   const textByLine = text.toString("utf-8").split("\n");
//   return textByLine;
// });
// synsetsArr = converted[0];
// hypernymsArr = converted[1];
// outcastArr = converted[2];
class SAP {
  cache = new Map();

  constructor(graph) {
    this.g = graph;
  }

  length(v, w) {
    return this.sap(v, w)[1];
  }
  sap(v, w) {
    const key = new Map();
    key.set(v, v);
    key.set(w, w);
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const vPath = new BFSPath(this.g, v);
    const wPath = new BFSPath(this.g, w);
    let distance = Infinity;
    let ancestor = -1;
    for (let vertex = 0; vertex < this.g.length; vertex++) {
      if (
        vPath.hasPath(vertex) &&
        vPath.distTo(vertex) < distance &&
        wPath.hasPath(vertex) &&
        wPath.distTo(vertex) < distance
      ) {
        let sum = vPath.distTo(vertex) + wPath.distTo(vertex);
        if (distance > sum) {
          distance = sum;
          ancestor = vertex;
        }
      }
    }

    if (distance === Infinity) {
      this.cache.set(key, [-1, -1]);
      return [-1, -1];
    }
    this.cache.set(key, [distance, ancestor]);
    return [distance, ancestor];
  }
  ancestor(v, w) {
    return this.sap(v, w)[1];
  }
}

export class WordNet {
  graph = [];
  nouns = new Map();
  nounsById = [];

  constructor(synsets, hypernyms) {
    this.#build(synsets, hypernyms);
    this.SAP = new SAP(this.graph);
  }

  #build(s, h) {
    for (let i = 0; i < s.length; i++) {
      let current = s[i];
      const [id, nouns] = current.split(",");
      let currHypernym = h[i];
      const [hId, id1, id2] = currHypernym.split(",");
      this.nounsById[id] = nouns;
      nouns.split(" ").forEach(noun => {
        if (this.nouns.has(noun)) {
          this.nouns.get(noun).push(id);
        } else {
          this.nouns.set(noun, [id]);
        }
      });
      if (this.graph[hId]) {
        this.graph[hId].push(+id1);
      } else {
        this.graph[hId] = [+id1];
      }

      if (id2) {
        this.graph[hId].push(+id2);
      }
    }
  }

  isNoun(value) {
    if (!value) return false;
    return !!this.nouns.get(value);
  }

  distance(nounA, nounB) {
    return this.SAP.length(
      this.nounsById.findIndex(item => item.split(" ").includes(nounA)),
      this.nounsById.findIndex(item => item.split(" ").includes(nounB))
    );
  }

  sap(nounA, nounB) {
    const id = this.SAP.ancestor(
      this.nounsById.findIndex(item => item.split(" ").includes(nounA)),
      this.nounsById.findIndex(item => item.split(" ").includes(nounB))
    );
    return this.nounsById[id];
  }
}

class Outcast {
  constructor(wordNet) {
    this.wordNet = wordNet;
  }

  dSum(noun, nouns) {
    let d = 0;
    for (let n of nouns) {
      d += this.wordNet.distance(noun, n);
    }
    return d;
  }

  outcast(nouns) {
    const outcast = nouns[0];
    let d = this.dSum(nouns[0], nouns);
    for (let i = 1; i < nouns.length; i++) {
      let tempdist = this.dSum(nouns[i], nouns);
      if (d < tempdist) {
        d = tempdist;
        outcast = nouns[i];
      }
    }
    return outcast;
  }
}

const start = () => {
  const wordnet = new WordNet(synsetsArr, hypernymsArr);

  const outcast = new Outcast(wordnet);
  console.log(": " + outcast.outcast(outcastArr));
};
// start();
