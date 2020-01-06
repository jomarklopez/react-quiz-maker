import { ADD_QUESTION } from '../actions/types';

const initState = [
    {
        questionId: 0
    }
];

export default (state = initState, action) => {
    switch (action.type) {
        // Adding questions to the quiz
        case ADD_QUESTION:
            return [...state, {
                questionId: action.questionId
            }];
        default:
            return state;
    }
};