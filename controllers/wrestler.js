import WrestlersDB from "../models/Wrestler.js";
import { getWrestlerinfo } from "../util/getWrestlerinfo.js";

//tagteams&stabels *** feuds with info? timeframe , promoition , even advance record??

export const getWrestlersByName = async (req, res) => {
	const { q } = req.query;

	try {
		if (!q) return res.status(400).json({ message: "no search query" });

		const name = new RegExp(q, "i");
		const results = await WrestlersDB.find({ name }).limit(10);

		if (results) return res.status(202).json(results);

		res.status(404).json({ message: "no wrestler found" });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

export const getWrestlerByID = async (req, res) => {
	try {
		const { id } = req.params;

		const wrestler = await WrestlersDB.findOne({ id });

		if (wrestler) {
			const info = await getWrestlerinfo(wrestler.id, wrestler.URL);

			return res.status(202).json({
				main: wrestler,
				...info,
			});
		}

		res.status(404).json({ message: "no wrestler with this id" });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};
