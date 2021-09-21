import * as ActionTypes from './ActionTypes';

export const Resorts = (state = {
    isLoading: true,
    errMess: null,
    resorts: []
}, action) => {
switch (action.type) {
    case ActionTypes.ADD_RESORTS:
        return {...state, isLoading: false, errMess: null, resorts: action.payload};
    case ActionTypes.RESORTS_LOADING:
        return {...state, isLoading: true, errMess: null, resorts: []};
    case ActionTypes.RESORTS_FAILED:
        return {...state, isLoading: false, errMess: action.payload};
    default:
        return state;
}
};