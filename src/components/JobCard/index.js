import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'
const JobCard = props => {
  const {allJobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
    packagePerAnnum,
    id,
  } = allJobsData
  return (
    <Link to={`/jobs/${id}`} className="link-container">
      <li className="div-container">
        <div className="engineer-container">
          <img src={companyLogoUrl} alt="company logo" className="image-7" />
          <div>
            <h1 className="devops">{title}</h1>
            <div className="name">
              <AiFillStar size="27" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="r">
          <div className="ro">
            <MdLocationOn size="26" />
            <p className="loc">{location}</p>
            <p className="loc">{employmentType}</p>
          </div>
          <p className="oo">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="description-container">Description</h1>
        <p className="desc">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCard
