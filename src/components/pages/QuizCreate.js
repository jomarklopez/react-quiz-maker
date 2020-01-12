import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createQuiz, clearQuestionForms } from '../../actions';
import CreateManualQuizForm from '../manualQuizForm/CreateManualQuizForm';
import CreateAutoQuizForm from '../autoQuizForm/CreateAutoQuizForm';
import Modal from '../Modal';
import history from '../../history';

class QuizCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
            showAutoQuizForm: false,
            showManualQuizForm: false,
        }
    }

    submitQuizBody(formValues) {
        if (this.state.showManualQuizForm) {
            for (let index = 0; index < formValues.questions.length; index++) {
                formValues.questions[index].answer = formValues.questions[index].options[0];
            }
            this.props.createQuiz(formValues);
            this.props.clearQuestionForms();
        } else if (this.state.showAutoQuizForm) {
            console.log(typeof formValues)

            let questionsInput = removeEmptyLines(formValues.questionsForm.split(/\n/));
            let answerKey = removeEmptyLines(formValues.answersForm.split(/\n/));
            let choices = createChoices(answerKey);
            let questions = [];

            for (let index = 0; index < questionsInput.length; index++) {
                let question = {
                    question: questionsInput[index],
                    answer: answerKey[index],
                    options: choices[index]
                };
                questions.push(question);
            }
            let quiz = {
                quizName: formValues.quizName,
                questions: questions
            }
            this.props.createQuiz(quiz);
        }
    }

    onSubmit = formValues => {
        this.submitQuizBody(formValues);
    }

    renderModalContent() {
        return (
            <div className="ui centered cards">
                <div className="ui link card" onClick={() => this.setState({ showModal: false, showAutoQuizForm: true })}>
                    <div className="content">
                        <div className="header">
                            Automatic
                                </div>
                        <div className="ui form">
                            <div className="field">
                                <label>Questions</label>
                                <textarea rows="3" disabled></textarea>
                            </div>
                            <div className="field">
                                <label>Answers</label>
                                <textarea rows="3" disabled></textarea>
                            </div>
                        </div>

                    </div>
                    <div className="extra content">
                        <div className="description">
                            Automatic is as simple as copy pasting as options will automatically generated by using the provided answers.
                            <br />
                            Minimum questions with answer: 4.
                        </div>
                    </div>
                </div>
                <div className="ui link card" onClick={() => this.setState({ showModal: false, showManualQuizForm: true })}>
                    <div className="content">
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
                        <div className="description">
                            Manual lets you put your own options on each question for a more personalized quiz.
                            <br />
                            No minimum questions!
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderActions() {
        return <Link to="/quizlist" className="ui button">Cancel</Link>;
    }

    renderFormActions() {
        return <button type="submit" className="ui primary button">
            Submit
                </button>;
    }

    renderForm() {
        if (this.state.showModal) {
            return <Modal
                title="Choose how you create your quiz!"
                content={this.renderModalContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/quizlist')}
            />;
        } else if (this.state.showManualQuizForm) {
            return <CreateManualQuizForm actions={this.renderFormActions()} onSubmit={this.onSubmit} />;
        } else if (this.state.showAutoQuizForm) {
            return <CreateAutoQuizForm onSubmit={this.onSubmit} />;
        }
    }

    render() {
        return (
            <>
                {this.renderForm()}
            </>
        )
    }
};

function removeEmptyLines(array) {
    for (let index = 0; index < array.length;) {
        const element = array[index];
        if (element === "") {
            array.splice(index, 1);
        } else {
            index++;
        }
    }
    return array;
}

function createChoices(answerKey) {
    const choices = [];
    for (let index = 0; index < answerKey.length; index++) {
        choices.push([...answerKey])
    }
    //Randomly remove elements until 3 are left except the right answer
    for (var i = 0; i <= choices.length - 1; i++) {
        let el = choices[i];
        while (el.length !== 4) {
            let curIndex = Math.floor(Math.random() * el.length)
            if (el[curIndex] !== answerKey[i]) {
                el.splice(curIndex, 1);
            }
        }
    }
    return choices;
}

export default connect(null, { createQuiz, clearQuestionForms })(QuizCreate);