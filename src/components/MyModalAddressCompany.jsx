import React, { Component } from 'react'
import {validateInputText} from '../lib/actions'
import $ from 'jquery'

const COUNTRIES = ["", "MEX", "USA", "CAN",]
const STATES = ["", "HGO", "AGUSC", "PUE",]
const CIIIES = ["", "Tulancingo", "Santiago", "Singuilucan"]

const inputStyle = {height:'25px', padding:'1px'}
const emptyAddress = {uid:null, zipCode:"", countryCode:"", governmentCode:"", cityHall:"",
      suburb:"", street:"", externalNumber:"", internalNumber:"", active:false}
const errorsEmpty = {countryCode : "",governmentCode : "",cityHall : "",zipCode : "",suburb : ""}

export default class AddressCompany extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title:"Agregar Dirección", formIsValid:true, action:"create",
      errors: {
        countryCode : "",
        governmentCode : "",
        cityHall : "",
        zipCode : "",
        suburb : ""
      },
      address : {
        uid:null, zipCode:"", countryCode:"", governmentCode:"", cityHall:"",
        suburb:"", street:"", externalNumber:"", internalNumber:"", active:false
      }
    }

    this.handleChangeActive = this.handleChangeActive.bind(this)
    this.handleChangeInputsValidate = this.handleChangeInputsValidate.bind(this)
    this.handleChangeInputs = this.handleChangeInputs.bind(this)
  }

  validateFullForm = () => {
    const errors = this.state.errors
    const nameErrors = Object.getOwnPropertyNames(errors)
    let isValid = true
    nameErrors.forEach(name => {
      if (errors[name] === "is-invalid"){
        isValid = false
      }
    })
    return isValid
  }

  validateInputs= () => {
    let {errors, address} = this.state
    const namesErrors = Object.getOwnPropertyNames(errors)
    namesErrors.forEach(name =>{
      const newErrors = validateInputText(name, address[name], errors)
      this.setState({errors : newErrors})
    })

    return this.validateFullForm()
  }

  pushAddress = () => {
    if (this.validateInputs()){
      this.props.setAddress(this.state.address)
      this.cleanForm()
    }else {
      this.setState({formIsValid:false})
    }
  }

  saveAddress = () => {
    if(this.validateInputs()) {
      this.props.setAddress(this.state.address)
      this.cleanForm()
      $('#addressCompanyFormModal').modal('hide')
    }else {
      this.setState({formIsValid:false})
    }
  }

  cleanForm = () => {
    this.setState({address:emptyAddress, errors:errorsEmpty})
  }

  handleChangeInputs(e) {
    const {name, value} = e.target
    let address = this.state.address
    address[name] = value
    this.setState({address:address})
  }

  handleChangeInputsValidate(e) {
    const {name, value} = e.target
    const errors = this.state.errors
    const newErrors = validateInputText(name, value, errors)
    let address = this.state.address
    address[name] = value
    this.setState({errors:newErrors, address:address})
  }

  handleChangeActive() {
    let address = this.state.address
    let isActive = this.state.address.active
    isActive ? isActive = false : isActive = true
    address.active = isActive
    this.setState({address:address})
  }

  componentDidMount() {
    let titleAddrs = ""
    if(this.props.action === "edit") {
      titleAddrs = "Editar Dirección"
      this.setState({ address:this.props.address })
    }else if(this.props.action === "create"){
      titleAddrs = "Crear Dirección"
    }
    this.setState({ title:titleAddrs })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = ""
    if(nextProps.address !== prevState.address) {
      nextProps.action === "edit" ?
      (
        newState={address:nextProps.address, title:"Editar Dirección"}
      ) : newState={address:emptyAddress, title:"Agregar Dirección"}
      return newState
    }
  }
  

  render() {
    return (
      <div>
        <div className="modal fade" id="addressCompanyFormModal" tabindex="-1" role="dialog"
          aria-labelledby="ModalCompanyAddress" aria-hidden="true" data-backdrop="static" data-keyboard="false" >

          <div className="modal-dialog modal-dialog-centered modal-sm" role="document">

            {/*--------------CONTENT--------------*/}
            <div className="modal-content">

              {/*--------------HEADER--------------*/}
              <div className="modal-header p-1">
                <h5 className="modal-title w-100">
                  {this.state.title}
                  <i onClick={this.pushAddress} className="fas fa-file-import fa-sm mt-1 float-right" style={{color:'#2CAB00', cursor:'pointer'}}></i>
                  <i onClick={this.cleanForm} className="mr-2 fas fa-reply float-right fa-sm mt-1" style={{color: '#006DA0', cursor:'pointer'}}></i>
                </h5>
                <div className="custom-control custom-switch ml-2">
                  <input checked={this.state.address.active} type="checkbox" onChange={this.handleChangeActive}
                    className="custom-control-input custom-control-sm" id="customSwitch1" />
                  <label className="custom-control-label" for="customSwitch1" style={{cursor:'pointer'}}></label>
                </div>
              </div>

              {/*--------------BODY--------------*/}
              <div className="modal-body p-1">

                {/*--------------ALERT-ERROR--------------*/}
                {
                  this.state.formIsValid ? <div></div> : (
                    <div className="alert alert-danger alert-dismissible fade show p-0 m-0" role="alert">
                      <small><strong>¡Error!</strong> Necesitas llenar los campos requeridos</small>
                      <button type="button" className="close m-0 p-0" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  )
                }

                {/*--------------FORM--------------*/}
                <div className="form px-2 py-0">

                  {/*--------------FORM-ROW--------------*/}
                  <div className="form-row">
                    <div className="col-sm">
                      <small htmlFor="country">País<strong style={{color:'red'}}>*</strong></small>
                      <select
                        style={inputStyle}
                        onChange={this.handleChangeInputsValidate}
                        value={this.state.address.countryCode}
                        name="countryCode"
                        className={"form-control form-control-sm "+this.state.errors.countryCode}>
                        {
                          COUNTRIES.map((c, i)=>{
                            return(
                              <option key={i} value={c}>{c}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="col-sm">
                    <small htmlFor="state">Estado<strong style={{color:'red'}}>*</strong></small>
                      <select
                        style={inputStyle}
                        onChange={this.handleChangeInputsValidate}
                        value={this.state.address.governmentCode}
                        name="governmentCode"
                        className={"form-control form-control-sm "+this.state.errors.governmentCode}>
                        {
                          STATES.map((c, i)=>{
                            return(
                              <option key={i} value={c}>{c}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                  </div>

                  {/*--------------FORM-ROW--------------*/}
                  <div className="form-row">
                    <div className="col-sm-8">
                      <small htmlFor="city">Ciudad<strong style={{color:'red'}}>*</strong></small>
                      <select
                        style={inputStyle}
                        onChange={this.handleChangeInputsValidate}
                        value={this.state.address.cityHall}
                        name="cityHall"
                        className={"form-control form-control-sm "+this.state.errors.cityHall}>
                        {
                          CIIIES.map((c, i)=>{
                            return(
                              <option key={i} value={c}>{c}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="col-sm">
                      <small htmlFor="zipCode">Código<strong style={{color:'red'}}>*</strong></small>
                      <input
                        onChange={this.handleChangeInputsValidate}
                        value={this.state.address.zipCode}
                        style={inputStyle}
                        name="zipCode"
                        className={"form-control-sm form-control "+this.state.errors.zipCode}
                        type="text"
                        placeholder="Código Postal"/>
                    </div>
                  </div>

                  {/*--------------FORM-ROW--------------*/}
                  <div className="form-row">
                    <div className="col-sm">
                      <small htmlFor="suburb">Colonia<strong style={{color:'red'}}>*</strong></small>
                      <input 
                        onChange={this.handleChangeInputsValidate}
                        value={this.state.address.suburb}
                        style={inputStyle}
                        name="suburb"
                        className={"form-control-sm form-control "+this.state.errors.suburb}
                        type="text"/>
                    </div>
                  </div>

                  {/*--------------FORM-ROW--------------*/}
                  <div className="form-row">
                    <div className="col-sm">
                      <small htmlFor="street">Calle</small>
                      <input
                        onChange={this.handleChangeInputs}
                        value={this.state.address.street}
                        style={inputStyle}
                        name="street"
                        className="form-control-sm form-control"
                        type="text"/>
                    </div>
                  </div>

                  {/*--------------FORM-ROW--------------*/}
                  <div className="form-row">
                    <div className="col-sm">
                      <small htmlFor="external"># externo</small>
                      <input 
                        onChange={this.handleChangeInputs}
                        value={this.state.address.externalNumber}
                        style={inputStyle}
                        name="externalNumber"
                        className="form-control-sm form-control"
                        type="text"/>
                    </div>
                    <div className="col-sm">
                      <small htmlFor="internal"># interno</small>
                      <input 
                        onChange={this.handleChangeInputs}
                        value={this.state.address.internalNumber}
                        style={inputStyle}
                        name="internalNumber"
                        className="form-control-sm form-control"
                        type="text"/>
                    </div>
                  </div>

                </div>
              </div>
              

              {/*--------------FOOTER--------------*/}
              <div className="modal-footer p-1">
                <button onClick={this.cleanForm} type="button" className="btn btn-dark btn-sm p-1" data-dismiss="modal">Cancelar</button>
                <button onClick={this.saveAddress} type="button" className="btn btn-success btn-sm p-1">Guardar y salir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
