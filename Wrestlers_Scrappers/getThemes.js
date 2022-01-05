import axios from "axios";
import cheerio from "cheerio";

export const getThemes = async (url) => {
	try {
		const { data } = await axios.get(url);
		const $ = cheerio.load(data);

		const $rows = $("table tr");

		const Themes = [];

		//loop all themes
		$rows.slice(1).each((i, r) => {
			const $row = $(r);

			const theme = {};
			const Labels = ["gimmick", "used_in", "artist", "title"];

			//loop a theme info
			$row
				.find("td")
				.slice(1)
				.each((j, c) => {
					const $col = $(c);

					const label = Labels[j];
					theme[label] = $col.text();
				});

			Themes.push(theme);
		});

		return Themes;
	} catch (err) {
		console.log(err);
		return null;
	}
};
