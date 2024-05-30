import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'
const apiUrlStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}
class AboutJobItem extends Component {
  state = {
    jobStatus: [],
    similarJobs: [],
    apiStatus: apiUrlStatus.initial,
  }
  componentDidMount() {
    this.getJobData()
  }
  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiUrlStatus.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobData = [data.job_details].map(each => ({
        companyLogoUrl: each.company_logo_url,
        companyWebsiteUrl: each.company_website_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        skills: each.skills.map(item => ({
          imageUrl: item.image_url,
          name: item.name,
        })),
        lifeAtCompany: {
          description: each.life_at_company.description,
          imageUrl: each.life_at_company.image_url,
        },
        rating: each.rating,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        title: each.title,
      }))
      const updatedSimilarData = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobStatus: updatedJobData,
        similarJobs: updatedSimilarData,
        apiStatus: apiUrlStatus.success,
      })
    } else {
      this.setState({
        apiStatus: apiUrlStatus.failure,
      })
    }
  }
  renderSuceessJob = () => {
    const {jobStatus, similarJobs} = this.state
    if (jobStatus.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        jobDescription,
        skills,
        lifeAtCompany,
        location,
        packagePerAnnum,
        rating,
        title,
      } = jobStatus[0]
      return (
        <div className="facebook-container">
          <div className="cons">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="image-2"
            />
            <div>
              <h1 className="headss">{title}</h1>
              <div className="stars">
                <AiFillStar size="20" />
                <p className="para-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="row-container">
            <div className="row">
              <MdLocationOn size="25" />
              <p className="location">{location}</p>

              <p className="location">{employmentType}</p>
            </div>
            <p className="para-package">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-container" />
          <div className="visit-container">
            <h1 className="description-container">Description</h1>
            <a href={companyWebsiteUrl} className="class-container">
              Visit <BiLinkExternal />
            </a>
          </div>
          <p className="pass-container">{jobDescription}</p>
          <h1 className="description-container">Skills</h1>
          <ul className="unorder-container">
            {skills.map(each => (
              <li className="list-container" key={each.name}>
                <img src={each.imageUrl} alt={each.name} />
                <p className="parssss">{each.name}</p>
              </li>
            ))}
          </ul>
          <div className="image-containers">
            <div>
              <h1 className="description-container">Life at Company</h1>
              <p className="company">{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="image-10"
            />
          </div>
          <h1 className="description-container">Similar Jobs</h1>
          <ul className="unorder-list">
            {similarJobs.map(each => (
              <SimilarJobs key={each.id} similarJobsData={each} />
            ))}
          </ul>
        </div>
      )
    }
    return null
  }
  onGetRetryData = () => {
    this.getJobData()
  }
  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="image-11"
      />
      <h1 className="oops-heading">Oops! Something Went Wrong</h1>
      <p className="oops-para">
        We cannot seen to find the page you are looking for.
      </p>
      <button className="button-containers" onClick={this.onGetRetryData}>
        Retry
      </button>
    </div>
  )
  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )
  renderAllJobsAndSimilar = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiUrlStatus.success:
        return this.renderSuceessJob()
      case apiUrlStatus.failure:
        return this.renderFailureView()
      case apiUrlStatus.inprogress:
        return this.renderLoaderView()
      default:
        return null
    }
  }
  render() {
    return (
      <div className="company-container">
        <Header />
        {this.renderAllJobsAndSimilar()}
      </div>
    )
  }
}
export default AboutJobItem
