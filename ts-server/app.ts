import express from "express";
import { getGenres } from "./services/genres";
import router from "./routes/genres";
const app = express();

app.use(express.json());

app.use("/genres", router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});