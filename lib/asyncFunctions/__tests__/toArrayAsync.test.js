const { toArrayAsync } = require("./../toArrayAsync");
const { map, repeat } = require("./../../functions");

describe("toArrayAsync function", () => {
  it("Awaits all promises from an array to be completed", async () => {
    const tasks = [
      async () => "done",
      async () => "done",
      async () => "done",
      async () => "done"
    ];
    const results = await toArrayAsync(tasks);

    expect(results).toEqual(["done", "done", "done", "done"]);
  });

  it("Awaits all promises from a lazy iterable to be completed", async () => {
    const tasks = map(repeat("done", 4), async () => "done");
    const results = await toArrayAsync(tasks);

    expect(results).toEqual(["done", "done", "done", "done"]);
  });
});
