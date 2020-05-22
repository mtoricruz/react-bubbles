import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
  state = {
    credentials: {
      username: 'Lambda School',
      password: 'i<3Lambd4'
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  // make a post request to retrieve a token from the api
  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/login', this.state.credentials)
      .then(res => {
        console.log(res, '<---post req from login comp')
        localStorage.setItem('token', res.data.payload)
        // when you have handled the token, navigate to the BubblePage route
        this.props.history.push('/bubble-page')
      })
      .catch(err => console.log(err));
  }
 
  render(){
    return (
      <>
        <main>
          <form onSubmit={this.login}>
            <label>Username:
              <input
                type='text'
                name='username'
                value={this.state.credentials.username}
                onChange={this.handleChange}
              />
            </label>
            <label>Password:
              <input
                type='password'
                name='password'
                value={this.state.credentials.password}
                onChange={this.handleChange}
              />
            </label>
            <button>
              Log In
            </button>
          </form>
        </main>
      </>
    );
  }
  
};

export default Login;
