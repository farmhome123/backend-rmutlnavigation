import {
  HTTP_BUILDING_SUCCESS,
  HTTP_BUILDING_FAILED,
  HTTP_BUILDING_FETCHING,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_BUILDING_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case HTTP_BUILDING_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_BUILDING_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    default:
      return state;
  }
};
