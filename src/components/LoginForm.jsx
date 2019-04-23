import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {login, logout} from "../actions/LoginActions";

class LoginForm extends Component {
    constructor() {
        super();

        this.state = {
            isOpen: false
        }
    }


    static getDerivedStateFromProps(props, state) {
        if(props.logined) {
            return {
                isOpen: false
            }
        }

        return null;
    }

    handleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    handleLogOut = () => {
        this.props.dispatch(logout())
    };

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleLogin = (event) => {
        event.preventDefault();
        this.props.dispatch(login(this.state.username, this.state.password));
    };

    render() {
        const { isOpen } = this.state;
        const { logined, error } = this.props;
        return(
            <Fragment>
                <button className="logIn"
                        onClick={logined ? this.handleLogOut : this.handleOpen}
                >
                    {
                        logined  ? 'LOG OUT' : 'LOG IN'
                    }
                </button>
                {
                    isOpen && (
                        <div className="new-task_popup">
                            <div className="wrapper">

                                <form>
                                    {
                                        error && <div className="login-error">{error}</div>
                                    }
                                    <input type="text"
                                           placeholder="Username"
                                           name="username"
                                           required
                                           onChange={e => this.handleInputChange(e)}
                                    />
                                    <input type="password"
                                           placeholder="Password"
                                           name="password"
                                           required
                                           onChange={e => this.handleInputChange(e)}
                                    />
                                    <div>
                                        <button onClick={this.handleOpen}
                                                className="cancel"
                                        >
                                            cancel
                                        </button>
                                        <button onClick={e => this.handleLogin(e)}>Log in</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    )
                }

            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        logined: state.login.logined,
        error: state.login.error,
    };
};

export default connect(mapStateToProps)(LoginForm)