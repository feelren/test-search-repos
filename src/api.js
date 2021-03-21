import * as axios from "axios";

const instance = axios.create({
	baseURL: "https://api.github.com",
});

export const api = {
	getReposByText(text) {
		return instance
			.get(`/search/repositories?q=${text}`)
			.then((response) => response.data)
			.catch((e) => console.log(e));
	},
};

// baseURL: 'https://api.github.com/search/repositories?q=subject'
