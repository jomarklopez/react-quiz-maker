import _ from 'lodash';
import {
    CREATE_QUIZ,
    FETCH_QUIZZES,
    FETCH_QUIZ,
    EDIT_QUIZ,
    DELETE_QUIZ
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_QUIZ:
            return { ...state, [action.payload._id]: action.payload }
        case FETCH_QUIZ:
            return { ...state, [action.payload._id]: action.payload }
        case FETCH_QUIZZES:
            //Getting a list of many records
            return { ...state, ..._.mapKeys(action.payload, '_id') }
        case EDIT_QUIZ:
            return { ...state, [action.payload._id]: action.payload }
        case DELETE_QUIZ:
            return _.omit(state, action.payload)
        default:
            return state;
    }
}