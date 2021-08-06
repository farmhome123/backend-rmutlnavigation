import {
  HTTP_BUILDING_EDIT_SUCCESS,
  HTTP_BUILDING_EDIT_FETCHING,
  HTTP_BUILDING_EDIT_FAILED,
  HTTP_BUILDING_EDIT_INITIALED,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  isInitialed: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_BUILDING_EDIT_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_BUILDING_EDIT_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_BUILDING_EDIT_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case HTTP_BUILDING_EDIT_INITIALED:
      return { ...state, isInitialed: payload };
    default:
      return state;
  }
};
