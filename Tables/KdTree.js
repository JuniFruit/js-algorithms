export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  distanceTo(point) {
    let dx = point.x - this.x;
    let dy = point.y - this.y;
    return dx ** 2 + dy ** 2;
  }

  distanceSquaredTo(point) {
    return Math.sqrt(this.distanceTo(point));
  }

  compareTo(point, currentDepth) {
    if (currentDepth % 2 === 0) {
      return this.y - point.y;
    } else {
      return this.x - point.x;
    }
  }
  equals(point) {
    return this.x === point.x && this.y === point.y;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, Math.PI * 2);
    ctx.closePath();
  }
}

export class RectHV {
  constructor(xmin, ymin, xmax, ymax) {
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
  }

  contains(point) {
    return (
      this.xmin <= point.x && this.xmax >= point.x && this.ymin <= point.y && this.ymax >= point.y
    );
  }

  distanceTo(point) {
    return Math.sqrt(this.distanceSquaredTo(point));
  }

  distanceSquaredTo(point) {
    let dx = 0;
    let dy = 0;
    if (point.x < this.xmin) {
      dx = point.x - this.xmin;
    } else if (point.x > this.xmax) {
      dx = point.x - this.xmax;
    }
    if (point.y < this.ymin) {
      dy = point.y - this.ymin;
    } else if (point.y > this.ymax) {
      dy = point.y - this.ymax;
    }
    return dx ** 2 + dy ** 2;
  }

  intersects(rect) {
    return (
      this.xmax >= rect.xmin &&
      this.ymax >= rect.ymin &&
      rect.xmax >= this.xmin &&
      rect.ymax >= this.ymin
    );
  }
}

export class KdNode {
  constructor(val, count = 0, atDepth = 1, rect = null) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.count = count;
    this.atDepth = atDepth;
    this.rect = rect;
  }
}

export class KdTree {
  atDepth = 1;

  xmin = 0;
  xmax = 10;
  ymin = 0;
  ymax = 10;

  constructor(root = null) {
    this.root = root;
  }

  isEmpty() {
    this.size() === 0;
  }

  size() {
    return this.#getSize(this.root);
  }

  #getSize(node) {
    if (node === null) return 0;
    return node.count;
  }
  #insertRecursively(node, point, atDepth, xmin, ymin, xmax, ymax) {
    if (node === null) return new KdNode(point, 1, atDepth, new RectHV(xmin, ymin, xmax, ymax));

    if (node.val.compareTo(point, atDepth) < 0) {
      node.right =
        node.atDepth % 2 === 0
          ? this.#insertRecursively(node.right, point, atDepth + 1, node.val.x, ymin, xmax, ymax)
          : this.#insertRecursively(node.right, point, atDepth + 1, xmin, node.val.y, xmax, ymax);
    } else if (node.val.compareTo(point, atDepth) > 0) {
      node.left =
        node.atDepth % 2 === 0
          ? this.#insertRecursively(node.left, point, atDepth + 1, xmin, ymin, node.val.x, ymax)
          : this.#insertRecursively(node.left, point, atDepth + 1, xmin, ymin, xmax, node.val.y);
    } else {
      node.val = val;
    }
    node.count = 1 + this.#getSize(node.left) + this.#getSize(node.right);
    return node;
  }

  contains(point) {
    let head = this.root;
    let currDepth = this.atDepth;
    while (head) {
      if (head.val.compareTo(point, currDepth) < 0) {
        head = head.right;
        currDepth++;
      } else if (head.val.compareTo(point, currDepth) > 0) {
        head = head.left;
        currDepth++;
      } else if (head.val.equals(point)) {
        return true;
      }
    }
    return false;
  }

  insert(point) {
    this.root = this.#insertRecursively(
      this.root,
      point,
      this.atDepth,
      this.xmin,
      this.ymin,
      this.xmax,
      this.ymax
    );
  }

  range(rect) {
    let stack = [];
    let range = [];
    stack.push(this.root);
    while (stack.length) {
      let curr = stack.pop();
      if (!curr.rect.intersects(rect)) continue;
      if (rect.contains(curr.val)) range.push(curr.val);
      if (curr.left) stack.push(curr.left);
      if (curr.right) stack.push(curr.right);
    }
    return range;
  }

  nearest(point) {
    if (this.isEmpty()) {
      return null;
    } else {
      let result = this.#getNearest(this.root, point);

      return result;
    }
  }

  #getNearest(node, point, minPoint = null) {
    if (node !== null) {
      if (minPoint === null) {
        minPoint = node.val;
      }

      if (minPoint.distanceSquaredTo(point) >= node.rect.distanceSquaredTo(point)) {
        if (node.val.distanceSquaredTo(point) < minPoint.distanceSquaredTo(point)) {
          minPoint = node.val;
        }

        if (node.right && node.right.rect.contains(point)) {
          minPoint = this.#getNearest(node.right, point, minPoint);
          minPoint = this.#getNearest(node.left, point, minPoint);
        } else {
          minPoint = this.#getNearest(node.left, point, minPoint);
          minPoint = this.#getNearest(node.right, point, minPoint);
        }
      }
    }

    return minPoint;
  }
}
