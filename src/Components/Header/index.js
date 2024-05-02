import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-bg-container">
      <div className="header-details-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <ul className="list-container">
          <Link to="/">
            <li className="list-item">Home</li>
          </Link>
          <Link to="/jobs">
            <li className="list-item">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={logOut}>
          Logout
        </button>
      </div>
      <div className="sm-header-details-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="sm-logo"
          />
        </Link>
        <ul className="sm-list-container">
          <Link to="/">
            <li className="sm-list-item">
              <AiFillHome className="icon" />
            </li>
          </Link>
          <Link to="/jobs">
            <li className="sm-list-item">
              <BsBriefcaseFill className="icon" />
            </li>
          </Link>
          <Link to="/login" onClick={logOut}>
            <li className="sm-list-item">
              <FiLogOut className="icon" />
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
