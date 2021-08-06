import {
  HTTP_EVENS_SUCCESS,
  HTTP_EVENS_FAILED,
  HTTP_EVENS_FETCHING,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_EVENS_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case HTTP_EVENS_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_EVENS_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    default:
      return state;
  }
};
