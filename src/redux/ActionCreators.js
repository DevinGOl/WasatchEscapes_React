import * as ActionTypes from './ActionTypes';

export const addComment = (resortId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        resortId: resortId,
        rating: rating,
        author: author,
        text: text
    }
});