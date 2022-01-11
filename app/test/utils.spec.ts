import mock from "mock-fs";
import path from "path";

import { readCardFile, editCard } from "../utils";

const mockCards = JSON.stringify([
  {
    id: "d0778b29-9ecf-4153-a909-1156ec00495c",
    created_at: "2022-01-12T17:34:44.463Z",
    last_edited: "2022-01-12T17:34:44.463Z",
    name: "Test Card 1",
    image: "/static/gold_snowflake.png",
    min_value: 33,
    max_value: 3301,
    theme: "Holiday",
    valid_from: "2022-01-01T00:00:00.000Z",
    valid_until: "2022-02-01T00:00:00.000Z",
    purchases: 1227,
    revenue: 7708,
  },
  {
    id: "32d3855e-9e59-43d6-a53a-7b320614bfe2",
    created_at: "2022-01-12T17:34:44.463Z",
    last_edited: "2022-01-12T17:34:44.463Z",
    name: "Test Card 2",
    image: "/static/gold_snowflake.png",
    min_value: 30,
    max_value: 3385,
    theme: "Celebration",
    valid_from: "2022-01-01T00:00:00.000Z",
    valid_until: "2022-02-01T00:00:00.000Z",
    purchases: 3690,
    revenue: 37932,
  },
]);

// Some example tests
describe("utils.ts", () => {
  beforeAll(() => {
    mock({
      [path.resolve(__dirname, "../static/cards.json")]: mockCards,
    });
  });

  afterAll(() => {
    mock.restore();
  });

  describe("readCardFile", () => {
    it("should read the file", async () => {
      const result = await readCardFile();
      const cards = JSON.parse(result);

      expect(cards.length).toBe(2);
      expect(cards[0].id).toBe("d0778b29-9ecf-4153-a909-1156ec00495c");
    });
  });

  describe("editCard", () => {
    it("should edit the correct card", async () => {
      const update = {
        id: "32d3855e-9e59-43d6-a53a-7b320614bfe2",
        theme: "Shop Small", // Change Celebration to Shop Small
      };
      await editCard(update);

      const result = await readCardFile();
      const cards = JSON.parse(result);

      expect(cards.length).toBe(2);
      expect(cards[0].id).toBe("d0778b29-9ecf-4153-a909-1156ec00495c");
      expect(cards[0].theme).toBe("Holiday");
      expect(cards[1].id).toBe("32d3855e-9e59-43d6-a53a-7b320614bfe2");
      expect(cards[1].theme).toBe("Shop Small");
    });

    it("should throw an error when an unknown id is passed", async () => {
      const update = {
        id: "32d3855e-9e59-43d6-a53a",
        theme: "Shop Small",
      };
      await expect(editCard(update)).rejects.toEqual(new Error("No card found with id 32d3855e-9e59-43d6-a53a"));
    });
  });
});
