import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import moviesRouter from "./routes/moviesRouter.js";
import Movie from "./db/Movie.js";
// await Movie.create({
//   title: "Avatar",
//   director: "James Cameron"
// })
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
