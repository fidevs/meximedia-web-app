import React, { Component } from 'react'
import MultiImages from './MyModalMultiImages'
import { findAll, create } from '../services/my-api'
import { types } from '../lib/constants'
import MyModalList from './MyModalList'

import $ from 'jquery'

import SimpleBar from 'simplebar-react'

export default class FormProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      product :
      {
        uid: null, name: "", sku: "", quantity: 0, salePrice: 0,
        purchasePrice: 0, brand: null, images: [], taxes: []
      },
      brands : [], taxes : [], brandSelected : -1
    }

    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handleChangeSelect = this.handleChangeSelect.bind(this)
    this.handleAddTax = this.handleAddTax.bind(this)
  }

  saveProduct = () => {
    this.props.setProduct(this.state.product)
  }

  handleAddTax(e) {
    const i = e.target.id
    const tax = this.state.taxes[i]
    let product = this.state.product
    product.taxes.push(tax)


  }

  handleChangeSelect(e) {
    const value = e.target.value
    this.setState({ brandSelected : value })
    
    if (value >= 0) {
      let {brands, product} = this.state
      product.brand = brands[value]
      this.setState({product : product})
    }
  }

  handleChangeInput(e) {
    const { name, value } = e.target
    let product = this.state.product
    product[name] = value
    this.setState({ product : product })
  }

  showImages = () => {
    $('#mymodalmultiimages').modal('show')
  }

  getImages = (images) => {
    if (images && images.length >= 1){
      let product = this.state.product
      product.images = images
      this.setState({product:product})
    }
  }

  getBrands = () => {
    const brands = types.BRANDS.replace("$X", this.props.companyid)
    findAll(brands).then(res => this.setState({brands : res.data}))
    .catch(err => console.log(err))
  }

  getTaxes = () => {
    findAll(types.TAXES).then(res => this.setState({ taxes : res.data }))
    .catch(err => console.log(err))
  }

  viewTaxes = () => {
    $('#mymodallist').modal('show')
  }

  componentDidMount() {
    this.getBrands()
    this.getTaxes()
    if (this.props.product)
      this.setState({ product : this.props.product})
  }

  render() {
      return (
        <div className="d-flex flex-inline">

          <MyModalList title="Impuestos del Producto" />

          <div className="bg-light p-2 rounded container-products-form pt-1">
          <MultiImages setImages={this.getImages} images={this.state.product.images} />
            <div className="title-products-form">
              <strong><h5 style={{margin:'0px'}}>Datos del Producto</h5></strong>
              <hr style={{margin:'0px', marginBottom:'5px'}}/>
            </div>
            <div className="form form-products-content px-1">

              <div className="row mb-1">
                <div className="col-sm-4">Nombre:</div>
                <div className="col-sm-8">
                  <input type="text" className="form-control form-control-sm" style={{height:'25px'}}
                    name="name" value={this.state.product.name} onChange={this.handleChangeInput} />
                </div>
              </div>

              <div className="row mb-1">
                <div className="col-sm-4">Código:</div>
                <div className="col-sm-8">
                  <input type="text" className="form-control form-control-sm" style={{height:'25px'}}
                    name="sku" value={this.state.product.sku} onChange={this.handleChangeInput} />
                </div>
              </div>

              <div className="row mb-1">
                <div className="col-sm-4">Cantidad:</div>
                <div className="col-sm-8 d-flex flex-inline">
                  <input type="number" className="form-control form-control-sm" style={{height:'25px'}}
                    name="quantity" value={this.state.product.quantity} onChange={this.handleChangeInput} />
                </div>
              </div>

              <div className="row mb-1">
                <div className="col-sm-4">$compra:</div>
                <div className="col-sm-8 d-flex flex-inline">
                  <input type="number" className="form-control form-control-sm" style={{height:'25px'}}
                    name="purchasePrice" value={this.state.product.purchasePrice} onChange={this.handleChangeInput} />
                </div>
              </div>

              <div className="row mb-1">
                <div className="col-sm-4">$venta:</div>
                <div className="col-sm-8 d-flex flex-inline">
                  <input type="number" className="form-control form-control-sm" style={{height:'25px'}}
                    name="salePrice" value={this.state.product.salePrice} onChange={this.handleChangeInput} />
                </div>
              </div>

              <div className="row mb-1">
                <div className="col-sm-4">Marca:</div>
                <div className="col-sm-8 d-flex flex-inline">
                <select className="custom-select" style={{height:'25px', padding:'0px'}}
                  name="brandSelected" value={this.state.brandSelected} onChange={this.handleChangeSelect} >
                  <option value="-1">Selecciona una opción</option>
                {
                  this.state.brands.map((brand, i)=>{
                    return(
                      <option key={i} value={i}>{brand.name}</option>
                    )
                  })
                }
                </select>
                </div>
              </div>

              <div className="row mb-1">
                <div className="col-sm-4">Imagenes:</div>
                <div className="col-sm-8 d-flex flex-inline">
                  <i className="fas fa-images" style={{cursor:'pointer'}} onClick={this.showImages}></i>
                </div>
              </div>

              <div className="row mb-1">
                <div className="col-sm-4">Impuestos:</div>
                <div className="col-sm-8 d-flex flex-inline">
                  {this.state.product.taxes ? this.state.product.taxes.length : 0}
                  <i className="fas fa-list-alt" style={{cursor:'pointer', marginLeft:'5px'}} onClick={this.viewTaxes}></i>
                </div>
              </div>

              <div className="row mb-1 justify-content-around">
                <button className="btn btn-sm btn-danger" onClick={this.props.close}>Cerrar</button>
                <button className="btn btn-sm btn-success" onClick={this.saveProduct}>Guardar</button>
              </div>

            </div>
          </div>
          <div className="list-taxes ml-2 bg-light p-2 rounded">
            <div className="taxes-list-title text-center">
              <strong>Impuestos</strong>
            </div>
            <SimpleBar style={{width:'100px', maxHeight:'230px'}}>
              {
                this.state.taxes.map((tax, i) =>{
                  return <a id={i} href="#" onClick={this.handleAddTax} style={{textDecoration:'none'}}
                    className="rounded d-block text-center w-100 px-2 bg-dark">
                      {tax.description}</a>
                })
              }
            </SimpleBar>
            <div className="taxes-list-content">
            </div>
          </div>
        </div>
      )
  }
}
