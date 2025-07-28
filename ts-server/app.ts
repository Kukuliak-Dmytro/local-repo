import express from "express";

import genresRouter from "./routes/genres";
import booksRouter from "./routes/books";
import gamesRouter from "./routes/games";
import filmsRouter from "./routes/films";
const app = express();

app.use(express.json());

app.use("/genres", genresRouter);
app.use("/books", booksRouter);
app.use("/games", gamesRouter);
app.use("/films", filmsRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});