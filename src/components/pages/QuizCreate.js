import React from 'react';
import { connect } from 'react-redux';

import { createQuiz, clearQuestionForms } from '../../actions';
import CreateQuizForm from '../quizForm/CreateQuizForm';

class QuizCreate extends React.Component {
    onSubmit = formValues => {
        for (let index = 0; index < formValues.questions.length; index++) {
            formValues.questions[index].answer = formValues.questions[index].options[0];
        }

        this.props.createQuiz(formValues);
        this.props.clearQuestionForms();
    }

    render() {
        return (
            <>
                <CreateQuizForm onSubmit={this.onSubmit} />
            </>
        )
    }
};

export default connect(null, { createQuiz, clearQuestionForms })(QuizCreate);