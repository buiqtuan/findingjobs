import { FETCH_JOBS } from '../actions/types';

const INITIAL_STATE = {
    results: []
}

export default function(state = INITIAL_STATE, action) {
    switch(state) {
        case FETCH_JOBS:
            return action.payload;
        default:
            return state;
    }
}