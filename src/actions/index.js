import {
    CREATE_USER,
    SIGN_IN,
    SIGN_OUT,
    ADD_QUESTION,
    REMOVE_QUESTION,
    ADD_OPTION,
    REMOVE_OPTION
} from '../actions/types';
import history from '../history';
import quizzes from '../api/quizzes';

export const createUser = formValues => async dispatch => {
    const response = await quizzes.post('/users', formValues);
    dispatch({ type: CREATE_USER, payload: response.data });

    //Do some programmatic navigation to automatically bring the user back to the list of streams
    history.push('/login');
};

export const signInUser = formValues => async dispatch => {
    const response = await quizzes.post('/users/login', formValues);
    localStorage.setItem("token", response.data.token);
    dispatch({ type: SIGN_IN, payload: response.data.user });
    history.push('/quizlist');
};

export const signOutUser = () => async dispatch => {
    const token = localStorage.getItem('token');
    await quizzes.post('/users/logout', null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    dispatch({ type: SIGN_OUT });
    localStorage.removeItem('token');
    history.push('/login');
};


export const getUserProfile = () => async dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await quizzes.get('/users/me', { headers: { 'Authorization': `Bearer ${token}` } });
        dispatch({ type: SIGN_IN, payload: response.data });
    }
};

let nextQuestionId = 1;

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