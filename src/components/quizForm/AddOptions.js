import React from 'react';
import { Field } from 'redux-form';

import { connect } from 'react-redux';
import { addOption, removeOption } from '../../actions';

class AddOptions extends React.Component {

    componentDidUpdate() {
        this[`question-${this.props.questionId}-option-${this.props.options.length - 2}`].focus()
    }

    renderOption({ input, placeholder, optionNumber, meta: { touched, error } }) {
        // const className = `ui field input ${error && touched ? 'error' : ''}`; For optional error handling
        return (
            <div className="ui field input" >
                <input
                    {...input}
                    ref={input => this[`question-${this.props.questionId}-option-${optionNumber}`] = input}
                    placeholder={placeholder}
                    onClick={() => {
                        if (optionNumber === this.props.options.length - 1) {
                            this.props.addOption(this.props.questionId);
                        }
                    }
                    }
                />
            </div>
        )
    }

    renderOptionsList() {
        return this.props.options.map((_, index) => {
            return (
                <div className="item" key={index}>
                    <Field
                        name={`question-${this.props.questionId}-option-${index}`}
                        component={this.renderOption.bind(this)}
                        placeholder="Enter your option."
                        optionNumber={index}
                        validate={[value => (value || typeof value === 'number' || ((index === this.props.options.length - 1) && this.props.options.length > 1) ? undefined : 'Required')]}
                    />
                </div>
            )
        })
    }

    render() {
        return (
            <div className="ui list">
                <label>Options:</label>
                {this.renderOptionsList()}

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { options: state.questions[ownProps.questionId].options }
};

export default connect(mapStateToProps, { addOption, removeOption })(AddOptions);