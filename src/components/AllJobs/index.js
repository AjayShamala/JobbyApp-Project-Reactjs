import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import JobCard from '../JobCard'
import Header from '../Header'
import './index.css'
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiUrlStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inpogress: 'INPROGRESS',
}
const apiUrlJobStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inpogress: 'INPROGRESS',
}
class AllJobs extends Component {
  state = {
    jobData: [],
    profileData: [],
    checkBoxInputs: [],
    radioInputs: '',
    searchInput: '',
    apiStatus: apiUrlStatus.initial,
    apiJobStatus: apiUrlJobStatus.initial,
    responseSuccess: false,
  }
  componentDidMount() {
    this.getJobData()
    this.getProfileData()
  }
  getProfileData = async () => {
    this.setState({apiStatus: apiUrlStatus.inpogress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = [await response.json()]
      const updatedProfileData = data.map(each => ({
        name: each.profile_details.name,
        profileImageUrl: each.profile_details.profile_image_url,
        shortBio: each.profile_details.short_bio,
      }))
      this.setState({
        profileData: updatedProfileData,
        apiStatus: apiUrlStatus.success,
        responseSuccess: true,
      })
    } else {
      this.setState({apiStatus: apiUrlStatus.failure})
    }
  }
  getJobData = async () => {
    this.setState({apiStatus: apiUrlJobStatus.inpogress})
    const {checkBoxInputs, radioInputs, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxInputs}&minimum_package=${radioInputs}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobData: updatedJobData,
        apiJobStatus: apiUrlJobStatus.success,
      })
    } else {
      this.setState({apiJobStatus: apiUrlJobStatus.failure})
    }
  }
  onChangeRadioInput = event => {
    this.setState({radioInputs: event.target.id}, this.getJobData)
  }
  onGetInputOption = event => {
    const {checkBoxInputs} = this.state
    const inputNotInList = checkBoxInputs.filter(
      each => event.target.id === each,
    )
    if (inputNotInList === 0) {
      this.setState(
        previous => ({
          checkBoxInputs: [...previous.checkBoxInputs, event.target.id],
        }),
        this.getJobData,
      )
    } else {
      const filteredData = checkBoxInputs.filter(
        each => event.target.id !== each,
      )
      this.setState({checkBoxInputs: filteredData}, this.getJobData)
    }
  }
  onGetProfileView = () => {
    const {name, shortBio, profileImageUrl} = profileData[0]
    return (
      <div className="const">
        <img src={profileImageUrl} alt={name} className="images" />
        <h1 className="image-heds">{name}</h1>
        <p className="at-description">{shortBio}</p>
      </div>
    )
  }
  onRetryProfileView = () => {
    this.getProfileData()
  }
  onFailureProfileData = () => (
    <div className="but">
      <button onClick={this.onRetryProfileView} className="n">
        Retry
      </button>
    </div>
  )
  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )
  onRenderProfileView = () => {
    const apiStatus = this.state
    switch (apiStatus) {
      case apiUrlStatus.success:
        return this.onGetProfileView()
      case apiUrlStatus.failure:
        return this.onFailureProfileData()
      case apiUrlStatus.inpogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
  onRetryJobDetails = () => {
    this.getJobData()
  }
  onRenderFailureJob = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fails"
      />
      <h1 className="goat">Oops! Something Went Wrong</h1>
      <p className="wrong">
        We cannot seem to find the page you are looking far
      </p>
      <button onClick={this.onRetryJobDetails} className="jbs">
        Retry
      </button>
    </div>
  )
  renderJobSuccess = () => {
    const {jobData} = this.state
    const noJobs = jobData.length === 0
    return noJobs ? (
      <div className="nojobs">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="image-20"
        />
        <h1 className="nojobs-found">No Jobs Found</h1>
        <p className="para-found">
          We could not find any jobs.Try other filters.
        </p>
      </div>
    ) : (
      <ul className="unorders">
        {jobData.map(each => (
          <JobCard key={each.id} allJobsData={each} />
        ))}
      </ul>
    )
  }
  onRenderAllJobs = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case apiUrlJobStatus.success:
        return this.renderJobSuccess()
      case apiUrlJobStatus.failure:
        return this.onRenderFailureJob()
      case apiUrlJobStatus.inpogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
  onGetCheckBoxesView = () => (
    <ul className="box-container">
      {employmentTypesList.map(each => (
        <li className="consssss" key={each.employmentTypeId}>
          <input
            type="checkbox"
            onChange={this.onGetInputOption}
            id={each.employmentTypeId}
            className="inpu"
          />
          <label htmlFor={each.employmentTypeId} className="labs">
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )
  onGetradioBoxesView = () => (
    <ul className="box-container">
      {salaryRangesList.map(each => (
        <li className="consssss" key={each.salaryRangeId}>
          <input
            type="radio"
            onChange={this.onChangeRadioInput}
            id={each.salaryRangeId}
            className="inpu"
          />
          <label htmlFor={each.salaryRangeId} className="labs">
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )
  onGetSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }
  onSubmitSearchInput = () => {
    this.getJobData()
  }
  onSubmitKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobData()
    }
  }
  render() {
    const {searchInput} = this.state
    return (
      <div className="frontend">
        <Header />
        <div className="f">
          <div className="rowssss">
            <input
              type="search"
              className="inputs"
              value={searchInput}
              onChange={this.onGetSearchInput}
              onKeyDown={this.onSubmitKeyDown}
            />
            <button
              onClick={this.onSubmitSearchInput}
              data-testid="searchButton"
              className="buts"
            >
              <AiOutlineSearch className="b" size="40" />
            </button>
          </div>
          <div>
            {this.onRenderProfileView()}
            <div className="cccc">
              <img
                src="https://srcwap.com/wp-content/uploads/2022/08/blank-profile-picture-hd-images-photo.jpg"
                alt="img"
                className="images"
              />
              <h1 className="image-heds">Shyamala Ajay Kumar</h1>
              <p className="at-description">Full stack Developer</p>
            </div>
            <hr />
            <h1 className="white">Type of Employment</h1>
            {this.onGetCheckBoxesView()}
            <hr />
            <h1 className="white">Salary Range</h1>
            {this.onGetradioBoxesView()}
          </div>
          <div className="column-container">
            <div className="rowssss">
              <input
                type="search"
                className="inputsss"
                value={searchInput}
                onChange={this.onGetSearchInput}
                onKeyDown={this.onSubmitKeyDown}
              />
              <button
                onClick={this.onSubmitSearchInput}
                data-testid="searchButton"
                className="buts"
              >
                <AiOutlineSearch className="l" size="40" />
              </button>
            </div>
            {this.onRenderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}
export default AllJobs
