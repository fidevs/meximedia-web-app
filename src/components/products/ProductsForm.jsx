import React, { Component } from 'react'
import { findAll, create, update } from '../../services/my-api';
import { types } from '../../lib/constants';
import MultiImages from '../mymodals/MyModalMultiImages'
import $ from 'jquery'

export default class ProductsForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      product : {
        uid:null, name:"", sku:"", quantity:0, purchasePrice:0,
        salePrice:0, brand:{uid:""}, images:[], taxes:[]
      },
      brands : [], alertMessage : "", dOptions : "" , alertType:"primary",
      images : [], viewImages : false
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

  formIsValid = () =>{
    const {product} = this.state
    if(product.name !== ""){
      return true
    }else {
      return false
    }
  }

  saveChanges = () =>{
    if(this.formIsValid()) {
      this.setState({dOptions : "d-none"})
      let type = types.PRODUCTS.replace("$X", this.props.company)
      type = type.replace("$Z", this.props.ware)
      if(this.props.action === "new") {
        create(type, this.state.product)
        .then(res =>{
          console.log(res.data)
          this.setState({dOptions : "", alertMessage: "¡El producto se creo correctamente!", alertType : "success"})
          this.cleanForm()
        }).catch(err => {
          console.log(err)
          this.setState({dOptions : "", alertMessage: "¡Ocurrio un error con el registro!", alertType : "danger"})
        })
      }else if(this.props.action === "show") {
        update(type, this.state.product.uid, this.state.product).then(res =>{
          console.log(res.data)
          this.setState({dOptions : "", alertMessage: "¡El producto fue actualizado correctamente!", alertType : "success"})
        }).catch(err => {
          console.log(err)
          this.setState({dOptions : "", alertMessage: "¡Ocurrio un error en la actualización!", alertType : "danger"})
        })
      }
    }else{
      this.setState({dOptions : "", alertMessage: "Asegurate de llenar los campos requeridos", alertType : "danger"})
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
    let {product} = this.state
    product.images = images
    this.setState({product : product, images : [], viewImages : false})
  }

  viewImages = () =>{
    this.setState((state) =>{
      return{images : state.product.images, viewImages : true}
    })
  }

  getAllBrands = () => {
    findAll(types.BRANDS.replace("$X", this.props.company))
    .then(res => this.setState({brands : res.data}))
    .catch(err => console.log(err))
  }

  closeAlert = () =>{
    this.setState({alertMessage : ""})
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.action === "new") {
      this.cleanForm()
    } else if(nextProps.action === "show"){
      this.setState({product : nextProps.product})
    }
    this.getAllBrands()
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
    const product = this.state.product
    return (
      <div className="m-auto d-flex flex-inline">
        <div className="form-products-container bg-light border rounded shadow w-50 m-auto mr-2">
          <div className="product-title px-1 d-flex flex-inline justify-content-between">
            {
              this.props.action === "show" ? <h5>Datos del producto</h5> : <h5>Registrar nuevo producto</h5>
            }
            <div className="title-options">
            {
              this.state.dOptions === "d-none" ? 
              (
                <div className="spinner-border spinner-border-sm text-secondary mr-2" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : null
            }
              <i className={"fas fa-save fa-lg mt-1 text-primary "+this.state.dOptions}
                style={{cursor:'pointer'}} onClick={this.saveChanges}></i>
              <i className={"fas fa-times fa-lg mt-1 text-danger ml-2 "+this.state.dOptions}
                style={{cursor:'pointer'}} onClick={this.props.close}></i>
            </div>
          </div>
          <hr className="m-0 text-dark mb-1"/>
          <div className="products-body">

            {
              this.state.alertMessage === "" ? null :
              (
                <div className={"alert alert-"+this.state.alertType+" alert-dismissible fade show p-0"} role="alert">
                  <strong>{this.state.alertMessage}</strong>
                  <button type="button" className="close m-0 p-0" aria-label="Close" onClick={this.closeAlert}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )
            }

            <div className="row px-2">

              <div className="col-sm-6">
                <div className="form-group">
                  <label for="name" className="m-0">Nombre <strong className="text-danger">*</strong></label>
                  <input name="name" type="text" className="form-control form-control-sm" id="name"
                    onChange={this.handleChangeInputs} placeholder="Nombre del producto"
                    value={
                      product && product.name !== null ?
                      (product.name) : ""
                    } />
                </div>
              </div>
              
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="code" className="m-0">SKU</label>
                  <input name="sku" type="text" className="form-control form-control-sm" id="code"
                    onChange={this.handleChangeInputs} placeholder="Código del producto"
                      value={
                        product && product.sku ? product.sku : ""
                      } />
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
                  <label for="name" className="m-0">Marca <strong className="text-danger">*</strong></label>
                  {
                    this.state.product.brand ?
                    (
                      <select value={this.state.product.brand.uid} className="form-control form-control-sm"
                        onChange={this.handleChangeBrand}>
                        <option value="">Selecciona una opción</option>
                        {
                          this.state.brands.length >= 1 ? 
                          (
                            this.state.brands.map((brand, i) =>{
                              return <option key={i} value={brand.uid}>{brand.name}</option>
                            })
                          ) : null
                        }
                      </select>
                    ) : null
                  }
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

        {
          this.state.viewImages ? (<MultiImages images={this.state.images} setImages={this.getImages} />) : null
        }

      </div>
    )
  }
}
