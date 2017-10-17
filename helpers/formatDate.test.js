const formatDate = require("./formatDate");

describe("formatDate", () => {
  it("returns a date", () => {
    expect(formatDate("22/09/2017 13:01:05")).toEqual({
      date: "Sep 22, 2017",
      time: "1:01pm",
      value: 1506085265000
    });
  });
});
