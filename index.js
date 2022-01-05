import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";

import wrestlerRoutes from "./routes/wrestler.js";

//
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.listen(PORT, () => {
	console.log("server is running");
});

//
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/wrestler", wrestlerRoutes);

//
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
	() => console.log("Connected To DB")
);

//
app.get("/", (req, res) => {
	res.send("welcome to my API!");
});
