import { createStore, combineReducers } from 'redux';
import { Resorts } from './resorts';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            resorts: Resorts,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
        })
    );

    return store;
};