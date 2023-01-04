import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const FILTER_BY_GENRE = "FILTLER_BY_GENRE";
export const FILTER_BY_CREATED = "FILTLER_BY_CREATED";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_RATING = "SORT_BY_RATING";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_GAME_NAME = "GET_GAME_NAME";

export function getGames() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: json.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    var json = await axios(`http://localhost:3001/genres/`);
    return dispatch({
      type: GET_GENRES,
      payload: json.data,
    });
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    var json = await axios(`http://localhost:3001/platforms/`);
    return dispatch({
      type: GET_PLATFORMS,
      payload: json.data,
    });
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    var json = await axios(`http://localhost:3001/videogames/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: json.data,
    });
  };
}

export function getGameName(name) {
  return async function (dispatch) {
    var json = await axios(`http://localhost:3001/videogames?name=${name}`);
    return dispatch({
      type: GET_GAME_NAME,
      payload: json.data,
    });
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/videogames",
      payload
    );
    return response;
  };
}

export function filterGameByGenre(payload) {
  return {
    type: FILTER_BY_GENRE,
    payload,
  };
}

export function filterByCreatedAt(payload) {
  return {
    type: FILTER_BY_CREATED,
    payload,
  };
}

export function clearDetail(payload) {
  return {
    type: CLEAR_DETAIL,
    payload: [],
  };
}

export function sortByName(payload) {
  return {
    type: SORT_BY_NAME,
    payload,
  };
}

export function sortByRating(payload) {
  return {
    type: SORT_BY_RATING,
    payload,
  };
}

export default axios;
