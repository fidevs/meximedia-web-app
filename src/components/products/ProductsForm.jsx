import React, { Component } from 'react'
import { findAll, create, update } from '../../services/my-api';
import { types } from '../../lib/constants';
import MultiImages from '../MyModalMultiImages'
import $ from 'jquery'

export default class ProductsForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      product : {
        uid:null, name:"", sku:"", quantity:0, purchasePrice:0,
        salePrice:0, brand:{uid:""}, images:[], taxes:[]
      },
      brands : []
    }

    this.handleChangeBrand = this.handleChangeBrand.bind(this)
    this.handleChangeInputs = this.handleChangeInputs.bind(this)
  }

  cleanForm = () => {
    this.setState({product : {
      uid:null, name:"", sku:"", quantity:0, purchasePrice:0,
      salePrice:0, brand:{uid:""}, images:[], taxes:[]
    }})
  }

  saveChanges = () =>{
    let type = types.PRODUCTS.replace("$X", this.props.company)
    type = type.replace("$Z", this.props.ware)
    if(this.props.action === "new") {
      create(type, this.state.product)
      .then(res =>{
        console.log(res.data)
        this.cleanForm()
      }).catch(err => console.log(err))
    }else if(this.props.action === "show") {
      update(type, this.state.product.uid, this.state.product).then(res =>{
        console.log(res.data)
        this.props.close()
      }).catch(err => console.log(err))
    }
  }

  handleChangeInputs(e) {
    const {name, value} = e.target
    let product = this.state.product
    product[name] = value
    this.setState({product : product})
  }

  handleChangeBrand(e){
    let { brands, product } = this.state
    if(e.target.value !== ""){
      const value = e.target.value
      const brand = brands.find(brand =>{
        return brand.uid === value
      })
      product.brand = brand
    }else {
      product.brand={brand:{uid:""}}
    }
    this.setState({product:product})
  }

  getImages = (images) =>{
    let product = this.state.product
    product.images = images
    this.setState({product : product})
  }

  viewImages = () =>{
    $('#mymodalmultiimages').modal('show')
  }

  getAllBrands = () => {
    findAll(types.BRANDS.replace("$X", this.props.company))
    .then(res => this.setState({brands : res.data}))
    .catch(err => console.log(err))
  }

  componentDidMount() {
    if(this.props.action === "new") {
      this.cleanForm()
    } else if(this.props.action === "show"){
      this.setState({product : this.props.product})
    }
    this.getAllBrands()
  }


  render() {
    return (
      <div className="m-auto">
        <div className="form-products-container border rounded shadow w-50 m-auto">
          <div className="product-title px-1 d-flex flex-inline justify-content-between">
            {
              this.props.action === "show" ? <h5>Datos del producto</h5> : <h5>Registrar nuevo producto</h5>
            }
            <div className="title-options">
              <i className="fas fa-save fa-lg mt-1 text-primary"
                style={{cursor:'pointer'}} onClick={this.saveChanges}></i>
              <i className="fas fa-times fa-lg mt-1 text-danger ml-2"
                style={{cursor:'pointer'}} onClick={this.props.close}></i>
            </div>
          </div>
          <hr className="m-0 text-dark mb-1"/>
          <div className="products-body">


            <div className="row px-2">

              <div className="col-sm-6">
                <div className="form-group">
                  <label for="name" className="m-0">Nombre</label>
                  <input name="name" type="text" className="form-control form-control-sm" id="name"
                    onChange={this.handleChangeInputs} placeholder="Nombre del producto" value={this.state.product.name} />
                </div>
              </div>
              
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="code" className="m-0">SKU</label>
                  <input name="sku" type="text" className="form-control form-control-sm" id="code"
                    onChange={this.handleChangeInputs} placeholder="Código del producto" value={this.state.product.sku} />
                </div>
              </div>
            </div>


            <div className="row px-2">

              <div className="col-sm-4">
                <div className="form-group">
                  <label for="quant" className="m-0">Cantidad</label>
                  <input name="quantity" type="number" className="form-control form-control-sm" id="quant"
                    onChange={this.handleChangeInputs} value={this.state.product.quantity} />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="form-group">
                  <label for="purchase" className="m-0">$ compra</label>
                  <input name="purchasePrice" type="number" className="form-control form-control-sm" id="purchase"
                    onChange={this.handleChangeInputs} value={this.state.product.purchasePrice} />
                </div>
              </div>
              
              <div className="col-sm-4">
                <div className="form-group">
                  <label for="sale" className="m-0">$ venta</label>
                  <input name="salePrice" type="number" className="form-control form-control-sm" id="sale"
                    onChange={this.handleChangeInputs} value={this.state.product.salePrice} />
                </div>
              </div>
            </div>


            <div className="row px-2">

              <div className="col-sm-6">
                <div className="form-group">
                  <label for="name" className="m-0">Marca</label>
                  <select value={this.state.product.brand.uid} class="form-control form-control-sm"
                    onChange={this.handleChangeBrand}>
                    <option value="">Selecciona una opción</option>
                    {
                      this.state.brands.length >= 1 ? 
                      (
                        this.state.brands.map((brand, i) =>{
                          return <option value={brand.uid}>{brand.name}</option>
                        })
                      ) : null
                    }
                  </select>
                </div>
              </div>
              
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="code" className="m-0">Imagenes</label>
                  <button type="button" className="btn btn-sm btn-block btn-warning" onClick={this.viewImages}>
                    Administrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MultiImages images={this.state.product.images} setImages={this.getImages} />

      </div>
    )
  }
}
