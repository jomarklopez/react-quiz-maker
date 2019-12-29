import { ADD_QUESTION, ADD_OPTION, REMOVE_OPTION } from '../actions/types';

const initState = [
    {
        questionId: 0,
        options: [
            {
                optionId: 0
            }
        ]
    }
];

const questions = (state = initState, action) => {
    switch (action.type) {
        // Adding questions to the quiz
        case ADD_QUESTION:
            return [...state, {
                questionId: action.questionId,
                options: [
                    {
                        optionId: action.questionId
                    }
                ]
            }];

        // Adding options to the question by adding a new      option object with the optionId property matched       with the questionId
        case ADD_OPTION:
            return state.map((question, index) => {
                if (index === action.questionId) {
                    return {
                        ...question,
                        options: [...question.options, {
                            optionId: action.questionId
                        }]
                    };
                }
                return question;
            });
        // 
        case REMOVE_OPTION:
            return state.map((question, index) => {
                if (index === action.questionId) {
                    return {
                        ...question,
                        options: [...question.options.slice(0, action.optionId), ...question.options.slice(action.optionId + 1)]
                    };
                }
                return question;
            });

        default:
            return state;
    }
};

export default questions;