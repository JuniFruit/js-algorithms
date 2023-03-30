"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const width = canvas.width;
const height = canvas.height;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(
      this.x / 100 + width / 2.5,
      this.y / 100 + height / 2.5,
      3,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  slopeTo(point) {
    if (this.x === point.x && this.y === point.y) return -Infinity;
    return +((point.y - this.y) / (point.x - this.x)).toFixed(5);
  }
  slopeOrder(point, point2) {
    if (this.slopeTo(point) < this.slopeTo(point2)) {
      return -1;
    } else if (this.slopeTo(point) > this.slopeTo(point2)) {
      return 1;
    } else {
      return 0;
    }
  }
  compareTo(point) {
    if (this.y === point.y) return this.x - point.x;
    return this.y - point.y;
  }
}

class CollinearFinder {
  segmentsArr = [];
  constructor(points) {
    this.points = points;
  }

  segments() {
    for (let i = 0; i < this.points.length; i++) {
      const origin = this.points[i];
      const copy = this.points.map(point => new Point(point.x, point.y));
      const sortedHO = this.#sort(copy, (a, b) => a.compareTo(b));
      const sorted = this.#sort(sortedHO, origin.slopeOrder.bind(origin));

      let lineBeginning = null;
      let count = 1;

      for (let j = 1; j < sorted.length - 1; j++) {
        if (sorted[j].slopeTo(origin) === sorted[j + 1].slopeTo(origin)) {
          count++;
          if (count === 2) {
            lineBeginning = sorted[j];
            count++;
          } else if (count >= 4 && j + 1 === sorted.length - 1) {
            if (lineBeginning.compareTo(origin) > 0) {
              this.segmentsArr.push(new LineSegment(origin, sorted[j + 1]));
            }
            count = 1;
          }
        } else if (count >= 4) {
          if (lineBeginning.compareTo(origin) > 0) {
            this.segmentsArr.push(new LineSegment(origin, sorted[j]));
          }
          count = 1;
        } else {
          count = 1;
        }
      }
    }

    return this.segmentsArr;
  }

  #merge(lArr, rArr, comparator) {
    const aux = [];
    while (lArr.length && rArr.length) {
      if (comparator(lArr[0], rArr[0]) <= 0) {
        aux.push(lArr.shift());
      } else {
        aux.push(rArr.shift());
      }
    }
    aux.push(...lArr, ...rArr);
    return aux;
  }
  #sort(arr, comparator) {
    if (arr.length < 2) return arr;
    let mid = Math.floor(arr.length / 2);
    const left = this.#sort(arr.splice(0, mid), comparator);
    const right = this.#sort(arr, comparator);

    return this.#merge(left, right, comparator);
  }

  numberOfSegments() {
    return this.segmentsArr.length;
  }
}

class LineSegment {
  constructor(q, p) {
    this.q = q;
    this.p = p;
  }

  drawLine() {
    ctx.beginPath();
    ctx.moveTo(this.q.x / 100 + width / 2.5, this.q.y / 100 + height / 2.5);
    ctx.lineTo(this.p.x / 100 + width / 2.5, this.p.y / 100 + height / 2.5);
    ctx.stroke();
  }
}

/**
 * @param {[number, number][]} coords array of x,y values
 **/

const drawPoints = coords => {
  const points = [];

  for (let [x, y] of coords) {
    const point = new Point(x, y);
    points.push(point);
  }

  points.forEach(point => point.draw());

  const finder = new CollinearFinder(points);

  finder.segments().forEach(seg => seg.drawLine());
};
// const map = [
//   [9000, 9000],
//   [8000, 8000],
//   [7000, 7000],
//   [6000, 6000],
//   [5000, 5000],
//   [4000, 4000],
//   [3000, 3000],
//   [2000, 2000],
//   [1000, 1000],
// ];

// const map = [
//   [4000, 30000],
//   [3500, 28000],
//   [3000, 26000],
//   [2000, 22000],
//   [1000, 18000],
//   [13000, 21000],
//   [23000, 16000],
//   [28000, 13500],
//   [28000, 5000],
//   [28000, 1000],
// ];
// const map = [
//   [0, 0],
//   [0, 5000],
//   [0, 10000],
//   [0, 15000],
//   [0, 20000],
//   [5000, 0],
//   [5000, 5000],
//   [5000, 10000],
//   [5000, 15000],
//   [5000, 20000],
//   [1000, 0],
//   [1000, 5000],
//   [1000, 10000],
//   [1000, 15000],
//   [1000, 20000],
//   [1500, 0],
//   [1500, 5000],
//   [1500, 10000],
//   [1500, 15000],
//   [1500, 20000],
//   [2000, 0],
//   [2000, 5000],
//   [2000, 10000],
//   [2000, 15000],
//   [2000, 20000],
// ];
const map = [
  [26000, 27000],
  [24000, 23000],
  [18000, 23000],
  [22000, 9000],
  [25000, 25000],
  [1000, 2000],
  [12000, 10000],
  [22000, 17000],
  [25000, 1000],
  [15000, 1000],
  [19000, 28000],
  [12000, 3000],
  [4000, 15000],
  [2000, 7000],
  [18000, 27000],
  [1000, 13000],
  [9000, 26000],
  [11000, 26000],
  [6000, 16000],
  [18000, 30000],
  [18000, 26000],
  [24000, 30000],
  [10000, 25000],
  [7000, 10000],
  [19000, 24000],
  [6000, 0],
  [26000, 15000],
  [1000, 23000],
  [23000, 29000],
  [15000, 7000],
  [15000, 19000],
  [17000, 31000],
  [6000, 2000],
  [17000, 16000],
  [1000, 26000],
  [11000, 19000],
  [25000, 0],
  [17000, 30000],
  [16000, 22000],
  [18000, 13000],
  [3000, 23000],
  [10000, 13000],
  [1000, 9000],
  [11000, 21000],
  [29000, 19000],
  [9000, 29000],
  [30000, 3000],
  [9000, 1000],
  [5000, 29000],
  [26000, 6000],
];

drawPoints(map);

// export { CollinearFinder, Point }; // for tests
