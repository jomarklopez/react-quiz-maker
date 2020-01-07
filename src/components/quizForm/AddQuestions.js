import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { addQuestion } from '../../actions';


const required = value => (value || typeof value === 'number' ? undefined : 'Required');

class AddQuestions extends React.Component {

    componentDidUpdate() {
        this[`question-${this.props.questionId}`].focus()
    }

    renderQuestionInput({ input, placeholder, meta: { touched, error } }) {
        // const className = `field ${touched && error ? 'error' : ''}` For optional error handling
        return (
            <div className="field">
                <input {...input}
                    autoComplete="off"
                    ref={input => this[`question-${this.props.questionId}`] = input}
                    placeholder={placeholder}
                    size="10"
                    onClick={() => {
                        if (this.props.questionId === this.props.questions.length - 1) {
                            this.props.addQuestion();
                        }
                    }
                    }
                />
            </div>
        )
    }

    renderQuestions() {
        return (
            <Field
                name={`question-${this.props.questionId}`}
                component={this.renderQuestionInput.bind(this)}
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

const mapStateToProps = state => {
    return { questions: state.questions }
}

export default connect(mapStateToProps, { addQuestion })(AddQuestions);