//https://www.cagematch.net/?id=2&nr=691&page=10&sortby=colRating&sorttype=DESC
import queryString from "query-string";

export const getIDandLink = (url) => {
	const parsed = queryString.parse(url);

	delete parsed.gimmick;

	const ID = parsed.nr;
	const URL = "?" + queryString.stringify(parsed);

	return { ID, URL };
};

export const getFullURL = (url) => {
	return `https://www.cagematch.net/${url}`;
};

export const getBestMatchesURL = (id) => {
	return `https://www.cagematch.net/?id=2&nr=${id}&page=10&sortby=colRating&sorttype=DESC`;
};

export const getRecordURL = (id) => {
	return `https://www.cagematch.net/?id=2&nr=${id}&page=22`;
};

export const getThemesURL = (id) => {
	return `https://www.cagematch.net/?id=2&nr=${id}&page=15`;
};

export const getTitleURL = (id) => {
	return `https://www.cagematch.net/?id=2&nr=${id}&page=11`;
};

export const getTeamsURL = (id) => {
	return `https://www.cagematch.net/?id=2&nr=${id}&page=8`;
};
