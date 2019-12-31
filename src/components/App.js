import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './Menu';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import QuizList from './pages/QuizList';
import QuizCreate from './pages/QuizCreate';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <div className="ui">
                    <Menu />
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/registration" exact component={Registration} />
                    <Route path="/quizlist" exact component={QuizList} />
                    <Route path="/createquiz" exact component={QuizCreate} />
                </div>
            </BrowserRouter>
        </>
    )
};

export default App;