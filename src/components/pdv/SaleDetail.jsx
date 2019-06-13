import React, { Component } from 'react'
import Consumer from '../../store/context'

import { findById } from '../../services/my-api'
import { types } from '../../lib/constants'

const nowrap = {
  overflow : 'hidden',
  whiteSpace : 'nowrap',
  textOverflow : 'ellipsis'
}

export default class SaleDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      product : {
        uid: null, sku : "", name : "", quantity : 0, salePrice : 0, purchasePrice : 0,
        brand : null, images : [], taxes :  []
      },

      detail : {
        uid:null, productUid:"", quantity:0, discount:0, taxes:0, retentions:0,
        localTaxes:0, localRetentions:0, serialResponse:"", detailTax:null
      },

      porcent_discount : 0, total : 0
    }

    this.handleChangeDiscount = this.handleChangeDiscount.bind(this)
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
  }

  getProductInfo = id =>{
    let type = types.PRODUCTS.replace("$X", this.props.company)
    type = type.replace("$Z", this.props.ware)
    findById(type, id).then(res =>{
      this.setState({product : res.data})
      this.calculateTotal()
    }).catch(e => console.log(e))
  }

  handleAddDetail = () => {
    if(this.state.detail.quantity > 0) {
      let {detail} = this.state
      detail.productUid = this.state.product.uid
      this.props.action === "new" ? this.props.setDetail(detail) : this.props.saveDetailEdit(detail)
    }
  }

  calculateTotal = () => {
    this.setState((state) =>{
      return {
        total : (state.product.salePrice-state.detail.discount)*state.detail.quantity
      }
    })
  }

  handleChangeQuantity(e) {
    const pq = this.state.product.quantity
    const {value} = e.target
    if (value <= pq && value >= 1) {
      let detail = this.state.detail
      detail.quantity = value
      this.setState({detail : detail})
      this.calculateTotal()
    }
  }

  handleChangeDiscount(e) {
    const {value} = e.target
    if(value >= 0 && value < 100){
      let {detail, product} = this.state
      detail.discount = (value*product.salePrice)/100
      this.setState({detail : detail, porcent_discount : value})
    }
    this.calculateTotal()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.action === "new") {
      if(nextProps.product !== null){
        this.setState({product : nextProps.product})
      }else{
        this.setState({product : {
          uid: null, sku : "", name : "", quantity : 0, salePrice : 0, purchasePrice : 0,
          brand : null, images : [], taxes :  []
        }})
      }
      this.setState({detail : {
        uid:null, productUid:"", quantity:1, discount:0, taxes:0, retentions:0,
        localTaxes:0, localRetentions:0, serialResponse:"", detailTax:null
      }, porcent_discount : 0})
    }else if(nextProps.action === "edit"){
      this.setState({detail : nextProps.detail, porcent_discount : 0})
      this.getProductInfo(nextProps.detail.productUid)
    }
    this.calculateTotal()
  }
  
  render() {
    let disable = false
    if(this.state.product.uid === null){
      disable = true
    }
    let btn = true
    if(this.state.product.uid !== null){
      btn = false
    }
    return (
      <div className="bg-light rounded p-1 border mr-1 mb-2" style={{maxWidth:'200px', minWidth:'200px'}}>
        <div className="nameProduct" style={nowrap}>{this.state.product.name}</div>
        <div className="productSku">
          <small>{"SKU: "+this.state.product.sku}</small>
        </div>
        <div className="brandProduct">
          <small>Marca: {this.state.product.brand ? this.state.product.brand.name : ""}</small>
        </div>
        <div className="priceProduct">
          <small>{"$ "+this.state.product.salePrice}</small>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="descProduct d-flex flex-column">
              <small>Descuento(%): </small>
              <input min="0" type="number" className="form-control form-control-sm" style={{maxHeight:'22px'}}
                onChange={this.handleChangeDiscount} disabled={disable} value={this.state.porcent_discount} />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="descProduct d-flex flex-column">
              <small>Cantidad: </small>
              <input min="0" type="number" className="form-control form-control-sm" style={{maxHeight:'22px'}}
                disabled={disable} onChange={this.handleChangeQuantity} value={this.state.detail.quantity} />
            </div>
          </div>
        </div>
        <div className="totalDetail">
          <strong>{"Total: $"+this.state.total}</strong>
        </div>
        <div className="imagesProduct text-center pb-2">
        {
          this.state.product.images && this.state.product.images.length >= 1 ?
          (
            <img src={
              "data:"+this.state.product.images[0].contentType+";base64,"+this.state.product.images[0].content
            } width="50px" height="50px"
              alt="img" style={{cursor:'pointer'}} />
          ) : 
          <img src="https://cdn.shopify.com/s/files/1/0652/4821/t/3/assets/no-image.svg?161"
            alt="no_image" width="50px" height="50px" />
        }
        </div>
        <div className="btnAccept">
          <button type="button" className="btn btn-sm btn-block btn-success p-0" disabled={btn}
            onClick={this.handleAddDetail}>
            Guardar en el carrito
          </button>
        </div>
      </div>
    )
  }
}
