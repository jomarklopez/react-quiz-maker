import React from 'react';
import { Link } from 'react-router-dom';

const QuizList = () => {
    return (
        <div class="ui placeholder segment">
            <div class="ui icon header">
                <i class="dont icon"></i>
                No quiz have been added yet
            </div>
            <Link to="/createquiz" className="ui primary button">Create Quiz</Link>
        </div>
    )
};

export default QuizList;