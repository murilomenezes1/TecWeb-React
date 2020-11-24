import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../API';
import history from '../../history';

import "./styles.css"

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { user: { username: '', password: '' }, login: false };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    render() {
        if (this.state.login === true) {
            return <Redirect to='/stocks' />;
        }

        return (
            <div className="container">
                <form className="form-container">
                    <header>
                        <h1>stockMERN</h1>
                    </header>
                    <div className="form-group">
                        <label htmlFor="" className="labels-login">Username:{' '}</label>
                        <input
                            className="form-control"
                            name='username'
                            value={this.state.user.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="labels-login">Password:{' '}</label>
                        <input
                            className="form-control"
                            name='password'
                            value={this.state.user.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="button" className="btn btn-success sign-in-button" onClick={this.login}>Sign In</button>
                    <br/>
                    <button
                        type="button"
                        className="btn btn-primary sign-up-button"
                        onClick={() => {
                            history.push('/Signup');
                        }}>
                        Sign Up
                    </button>
                </form>
            </div>
        );
    }

    login() {
        console.log(this.state.user);
        api.post('users/signin', this.state.user)
            .then((resp) => {
                console.log(resp.data.login)
                if (
                    Math.floor(resp.status / 100) === 2 &&
                    resp.data.login === true
                ) {
                    this.setState((state) => {
                        return {
                            user: {
                                username: this.state.user.username,
                                password: this.state.user.password
                            },
                            login: true
                        };
                    });
                    return;
                } else {
                    console.log('Invalid login.');
                }
            })
            .catch((erro) => console.log(erro));
    }

    handleChange(event) {
        var handleState = (state, event) => {
            state.user[event.target.name] = event.target.value;
            return state;
        };
        this.setState(handleState(this.state, event));
        console.log(localStorage.getItem('user'));
    }
}
