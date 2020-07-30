import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentElement: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CURRENT_OBJECT:
            return {
                currentElement: action.payload
            };
        case actionTypes.UPDATE_OBJECT:

            return {
                currentElement: action.payload
            };
        case actionTypes.DELETE_OBJECT:
            return {
                currentElement: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
