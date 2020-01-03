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

import PrivateRoute from '../components/PrivateRoute';

class App extends React.Component {
    componentDidMount = () => {
        this.props.getUserProfile();
    }

    render() {
        return (
            <>
                <Router history={history}>
                    <div className="ui container">
                        <Menu />
                        <Route path="/" exact component={Home} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/registration" exact component={Registration} />
                        <Route path="/quizlist" exact component={QuizCreate} />
                        <PrivateRoute path="/createquiz" exact component={QuizCreate} authed={this.props.currentUser} />
                    </div>
                </Router>
            </>
        )
    }
};
const mapStateToProps = state => {
    return { currentUser: state.auth.currentUser }
};

export default connect(mapStateToProps, { getUserProfile })(App);