const parseStatus = require("./parseStatus");

const deliveredResult = {
  StatusDescription: "Delivered",
  Type: "D",
  Status: "Yes"
};

const deliveredNotResult = {
  StatusDescription: "Delivered",
  Type: "D",
  Status: "ONB"
};

const pickedUpResult = {
  StatusDescription: "Picked",
  Type: "P",
  Status: "Picked Up"
};

describe("parseStatus ", () => {
  it("returns a delivered true object when Type D and valid status code", () => {
    expect(parseStatus(deliveredResult)).toEqual({
      delivered: true,
      status: "Delivered"
    });
  });

  it("returns a delivered false object when Type D and invalid status code", () => {
    expect(parseStatus(deliveredNotResult)).toEqual({
      delivered: false,
      status: "Delivered"
    });
  });

  it("returns a delivered false object when Type P", () => {
    expect(parseStatus(pickedUpResult)).toEqual({
      delivered: false,
      status: "Picked"
    });
  });
});
