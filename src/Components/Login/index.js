import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', isSubmitError: false, errorMsg: ''}

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  onFailure = error => {
    this.setState({isSubmitError: true, errorMsg: error})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-bg-container">
        <div className="login-info-bg-container">
          <div className="login-info-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
            <form className="form-container" onSubmit={this.submitForm}>
              <div className="input-container">
                <label className="label-txt" htmlFor="username">
                  USERNAME{' '}
                </label>
                <input
                  type="text"
                  id="username"
                  className="input"
                  placeholder="Username"
                  onChange={this.getUsername}
                  value={username}
                />
              </div>
              <div className="input-container">
                <label className="label-txt" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  className="input"
                  placeholder="Password"
                  onChange={this.getPassword}
                  value={password}
                />
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
              {isSubmitError && <p className="error-msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
