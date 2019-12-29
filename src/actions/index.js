import { ADD_QUESTION, REMOVE_QUESTION, ADD_OPTION, REMOVE_OPTION } from '../actions/types';

let nextQuestionId = 1;

export const addOption = questionId => {
    return {
        type: ADD_OPTION,
        questionId
    }
};

export const removeOption = (questionId, optionNumber) => {
    return {
        type: REMOVE_OPTION,
        optionId: optionNumber,
        questionId
    }
};

export const addQuestion = () => {
    return {
        type: ADD_QUESTION,
        questionId: nextQuestionId++
    }
};

export const removeQuestion = (questionId) => {
    return {
        type: REMOVE_QUESTION,
        questionId
    }
};