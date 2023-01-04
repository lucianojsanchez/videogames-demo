import {
  GET_VIDEOGAMES,
  GET_GENRES,
  FILTER_BY_GENRE,
  FILTER_BY_CREATED,
  SORT_BY_NAME,
  SORT_BY_RATING,
  GET_DETAIL,
  GET_GAME_NAME,
  GET_PLATFORMS,
  CLEAR_DETAIL,
} from "./actions";

const initialState = {
  videogames: [],
  allGames: [],
  genres: [],
  platforms: [],
  details: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allGames: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };

    case FILTER_BY_GENRE:
      const allGames = state.allGames;
      const genresFiltered =
        action.payload === "All"
          ? allGames
          : allGames.filter((el) => el.genres.includes(action.payload)); // necesito mapear values porque no voy a escribir todos los generos
      return {
        ...state,
        videogames: genresFiltered,
      };

    case FILTER_BY_CREATED:
      const allVideogames = state.allGames;
      const createdFilter =
        action.payload === "DB"
          ? allVideogames.filter((e) => e.createdInDB)
          : allVideogames.filter((e) => !e.createdInDB);
      return {
        ...state,
        videogames: createdFilter === "All" ? state.allGames : createdFilter,
      };

    case SORT_BY_NAME:
      let sortedName =
        action.payload === "asc"
          ? state.videogames.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortedName,
      };

    case SORT_BY_RATING:
      let sorted2 =
        action.payload === "Lowest to Highest Rating"
          ? state.videogames.sort((el1, el2) => {
              if (el1.rating > el2.rating) {
                return 1;
              }
              if (el1.rating < el2.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort((el1, el2) => {
              if (el1.rating > el2.rating) {
                return -1;
              }
              if (el1.rating < el2.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sorted2,
      };

    case GET_DETAIL:
      return {
        ...state,
        details: action.payload,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        details: [],
      };

    case GET_GAME_NAME:
      return {
        ...state,
        videogames: action.payload,
      };

    case "POST_VIDEOGAME":
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
