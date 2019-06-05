import React, { Component } from 'react'
import axios from 'axios';

import '../css/NewUser.css';

const countryCodes = [{code: "MEX"},{code: "AS"},{code: "EU"},{code: "USA"},{code: "AGO"}]
const statesCode = [{code: "HGO"},{code: "AGU"},{code: "BCN"},{code: "CAM"},{code: "GUA"}]

export default class NewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      city: "",
      postal: "",
      country: "",
      state: "",
      user: "",
      pass: ""
    }
    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    const userApp = {
      username: this.state.user,
      password: this.state.pass,
      active: false,
      userRoleId: "role_uid",
      extraData: [{
        content: "asdfghjklñ"
      }],
      profile: {
        name: this.state.name,
        email: this.state.email
      }
    }
    axios.post('http://localhost:8080/users', userApp)
    .then(result=>{
      console.log(result)
    }).catch(console.log())
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.id;
    const value = target.value;

    this.setState({ [name] : value });
  }

  render() {
    return (
      <div className="box-register mx-auto p-1 px-4 my-5">
        <h3 className="text-light text-center mt-1">Crea tu cuenta personal</h3>
        <hr className="text-light"/>
        <form>
          <div className="form-group">
            <small htmlFor="name">Nombre:</small>
            <input
              type="text"
              className="form-control form-control-sm input"
              id="name"
              placeholder="Ingresa tu nombre"
              onChange={this.handleInputChange}
              value={this.state.name}
              />
          </div>
          <div className="form-group">
            <small htmlFor="email">Correo electrónico:</small>
            <input
              type="email"
              className="form-control form-control-sm inputs"
              id="email"
              placeholder="Ingresa tu Correo Electrónico"
              onChange={this.handleInputChange}
              value={this.state.email}
              />
          </div>
          <div className="form-group">
            <small htmlFor="city">Ciudad:</small>
            <input
              type="text"
              className="form-control form-control-sm inputs"
              id="city"
              placeholder="Ingresa el nombre de tu ciudad"
              onChange={this.handleInputChange}
              value={this.state.city}
              />
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col mins">
                <small htmlFor="postal">C. Postal</small>
                <input
                  type="text"
                  className="form-control form-control-sm inputs"
                  id="postal"
                  placeholder="Código Postal" 
                  onChange={this.handleInputChange}
                  value={this.state.postal}
                  />
              </div>
              <div className="col mins">
                <small htmlFor="country">País</small>
                <select
                  className="form-control form-control-sm inputs"
                  id="country"
                  onChange={this.handleInputChange}>
                  {
                    countryCodes.map((c, i)=>{
                      return(
                        <option key={i} value={c.code}>{c.code}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="col mins">
                <small htmlFor="state">Estado</small>
                <select
                  className="form-control form-control-sm inputs"
                  id="state"
                  onChange={this.handleInputChange}>
                  {
                    statesCode.map((c, i)=>{
                      return(
                        <option key={i} value={c.code}>{c.code}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <small htmlFor="user" >Usuario:</small>
            <input
              type="text"
              className="form-control form-control-sm inputs"
              id="user"
              placeholder="Usuario para ingresar a tu cuenta"
              onChange={this.handleInputChange}
              value={this.state.user}
              />
          </div>
          <div className="form-group">
            <small htmlFor="pass" >Contraseña:</small>
            <input
              type="text"
              className="form-control form-control-sm inputs"
              id="pass"
              placeholder="Crea una contraseña para tu perfil"
              onChange={this.handleInputChange}
              value={this.state.pass}
              />
          </div>
          <div className="form-group">
            <button
            type="button" className="btn btn-primary btn-sm btn-block" onClick={this.onClick}>Aceptar</button>
          </div>
        </form>
      </div>
    )
  }
}