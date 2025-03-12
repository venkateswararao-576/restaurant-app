import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', iserror: false, errmsg: ''}

  changeusername = event => this.setState({username: event.target.value})

  changepassword = event => this.setState({password: event.target.value})

  issuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  isfailure = errmsg => this.setState({iserror: true, errmsg})

  submituservalues = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.issuccess(data.jwt_token)
    } else {
      this.isfailure(data.error_msg)
    }
  }

  render() {
    const {username, password, iserror, errmsg} = this.state
    const islogged = Cookies.get('jwt_token')
    if (islogged !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-card" onSubmit={this.submituservalues}>
          <label className="label" htmlFor="name">
            USERNAME
          </label>
          <input
            onChange={this.changeusername}
            value={username}
            type="text"
            id="name"
            placeholder="Username"
          />
          <label className="label" htmlFor="pass">
            PASSWORD
          </label>
          <input
            onChange={this.changepassword}
            value={password}
            type="password"
            id="pass"
            placeholder="Password"
          />
          <button type="submit" className="login-btn">
            Login
          </button>
          {iserror && <p className="err-text">{errmsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
