import { keyIndexedSort, lsdSort, nonFixedLsd } from "./radixSorts";

describe("Radix sorts", () => {
  test("keyIndexedSort should return sorted arr by key ", () => {
    const input = [1, 1, 5, 5, 2, 2, 2, 4, 4];
    expect(keyIndexedSort(input)).toEqual([1, 1, 2, 2, 2, 4, 4, 5, 5]);
  });

  test("LSD sort should return sorted strings in asc order ", () => {
    const input = ["she", "has", "car", "low", "end", "run", "buy", "and"];
    expect(lsdSort(input, 3)).toEqual(["and", "buy", "car", "end", "has", "low", "run", "she"]);
  });
  test("LSD float sort should return sorted strings in asc order ", () => {
    const input = [
      "she",
      "has",
      "car",
      "low",
      "end",
      "run",
      "buy",
      "and",
      "float",
      "fire",
      "bound",
      "andy",
    ];
    expect(nonFixedLsd(input)).toEqual([
      "and",
      "andy",
      "bound",
      "buy",
      "car",
      "end",
      "fire",
      "float",
      "has",
      "low",
      "run",
      "she",
    ]);

    const input2 = ["23", "345", "5467", "12", "2345", "9852"];
    expect(nonFixedLsd(input2)).toEqual(["12", "23", "2345", "345", "5467", "9852"]);
  });
});
