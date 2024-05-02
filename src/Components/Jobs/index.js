import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'

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

// eslint-disable-next-line
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

const apiStatusInfo = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const jobsApiStatusInfo = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileList: [],
    apiStatus: apiStatusInfo.initial,
    jobsApiStatus: jobsApiStatusInfo.initial,
    employmentsTypes: [],
    salaryRange: '',
    searchInput: '',
    jobsDataList: [],
  }

  componentDidMount = () => {
    this.getProfileDetails()
    this.getJobsList()
  }

  // profile related code

  retryPofileApi = () => {
    this.renderProfile()
  }

  renderProfileFailure = () => (
    <div className="profile-failure-view">
      <button
        type="button"
        data-testid="button"
        className="retry-btn"
        onClick={this.retryPofileApi}
      >
        Retry
      </button>
    </div>
  )

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusInfo.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const profile = await response.json()
      const updatedDetails = {
        name: profile.profile_details.name,
        profileImageUrl: profile.profile_details.profile_image_url,
        shortBio: profile.profile_details.short_bio,
      }
      this.setState({
        profileList: updatedDetails,
        apiStatus: apiStatusInfo.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusInfo.failure})
    }
  }

  renderProfile = () => {
    const {profileList} = this.state
    const {name, profileImageUrl, shortBio} = profileList
    return (
      <div className="job-profile-container">
        <div className="profile-details-container">
          <img src={profileImageUrl} alt="profile" className="profile-img" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-description">{shortBio}</p>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderPageView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusInfo.success:
        return this.renderProfile()
      case apiStatusInfo.failure:
        return this.renderProfileFailure()
      case apiStatusInfo.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  // Employment Type Related Code

  getEmploymentType = event => {
    const {employmentsTypes} = this.state
    const inputNotInList = employmentsTypes.filter(
      eachItem => eachItem === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          employmentsTypes: [...prevState.employmentsTypes, event.target.id],
        }),
        this.getJobsList,
      )
    } else {
      const filteredData = employmentsTypes.filter(
        eachItem => eachItem !== event.target.id,
      )

      this.setState(
        // eslint-disable-next-line
        prevState => ({employmentsTypes: filteredData}),
        this.getJobsList,
      )
    }
  }

  renderTypesOfEmploymentDetails = () => (
    <div className="input-type-container">
      <h1 className="type-header">Type of Employment</h1>
      <ul className="type-list">
        {employmentTypesList.map(eachType => (
          <li className="type-item" key={eachType.employmentTypeId}>
            <input
              type="checkbox"
              className="checkbox-input"
              id={eachType.employmentTypeId}
              onChange={this.getEmploymentType}
            />
            <label htmlFor={eachType.employmentTypeId} className="label">
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  // Minimum Package Related Code

  getSalaryRange = event => {
    this.setState({salaryRange: event.target.id}, this.getJobsList)
  }

  renderSalaryRange = () => (
    <div className="input-type-container">
      <h1 className="type-header">Salary Range</h1>
      <ul className="type-list">
        {salaryRangesList.map(eachRange => (
          <li className="type-item" key={eachRange.salaryRangeId}>
            <input
              type="radio"
              name="option"
              className="checkbox-input"
              id={eachRange.salaryRangeId}
              onChange={this.getSalaryRange}
            />
            <label htmlFor={eachRange.salaryRangeId} className="label">
              {eachRange.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  // Jobs List Related Code

  getJobsList = async () => {
    const {employmentsTypes, salaryRange, searchInput} = this.state
    this.setState({jobsApiStatus: jobsApiStatusInfo.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentsTypes}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const jobsData = await response.json()
      const updatedData = jobsData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        title: eachJob.title,
        rating: eachJob.rating,
      }))
      this.setState({
        jobsDataList: updatedData,
        jobsApiStatus: jobsApiStatusInfo.success,
      })
    } else if (response.status === 400) {
      this.setState({jobsApiStatus: jobsApiStatusInfo.failure})
    }
  }

  renderJobsList = () => {
    const {jobsDataList} = this.state
    const noJobs = jobsDataList.length === 0
    return noJobs ? (
      <div className="no-jobs-container">
        <img
          className="no-jobs-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-jobs-error">No Jobs Found</h1>
        <p className="no-jobs-msg">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    ) : (
      <ul className="jobs-list-items-container">
        {jobsDataList.map(eachItem => (
          <JobItem key={eachItem.id} jobData={eachItem} />
        ))}
      </ul>
    )
  }

  // Search Bar Related Code

  getSearchInput = event => this.setState({searchInput: event.target.value})

  searchEntered = event => {
    if (event.key === 'Enter') {
      // eslint-disable-next-line no-lone-blocks
      {
        this.getJobsList()
      }
    }
  }

  renderSearchBar = () => {
    const {searchInput} = this.state

    return (
      <div className="search-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          id="search"
          value={searchInput}
          onChange={this.getSearchInput}
          onKeyPress={this.searchEntered}
        />
        {/* eslint-disable-next-line */}
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.getJobsList}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderSmSearchBar = () => {
    const {searchInput} = this.state

    return (
      <div className="sm-search-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          id="search"
          value={searchInput}
          onChange={this.getSearchInput}
          onKeyPress={this.searchEntered}
        />
        {/* eslint-disable-next-line */}
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.getJobsList}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  // Jobs Failure and Loading Related Code

  renderJobsLoadingView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryJobSearch = () => {
    this.getJobsList()
  }

  renderJobsFailure = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobs-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="no-jobs-error">Oops! Something Went Wrong</h1>
      <p className="no-jobs-msg">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        data-testid="button"
        className="retry-btn"
        onClick={this.retryJobSearch}
      >
        Retry
      </button>
    </div>
  )

  renderJobsPageView = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case jobsApiStatusInfo.success:
        return this.renderJobsList()
      case jobsApiStatusInfo.failure:
        return this.renderJobsFailure()
      case jobsApiStatusInfo.inProgress:
        return this.renderJobsLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-container">
          {this.renderSmSearchBar()}
          <div className="page-side-container">
            {this.renderPageView()}
            <hr className="line" />
            {this.renderTypesOfEmploymentDetails()}
            <hr className="line" />
            {this.renderSalaryRange()}
          </div>

          <div className="jobs-section-container">
            {this.renderSearchBar()}
            {this.renderJobsPageView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
