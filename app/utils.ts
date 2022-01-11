import fs from "fs/promises";
import path from "path";

import { IGiftCard } from "../shared/types";

function getCardFilePath() {
  return path.resolve(__dirname, "static/cards.json");
}

export async function readCardFile() {
  const dataFilePath = getCardFilePath();
  return fs.readFile(dataFilePath, "utf-8");
}

export async function writeCardFile(data: any) {
  const dataFilePath = getCardFilePath();
  return fs.writeFile(dataFilePath, data);
}

export async function saveCard(card: IGiftCard) {
  const dataFile = await readCardFile();
  const cards = JSON.parse(dataFile) as IGiftCard[];
  cards.push(card);
  return writeCardFile(JSON.stringify(cards));
}

export async function editCard(update: Partial<IGiftCard>) {
  const dataFile = await readCardFile();
  const cards = JSON.parse(dataFile) as IGiftCard[];

  const index = cards.findIndex(card => card.id === update.id);
  if (index === -1) {
    throw new Error(`No card found with id ${update.id}`);
  }
  const card = cards[index];

  const updated = { ...card, ...update };
  cards[index] = updated;

  await writeCardFile(JSON.stringify(cards));
  return updated;
}
