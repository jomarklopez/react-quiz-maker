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

export default (state = initState, action) => {
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
        // Adding option to the question by adding a new      option object with the optionId property matched       with the questionId
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
        // Removing an option by slicing two times, one slice would contain the first half except the chosen optionId, the other slice would contain the second half except the chosen optionId. 
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