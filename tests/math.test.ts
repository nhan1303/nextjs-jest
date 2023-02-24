import { sum } from "../utils/math";

describe("math", () => {
  it("should return 5", () => {
    expect(sum(2, 3)).toEqual(5);
  });
});
