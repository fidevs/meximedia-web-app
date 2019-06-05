import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import $ from 'jquery'
import Roles from '../components/Roles'
import Modules from '..//components/Modules'
import Companies from '../components/Companies'
import Warehouses from '../components/warehouses/Warehouses'
import Products from '../components/products/Products'
import Sales from '../components/sales/Sales'

import '../css/Admin.css';

function HomeDash(props) {
  return (
    <div>
      Hola
  </div>
  )
}

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.handleMenuActive = this.handleMenuActive.bind(this);
  }

  handleMenuActive(event) {
    const id = event.target.id;
    const ids = id+"-submenu";
    $("#"+ids).toggleClass("active");
    $("#"+id).toggleClass("active");
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-admin sticky-top p-0 justify-content-around">
          <Link className="navbar-brand" to="/admin" >
            CompanyName
          </Link>
          <div className="controls-nav">
            <button type="button" className="btn btn-dark ml-2" >Página</button>
            <button type="button" className="btn btn-dark ml-2" >Salir</button>
          </div>
        </nav>

        {/*----------Sidebar---------*/}
          <div className="mysidebar bg-dark p-2">
            {/*-----HEADER-----*/}
            <div className="sid-header d-flex">
              <div className="d-inline m-0">
                <img className="img-profile-admin rounded-circle" src="img/icons/icon-profile.png" alt="imageProfile"/>
              </div>
              <div className="text-light my-auto p-0">
                <div className="p-0 admin-name">
                  <span><strong>@Username</strong></span>
                </div>
                <div className="p-0 admin-role">
                  <span>@Userrole</span>
                </div>
              </div>
              <div className="m-auto">
                <i className="fas fa-user-cog fa-lg"></i>
              </div>
            </div>

            <hr className="line m-2"/>
            {/*----SEARCH----*/}
            <div className="side-search">
              <input className="form-control form-control-sm text-light" type="text" placeholder="Buscar..."/>
            </div>

            <hr className="line m-2"/>
            {/*-----MENU-----*/}
            <div className="side-menu mt-3">
              <ul className="menu p-0">
                <li className="menu-item">
                  <a className="d-block">
                    <span className="menus" id="idconfigs" onClick={this.handleMenuActive}>
                      <i className="icons-menu-l float-left fas fa-cog mr-2" id="icon-id-1"></i>
                      Configuraciones
                      <i className="icons-menu float-right fas fa-chevron-right" id="icon-id-2"></i>
                    </span>
                  </a>
                  <ul className="submenus mt-1 p-0 pl-3" id="idconfigs-submenu">
                    <li className="submenu-item">
                      <Link to="/admin/modules">
                        <span className="d-block">
                          <i className="icons-menu-l float-left fas fa-box fa-sm mr-2" id="icon-id-3"></i>
                          Modulos
                        </span>
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link to="/admin/roles">
                        <span className="d-block">
                        <i className="icons-menu-l fas fa-project-diagram fa-sm mr-2" id="icon-id-4"></i>
                          Roles
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a className="d-block">
                    <span className="menus" id="idadmins" onClick={this.handleMenuActive}>
                      <i className="icons-menu-l float-left fas fa-user-shield mr-2" id="icon-id-5"></i>
                      Administrar
                      <i className="icons-menu float-right fas fa-chevron-right" id="icon-id-6"></i>
                    </span>
                  </a>
                  <ul className="submenus mt-1 p-0 pl-3" id="idadmins-submenu">
                    <li className="submenu-item">
                      <Link to="/admin/companies">
                        <span className="d-block">
                          <i className="icons-menu-l float-left fas fa-building mr-2" id="icon-id-7"></i>
                          Compañias
                        </span>
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link
                        to="/admin/company/b6a68ee9-0d3e-4561-8bd4-0211ea2c5672/warehouses/897e7772-38b7-4c6c-b453-3da9eb209de7/sales">
                        <span className="d-block">
                          <i className="icons-menu-l float-left fas fa-clipboard-list mr-2" id="icon-id-8"></i>
                          Ventas
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        
          <div className="display p-2">
            <Route exact path="/admin" component={HomeDash} />
            <Route exact path="/admin/modules" component={Modules} />
            <Route exact path="/admin/roles" component={Roles} />
            <Route exact path="/admin/companies" component={Companies} />
            <Route exact path="/admin/company/:companyid/warehouses/" component={Warehouses} />
            <Route exact path="/admin/company/:companyid/warehouses/:wareid/products" component={Products} />
            <Route exact path="/admin/company/b6a68ee9-0d3e-4561-8bd4-0211ea2c5672/warehouses/897e7772-38b7-4c6c-b453-3da9eb209de7/sales"
              component={Sales} />
          </div>
      </div>
    )
  }
}