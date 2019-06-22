import React, { Component } from 'react'
import $ from 'jquery'
import { types } from '../../lib/constants'
import  { findById } from '../../services/my-api'

const styles = {
  height:'23px'
}

export default class ModalChangePass extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      view : 'd-block', viewNew : 'd-none', viewSpiner : 'd-none', pass : '',  passvalid : '',
      newPass : '', newPassVerif : '', newPassValid : ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeNewPass = this.handleChangeNewPass.bind(this)
  }

  changePass = () => {
    const { newPass, newPassValid } = this.state
    if(newPass !== "" && newPassValid === "is-valid"){
      this.setState({
        view : 'd-block', viewNew : 'd-none', viewSpiner : 'd-none', pass : '', 
        passvalid : '', newPass : '', newPassVerif : '', newPassValid : ''
      })
      $('#changepassmodal').modal('hide')
      this.props.setNewPass(newPass)
    }
  }

  handleChangeNewPass(e) {
    const { name, value } = e.target
    const nstate = name === "newPass" ? "newPassVerif" : "newPass"

    this.setState((state) => {
      return {
        newPassValid : value === state[nstate]
        ? "is-valid"
        : "is-invalid",
        [name] : value}
    })
  }

  handleChange(e) {
    if(e.target.name === "pass"){
      if(e.key === "Enter"){
        this.verificatePass()
      }else{
        const { name, value } = e.target
        this.setState({ [name] : value, passvalid : '' })
      }
    }else {
      if(e.key === "Enter") {
        this.changePass()
      }
    }
  }

  verificatePass = () => {
    this.setState({ viewSpiner : 'd-block' })
    const { pass } = this.state
    const id = localStorage.getItem("user")
    findById(types.USERS, id).then(res => {
      res.data.password === pass
      ? this.setState({ view : 'd-none', viewNew : 'd-block', viewSpiner : 'd-none' })
      : this.setState({ viewSpiner : 'd-none', passvalid : 'is-invalid' })
    })
  }
  
  render() {
    return (
      <div className="modal" tabindex="-1" role="dialog" id="changepassmodal" tabindex="-1" aria-labelledby="changepassmodal"
        aria-hidden="true" data-backdrop="static" data-keyboard={false} >
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content p-1">

            <div className="modal-header p-0">
              <h5 className="modal-title text-center">Cambiar contraseña</h5>
            </div>
          
            <div className="modal-body p-0 px-1 pt-1">

              <div className={"passNow "+this.state.view}>
                <label className="m-0"><small>Contraseña actual:</small></label>
                <div className={"spinner-border spinner-border-sm float-right "+this.state.viewSpiner} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <input type="password" name="pass" className={"form-control "+this.state.passvalid} style={styles}
                  value={this.state.pass} onChange={this.handleChange} onKeyPress={this.handleChange}/>
                <div className="invalid-feedback">
                  Contraseña incorrecta
                </div>

                <button type="button" className="btn btn-sm btn-success btn-block mt-1 p-0" style={styles}
                  onClick={this.verificatePass}>
                  Continuar
                </button>
              </div>

              <div className={"new-password "+this.state.viewNew}>
                <label className="m-0"><small>Contraseña nueva:</small></label>
                <input name="newPass" type="password" className="form-control" style={styles} 
                  value={this.state.newPass} onChange={this.handleChangeNewPass}
                />
                <label className="m-0"><small>Confirma la nueva contraseña:</small></label>
                <input name="newPassVerif" type="password" className={"form-control "+this.state.newPassValid} style={styles} 
                  value={this.state.newPassVerif} onChange={this.handleChangeNewPass} onKeyPress={this.handleChange}
                />
                <button type="button" className="btn btn-sm btn-success btn-block mt-1 p-0" style={styles}
                  onClick={this.changePass}>
                  Cambiar Contraseña
                </button>
              </div>
              <button type="button" className="btn btn-sm btn-danger btn-block mt-1 p-0" style={styles}
                  onClick={() => {
                    this.setState({
                      view : 'd-block', viewNew : 'd-none', viewSpiner : 'd-none', pass : '', 
                      passvalid : '', newPass : '', newPassVerif : '', newPassValid : ''
                    })
                    $('#changepassmodal').modal('hide')
                  }}>
                  Cancelar
                </button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
