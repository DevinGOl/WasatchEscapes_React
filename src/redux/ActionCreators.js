import * as ActionTypes from './ActionTypes';
import { RESORTS } from '../shared/resorts';


export const addComment = (resortId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        resortId: resortId,
        rating: rating,
        author: author,
        text: text
    }
});

export const fetchResorts = () => dispatch => {

    dispatch(resortsLoading());

    setTimeout(() => {
        dispatch(addResorts(RESORTS));
    }, 2000);
};

export const resortsLoading = () => ({
    type: ActionTypes.RESORTS_LOADING
});

export const resortsFailed = errMess => ({
    type: ActionTypes.RESORTS_FAILED,
    payload: errMess
});

export const addResorts = resorts => ({
    type: ActionTypes.ADD_RESORTS,
    payload: resorts
});