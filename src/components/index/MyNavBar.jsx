import React from 'react'

export default function MyNavBar(props) {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-success p-0">
        <div className="container">
          <a className="navbar-brand" href="#">@CompanyName</a>
          <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        
          <div className="navbar-collapse collapse" id="navbarsExample04" >
            <ul className="navbar-nav ml-auto">
              <form className="form-inline my-2 my-md-0">
                <input className="form-control form-control-sm" type="text" placeholder="Search" />
              </form>
              <li className="nav-item">
                <a className="nav-link active" href="#">Mi Cuenta</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">Salir</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}
