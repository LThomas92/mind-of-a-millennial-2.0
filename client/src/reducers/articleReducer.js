import {
  ADD_ARTICLE,
  DELETE_ARTICLE,
  GET_ARTICLE,
  GET_ARTICLES,
  ARTICLE_LOADING
} from "../actions/types";

const intialState = {
  articles: [],
  article: {},
  loading: false
};

export default function(state = intialState, action) {
  switch (action.type) {
    case ARTICLE_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_ARTICLE:
      return { ...state, articles: [action.payload, ...state.articles] };
    case GET_ARTICLES:
      return { ...state, articles: action.payload, loading: false };
    case GET_ARTICLE:
      return { ...state, article: action.payload, loading: false };
    case UPDATE_ARTICLE:
      return { ...state, article: action.payload };
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(
          article => article._id !== action.payload
        )
      };
    default:
      return state;
  }
}
