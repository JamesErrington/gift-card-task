import type { Request, Response } from "express";

import { saveCard, editCard, readCardFile } from "./utils";
import type { IGiftCard } from "../shared/types";

export async function handleGetCardsRequest(_: Request, response: Response) {
  try {
    const dataFile = await readCardFile();

    response.status(200).send(dataFile);
  } catch (ex) {
    console.error(ex);
    response.status(500).send("Failed to fetch cards");
  }
}

export async function handleGetCardRequest(request: Request, response: Response) {
  try {
    const dataFile = await readCardFile();
    const cards = JSON.parse(dataFile) as IGiftCard[];

    const card = cards.find(card => card.id === request.params.cardId);
    if (card === undefined) {
      throw new Error();
    }

    response.status(200).send(card);
  } catch (ex) {
    console.error(ex);
    response.status(500).send(`Failed to fetch card with id ${request.params.cardId}`);
  }
}

export async function handleAddCardRequest(request: Request, response: Response) {
  try {
    const { body, file } = request;

    const now = new Date().toISOString();
    const card: IGiftCard = {
      id: file?.filename.split(".")[0] as string,
      created_at: now,
      last_edited: now,
      name: body.name,
      image: `/static/${file?.filename}`,
      min_value: body.minValue,
      max_value: body.maxValue,
      theme: body.theme,
      valid_from: new Date(body.validFrom).toISOString(),
      valid_until: new Date(body.validUntil).toISOString(),
      purchases: 0,
      revenue: 0,
    };

    await saveCard(card);

    response.status(200).send(JSON.stringify(card));
  } catch (ex) {
    console.error(ex);
    response.status(500).send("Failed to upload card. Please try again");
  }
}

export async function handleEditCardRequest(request: Request, response: Response) {
  try {
    const { body, file } = request;

    const card: Partial<IGiftCard> = {
      id: body.id,
      last_edited: new Date().toISOString(),
      name: body.name,
      min_value: body.minValue,
      max_value: body.maxValue,
      theme: body.theme,
      valid_from: new Date(body.validFrom).toISOString(),
      valid_until: new Date(body.validUntil).toISOString(),
    };

    if (file) {
      card.image = `/static/${file?.filename}`;
    }

    const updated = await editCard(card);

    response.status(200).send(JSON.stringify(updated));
  } catch (ex) {
    console.error(ex);
    response.status(500).send(`Failed to edit card with id ${request.body.id}. Please try again`);
  }
}
