import mongoose from "mongoose";
import dotenv from "dotenv";
import Wrestlers from "../models/Wrestler.js";
import { getWrestlerMain } from "../scrappers/getWrestlers.js";

dotenv.config();

//DB Connection
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
	() => console.log("Connected To DB")
);

//inserts all wrestlers from cagematch
const InsertAllWrestlers = async () => {
	try {
		const wrestlersArr = await getWrestlerMain();
		await Wrestlers.insertMany(wrestlersArr);
		console.log("finished");
	} catch (err) {
		console.log(err.message);
	}
};
