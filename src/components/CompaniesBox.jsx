import React from 'react'

export default function CompaniesBox(props) {
  return (
    <div className="box-company bg-light px-2 mr-2" style={{minWidth:'130px'}}>
      <div className="company-name text-center text-nowrap">
        <small><b>{props.name}</b></small>
      </div>
      <hr className="m-0 bg-dark"/>
      <div className="company-info mb-1 d-flex flex-inline">
        <div className="info-item">
          <i className="fas fa-warehouse fa-xs mr-1"></i>
          <small>{props.totalWares}</small>
        </div>
        <div className="info-item">
          <i className="fas fa-map-marker-alt fa-xs ml-2 mr-1"></i>
          <small>{props.totalDirs}</small>
        </div>
      </div>
    </div>
  )
}
