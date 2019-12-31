import { CREATE_USER, SIGN_IN, SIGN_OUT, ADD_QUESTION, REMOVE_QUESTION, ADD_OPTION, REMOVE_OPTION } from '../actions/types';
import quizzes from '../api/quizzes';

export const createUser = formValues => async dispatch => {
    const response = await quizzes.post('/users', formValues);
    dispatch({ type: CREATE_USER, payload: response.data });

    //Do some programmatic navigation to automatically bring the user back to the list of streams
    /* history.push('/'); */
};

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