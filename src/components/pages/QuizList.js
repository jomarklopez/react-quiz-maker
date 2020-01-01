import React from 'react';
import { Link } from 'react-router-dom';

const QuizList = () => {
    return (
        <div className="ui placeholder segment">
            <div className="ui icon header">
                <i className="dont icon"></i>
                No quiz have been added yet
            </div>
            <Link to="/createquiz" className="ui primary button">Create Quiz</Link>
        </div>
    )
};

export default QuizList;