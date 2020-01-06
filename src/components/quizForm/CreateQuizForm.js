import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import AddOptions from './AddOptions';
import AddQuestions from './AddQuestions';
import { addQuestion } from '../../actions';
import StackedCards from '../StackedCards';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

class CreateQuizForm extends React.Component {

    onSubmit(formValues) {
        console.log(formValues);
    }

    renderLabeledInput({ input, label, placeholder, meta: { touched, error } }) {
        const className = `ui action labeled field input ${touched && error ? 'error' : ''}`
        return (
            <div className={className}>
                <div className="ui label">
                    {label}
                </div>
                <input {...input} placeholder={placeholder}
                />
                <button type="button" className="ui green right icon button" onClick={() => console.log('Check name clicked')}>
                    <i className="check icon"></i>
                </button>
            </div>
        );
    }

    renderQuestionList() {
        return this.props.questions.map(question => {
            return (
                <div className="content" key={question.questionId}>
                    <AddQuestions questionId={question.questionId} />
                    <AddOptions questionId={question.questionId} />
                </div>
            )
        })
    }

    render() {
        return (
            <>
                <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)} >
                    <div className="ui form segment">
                        <Field
                            name="quizName"
                            component={this.renderLabeledInput} label="Quiz: "
                            placeholder="Put your quiz name here"
                            validate={[required]}
                        />
                    </div>
                    {/* Form Card */}
                    <div className="ui card container fluid" >
                        {/*  Each card under stacked cards will be the child of stacked cards*/}
                        <StackedCards>
                            {this.renderQuestionList()}
                        </StackedCards>
                        <div className="extra content">
                            <div className="ui two buttons">
                                <button type="button" className="ui button teal" onClick={() => this.props.addQuestion()
                                }>Add Another Question</button>
                                <button type="submit" className="ui button primary right floated" style={{ float: "right" }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
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