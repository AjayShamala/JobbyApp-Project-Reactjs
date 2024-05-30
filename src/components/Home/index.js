import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'
const Home = () => (
  <div className="containerss">
    <Header />
    <h1 className="main-header">Find The Job That Fits Your Life</h1>
    <p className="pars">
      Millions of People are searching for jobs salary information ,company
      reviews.Find the job that fits your abilities and potential.{' '}
    </p>
    <Link to="/jobs" className="link-container">
      <button className="buttons">Find Jobs</button>
    </Link>
  </div>
)
export default Home
