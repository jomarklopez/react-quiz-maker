import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import history from '../history';
import Menu from './Menu';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import QuizList from './pages/QuizList';
import QuizCreate from './pages/QuizCreate';
import { getUserProfile } from '../actions';

class App extends React.Component {
    componentDidMount = () => {
        this.props.getUserProfile();
    }

    render() {
        return (
            <>
                <Router history={history}>
                    <div className="ui">
                        <Menu />
                        <Route path="/" exact component={Home} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/registration" exact component={Registration} />
                        <Route path="/quizlist" exact component={QuizList} />
                        <Route path="/createquiz" exact component={QuizCreate} />
                    </div>
                </Router>
            </>
        )
    }
};

export default connect(null, { getUserProfile })(App);