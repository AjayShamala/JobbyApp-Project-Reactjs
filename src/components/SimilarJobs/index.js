import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'
const SimilarJobs = props => {
  const {similarJobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsData
  return (
    <div className="similar-container">
      <div className="rows-contai">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar"
        />
        <div>
          <h1 className="backend">{title}</h1>
          <div className="ee">
            <AiFillStar size="26" className="ii" />
            <p className="starrr">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="bal">Description</h1>
      <p className="pad">{jobDescription}</p>
      <div className="science">
        <MdLocationOn size="26" className="p" />
        <p className="lo">{location}</p>
        <BsBriefcaseFill size="26" className="p" />
        <p className="lo">{employmentType}</p>
      </div>
    </div>
  )
}
export default SimilarJobs
