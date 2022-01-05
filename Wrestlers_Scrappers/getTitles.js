import axios from "axios";
import cheerio from "cheerio";

const getTitle = (str) => {
	const index = str.indexOf("(");
	const Titlename = index === -1 ? str.trim() : str.slice(0, index).trim();
	return Titlename;
};

const getReignsCount = (str) => {
	const index = str.indexOf("(");
	const count = index === -1 ? 1 : Number(str.charAt(index + 1));
	return count;
};

const getDuration = (str) => {
	const index = str.indexOf("?");
	const result = index === -1 ? str.trim() : "unknown";
	return result;
};

const isCurrent = (str) => {
	const result = str.match(/today/i);
	const iscurr = result ? true : false;
	return iscurr;
};

const getWonDate = (str) => {
	const index = str.indexOf("-");
	const result = str.slice(0, index).trim();
	return result;
};

const getDetails = (str) => {
	const index = str.indexOf("(");
	const result = index === -1 ? "" : str.slice(index).trim();
	return result;
};

export const getTitles = async (url) => {
	try {
		const { data } = await axios.get(url);
		const $ = cheerio.load(data);
		const Titles = [];
		const Current = [];

		const TitleTable = $("table").slice(1);
		const ReignsTable = $("table").first();

		//loop all titles
		TitleTable.find("tr")
			.slice(1)
			.each((i, r) => {
				const $row = $(r);

				const item = {};

				//loop title info
				$row.find("td").each((j, c) => {
					const $col = $(c);

					if (j === 0) {
						item.title = getTitle($col.text());
						item.reigns_count = getReignsCount($col.text());
					} else if (j === 1) {
						item.duration = getDuration($col.text());
					}
				});

				Titles.push(item);
			});

		//to add current title
		//loop all rows
		ReignsTable.find("tr")
			.slice(1)
			.each((i, r) => {
				const $row = $(r);
				const item = {};

				//if a title isnt current break the loop cuz the belts after it wont be either (cagematch layout)
				if (!isCurrent($row.text())) {
					return false;
				}
				//loop info in row
				$row.find("td").each((j, c) => {
					const $col = $(c);

					if (j === 0) {
						item.won_date = getWonDate($col.text());
					} else if (j === 1) {
						item.title = getTitle($col.text());
						item.details = getDetails($col.text());
					} else if (j === 2) {
						item.duration = getDuration($col.text());
						return false;
					}
				});

				Current.push(item);
			});

		return { all_titles: Titles, current_title: Current };
	} catch (err) {
		console.log(err);
		return null;
	}
};

getTitles("https://www.cagematch.net/?id=2&nr=1176&page=11");
