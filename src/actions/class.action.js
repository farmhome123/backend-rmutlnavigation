import { httpClient } from "../utils/HttpClient";
import {
  HTTP_CLASS_SUCCESS,
  HTTP_CLASS_FETCHING,
  HTTP_CLASS_FAILED,
  server,
} from "../constants";

const setStateClassToSuccess = (payload) => ({
  type: HTTP_CLASS_SUCCESS,
  payload: payload,
});

const setStateClassToFetching = () => ({
  type: HTTP_CLASS_FETCHING,
});

const setStateClassToFailed = () => ({
  type: HTTP_CLASS_FAILED,
});

export const addClass = (history, formData) => {
  return async (dispatch) => {
    await httpClient.post(server.CLASS_URL, formData);
    history.goBack();
  };
};
export const getClassById = (id) => {
  return (dispatch) => {
    // dispatch(finishInitialization(false))
    dispatch(setStateClassToFetching());
    httpClient
      .get(`${server.CLASS_URL}/${id}`)
      .then((result) => {
        dispatch(setStateClassToSuccess(result.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setStateClassToFailed());
      });
  };
};
export const getClassByBuildingId = (buildingid) => {
  return (dispatch) => {
    // dispatch(finishInitialization(false))
    dispatch(setStateClassToFetching());
    httpClient
      .get(`${server.CLASS_URL}/building/${buildingid}`)
      .then((result) => {
        dispatch(setStateClassToSuccess(result.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setStateClassToFailed());
      });
  };
};


export const getClassByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateClassToFetching());

    if (keyword !== null && keyword != "") {
      httpClient
        .get(`${server.CLASS_URL}/keyword/${keyword}`)
        .then((result) => {
          dispatch(setStateClassToSuccess(result.data));
        });
    } else {
      doGetClass(dispatch);
    }
  };
};

export const deleteClass = (id) => {
  return async (dispatch) => {
    dispatch(setStateClassToFetching());
    await httpClient.delete(`${server.CLASS_URL}/${id}`);
    await doGetClass(dispatch);
  };
};

export const getClass = () => {
  return (dispatch) => {
    dispatch(setStateClassToFetching());
    doGetClass(dispatch);
  };
};

const doGetClass = (dispatch) => {
  httpClient
    .get(server.CLASS_URL)
    .then((result) => {
      dispatch(setStateClassToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateClassToFailed());
    });
};
