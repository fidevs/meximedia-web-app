import React, { Component } from 'react'
import { login } from '../../services/oauth'
import CryptoJS from 'crypto-js'
import { findAll } from '../../services/my-api'
import { types } from '../../lib/constants'
import  { Redirect } from 'react-router-dom'

import '../../css/home/Login.css'

export default class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      username : "", password : "", message : "Datos de usuario incorrectos",
      errorView : "d-none", alertType : "danger"
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.key === "Enter" && this.login()
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name] : value })
  }

  closeAlert = () => {
    this.setState({errorView : "d-none"})
  }

  login = () => {
    // let cif = CryptoJS.Rabbit.encrypt("Hola", "key")
    // console.log(CryptoJS.Rabbit.decrypt(cif, "key"))
    // login("default-sr","password")
    let type = types.LOGIN.replace("$X", this.state.username)
    type = type.replace("$Z", this.state.password)
    findAll(type).then(res => {
      console.log(res.data)
      this.setState({ message : "¡Usuario encontrado!", alertType : "success", errorView : "" })
      localStorage.setItem("user", res.data.id)
      // return <Redirect to={"/pdv/"+res.data.tenantId} /> **No Funciona**
      this.props.history.replace("/pdv/"+res.data.tenantId)
      window.location.reload(true);
    })
    .catch(err => {
      console.log(err)
      this.setState({ message : "Datos de usuario incorrectos", alertType : "danger", errorView : "" })
    })
  }

  render() {
    return (
      <div className="login-container">
        <div className="box-login m-auto px-4 py-1">
          <h4 className="login-header rounded-top w-100 m-auto text-center">Iniciar Sesión</h4>
          <hr className="p-0 m-0 mb-3 mt-1" />

          <div role="alert"
            className={"alert alert-"+this.state.alertType+" alert-dismissible fade show p-0 m-0 "+this.state.errorView}>
            {this.state.message}
            <button type="button" className="close p-0" onClick={this.closeAlert}>
              <span aria-hidden="true">&times;</span>
            </button>       
          </div>

          <div className="login-form">
            <label className="text-white p-0 m-0" htmlFor="username"><small>Usuario</small></label>
            <input name="username" value={this.state.username} onChange={this.handleChange}
              className="form-control form-control-sm mb-2" type="text"/>
            <label className="text-white p-0 m-0" htmlFor="password"><small>Contraseña</small></label>
            <input type="password" value={this.state.password} onChange={this.handleChange}
              name="password" className="form-control form-control-sm" onKeyPress={this.handleSubmit}/>
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
