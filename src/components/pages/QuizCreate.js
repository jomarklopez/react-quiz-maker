import React from 'react';
import { connect } from 'react-redux';

import { createQuiz, clearQuestionForms } from '../../actions';
import CreateQuizForm from '../quizForm/CreateQuizForm';
import CreateAutoQuizForm from '../autoQuizForm/CreateAutoQuizForm';
import Modal from '../Modal';
import history from '../../history';

class QuizCreate extends React.Component {
    onSubmit = formValues => {
        for (let index = 0; index < formValues.questions.length; index++) {
            formValues.questions[index].answer = formValues.questions[index].options[0];
        }
        this.props.createQuiz(formValues);
        this.props.clearQuestionForms();
    }

    renderModalContent() {
        return (
            <div class="ui centered cards">
                <div class="ui link card">
                    <div class="content">
                        <div className="header">
                            Automatic
                                </div>
                        <div class="ui form">
                            <div class="field">
                                <label>Questions</label>
                                <textarea rows="3" disabled></textarea>
                            </div>
                            <div class="field">
                                <label>Answers</label>
                                <textarea rows="3" disabled></textarea>
                            </div>
                        </div>

                    </div>
                    <div class="extra content">
                        <div className="description">
                            Automatic is as simple as copy pasting as options will automatically generated by using the provided answers.
                                </div>
                    </div>
                </div>
                <div class="ui link card">
                    <div class="content">
                        <div className="header">
                            Manual
                                </div>
                        <div className="ui card">
                            <div className="content">
                                <label>Question 1: </label>
                                <div className="field">
                                    <input
                                        autoComplete="off"
                                        size="32"
                                        disabled
                                    />
                                </div>
                                <label>Options:</label>
                                <div className="ui internally celled grid">
                                    <div className="row">
                                        <div className="eight wide column">
                                            <div className="field">
                                                <input
                                                    autoComplete="off"
                                                    size="10"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="eight wide column">
                                            <div className="field">
                                                <input
                                                    autoComplete="off"
                                                    size="10"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="eight wide column">
                                            <div className="field">
                                                <input
                                                    autoComplete="off"
                                                    size="10"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="eight wide column">
                                            <div className="field">
                                                <input
                                                    autoComplete="off"
                                                    size="10"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="extra content">
                        <div class="description">
                            Manual lets you put your own options on each question for a more personalized quiz.
                                </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <>
                <CreateQuizForm onSubmit={this.onSubmit} />
                <Modal title="Choose how you create your quiz!" content={this.renderModalContent()} onDismiss={() => history.push('/quizlist')} />
            </>
        )
    }
};

export default connect(null, { createQuiz, clearQuestionForms })(QuizCreate);