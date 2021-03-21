import {api} from "./../api";

const SET_REPOS = "SET_REPOS";
const CLEAR_REPOS = "CLEAR_REPOS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_NO_RESULTS_TRUE = "SET_NO_RESULTS_TRUE";
const SET_NO_RESULTS_FALSE = "SET_NO_RESULTS_FALSE";
const CHANGE_SEARCH_TEXT = "CHANGE_SEARCH_TEXT";

let initialState = {
	repos: [],
	searchText: "",
	isFetching: false,
	noResults: false,
};

let reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_REPOS: {
			return {
				...state,
				repos: action.repos,
			};
		}

		case CHANGE_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.text,
			};
		}

		case CLEAR_REPOS: {
			return {
				...state,
				repos: [],
			};
		}

		case TOGGLE_IS_FETCHING: {
			return {
				...state,
				isFetching: !state.isFetching,
			};
		}

		case SET_NO_RESULTS_TRUE: {
			return {
				...state,
				noResults: true,
			};
		}

		case SET_NO_RESULTS_FALSE: {
			return {
				...state,
				noResults: false,
			};
		}

		default:
			return state;
	}
};

const setRepos = (repos) => ({
	type: SET_REPOS,
	repos,
});

export const changeSearchText = (text) => ({
	type: CHANGE_SEARCH_TEXT,
	text,
});

export const clearRepos = () => ({
	type: CLEAR_REPOS,
});

const toggleIsFetching = () => ({
	type: TOGGLE_IS_FETCHING,
});

const setNoResultsTrue = () => ({
	type: SET_NO_RESULTS_TRUE,
});

export const setNoResultsFalse = () => ({
	type: SET_NO_RESULTS_FALSE,
});

export const getReposThunk = (searchText) => {
	return (dispatch) => {
		dispatch(toggleIsFetching());
		api.getReposByText(searchText).then((data) => {
			try {
				if (data.total_count) {
					dispatch(toggleIsFetching());
					dispatch(setNoResultsFalse());
					dispatch(setRepos(data.items));
				} else {
					dispatch(toggleIsFetching());
					dispatch(setNoResultsTrue());
					dispatch(clearRepos());
				}
			} catch {
				alert("Бан от GitHub :D");
			}
		});
	};
};

export default reducer;
