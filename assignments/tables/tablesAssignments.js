export const isBST = root => {
  return checkIsBST(root);
  function check(tree) {
    if (!tree) return true;
    if (
      tree.left?.compareTo(tree.key) >= 0 ||
      tree.right?.compareTo(tree.key) <= 0
    ) {
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
