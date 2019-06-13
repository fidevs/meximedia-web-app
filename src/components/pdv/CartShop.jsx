import React, { Component } from 'react'

import { findAll } from '../../services/my-api'
import { types } from '../../lib/constants'

export default class CartShop extends Component {
  constructor(props) {
    super(props);
    
    this.state = {products : []}
  }

  componentWillReceiveProps(nextProps) {
    let type = types.PRODUCTS.replace("$X", nextProps.company)
    type = type.replace("$Z", nextProps.ware)
    findAll(type).then(res => {
      this.setState({products : res.data})
    }).catch(e => console.log(e))
  }
  
  render(){
    return (
      <div className="border pb-1 bg-light rounded" style={{width:'430px'}}>
        <div className="header-cart text-center rounded-top bg-danger text-white">
          Carrito de compras
        </div>
        <div className="cart-body px-1">
          <div className="header-list-cart d-flex flex-inline border-bottom">
            <div className="col-header text-center border-right" style={{width:'37%'}}>
              <strong>Producto</strong>
            </div>
            <div className="col-header text-center border-right" style={{width:'15%'}}>
              <strong>#</strong>
            </div>
            <div className="col-header text-center border-right" style={{width:'20%'}}>
              <strong>$ c/u</strong>
            </div>
            <div className="col-header text-center border-right" style={{width:'23%'}}>
              <strong>$ Total</strong>
            </div>
            <div className="col-header text-center" style={{width:'5%'}}></div>
          </div>
          <div className="body-list-cart">
          {
            this.props.details && this.props.details.length >= 1 ?
            (
              this.props.details.map((detail, i) => {
                if(this.state.products && this.state.products.length >= 1) {
                  const theProduct = this.state.products.find(prod =>{
                    return prod.uid === detail.productUid
                  })
                  return (
                    <div key={i} id={i} className="col-table-cart d-flex flex-inline border-bottom" style={{cursor:'pointer'}}>
                      <div id={i} className="row-table-cart text-center border-right" style={{width:'37%'}}
                        onClick={this.props.editProductDetail} >
                        { theProduct.name }
                      </div>
                      <div id={i} className="row-table-cart text-center border-right" style={{width:'15%'}}
                        onClick={this.props.editProductDetail} >
                        {detail.quantity}
                      </div>
                      <div id={i} className="row-table-cart text-center border-right" style={{width:'20%'}}
                        onClick={this.props.editProductDetail} >
                        { theProduct.salePrice }
                      </div>
                      <div id={i} className="row-table-cart text-center border-right" style={{width:'23%'}}
                        onClick={this.props.editProductDetail} >
                        { (theProduct.salePrice-detail.discount)*detail.quantity }
                      </div>
                      <div className="row-table-cart text-center" style={{width:'5%'}}>
                        <i id={i} className="fas fa-cart-arrow-down text-danger" onClick={this.props.deleteProductFromCart}></i>
                      </div>
                    </div>
                  )
                }else {
                  return null
                }
              })
            ) : <small className="d-block text-center">Selecciona algun producto para agregarlo al carrito</small>
          }
          {
            this.props.total && this.props.total !== 0 ?
            (
              <div className="col-table-cart d-flex flex-inline border-bottom">
                <div className="row-table-cart border-right" style={{width:'72%'}}>
                <small><strong>Total:</strong></small>
                </div>
                <div className="row-table-cart text-center" style={{width:'28%'}}>
                  <small>${this.props.total}</small>
                </div>
              </div>
            ) : null
          }
          </div>
        </div>
      </div>
    )
  }
}