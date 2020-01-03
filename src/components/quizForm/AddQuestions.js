import React from 'react';
import { Field } from 'redux-form';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

class AddQuestions extends React.Component {

    renderQuestionInput({ input, placeholder, meta: { touched, error } }) {
        // const className = `field ${touched && error ? 'error' : ''}` For optional error handling
        return (
            <div className="field">
                <input {...input} placeholder={placeholder} size="10" />
            </div>
        )
    }

    renderQuestions() {
        return (
            <Field
                name={`question-${this.props.questionId}`}
                component={this.renderQuestionInput}
                placeholder="Enter your question."
                questionNumber={this.props.questionId}
                validate={[required]}
            />
        )
    }

    render() {
        return (
            <>
                <label>{`Question ${this.props.questionId + 1}:`}</label>
                {this.renderQuestions()}
            </>
        );
    }
}

export default AddQuestions;