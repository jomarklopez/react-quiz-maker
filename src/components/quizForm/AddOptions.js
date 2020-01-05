import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

class AddOptions extends React.Component {

    renderOption({ input, placeholder, optionNumber, meta: { touched, error } }) {
        // const className = `ui field input ${error && touched ? 'error' : ''}`; For optional error handling
        return (
            <div className="ui field input" >
                <input
                    {...input}
                    ref={input => this[`question-${this.props.questionId}-option-${optionNumber}`] = input}
                    placeholder={placeholder}
                />
            </div>
        )
    }

    render() {
        return (
            <>
                <label>Options:</label>
                <div className="ui internally celled grid">
                    <div className="row">
                        <div class="eight wide column">
                            <Field
                                name={`question-${this.props.questionId}-option-0`}
                                component={this.renderOption.bind(this)}
                                placeholder="Enter your option."
                                optionNumber="0"
                            />
                        </div>
                        <div class="eight wide column">
                            <Field
                                name={`question-${this.props.questionId}-option-1`}
                                component={this.renderOption.bind(this)}
                                placeholder="Enter your option."
                                optionNumber="1"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div class="eight wide column">
                            <Field
                                name={`question-${this.props.questionId}-option-2`}
                                component={this.renderOption.bind(this)}
                                placeholder="Enter your option."
                                optionNumber="2"
                            />
                        </div>
                        <div class="eight wide column">
                            <Field
                                name={`question-${this.props.questionId}-option-3`}
                                component={this.renderOption.bind(this)}
                                placeholder="Enter your option."
                                optionNumber="3"
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { options: state.questions[ownProps.questionId].options }
};

export default connect(mapStateToProps, {})(AddOptions);