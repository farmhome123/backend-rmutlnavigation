import {
    HTTP_CLASS_SUCCESS,
    HTTP_CLASS_FAILED,
    HTTP_CLASS_FETCHING,
} from "../constants";

const initialState = {
    result: null,
    isFetching: false,
    isError: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case HTTP_CLASS_SUCCESS:
            return { ...state, result: payload, isFetching: false, isError: false };
        case HTTP_CLASS_FAILED:
            return { ...state, result: null, isFetching: false, isError: true };
        case HTTP_CLASS_FETCHING:
            return { ...state, result: null, isFetching: true, isError: false };
        default:
            return state;
    }
};
