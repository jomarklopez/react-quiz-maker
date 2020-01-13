import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { fetchQuiz } from '../../actions';
import StackedCards from '../StackedCards';

class QuizStart extends React.Component {
    // TODO: Implement the actual checking of answers thru backend api. 
    // 1. Collect user answers
    // 2. Send request to api with user answers to check
    // 3. Send response to client with the total score and the which ones were right or wrong. 

    constructor(props) {
        super(props);
        this.userAnswers = {};
    }

    componentDidMount() {
        const { quizId } = this.props.match.params;
        this.props.fetchQuiz(quizId);
    }

    onSubmit = formValues => {
        console.log(formValues);
    }

    renderRadioInput({ input, type }) {
        return (
            <input {...input} type={type} />
        );
    }

    renderQuestionList() {
        return this.props.quiz.questions.map((question, index) => {
            return (
                <div className="content" key={index}>
                    <label>Question {index + 1}: </label>
                    <h3>{question.question}</h3>
                    <div className="ui internally celled grid">
                        <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)} >
                            <label>Options:</label>
                            <div>
                                <label>
                                    <Field name={question.question} component={this.renderRadioInput} type="radio" value={question.options[0]} /> {question.options[0]}
                                </label>
                                <label>
                                    <Field name={question.question} component={this.renderRadioInput} type="radio" value={question.options[1]} /> {question.options[1]}
                                </label>
                                <label>
                                    <Field name={question.question} component={this.renderRadioInput} type="radio" value={question.options[2]} /> {question.options[2]}
                                </label>
                                <label>
                                    <Field name={question.question} component={this.renderRadioInput} type="radio" value={question.options[3]} /> {question.options[3]}
                                </label>
                            </div>
                            <button className="ui button">Submit</button>
                        </form>
                    </div>
                </div>
            )
        })
    }

    render() {
        if (!this.props.quiz) {
            return (
                <div>Loading....</div>
            );
        }
        const { quizName } = this.props.quiz;
        return (
            <>
                <div className="ui segment">
                    <h1>{quizName}</h1>
                </div>
                <div className="ui container segment">
                    <StackedCards actions="true" pagination="false" carousel="false">
                        {this.renderQuestionList()}
                    </StackedCards>
                </div>
            </>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return { quiz: state.quiz[ownProps.match.params.quizId] };
};

const form = reduxForm({
    form: 'userAnswers'
})(QuizStart);

export default connect(mapStateToProps, { fetchQuiz })(form);