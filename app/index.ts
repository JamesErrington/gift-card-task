import express from "express";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { v4 } from "uuid";

import { handleGetCardsRequest, handleGetCardRequest, handleAddCardRequest, handleEditCardRequest } from "./handlers";

const PORT = process.env.PORT || 8000;
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, path.resolve(__dirname, "static")),
  filename: (_, __, cb) => cb(null, `${v4()}.png`),
});
const upload = multer({ storage, fileFilter: (_, file, cb) => cb(null, file !== null) });

const app = express();
app.use(express.static(path.resolve(__dirname, "client")));
app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use(morgan("short"));

const api = express.Router();
api.get("/cards", handleGetCardsRequest);
api.get("/card/:cardId", handleGetCardRequest);
api.post("/card/add", upload.single("image"), handleAddCardRequest);
api.post("/card/:cardId", upload.single("image"), handleEditCardRequest);
app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
