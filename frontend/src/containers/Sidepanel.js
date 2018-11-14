import React from 'react';
import { Spin, Icon } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class Sidepanel extends React.Component {

    state = { 
        loginForm: true,
    }

    changeForm = () => {
        this.setState({ loginForm: !this.state.loginForm });
    }

    authenticate = (e) => {
        e.preventDefault();
        if (this.state.loginForm) {
            this.props.login(
                e.target.username.value, 
                e.target.password.value
            );
        } else {
            this.props.signup(
                e.target.username.value, 
                e.target.email.value, 
                e.target.password.value, 
                e.target.password2.value
            );
        }
    }

    render() {
        return (
            <div id="sidepanel">
            <div id="profile">
                <div className="wrap">
                <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" className="online" alt="" />
                <p>Mike Ross</p>
                <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                <div id="status-options">
                    <ul>
                    <li id="status-online" className="active"><span className="status-circle"></span> <p>Online</p></li>
                    <li id="status-away"><span className="status-circle"></span> <p>Away</p></li>
                    <li id="status-busy"><span className="status-circle"></span> <p>Busy</p></li>
                    <li id="status-offline"><span className="status-circle"></span> <p>Offline</p></li>
                    </ul>
                </div>
                <div id="expanded">
                    {
                        this.props.loading ?

                        <Spin indicator={antIcon} /> :

                        this.props.isAuthenticated ? 
                    
                        <button onClick={() => this.props.logout()} className="authBtn"><span>Logout</span></button>
                        
                        :
                        
                        <div>
                            <form method="POST" onSubmit={this.authenticate}>
                                
                                {
                                    this.state.loginForm ?

                                    <div>
                                        <input name="username" type="text" placeholder="username" />
                                        <input name="password" type="password" placeholder="password" />
                                    </div>

                                    :

                                    <div>
                                        <input name="username" type="text" placeholder="username" />
                                        <input name="email" type="email" placeholder="email" />
                                        <input name="password" type="password" placeholder="password" />
                                        <input name="password2" type="password" placeholder="password confirm" />
                                    </div>
                                }
                                
                                <button type="submit">Authenticate</button>

                            </form>

                            <button onClick={this.changeForm}>Switch</button>
                        </div>
                    }
                </div>
                </div>
            </div>
            <div id="search">
                <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
                <input type="text" placeholder="Search contacts..." />
            </div>
            <div id="contacts">
                <ul>
                <li className="contact">
                    <div className="wrap">
                    <span className="contact-status online"></span>
                    <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                    <div className="meta">
                        <p className="name">Louis Litt</p>
                        <p className="preview">You just got LITT up, Mike.</p>
                    </div>
                    </div>
                </li>
                <li className="contact active">
                    <div className="wrap">
                    <span className="contact-status busy"></span>
                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                    <div className="meta">
                        <p className="name">Harvey Specter</p>
                        <p className="preview">Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and htmlForty six other things.</p>
                    </div>
                    </div>
                </li>
                </ul>
            </div>
            <div id="bottom-bar">
                <button id="addcontact"><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add contact</span></button>
                <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
            </div>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (userName, password) => dispatch(actions.authLogin(userName, password)),
        logout: () => dispatch(actions.logout()),
        signup: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidepanel);