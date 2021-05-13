import React, { Component } from 'react'

export class NotFound extends Component {
  render () {
    return (
      <div className="page-wrap d-flex flex-row align-items-center">
          <div className="container">
              <div className="row justify-content-center">
                  <div className="col-md-12 text-center">
                      <span className="display-4 d-block">404</span>
                      <div className="mb-4 lead">The page you are looking for was not found</div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

export default NotFound
