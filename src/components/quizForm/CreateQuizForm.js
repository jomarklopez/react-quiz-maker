import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import AddQuestions from './AddQuestions';
import { addQuestionForm } from '../../actions';
import StackedCards from '../StackedCards';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

class CreateQuizForm extends React.Component {

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    renderLabeledInput({ input, label, placeholder, meta: { touched, error } }) {
        //const className = `ui labeled field input ${touched && error ? 'error' : ''}`
        return (
            <div className="ui labeled field input">
                <div className="ui label">
                    {label}
                </div>
                <input {...input} placeholder={placeholder}
                />
            </div>
        );
    }

    renderQuestionList() {
        return this.props.questionForms.map(questionForm => {
            return (
                <div className="content" key={questionForm.questionId}>
                    <AddQuestions questionId={questionForm.questionId} />
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
                            <button className="ui button primary">Submit</button>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

const mapStateToProps = state => {
    return { questionForms: state.questionForms }
}

const form = reduxForm({
    form: 'quizForm'
})(CreateQuizForm);

export default connect(mapStateToProps, { addQuestionForm })(form);