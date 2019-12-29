import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import AddOptions from './AddOptions';
import { addQuestion } from '../actions';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

class CreateQuizForm extends React.Component {

    onSubmit(formValues) {
        console.log(formValues);
    }

    renderQuestionInput({ input, placeholder, meta: { touched, error } }) {
        const className = `field ${touched && error ? 'error' : ''}`
        return (
            <div className={className}>
                <input {...input} placeholder={placeholder} />
            </div>
        )
    }

    renderLabeledInput({ input, label, placeholder, meta: { touched, error } }) {
        const className = `ui action labeled field input ${touched && error ? 'error' : ''}`
        return (
            <div className={className}>
                <div className="ui label">
                    {label}
                </div>
                <input {...input} type="text" placeholder={placeholder} />
                <button type="button" className="ui green right icon button" onClick={() => console.log('Check name clicked')}>
                    <i className="check icon"></i>
                </button>
            </div>
        );
    }

    renderQuestionsList() {
        return this.props.questions.map(question => {
            return (
                <div className="item" key={question.questionId}>
                    <label>{`Question ${question.questionId + 1}:`}</label>
                    <Field
                        name={`question-${question.questionId}`}
                        component={this.renderQuestionInput}
                        placeholder="Enter your question."
                        questionNumber={question.questionId}
                        validate={[required]}
                    />
                    <AddOptions questionId={question.questionId} />
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <form className="ui form segment" onSubmit={console.log('Submit pressed')} autoComplete="off">
                    <Field
                        name="quizName"
                        component={this.renderLabeledInput} label="Quiz: "
                        placeholder="Put your quiz name here"
                        validate={[required]}
                    />
                </form>
                <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete="off">
                    <div className="ui list">
                        {this.renderQuestionsList()}
                    </div>
                    <button className="ui button teal" onClick={() => this.props.addQuestion()
                    }>Add Another Question</button>
                    <button className="ui button primary" style={{ float: "right" }}>Submit</button>
                </form>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return { questions: state.questions }
}

const form = reduxForm({
    form: 'quizForm'
})(CreateQuizForm);

export default connect(mapStateToProps, { addQuestion })(form);