import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { fetchQuiz } from '../../actions';
import StackedCards from '../StackedCards';
import '../../styles/quizStart.css';

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

    renderRadioInput({ input, id, name, type }) {
        return (
            <input {...input} id={id} name={name} type={type} />
        );
    }

    renderQuestionList() {
        return this.props.quiz.questions.map((question, index) => {
            return (
                <div className="content" key={index}>
                    <label>Question {index + 1}: </label>
                    <h3>{question.question}</h3>
                    <form className="ui form">
                        <label>Options:</label>
                        <div className="ui internally celled center aligned grid">
                            <div className="row">
                                <div className="eight wide column option-container">
                                    <Field
                                        id={`${question._id}-0-${question.options[0]}`}
                                        type="radio"
                                        name={question.question}
                                        component={this.renderRadioInput}
                                        value={question.options[0]}
                                    />
                                    <label htmlFor={`${question._id}-0-${question.options[0]}`}> {question.options[0]}
                                    </label>
                                </div>
                                <div className="eight wide column option-container">
                                    <Field
                                        id={`${question._id}-1-${question.options[1]}`}
                                        type="radio"
                                        name={question.question}
                                        component={this.renderRadioInput}
                                        value={question.options[1]}
                                    />
                                    <label htmlFor={`${question._id}-1-${question.options[1]}`}>{question.options[1]}
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="eight wide column option-container">
                                    <Field
                                        id={`${question._id}-2-${question.options[2]}`} type="radio" name={question.question} component={this.renderRadioInput} value={question.options[2]} />
                                    <label htmlFor={`${question._id}-2-${question.options[2]}`}>{question.options[2]}
                                    </label>
                                </div>
                                <div className="eight wide column option-container">
                                    <Field
                                        id={`${question._id}-3-${question.options[3]}`}
                                        type="radio"
                                        name={question.question}
                                        component={this.renderRadioInput}
                                        value={question.options[3]}
                                    />
                                    <label htmlFor={`${question._id}-3-${question.options[3]}`}> {question.options[3]}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
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
                    <StackedCards onSubmit={this.props.handleSubmit(this.onSubmit)} actions="true" pagination="false" carousel="false">
                        {this.renderQuestionList()}
                    </StackedCards>
                </div>

                <button type="submit" className="ui button">Finish!</button>
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