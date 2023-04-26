import { WordNet } from "./wordNet";

describe("Word Net", () => {
  describe("WordNet class", () => {
    const synsets = [
      "0,'hood,(slang) a neighborhood",
      "1,1530s,the decade from 1530 to 1539",
      "2,15_May_Organization,a terrorist organization formed in 1979 by a faction of the Popular Front for the Liberation of Palestine but disbanded in the 1980s when key members left to join a faction of al-Fatah",
      "3,1750s,the decade from 1750 to 1759",
      "4,1760s,the decade from 1760 to 1769",
      "5,1770s,the decade from 1770 to 1779",
    ];
    const hypernyms = ["0,2", "1,3", "2,5", "3,4", "4,0", "5"];

    test("constructor should build graph from input", () => {
      const wordNet = new WordNet(synsets, hypernyms);
      expect(wordNet.graph).toEqual([[2], [3], [5], [4], [0], [NaN]]);
    });

    test("isNoun should return boolean if the noun is in the set or not", () => {
      const wordNet = new WordNet(synsets, hypernyms);
      expect(wordNet.isNoun("1750s")).toBe(true);
      expect(wordNet.isNoun("1750s2")).toBe(false);
      expect(wordNet.isNoun("'hood")).toBe(true);
    });
    test("distance should return number distance between nouns and their common ancestor", () => {
      const wordNet = new WordNet(synsets, hypernyms);
      expect(wordNet.distance("1750s", "15_May_Organization")).toBe(2);
    });
  });
});
