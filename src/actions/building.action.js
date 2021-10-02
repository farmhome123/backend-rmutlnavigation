import { httpClient } from "../utils/HttpClient";
import {
  HTTP_BUILDING_SUCCESS,
  HTTP_BUILDING_FETCHING,
  HTTP_BUILDING_FAILED,
  server,
} from "../constants";

const setStateBuildingToSuccess = (payload) => ({
  type: HTTP_BUILDING_SUCCESS,
  payload: payload,
});

const setStateBuildingToFetching = () => ({
  type: HTTP_BUILDING_FETCHING,
});

const setStateBuildingToFailed = () => ({
  type: HTTP_BUILDING_FAILED,
});

export const addBuilding = (history, formData) => {
  return async (dispatch) => {
    await httpClient.post(server.BUILDING_URL, formData);
    history.goBack();
  };
};
export const getBuildingById = (id) => {
  return (dispatch) => {
    // dispatch(finishInitialization(false))
    dispatch(setStateBuildingToFetching());
    httpClient
      .get(`${server.BUILDING_URL}/${id}`)
      .then((result) => {
        dispatch(setStateBuildingToSuccess(result.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setStateBuildingToFailed());
      });
  };
};

export const getBuildingByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateBuildingToFetching());

    if (keyword !== null && keyword != "") {
      httpClient
        .get(`${server.BUILDING_URL}/keyword/${keyword}`)
        .then((result) => {
          dispatch(setStateBuildingToSuccess(result.data));
        });
    } else {
      doGetBuilding(dispatch);
    }
  };
};

export const deleteBuilding = (id) => {
  return async (dispatch) => {
    dispatch(setStateBuildingToFetching());
    await httpClient.delete(`${server.BUILDING_URL}/${id}`);
    await doGetBuilding(dispatch);
  };
};

export const getBuilding = () => {
  return (dispatch) => {
    dispatch(setStateBuildingToFetching());
    doGetBuilding(dispatch);
  };
};

const doGetBuilding = (dispatch) => {
  httpClient
    .get(server.BUILDING_URL)
    .then((result) => {
      dispatch(setStateBuildingToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateBuildingToFailed());
    });
};
