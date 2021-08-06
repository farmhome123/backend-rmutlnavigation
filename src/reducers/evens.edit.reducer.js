import {
    HTTP_EVENS_EDIT_SUCCESS,
    HTTP_EVENS_EDIT_FETCHING,
    HTTP_EVENS_EDIT_FAILED,
    HTTP_EVENS_EDIT_INITIALED,
  } from "../constants";
  
  const initialState = {
    result: null,
    isFetching: false,
    isError: false,
    isInitialed: false,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case HTTP_EVENS_EDIT_FETCHING:
        return { ...state, result: null, isFetching: true, isError: false };
      case HTTP_EVENS_EDIT_FAILED:
        return { ...state, result: null, isFetching: false, isError: true };
      case HTTP_EVENS_EDIT_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false };
      case HTTP_EVENS_EDIT_INITIALED:
        return { ...state, isInitialed: payload };
      default:
        return state;
    }
  };
  