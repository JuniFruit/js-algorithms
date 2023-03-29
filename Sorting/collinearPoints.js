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
    ctx.font = "15px serif";
    ctx.arc(
      this.x / 100 + width / 2.5,
      this.y / 100 + height / 2.5,
      5,
      0,
      Math.PI * 2
    );
    ctx.strokeText(
      `X: ${this.x}, Y: ${this.y}`,
      this.x / 100 + width / 2.5,
      this.y / 100 + height / 2.5
    );
    ctx.fill();
  }

  slopeTo(point) {
    if (point.y === this.y && point.x === this.x) return Infinity;
    return (point.y - this.y) / (point.x - this.x);
  }
  slopeOrder(point, point2) {
    if (this.slopeTo(point) < this.slopeTo(point2)) {
      return -1;
    } else if (this.slopeTo(point) > this.slopeTo(point2)) {
      return 1;
    } else {
      0;
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
      const sorted = this.#sort(copy, origin.slopeOrder.bind(origin));

      let lineBeginning = null;
      let count = 1;
      let j = 1;
      console.log(count);
      while (j < sorted.length - 1) {
        if (sorted[j].slopeTo(origin) === sorted[j + 1].slopeTo(origin)) {
          count++;
          if (count === 2) {
            lineBeginning = sorted[j];
            count++;
          } else if (count >= 4 && j + 1 == sorted.length - 1) {
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
        j++;
      }
    }
    console.log(this.segmentsArr);
    return this.segmentsArr;
  }

  #merge(lArr, rArr, comparator) {
    const aux = [];
    while (lArr.length && rArr.length) {
      if (comparator(lArr[0], rArr[0]) < 0) {
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
    return this.segments.length;
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

  for (let coord of coords) {
    const point = new Point(coord[0], coord[1]);
    points.push(point);
  }

  points.forEach(point => point.draw());

  const finder = new CollinearFinder(points);

  finder.segments().forEach(seg => seg.drawLine());
};
// const map = {
//   9000: 9000,
//   8000: 8000,
//   7000: 7000,
//   6000: 6000,
//   5000: 5000,
//   4000: 4000,
//   3000: 3000,
//   2000: 2000,
//   1000: 1000,
// };

const map = {
  4000: 30000,
  3500: 28000,
  3000: 26000,
  2000: 22000,
  1000: 18000,
  13000: 21000,
  23000: 16000,
  28000: 13500,
  28000: 5000,
  28000: 1000,
};

drawPoints(Object.entries(map));
