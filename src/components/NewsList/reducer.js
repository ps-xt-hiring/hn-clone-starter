import actionTypes from "./actionTypes";

const initialState = {
    processing: false,
    newsList: [],
    error: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.fetch:
            return {
                ...state,
                processing: true,
                error: ''
            };
        case actionTypes.success:
            return {
                ...state,
                processing: false,
                newsList: [
                    ...state.newsList,
                    ...action.payload
                ],
                error: ''
            };
        case actionTypes.error:
            return {
                ...state,
                processing: false,
                error: action.payload
            };
        default:
            throw new Error();
    }
};

export {
    reducer,
    initialState
};