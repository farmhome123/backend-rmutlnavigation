import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_NEWS_SUCCESS,
  HTTP_NEWS_FETCHING,
  HTTP_NEWS_FAILED,
  server,
} from "../constants";

const setStateNEWSToSuccess = (payload) => ({
  type: HTTP_NEWS_SUCCESS,
  payload: payload,
});

const setStateNEWSToFetching = () => ({
  type: HTTP_NEWS_FETCHING,
});

const setStateNEWSToFailed = () => ({
  type: HTTP_NEWS_FAILED,
});

export const addNews = (history, formData) => {
  return async (dispatch) => {
    await httpClient.post(server.NEWS_URL, formData);
    history.goBack();
  };
};
export const getNewsById = (id) => {
  return (dispatch) => {
    // dispatch(finishInitialization(false))
    dispatch(setStateNEWSToFetching());
    httpClient
      .get(`${server.NEWS_URL}/${id}`)
      .then((result) => {
        dispatch(setStateNEWSToSuccess(result.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setStateNEWSToFailed());
      });
  };
};

export const getNewsByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateNEWSToFetching());

    if (keyword !== null && keyword != "") {
      httpClient.get(`${server.NEWS_URL}/keyword/${keyword}`).then((result) => {
        dispatch(setStateNEWSToSuccess(result.data));
      });
    } else {
      doGetNews(dispatch);
    }
  };
};

export const deleteNews = (id) => {
  return async (dispatch) => {
    dispatch(setStateNEWSToFetching());
    await httpClient.delete(`${server.NEWS_URL}/${id}`);
    await doGetNews(dispatch);
  };
};

export const getNews = () => {
  return (dispatch) => {
    dispatch(setStateNEWSToFetching());
    doGetNews(dispatch);
  };
};

const doGetNews = (dispatch) => {
  httpClient
    .get(server.NEWS_URL)
    .then((result) => {
      dispatch(setStateNEWSToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateNEWSToFailed());
    });
};
