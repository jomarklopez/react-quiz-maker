import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

class AddOptions extends React.Component {

    renderOption({ input, placeholder, optionNumber, meta: { touched, error } }) {
        // const className = `ui field input ${error && touched ? 'error' : ''}`; For optional error handling
        return (
            <div className="field" >
                <input
                    {...input}
                    autoComplete="off"
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
                        <div className="eight wide column">
                            <Field
                                name={`question-${this.props.questionId}-option-0`}
                                component={this.renderOption.bind(this)}
                                placeholder="Enter your option."
                                optionNumber="0"
                            />
                        </div>
                        <div className="eight wide column">
                            <Field
                                name={`question-${this.props.questionId}-option-1`}
                                component={this.renderOption.bind(this)}
                                placeholder="Enter your option."
                                optionNumber="1"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">
                            <Field
                                name={`question-${this.props.questionId}-option-2`}
                                component={this.renderOption.bind(this)}
                                placeholder="Enter your option."
                                optionNumber="2"
                            />
                        </div>
                        <div className="eight wide column">
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