import { SeamCarver } from "./seamCarver";

describe("Seam carver", () => {
  let carver;
  let picture = [];
  beforeEach(() => {
    // prettier-ignore
    picture = [
    [[255, 101, 51], [255, 101, 153], [255, 101, 255]],
    [[255, 153, 51], [255, 153, 153], [255, 153, 255]],
    [[255, 203, 51], [255, 204, 153], [255, 205, 255]],
    [[255, 255, 51], [255, 255, 153], [255, 255, 255]],
  ];
    carver = new SeamCarver(picture);
  });

  afterEach(() => {
    carver = undefined;
  });

  test("width and height should return correct number of picture size ", () => {
    expect(carver.width).toBe(3);
    expect(carver.height).toBe(4);
  });
  test("energy should return number energy of a pixel, or 1000 if it's border pixel ", () => {
    expect(carver.energy(0, 1)).toBe(1000);
    expect(carver.energy(1, 0)).toBe(1000);
    expect(carver.energy(4, 0)).toBe(1000);
    expect(carver.energy(1, 2)).toBe(Math.sqrt(52024));
    expect(carver.energy(1, 1)).toBe(Math.sqrt(52225));
  });
  test("findHorizontalSeam should return arr of coord from left to right ", () => {
    expect(carver.findHorizontalSeam(picture)).toEqual([
      [0, 1],
      [1, 2],
      [2, 1],
    ]);
  });
  test("findVerticalSeam should return arr of coord from top to bottom ", () => {
    expect(carver.findVerticalSeam(picture)).toEqual([
      [0, 0],
      [1, 1],
      [1, 2],
      [0, 3],
    ]);
  });

  test("removeHorizontalSeam should remove given coordinates from the pixels arr ", () => {
    //prettier-ignore
    const expected = [
        [[255, 101, 51], [255, 101, 153], [255, 101, 255]],
        [[255, 203, 51], [255, 153, 153], [255, 205, 255]],
        [[255, 255, 51], [255, 255, 153], [255, 255, 255]],
        
    ];
    carver.findHorizontalSeam();
    carver.removeHorizontalSeam();

    expect(carver.pixels).toEqual(expected);
  });
  test("removeVerticalSeam should remove given coordinates from the pixels arr ", () => {
    //prettier-ignore
    const expected = [
        [[255, 101, 153], [255, 101, 255]],
        [[255, 153, 51], [255, 153, 255]],
        [[255, 203, 51], [255, 205, 255]],
        [[255, 255, 153], [255, 255, 255]],
    ];
    carver.findVerticalSeam();
    carver.removeVerticalSeam();
    expect(carver.pixels).toEqual(expected);
  });
});
