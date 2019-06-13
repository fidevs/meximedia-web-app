import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBarPdv extends Component {
  render() {
    return (
      <div className="mynavbar p-1 bg-dark">
        <div className="container d-flex justify-content-between">
          <div className="company-name text-white">
            {"CompanyName -> "+"action"}
          </div>

          <div className="company-name text-danger">Salir</div>
        </div>
      </div>
    )
  }
}
