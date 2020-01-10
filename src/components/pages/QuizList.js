import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchQuizzes } from '../../actions';

class QuizList extends React.Component {
    componentDidMount() {
        this.props.fetchQuizzes();
    }

    renderList() {
        if (Object.keys(this.props.quizzes).length !== 0) {
            return this.props.quizzes.map(quiz => {
                return (
                    <div className="item" key={quiz._id}>
                        <i className="large middle aligned icon camera" />
                        <div className="content">
                            <Link to={`/quiz/${quiz._id}`} className="header">
                                {quiz.quizName}
                            </Link>
                        </div>
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
        return (
            <>
                {this.renderList()}
                <Link to="/createquiz" className="ui primary button">Create Quiz</Link>
            </>
        )
    }
};

const mapStateToProps = state => {
    return {
        quizzes: Object.values(state.quiz)
    }
};

export default connect(mapStateToProps, { fetchQuizzes })(QuizList);