import React, { Component } from 'react'
import { login } from '../services/oauth'
import CryptoJS from 'crypto-js'

import '../css/Login.css'

export default class Login extends Component {


  login = () => {
    let cif = CryptoJS.Rabbit.encrypt("Hola", "key")
    console.log(CryptoJS.Rabbit.decrypt(cif, "key"))
    login("default-sr","password")
  }

  render() {
    return (
      <div className="login-container">
        <div className="box-login m-auto px-4 py-1">
          <h4 className="login-header rounded-top w-100 m-auto text-center">Iniciar Sesión</h4>
          <hr className="p-0 m-0 mb-3 mt-1" />
          <div className="login-form">
            <label className="text-white p-0 m-0" htmlFor="username"><small>Usuario</small></label>
            <input id="username" className="form-control form-control-sm mb-2" type="text"/>
            <label className="text-white p-0 m-0" htmlFor="password"><small>Contraseña</small></label>
            <input type="text" id="password" className="form-control form-control-sm"/>
          </div>
          <div className="buttons mt-3 d-flex justify-content-end">
            <button type="button" className="btn btn-danger">Cancelar</button>
            <button onClick={this.login} type="button" className="btn btn-primary ml-2">Aceptar</button>
          </div>
        </div>
      </div>
    )
  }
}
