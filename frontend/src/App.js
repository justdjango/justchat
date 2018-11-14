import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as actions from './store/actions/auth';
import BaseRouter from './routes';


class App extends React.Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return(
            <Router>
                <div id="frame">
                    <BaseRouter />
                </div>
            </Router>
        );
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(null, mapDispatchToProps)(App);