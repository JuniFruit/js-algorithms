import { RTries, SuffixTree } from "./Rtries";

describe("R-way tries", () => {
  test("put should insert value with the key and maintain the balance ", () => {
    const tree = new RTries();
    tree.put("sea", 1);
    tree.put("sell", 5);
    tree.put("shell", 2);
    tree.put("shore", 3);
    tree.put("she", 4);
    expect(tree.root.char).toBe("s");
    expect(tree.root.mid.char).toBe("e");
    expect(tree.root.mid.mid.char).toBe("a");
    expect(tree.root.mid.mid.left).toBe(null);

    expect(tree.root.mid.mid.mid).toBe(null);
  });
  test("get should retrieve the value by key", () => {
    const tree = new RTries();
    tree.put("abc", 1);
    tree.put("she", 2);
    tree.put("bull", 3);
    tree.put("shell", 4);
    tree.put("ZOO", 10);
    tree.put("ZOOLOGY", 11);

    expect(tree.get("abc")).toBe(1);
    expect(tree.get("she")).toBe(2);
    expect(tree.get("bull")).toBe(3);
    expect(tree.get("shell")).toBe(4);
    expect(tree.get("storm")).toBe(-1);
    expect(tree.get("ZOO")).toBe(10);
    expect(tree.get("ZOOLOGY")).toBe(11);
  });

  test("delete should remove value and nodes (if necessary) by the key ", () => {
    const tree = new RTries();
    tree.put("sea", 1);
    tree.put("shell", 2);
    tree.put("shore", 3);
    tree.put("she", 4);
    tree.put("sell", 5);

    tree.delete("shell");
    expect(tree.get("shell")).toBe(-1);
    expect(tree.root.mid.right.char).toBe("h");
    expect(tree.root.mid.right.mid.char).toBe("e");
    tree.delete("she");
    expect(tree.get("she")).toBe(-1);
    expect(tree.root.mid.right.char).toBe("h");

    expect(() => tree.delete("small")).toThrow("Such key doesn't exist");
  });
  test("keys should return all keys in tree", () => {
    const tree = new RTries();
    tree.put("sea", 1);
    tree.put("shell", 2);
    tree.put("shore", 3);
    tree.put("she", 4);
    tree.put("sell", 5);
    expect(tree.keys()).toEqual(["sea", "sell", "she", "shell", "shore"]);
  });
  test("startsWith should return all keys that start with given prefix in tree", () => {
    const tree = new RTries();
    tree.put("sea", 1);
    tree.put("shell", 2);
    tree.put("shore", 3);
    tree.put("she", 4);
    tree.put("sell", 5);
    expect(tree.startWith("sh")).toEqual(["she", "shell", "shore"]);
  });

  describe("Suffix Tree", () => {
    test("constructor should build suffix tree from input", () => {
      const tree = new SuffixTree("bananna");
      expect(tree.root.char).toBe("b");
      expect(tree.root.left.char).toBe("a");
      expect(tree.root.right.char).toBe("n");
    });
    test("search should return indices where pattern starts", () => {
      const tree = new SuffixTree("banana");
      expect(tree.search("banana")).toEqual([0]);
      expect(tree.search("na")).toEqual([2, 4]);
      const tree2 = new SuffixTree("Hello World, I'm very proud of being a programmer");
      expect(tree2.search("Hello")).toEqual([0]);
      expect(tree2.search("d")).toEqual([10, 26]);
      expect(tree2.search("z")).toBe(null);
    });
  });
});
