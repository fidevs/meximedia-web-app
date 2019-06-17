import React, { Component } from 'react'
import NavBarConfigs from '../../NavBarConfigs'
import ViewWares from './ModalViewWarehouse'
import ModalConfirm from '../../mymodals/ModalConfirm'
import { types, textOver } from '../../../lib/constants'
import { findAll, deleteById } from '../../../services/my-api'
import $ from 'jquery'


export default class Warehouses extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      companyid : null, warehouses : null, dOptions: 'd-none', dSave: 'd-none', stateNav: 'Todas las sucursales',
      action: "new", idW: null, warehouseSelected: null, showModal:false,
      titleConfirm : "Eliminar Sucursal", messageConfirm : "¿Estas seguro de eliminar esta Sucursal?"
    }

    this.handleDeleteWarehouse = this.handleDeleteWarehouse.bind(this)
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleShowProducts = this.handleShowProducts.bind(this)
  }

  handleShowProducts(e){
    const id = this.state.warehouses[e.target.id].uid
    this.props.history.push("/admin/company/"+this.state.companyid+"/warehouses/"+id+"/products")
  }

  handleShowModal(e) {
    const ware = this.state.warehouses[e.target.id]
    this.setState({warehouseSelected:ware, action:"show"})
    $('#mymodalviewware').modal('show')
  }

  deleteWarehouse = () => {
    const type = types.WAREHOUSES.replace("$X", this.state.companyid)
    deleteById(type, this.state.idW).then(this.refresh())
    .catch(err => console.log(err))
  }

  handleDeleteWarehouse(e) {
    const id = this.state.warehouses[e.target.id].uid
    this.setState({idW : id})
    $('#mymodalconfirm').modal('show')
  }

  refreshAllWarehouses = () => {
    this.refresh()
  }

  refresh = () => {
    this.getAllWarehouses(this.state.companyid)
    this.props.history.push("/admin/company/"+this.state.companyid+"/warehouses/")
  }

  showModal = () => {
    $('#mymodalviewware').modal('show')
  }

  createNewCompany = () => {
    this.setState({action : 'new', warehouseSelected:null})
    this.showModal()
  }

  getAllWarehouses = (id) => {
    let url = types.WAREHOUSES.replace("$X", id)
    findAll(url).then(res => this.setState({warehouses:res.data, showModal: true, idW:null}))
    .catch(error => console.log(error))
  }

  componentDidMount() {
    const { match: { params } } = this.props
    this.setState({ companyid : params.companyid })
    this.getAllWarehouses(params.companyid)
  }

  render() {
    return (
      <div>
        <NavBarConfigs title="Sucursales" display={this.state.dOptions} dSave={this.state.dSave} textState={this.state.stateNav}
          onClickNew={this.createNewCompany} onClickRefresh={this.refresh} onClickSave={this.saveChanges} />

          <ModalConfirm title={this.state.titleConfirm} message={this.state.messageConfirm}
            agree={this.deleteWarehouse} />

          {
            this.state.showModal ? <ViewWares company={this.state.companyid} refreshWarehouses={this.refreshAllWarehouses}
              action={this.state.action} ware={this.state.warehouseSelected} /> : null
          }
          

          <div className="container-warehouses-main d-flex flex-inline flex-wrap justify-content-center">

            <CardWarehouses wares={this.state.warehouses} delete={this.handleDeleteWarehouse}
              show={this.handleShowModal} products={this.handleShowProducts} />

          </div>
      </div>
    )
  }
}

function CardWarehouses(props) {
  if(props.wares && props.wares.length >= 1) {
    return(
      props.wares.map((ware, i) =>{
        return(
          <div key={i} className="warehouse-card p-2 border shadow-sm mr-2 bg-light mt-2" style={{width:'150px', height:'100px'}}>
            <div className="card-title text-nowrap m-0" style={textOver}>
              <strong>{ware.name}</strong>
            </div>
            <div className="card-body p-0 m-0 text-nowrap" style={textOver}>
              <small>
                {
                  ware.address ? (
                    ware.address.suburb+" "+ware.address.cityHall+", "
                    +ware.address.governmentCode+", "+ware.address.countryCode
                    ) : ""
                  
                }
              </small>
            </div>
            <div className="card-footer p-0 m-2">
              <div className="row justify-content-center">
                <div className="colsm-4">
                  <button id={i} type="button" className="btn btn-sm btn-outline-dark py-0" onClick={props.show}>
                    <i id={i} className="fas fa-eye"></i>
                  </button>
                </div>
                <div className="colsm-4">
                  <button id={i} type="button" className="btn btn-sm btn-outline-success py-0" onClick={props.products}>
                    <i id={i} className="fas fa-layer-group"></i>
                  </button>
                </div>
                <div className="colsm-4">
                  <button id={i} type="button" className="btn btn-sm btn-outline-danger py-0" onClick={props.delete}>
                    <i id={i} className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })
    )
  } else return <h4>Aun no tienes ningun almacen registrado</h4>
  
}