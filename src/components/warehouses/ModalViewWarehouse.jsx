import React, { Component } from 'react'
import SimpleBar from 'simplebar-react'
import $ from 'jquery'

import { textOver, types } from "../../lib/constants";
import { findById, create, update } from '../../services/my-api'

export default class ViewWares extends Component {
  constructor(props) {
    super(props)

    this.state = {
      warehouse : {uid:null, name:'', address:null},
      label : "",
      addressList: []
    }

    this.changeName = this.changeName.bind(this)
    this.handleSelectAddress = this.handleSelectAddress.bind(this)
  }

  saveWarehouse = ()=> {
    const type = types.WAREHOUSES.replace("$X", this.props.company)
    if(this.props.action === "new") {
      create(type,this.state.warehouse)
      .then(res => {
        this.props.refreshWarehouses()
        $('#mymodalviewware').modal('hide')
      }).catch(this.cleanWarehouse())
    }else if(this.props.action === "show") {
      update(type,this.state.warehouse.uid, this.state.warehouse)
      .then(r => {
        this.props.refreshWarehouses()
        $('#mymodalviewware').modal('hide')
      }).catch(this.cleanWarehouse())
    }
  }

  cleanWarehouse = () => {
    this.setState({warehouse : {uid:null, name:'', address:null}})
    this.getAllAddress()
  }

  handleSelectAddress(e) {
    const id = e.target.id
    let ware = this.state.warehouse
    ware.address = this.state.addressList[id]
    this.setState({warehouse : ware})
  }

  changeName(e) {
    let ware = this.state.warehouse
    ware.name = e.target.value
    this.setState({warehouse : ware})
  }

  mapWarehouseInState = (ware) => {
    const warehouse = {
      uid:ware.uid,
      name: ware.name,
      address: ware.address
    }
    this.setState({warehouse : warehouse})
  }

  getAllAddress = () => {
    findById(types.COMPANIES, this.props.company)
    .then(res => this.setState({addressList : res.data.adressList}))
    .catch(err => console.log(err))
  }

  cancel = () => {
    this.setState({warehouse : {uid:null, name:"", address:null}})
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.ware){
      this.setState({warehouse : nextProps.ware, label:"Ver datos de sucursal"})
    }else {
      this.setState({warehouse : {uid:null, name:"", address:null}})
    }
  }

  componentDidMount() {
    let label = "Crear nueva Sucursal"
    if(this.props.ware) {
      this.mapWarehouseInState(this.props.ware)
      label = "Ver datos de sucursal"
    }
    this.setState({label : label})
    this.getAllAddress()
  }

  render() {
    return (
      <div className="modal fade" id="mymodalviewware" tabIndex="-1" role="dialog"
        aria-labelledby="mymodalviewware" aria-hidden="true" data-backdrop="static">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header p-1">
              <h5 className="modal-title mr-auto" id="mymodalviewware" style={textOver}>
                {this.state.warehouse.name}
              </h5>
              <small>{this.state.label}</small>
            </div>
            <div className="modal-body p-2 text-center">
              <div className="row">

                <div className="col-sm-5">
                  <label htmlFor="wareName" className="m-0">Nombre</label>
                  <input id="wareName" type="text" value={this.state.warehouse.name}
                    className="form-control form-control-sm" style={{height:'25px'}} onChange={this.changeName} />
                  <hr className="m-0 mb-1"/>

                  <label className="m-0">Dirección </label>

                  <AddressForm address={this.state.warehouse.address} />

                </div>

                
                  <div className="col-sm-7 px-2">
                    <SimpleBar style={{maxHeight:'300px'}}>
                      <div className="title-address bg-primary rounded text-white mb-1">Direcciones</div>
                      {
                        this.state.addressList && this.state.addressList.length >= 1 ?
                        (
                          this.state.addressList.map((adr, i) =>{
                            return(
                              <div key={i}>
                                <label className="btn btn-success btn-block btn-sm p-0">
                                  <label id={i} onClick={this.handleSelectAddress} style={{cursor:'pointer', margin:'0px'}}>
                                    {adr.cityHall+", "+adr.suburb}
                                  </label>
                                  <a href={"#collAdrs"+i} data-toggle="collapse" aria-controls={"collAdrs"+i} onClick={this.viewAddress}
                                    className="text-dark">
                                    <i className="fas fa-sort-down fa-lg float-right mr-2"></i>
                                  </a>
                                </label>
                                <div className="collapse px-2" id={"collAdrs"+i}>
                                  <AddressForm address={adr} />
                                </div>
                              </div>
                            )
                          })
                        ): <small>Aun no tienes direcciones registradas</small>
                      }
                    </SimpleBar>
                  </div>
              </div>
            </div>
            <div className="modal-footer p-2">
              <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal" onClick={this.cancel}>Cancelar</button>
              <button type="button" className="btn btn-success btn-sm" onClick={this.saveWarehouse}>Listo</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function AddressForm(props) {
  if(props.address) {
    return(
      <div>
        <div className="row text-nowrap px-2">
          <small style={textOver}>
            <strong>Ciudad:</strong> {props.address.cityHall}
          </small>
        </div>
        <div className="row text-nowrap px-2">
          <small style={textOver}>
            <strong>Colonia:</strong> {props.address.suburb}
          </small>
        </div>
        <div className="row text-nowrap px-2">
          <small style={textOver}>
            <strong>Calle:</strong> {props.address.street}
          </small>
        </div>
        <div className="row text-nowrap px-2">
          <small style={textOver}>
            <strong>Estado:</strong> {props.address.governmentCode}
          </small>
        </div>
        <div className="row text-nowrap px-2">
          <small style={textOver}>
            <strong>País:</strong> {props.address.countryCode}
          </small>
        </div>
        <div className="row text-nowrap px-2">
          <small style={textOver}>
            <strong>Código Postal:</strong> {props.address.zipCode}
          </small>
        </div>
        <div className="row text-nowrap px-2">
          <small style={textOver}>
            <strong>Número externo:</strong> {props.address.externalNumber}
          </small>
        </div>
        <div className="row text-nowrap px-2">
          <small style={textOver}>
            <strong>Número interno:</strong> {props.address.internalNumber}
          </small>
        </div>
      </div>
    )
  }else {
    return (
      <small>Seleccióna una direccion de la lista</small>
    )
  }
}
