import express from "express";
import {
	getWrestlersByName,
	getWrestlerByID,
} from "../controllers/wrestler.js";
const router = express.Router();

//
router.get("/search", getWrestlersByName);
router.get("/:id", getWrestlerByID);

export default router;
