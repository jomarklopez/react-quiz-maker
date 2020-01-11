import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchQuizzes } from '../../actions';
import '../../styles/quizList.css'

class QuizList extends React.Component {
    componentDidMount() {
        this.props.fetchQuizzes();
    }

    renderList() {
        if (Object.keys(this.props.quizzes).length !== 0) {
            return this.props.quizzes.map(quiz => {
                return (
                    <div className="setCard" key={quiz._id} onClick={() => console.log(quiz._id)}>
                        <div className="ui simple icon bottom right floated dropdown button" onClick={(e) => e.stopPropagation()}>
                            <i className="ellipsis vertical icon"></i>
                            <div className="menu" >
                                <div className="item">
                                    <i className="edit outline icon"></i>
                                    Edit
                                </div>
                                <div className="item">
                                    <i className="trash alternate outline icon"></i>
                                    Delete
                                </div>
                            </div>
                        </div>
                        <h3 className="setCard_title noselect" id={quiz.quizName} >{quiz.quizName} </h3>
                    </div>
                );
            });
        } else {
            return (
                <div className="ui placeholder segment">
                    <div className="ui icon header">
                        <i className="dont icon"></i>
                        No quiz have been added yet
                    </div>
                </div>
            )
        }
    }

    render() {
        const content = (Object.keys(this.props.quizzes).length === 0) ? 'Create A Quiz' : <i className="plus icon"></i>;
        return (
            <div className="ui segment">
                <h1>Select Quiz!</h1>
                <div className="questSet-container">
                    {this.renderList()}
                    <Link to="/createquiz" className="circular ui floated green icon button">
                        {content}
                    </Link>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        quizzes: Object.values(state.quiz)
    }
};

export default connect(mapStateToProps, { fetchQuizzes })(QuizList);