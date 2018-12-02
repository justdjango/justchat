import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import Sidepanel from "./containers/Sidepanel";
import Profile from "./containers/Profile";
import AddChatModal from "./containers/Popup";
import * as actions from "./store/actions/auth";
import * as navActions from "./store/actions/nav";
import * as messageActions from "./store/actions/message";
import WebSocketInstance from "./websocket";
import "./assets/style.css";

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  constructor(props) {
    super(props);
    WebSocketInstance.addCallbacks(
      this.props.setMessages.bind(this),
      this.props.addMessage.bind(this)
    );
  }

  render() {
    return (
      <Router>
        <div id="frame">
          <Sidepanel />
          <div className="content">
            <AddChatModal
              isVisible={this.props.showAddChatPopup}
              close={() => this.props.closeAddChatPopup()}
            />
            <Profile />
            <BaseRouter />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    showAddChatPopup: state.nav.showAddChatPopup,
    authenticated: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    closeAddChatPopup: () => dispatch(navActions.closeAddChatPopup()),
    addMessage: message => dispatch(messageActions.addMessage(message)),
    setMessages: messages => dispatch(messageActions.setMessages(messages))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
