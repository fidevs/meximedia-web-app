import React, { Component } from 'react'
import SimpleBar from 'simplebar-react'
import { types } from '../../lib/constants'
import { findAll, create } from '../../services/my-api'
import MyMessageModal from '../MyMessageModal'
import $ from 'jquery'
import MyModalAddProduct from '../MyModalAddProduct'
import MyModalEditProduct from '../MyModalEditProduct'
import SaleTicket from './SaleTicket'

const NEW_HISTORY = {uid:null, dateCreated:null, createdBy:"user-uid-seller", description:"New Sale"}

const NEW_SALE = {
  uid:null, dateCreate:"", createdBy:"user-uid-seller", partialAmount:0, discount:0, total:0,
  totalTaxes:0, totalRetentions:0, totalLocalTaxes:0, totalLocalRetentions:0, isInvoiced:false,
  state:"Vendida", tenantUid:"b6a68ee9-0d3e-4561-8bd4-0211ea2c5672", companyAddressUid:"783a807b-b1ed-4fc9-a903-40dc3703cbce",
  customerUid:"user-uid-customer",
  saleDetail:[], saleHistory:[]
}

export default class SalesForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sale : 
      {
        uid:null, dateCreate:"", createdBy:"user-uid-seller", partialAmount:0, discount:0, total:0,
        totalTaxes:0, totalRetentions:0, totalLocalTaxes:0, totalLocalRetentions:0, isInvoiced:false,
        state:"Vendida", tenantUid:"b6a68ee9-0d3e-4561-8bd4-0211ea2c5672", companyAddressUid:"783a807b-b1ed-4fc9-a903-40dc3703cbce",
        customerUid:"user-uid-customer",
        saleDetail:[], saleHistory:[]
      },
      products : [], productSel : null, saleReturn : null, detSel : null
    }

    this.handleAddProductToCart = this.handleAddProductToCart.bind(this)
    this.handlePullProductFromCart = this.handlePullProductFromCart.bind(this)
  }

  selectDetail=(e)=>{
    this.setState({detSel : e.target.id})
    $('#mymodaleditproduct').modal('show')
  }

  registerNewSale=()=>{
    const sale = this.state.sale
    let history = NEW_HISTORY
    sale.saleHistory.push(history)
    create(types.SALES, sale).then(res =>{
      this.setState({saleReturn : res.data})
      $('#mymodaltocket').modal('show')
    }).catch(err => console.log(err))
  }

  handlePullProductFromCart(e) {
    const i = e.target.id
    let sale = this.state.sale
    sale.saleDetail.splice(i, 1)
    this.setState({sale : sale})
    this.totalSale()
  }

  saveChangesProduct=(cant)=>{
    let { sale, detSel } = this.state
    sale.saleDetail[detSel].quantity = cant
    this.setState({sale : sale})
    this.totalSale()
  }

  addProductToDetails=(cant)=>{
   const { sale, productSel } = this.state
   let newDet = {uid:null, productUid:"", quantity:0, discount:0, taxes:0, retentions:0, localTaxes:0,
    localRetentions:0, serialResponse:"", detailTax:null}
   newDet.productUid = productSel.uid
   newDet.quantity = cant
   sale.saleDetail.push(newDet)
   this.setState({sale : sale})
   this.totalSale()
  }

  addProductModal=(i) =>{
    this.setState({productSel : this.state.products[i]})
    $('#mymodaladdproduct').modal('show')
  }

  existProductInDetails=(i)=>{
    const id = this.state.products[i].uid
    const details = this.state.sale.saleDetail
    const exist = details.find(detail=>{
      return detail.productUid === id
    })
    if(exist){
      return true
    }else
      return false
  }

  handleAddProductToCart(e) {
    const i = e.target.id
    if(this.existProductInDetails(i)){
      $('#mymodalmessage').modal('show')
    }else{
      this.addProductModal(i)
    }
  }

  getAllProducts=()=>{
    let type = types.PRODUCTS.replace("$X", "b6a68ee9-0d3e-4561-8bd4-0211ea2c5672")
    type = type.replace("$Z", "897e7772-38b7-4c6c-b453-3da9eb209de7")
    findAll(type).then(res => this.setState({products : res.data}))
  }

  componentDidMount() {
    if(this.props.action === "new") {
      this.setState({sale : NEW_SALE})
    }else if(this.props.action === "show"){
      this.setState({sale : this.props.sale})
    }
    this.getAllProducts()
  }

  totalSale = () =>{
    const {sale, products } = this.state
    let total = 0
    sale.saleDetail.forEach(detail => {
      const product = products.find(p =>{
        return p.uid === detail.productUid
      })
      let importe
      product ? importe = parseFloat(detail.quantity)*parseFloat(product.salePrice) : importe = 0
      total = total+importe
    })
    sale.total = total
    this.setState({sale : sale})
  }

  render() {
    return (
      <div className="d-flex flex-inline flex-wrap">

        <MyMessageModal type="danger" title="Producto existente" message="El producto ya esta en el carrito" />
        <MyModalAddProduct product={this.state.productSel} accept={this.addProductToDetails} />
        <MyModalEditProduct detail={this.state.sale.saleDetail[this.state.detSel]} accept={this.saveChangesProduct} />

        <SaleTicket sale={this.state.saleReturn} />

        <div className="form-sale-container" style={{width:'400px'}}>
          <div className="title-car-shop rounded bg-dark text-center p-1">
            <h5 className="text-white">
              Carrito de Compras
              <i className="fas fa-dollar-sign text-danger float-right" style={{cursor:'pointer'}} onClick={this.registerNewSale}></i>
            </h5>
          </div>
          <div className="list-cars-shop">
            <SimpleBar style={{maxHeight:'700px'}}>
              <table className="table table-sm table-hover">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">#</th>
                    <th scope="col">Total $</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                { 
                  this.state.sale.saleDetail && this.state.sale.saleDetail.length >= 1 ?
                  (
                    this.state.sale.saleDetail.map((d,i) =>{
                      return <Cart key={i} d={d} i={i} products={this.state.products}
                        pullProduct={this.handlePullProductFromCart} selectDetail={this.selectDetail} />
                    })
                  ) : <small>Selecciona un producto para agregar al carrito</small>
                }
                <tr>
                  <th></th>
                  <th>Total:</th>
                  <th>$
                    {this.state.sale.total}
                  </th>
                </tr>
                </tbody>
              </table>
            </SimpleBar>
          </div>
        </div>
        <div className="list-products-sales ml-4" style={{width:'600px'}}>
          <div className="title-list-products p-1 bg-success rounded">
            <h5 className="text-white text-center">Productos</h5>
          </div>
          <div className="list-products">
          <SimpleBar style={{maxHeight:'700px'}}>
            <table className="table table-sm table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">NOMBRE</th>
                  <th scope="col">SKU</th>
                  <th scope="col">PRECIO</th>
                  <th scope="col">MARCA</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
              {
                this.state.products && this.state.products.length >= 1 ?
                (
                  this.state.products.map((p, i) =>{
                    return(
                      <tr key={i}>
                        <th scope="row">{p.name}</th>
                        <th>{p.sku}</th>
                        <th>{parseFloat(p.salePrice)}</th>
                        <th>{p.brand.name}</th>
                        <th>
                          <i id={i} className="fas fa-cart-plus text-success"
                            style={{cursor:'pointer'}} onClick={this.handleAddProductToCart}></i>
                        </th>
                      </tr>
                    )
                  })
                ) : <small>No se encontraron productos</small>
              }
                <tr>
                  <th scope="row"></th>
                </tr>
              </tbody>
            </table>
          </SimpleBar>
          </div>
        </div>
      </div>
    )
  }
}

function Cart(props) {
  if(props.products) {
    const product = props.products.find(p =>{
      return p.uid === props.d.productUid
    })
    return(
      <tr key={props.i} style={{cursor:'pointer'}}>
        <th id={props.i} onClick={props.selectDetail}  scope="row">
          {product.name}
        </th>
        <th id={props.i} onClick={props.selectDetail} >{props.d.quantity ? props.d.quantity : 0 }</th>
        <th id={props.i} onClick={props.selectDetail} >$
          {
            parseFloat(props.d.quantity)*parseFloat(product.salePrice)
          }
        </th>
        <th><i id={props.i} onClick={props.pullProduct} className="fas fa-times text-danger"
          style={{cursor:'pointer'}}></i> </th>
      </tr>
    )
  }
}