import { getMatches } from "../Wrestlers_Scrappers/getMatches.js";
import { getMainDetails } from "../Wrestlers_Scrappers/getDetails.js";
import { getRecord } from "../Wrestlers_Scrappers/getRecord.js";
import { getThemes } from "../Wrestlers_Scrappers/getThemes.js";
import { getTitles } from "../Wrestlers_Scrappers/getTitles.js";
import {
	getBestMatchesURL,
	getFullURL,
	getRecordURL,
	getThemesURL,
	getTitleURL,
} from "./LinkHelpers.js";

export const getWrestlerinfo = async (Wid, Wurl) => {
	const Best_Matches = await getMatches(getBestMatchesURL(Wid));
	const Details = await getMainDetails(getFullURL(Wurl));
	const Record = await getRecord(getRecordURL(Wid));
	const Themes = await getThemes(getThemesURL(Wid));
	const Titles = await getTitles(getTitleURL(Wid));

	return { Best_Matches, Details, Record, Themes, Titles };
};
