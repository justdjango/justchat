import React from 'react';
import axios from 'axios';
import { Spin, Icon } from 'antd';
import { connect } from 'react-redux';
import Contact from '../components/Contact';
import * as actions from '../store/actions/auth';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class Sidepanel extends React.Component {

    state = { 
        chats: [],
        loginForm: true,
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== null && newProps.username !== null) {
            this.getUserChats(newProps.token, newProps.username);
        }
    }

    getUserChats = (token, username) => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };

        axios.get(`http://127.0.0.1:8000/chat/?username=${username}`)
        .then(res => {
            console.log(res.data);
            this.setState({
                chats: res.data
            });
        });
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
        const activeChats = this.state.chats.map(c => {
            return (
                <Contact 
                    key={c.id}
                    name="Harvey Specter" 
                    picURL="http://emilcarlsson.se/assets/louislitt.png"
                    status="busy"
                    chatURL={`/${c.id}`} />
            )
        })
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
                    {activeChats}
                    {/* <Contact 
                        name="Louis Litt" 
                        picURL="http://emilcarlsson.se/assets/harveyspecter.png"
                        status="online"
                        chatURL="/louis" /> */}
                    {/* <Contact 
                        name="Harvey Specter" 
                        picURL="http://emilcarlsson.se/assets/louislitt.png"
                        status="busy"
                        chatURL="/harvey" /> */}
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
        loading: state.loading,
        token: state.token,
        username: state.username
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