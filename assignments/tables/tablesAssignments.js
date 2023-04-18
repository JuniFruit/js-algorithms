import { HashMap } from "../../Tables/tables";

export const isBST = root => {
  return checkIsBST(root);
  function check(tree) {
    if (!tree) return true;
    if (tree.left?.compareTo(tree.key) >= 0 || tree.right?.compareTo(tree.key) <= 0) {
      return false;
    }
    return true;
  }

  function checkIsBST(node) {
    if (!node) return true;
    const isOK = check(node);
    if (!isOK) {
      return false;
    } else {
      return checkIsBST(node.left) && checkIsBST(node.right);
    }
  }
};

export const fourSum = (nums, target) => {
  const map = new HashMap();

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let sum = nums[i] + nums[j];
      let val = target - sum;

      if (map.contains(val)) {
        for (let pair of map.get(val)) {
          if (pair.x !== i && pair.x !== j && pair.y !== i && pair.y !== j) {
            return [nums[i], nums[j], nums[pair.x], nums[pair.y]];
          }
        }
      }

      const prev = map.get(sum);
      if (prev) {
        prev.push({ x: i, y: j });
      } else {
        map.assign(sum, [{ x: i, y: j }]);
      }
    }
  }
};
