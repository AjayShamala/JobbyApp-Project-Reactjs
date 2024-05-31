import {Link, withRouter} from 'react-router-dom'
import {ImHome} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'
const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <ul className="ul">
        <li>
          <Link to="/" className="links-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </Link>
        </li>
      </ul>
      <ul className="containerssss">
        <li className="list-containerss">
          <Link to="/" className="links-container">
            <h1 className="home">Home</h1>
            <ImHome size="30" className="cv" />
          </Link>
          <Link to="/jobs" className="links-container">
            <h1 className="home">Jobs</h1>
            <BsBriefcaseFill size="30" className="cv" />
          </Link>
          <FiLogOut onClick={onClickLogOut} className="cv" size="30" />
        </li>
      </ul>
      <ul className="ul-container">
        <li className="list-containers">
          <button className="onclick" onClick={onClickLogOut}>
            {' '}
            Logout{' '}
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
