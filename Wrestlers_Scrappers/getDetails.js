import cheerio from "cheerio";
import axios from "axios";

//helper method to remove ":" and replace white space in the label and in some cases shorting the label
const getLabel = (str) => {
	const label = str.trim().slice(0, -1).replace(/\s/g, "_");

	switch (label) {
		case "Beginning_of_in-ring_career":
			return "in_ring_debut";

		case "End_of_in-ring_career":
			return "retirement";

		case "In-ring_experience":
			return "ring_experience";

		default:
			return label;
	}
};

//helper method to parse values
//Recives an elm and parse it based on the label?
const getValue = (label, Elm) => {
	//TODO
};

export const getMainDetails = async (url) => {
	const { data } = await axios.get(url);
	const $ = cheerio.load(data);

	const $infos = $(".InformationBoxTable");

	const details = {};

	//loop each section
	$infos.each((i, info) => {
		const $div = $(info);

		const $rows = $div.find(".InformationBoxRow");

		//loop each row in sec
		$rows.each((j, r) => {
			const $row = $(r);

			const label = getLabel($row.find(".InformationBoxTitle").text());
			const value = $row.find(".InformationBoxContents").text();

			details[label] = value;
		});
	});

	return details;
};
