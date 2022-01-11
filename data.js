/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs/promises");
const uuid = require("uuid");
const path = require("path");

// Generate some fake data and save it to the server
const LENGTH = 20;
const themes = ["Theme 1", "Theme 2", "Theme 3", "Theme 4"];
const data = [];

for (let i = 0; i < LENGTH; i++) {
  const card = {
    id: uuid.v4(),
    created_at: new Date().toISOString(),
    name: `Test Card ${i + 1}`,
    image: "/static/card.png",
    min_value: Math.floor(Math.random() * 50),
    max_value: Math.floor(Math.random() * 4900) + 100,
    theme: themes[Math.floor(Math.random() * themes.length)],
    valid_from: new Date("2022-01-01").toISOString(),
    valid_until: new Date("2022-02-01").toISOString(),
    purchases: Math.floor(Math.random() * 5000),
    revenue: Math.floor(Math.random() * 50000),
  };
  data.push(card);
}

fs.writeFile(path.resolve(__dirname, "app/static/cards.json"), JSON.stringify(data));
