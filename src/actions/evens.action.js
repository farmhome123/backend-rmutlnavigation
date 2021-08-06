import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_EVENS_SUCCESS,
  HTTP_EVENS_FETCHING,
  HTTP_EVENS_FAILED,
  server,
} from "../constants";

const setStateEvensToSuccess = (payload) => ({
  type: HTTP_EVENS_SUCCESS,
  payload: payload,
});

const setStateEvensToFetching = () => ({
  type: HTTP_EVENS_FETCHING,
});

const setStateEvensToFailed = () => ({
  type: HTTP_EVENS_FAILED,
});

export const addEvens = (history, formData) => {
  return async (dispatch) => {
    await httpClient.post(server.EVENS_URL, formData);
    history.goBack();
  };
};
export const getEvensById = (id) => {
  return (dispatch) => {
    // dispatch(finishInitialization(false))
    dispatch(setStateEvensToFetching());
    httpClient
      .get(`${server.EVENS_URL}/${id}`)
      .then((result) => {
        dispatch(setStateEvensToSuccess(result.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setStateEvensToFailed());
      });
  };
};

export const getEvensByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateEvensToFetching());

    if (keyword !== null && keyword != "") {
      httpClient
        .get(`${server.EVENS_URL}/keyword/${keyword}`)
        .then((result) => {
          dispatch(setStateEvensToSuccess(result.data));
        });
    } else {
      doGetEvens(dispatch);
    }
  };
};

export const deleteEvens = (id) => {
  return async (dispatch) => {
    dispatch(setStateEvensToFetching());
    await httpClient.delete(`${server.EVENS_URL}/${id}`);
    await doGetEvens(dispatch);
  };
};

export const getEvens = () => {
  return (dispatch) => {
    dispatch(setStateEvensToFetching());
    doGetEvens(dispatch);
  };
};

const doGetEvens = (dispatch) => {
  httpClient
    .get(server.EVENS_URL)
    .then((result) => {
      dispatch(setStateEvensToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateEvensToFailed());
    });
};
