import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData
  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobs-list-item">
        <div className="job-item-container">
          <div className="company-logo-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="job-role-container">
              <h1 className="job-role">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="rating-icon" />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-location-type-package-container">
            <div className="job-location-type-container">
              <div className="job-location-container">
                <MdLocationOn className="location-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="job-type-container">
                <BsBriefcaseFill className="job-icon" />
                <p className="job-type">{employmentType}</p>
              </div>
            </div>
            <p className="job-package">{packagePerAnnum}</p>
          </div>
          <hr className="jb-line" />
          <div>
            <h1 className="description-title">Description</h1>
            <p className="job-role-description">{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
