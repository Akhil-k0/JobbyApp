import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="page-msg">Page Not Found</h1>
    <p className="description">
      we are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
