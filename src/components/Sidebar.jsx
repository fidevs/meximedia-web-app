import React, { Component } from 'react'

import '../css/sidebar.css'

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      classbtn : "sidebar-active", size_img : "50px"
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    let {classbtn , size_img} = this.state
    classbtn === "" ? classbtn = "sidebar-active" : classbtn = ""
    size_img === "20px" ? size_img = "50px" : size_img = "20px"
    this.setState({classbtn : classbtn, size_img : size_img})
    this.props.handleActive(classbtn === "sidebar-active" ? 200 : 35)
  }
  render() {
    return (
      <div
        className={"sidebar pl-2 text-white "+this.state.classbtn}>

        <div className="top-sidebar d-flex">
          <div className="toggle-btn mb-2 mr-5" onClick={this.handleClick}>
            <div className="hamburger"></div>
          </div>
          <h5 className="m-0 p-0 text-nowrap">Menu</h5>
        </div>

        <hr className="m-1"/>

        <div className="sidebar-header d-flex flex-inline flex-nowrap mb-2">
          <div className="img-profile mr-2">
            <img src="https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png" width={this.state.size_img}
              alt="profile avatar" className="rounded-circle my-auto" onClick={this.props.changeMenu} id="profile"
              style={{objectFit:'contain', cursor:'pointer'}}/>
          </div>
          <div className="data-profile">
            <p className="m-0 p-0">{this.props.username}</p>
            <p className="m-0 p-0">{this.props.role}</p>
          </div>
        </div>

        <div className="menu d-block m-0 p-0">
          <ul className="d-block p-0 list-menu">
            <li id="stock" className="d-flex" onClick={this.props.changeMenu}>
              <div id="stock" className="icon-list">
                <i id="stock" className="fas fa-clipboard-list fa-lg m-auto"></i>
              </div>
              <h5 id="stock" className="text-nowrap my-auto">Inventario</h5>
            </li>
            <li id="pdv" className="d-flex" onClick={this.props.changeMenu}>
              <div id="pdv" className="icon-list">
                <i id="pdv" className="fas fa-store m-auto"></i>
              </div>
              <h5 id="pdv" className="text-nowrap my-auto">Punto de ventas</h5>
            </li>
            <li id="crop" className="d-flex" onClick={this.props.changeMenu}>
              <div id="crop" className="icon-list">
                <i id="crop" className="fas fa-cash-register m-auto"></i>
              </div>
              <h5 id="crop" className="text-nowrap my-auto">Corte de caja</h5>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}