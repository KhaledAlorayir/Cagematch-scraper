import axios from "axios";
import Cheerio from "cheerio";

export const getMatches = async (url) => {
	//get html and load it in cheerio aka jquery for backend
	const { data } = await axios.get(url);
	const $ = Cheerio.load(data);
	//get all rows
	const $rows = $("table tbody tr");

	//empty array that we are gonna store matches objects in
	const Matches = [];
	//labels for object index's and a counter cuz we gonna skip some tds so we cant use the loop counter
	const labels = ["Date", "Promotion", "Match", "WON", "Rating"];
	let label_counter = 0;

	//loop each row and we use slice(1) to skip the first row which is the headers
	$rows.slice(1).each((i, r) => {
		const $row = $(r);

		const match = {};

		//loop each td in the tr
		$row.find("td").each((j, c) => {
			const $col = $(c);

			//we don't need the td's after that so break the loop
			if (j > 6) {
				return false;
			}

			//skip td's that we don't need
			if (j === 0 || j === 5) {
				//this is continue in jquery
				return;
			}
			//special case we need to extract promotion name from img title attr
			else if (j === 2) {
				const label = labels[label_counter];
				match[label] = $col.find("a img").attr().title;
			} //all other td's we just store txt
			else {
				const label = labels[label_counter];
				match[label] = $col.text();
			}
			//inc counter
			label_counter++;
		});

		//rest counter for the next tr or match
		label_counter = 0;
		//push obj to array
		Matches.push(match);

		//number of the macthes wanted
		if (i === 14) {
			//this how to break a loop in jquery's 'each' method
			return false;
		}
	});
	//

	return Matches;
};
