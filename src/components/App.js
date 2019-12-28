import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './Menu';
import Home from './pages/Home'
import QuizList from './pages/QuizList';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <div className="ui container">
                    <Menu />
                    <Route path="/" exact component={Home} />
                    <Route path="/quizlist" exact component={QuizList} />
                </div>
            </BrowserRouter>
        </>
    )
};

export default App;