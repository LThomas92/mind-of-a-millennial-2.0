import {
  ADD_ARTICLE,
  GET_ARTICLE,
  GET_ARTICLES,
  DELETE_ARTICLE,
  ARTICLE_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

import axios from "axios";

// Add Article
export const addArticle = articleData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/articles/add", articleData)
    .then(res =>
      dispatch({
        type: ADD_ARTICLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//GET ALL ARTICLES
export const getAllArticles = () => dispatch => {
  dispatch(setArticleLoading());
  axios
    .get("/api/articles")
    .then(res =>
      dispatch({
        type: GET_ARTICLES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ARTICLES,
        payload: null
      })
    );
};
//GET ONE ARTICLE
export const getArticle = slug => dispatch => {
  dispatch(setArticleLoading());
  axios
    .get(`/api/articles/${slug}`)
    .then(res =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ARTICLE,
        payload: null
      })
    );
};

//DELETE ARTICLE
export const deleteArticle = id => dispatch => {
  axios
    .delete(`/api/articles/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ARTICLE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setArticleLoading = () => {
  return {
    type: ARTICLE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
