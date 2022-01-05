import axios from "axios";
import cheerio from "cheerio";

const getTeams = async (url) => {
	try {
		const { data } = await axios.get(url);
		const $ = cheerio.load(data);
		const Teams = [];
		const Stables = [];

		const TeamTable = $("table").first();
		const StableTable = $("table").slice(1);

		//TODO
	} catch (err) {
		console.log(err);
		return null;
	}
};

getTeams("https://www.cagematch.net/?id=2&nr=870&page=8");
