import express from "express";
import { Request, Response } from "express";
import cors from "cors";

import ingredientsRoutes from "./routes/ingredientsRoutes";
import dishesRoutes from "./routes/dishesController";
import categoriesRoutes from "./routes/categories";
import ordersRoutes from "./routes/orders";

import dotenv from "dotenv";
import connectDB from "./config/db";
import { validateEnvs , parsedEnvs} from "./config/variables";

dotenv.config();
validateEnvs();
const app = express();
app.use(express.json());
app.use(cors());
connectDB();


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/ingredients", ingredientsRoutes);
app.use("/dishes", dishesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/orders", ordersRoutes);
app.listen(parsedEnvs.PORT, () => {
  console.log(`Server is running on port ${parsedEnvs.PORT}`);
});
