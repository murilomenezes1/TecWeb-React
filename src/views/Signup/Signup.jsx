import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../API';
import history from '../../history';
export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = { user: { username: '', password: '' }, signup: false };
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
    }

    render() {
        if (this.state.signup === true) {
            return <Redirect to='/stocks' />;
        }

        return (
            <div>
                <header>
                    <h1>stockMERN</h1>
                </header>
                <ul>
                    Username:{' '}
                    <input
                        name='username'
                        value={this.state.user.username}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    Password:{' '}
                    <input
                        name='password'
                        value={this.state.user.password}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <br></br>
                    <button onClick={this.signup}> Sign Up </button>
                    <button
                        onClick={() => {
                            history.push('/');
                        }}>
                        Sign In
                    </button>
                </ul>
            </div>
        );
    }

    signup() {
        api.post('/users/signup', this.state.user)
            .then((resp) => {
                if (Math.floor(resp.status / 100) === 2) {
                    this.setState((state) => {
                        return {
                            user: {
                                username: this.state.user.username,
                                password: this.state.user.password
                            },
                            signup: true
                        };
                    });
                    return;
                } else {
                    console.log('Invalid username or password.');
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
