import axios from "axios";
import Cheerio from "cheerio";
import { getIDandLink } from "../util/LinkHelpers.js";

const Wrestlers = [];
const url = "https://www.cagematch.net/?id=2&view=workers&";

const getWrestlers = async (url) => {
	const { data } = await axios.get(url);

	const $ = Cheerio.load(data);
	const $Rows = $("table tr");

	//loop rows
	$Rows.slice(1).each((i, r) => {
		const $row = $(r);

		const Labels = [
			"name",
			"id",
			"URL",
			"Birthday",
			"Birthplace",
			"Height",
			"Weight",
			"Promotion",
			"CagematchRating",
			"Votes",
		];

		const wrestler = {};
		let labelCounter = 0;

		//loop cols in each row
		$row.find("td").each((j, c) => {
			const $col = $(c);

			if (j === 0 || j === 1) {
				return;
			}

			if (j === 2) {
				let label = Labels[labelCounter];

				wrestler[label] = $col.text().trim();

				labelCounter++;
				label = Labels[labelCounter];

				const { ID, URL } = getIDandLink($col.find("a").attr().href);

				wrestler[label] = ID;

				labelCounter++;
				label = Labels[labelCounter];

				wrestler[label] = URL;
				return;
			}

			if (j === 7) {
				labelCounter++;
				let label = Labels[labelCounter];
				let promotion = $col.find("a img").attr()?.title;

				if (promotion) {
					wrestler[label] = promotion;
				} else {
					wrestler[label] = "";
				}
				return;
			}

			if (j === 5 || j === 6 || j === 8 || j === 9) {
				labelCounter++;
				let label = Labels[labelCounter];

				if ($col.text().trim() === "" || isNaN($col.text().trim())) {
					wrestler[label] = 0;
				} else {
					wrestler[label] = Number($col.text());
				}

				return;
			}

			labelCounter++;
			let label = Labels[labelCounter];
			wrestler[label] = $col.text();
		});

		Wrestlers.push(wrestler);
		labelCounter = 0;
	});

	//console.log(Wrestlers);
};

const getAllWrestlers = async () => {
	for (let i = 0; i <= 24100; i += 100) {
		const currUrl = `${url}s=${i}`;
		await getWrestlers(currUrl);
	}
};

export const getWrestlerMain = async () => {
	await getAllWrestlers();
	return Wrestlers;
};
