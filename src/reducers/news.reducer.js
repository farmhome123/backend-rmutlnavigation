import {
  HTTP_NEWS_SUCCESS,
  HTTP_NEWS_FAILED,
  HTTP_NEWS_FETCHING,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_NEWS_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case HTTP_NEWS_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_NEWS_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    default:
      return state;
  }
};
