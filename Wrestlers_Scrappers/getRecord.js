import cheerio from "cheerio";
import axios from "axios";

const parseValue = (str) => {
	const value = str.split(" ")[0];

	if (isNaN(value) || !value.trim()) {
		return value;
	} else {
		return Number(value);
	}
};

export const getRecord = async (url) => {
	const { data } = await axios.get(url);
	const $ = cheerio.load(data);

	const record = {};
	const labels = ["Num_of_Matches", "Wins", "Losses", "Draws"];

	const $info = $(".InformationBoxTable").first();

	$info.find(".InformationBoxRow").each((i, r) => {
		const $row = $(r);

		const label = labels[i];
		const value = parseValue($row.find(".InformationBoxContents").text());

		record[label] = value;
	});

	if (!isNaN(record.Wins) && !isNaN(record.Num_of_Matches)) {
		record.WinPercentage =
			Math.round((record.Wins / record.Num_of_Matches) * 100) + "%";
	}

	return record;
};

// test : https://www.cagematch.net/?id=2&nr=440&page=22 (stan hansen)
