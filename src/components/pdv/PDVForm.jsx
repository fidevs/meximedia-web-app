import React, { Component } from 'react'
import ListProducts from './ListProducts'
import SaleDetail from './SaleDetail'
import CartShop from './CartShop'
import MyMessageModal from '../mymodals/MyMessageModal'
import BarActions from './BarActions'
import $ from 'jquery'
import SaleTicket from './SaleTicket'

import { findAll, findById, create } from '../../services/my-api'
import { types, CREATEDBY, CID, CAID, CUSTID } from '../../lib/constants'

import '../../css/pdv/list_products.css'

const NEW_HISTORY = {uid:null, dateCreated:null, createdBy:CREATEDBY, description:"New Sale"}

export default class PDVForm extends Component {
  constructor(props){
    super(props)

    this.state = {products:[], filter : "", productSel : null, detailToEdit : null, action : "new", viewBtn : "d-none",
      sale : {
        uid:null, dateCreate:"", createdBy:CREATEDBY, partialAmount:0, discount:0, total:0, totalTaxes:0,
        totalRetentions:0, totalLocalTaxes:0, totalLocalRetentions:0, isInvoiced:false, state:"Vendida",
        tenantUid:CID, companyAddressUid:CAID,customerUid:CUSTID, saleDetail:[], saleHistory:[]
      }, stateSale : "waiting", total : 0, saleTicket : null
    }
    
    this.handleChangeFilter = this.handleChangeFilter.bind(this)
    this.handleChangeSearch = this.handleChangeSearch.bind(this)
    this.handleSelectProduct = this.handleSelectProduct.bind(this)
    this.getDetail = this.getDetail.bind(this)
    this.handleEditSaleDetail = this.handleEditSaleDetail.bind(this)
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this)
    this.hanldeSaveDetailEditing = this.hanldeSaveDetailEditing.bind(this)
    this.handleRegisterSale = this.handleRegisterSale.bind(this)
  }

  handleRegisterSale() {
    const sale = this.state.sale

    let ttlDiscount = 0
    sale.saleDetail.forEach(detail => {
      ttlDiscount = ttlDiscount+detail.discount
    })
    sale.discount = ttlDiscount

    sale.total = this.state.total

    this.setState({stateSale : "register"})

    sale.saleHistory.push(NEW_HISTORY)
    create(types.SALES, sale).then(res =>{
      this.setState({saleTicket : res.data})
      $('#mymodaltocket').modal('show')
    }).catch(err => console.log(err))
  }

  handleViewBtnSale = () =>{
    this.setState((state) =>{
      if(state.sale.saleDetail.length <= 0){
        return {viewBtn : "d-none"}
      }else{
        return {viewBtn : ""}
      }
    })
  }

  hanldeSaveDetailEditing(detail) {
    let {sale} = this.state

    sale.saleDetail.filter((det, i) => {
      if(det.productUid === detail.productUid)
        sale.saleDetail[i] = detail
    })

    this.calculateTotal(sale)
    this.setState({sale : sale})
    this.handleViewBtnSale()
  }

  handleRemoveProduct(e) {
    let {sale} = this.state
    sale.saleDetail.splice(e.target.id, 1)
    this.calculateTotal(sale)
    this.setState({sale : sale})
    this.handleViewBtnSale()
  }

  handleEditSaleDetail(e) {
    const i = e.target.id
    this.setState((state) =>{
      return {detailToEdit : state.sale.saleDetail[i], action : "edit"}
    })
  }

  existDetailInSale = id => {
    const {sale} = this.state
    const exist = sale.saleDetail.find(det => {
      return det.productUid === id
    })
    
    if(exist === undefined){
      return false
    }else{
      return true
    }
  }

  calculateTotal = (sale) => {
    this.setState({total : 0})
    let type = types.PRODUCTS.replace("$X", this.props.company)
    type = type.replace("$Z", this.props.ware)

    sale.saleDetail.forEach((det) => {
      findById(type, det.productUid).then(res => {
        let sub = (res.data.salePrice - det.discount)*det.quantity
        this.setState((state) =>{
          return{total : state.total+sub}
        })
      }).catch(e => console.log(e))
    })
  }

  getDetail(detail) {
    if(!this.existDetailInSale(detail.productUid)){
      let {sale} = this.state

      sale.saleDetail.push(detail)

      this.calculateTotal(sale)

      this.setState({sale : sale})
    }else {
      $('#mymodalmessage').modal('show')
    }
    this.handleViewBtnSale()
  }

  handleSelectProduct(E) {
    const i = E.target.id
    this.setState((state) =>{
      if(state.products[i].quantity >= 1) {
        return {productSel : state.products[i], action : "new", detailToEdit : null}
      }else{
        return {productSel : null, action : "new", detailToEdit : null}
      }
    })
  }

  handleChangeSearch(e) {
    if (e.target.value === "") {
      this.getAllProducts(this.props.company, this.props.ware)
    }else if(this.state.filter !== ""){
      let type = types.PRODUCTS.replace("$X", this.props.company)
      type = type.replace("$Z", this.props.ware)
      type = type + "/search/"+this.state.filter+"/"+e.target.value
      findAll(type).then(res => this.setState({products : res.data}))
      .catch(er => console.log(er))
    }
  }

  handleChangeFilter(e) {
    this.setState({filter : e.target.value})
  }

  getAllProducts = (company, ware) => {
    let type = types.PRODUCTS.replace("$X", company)
    type = type.replace("$Z", ware)
    findAll(type).then(res => {
      this.setState({products : res.data})
    })
  }

  closeTicket = () => {
    window.location.reload()
  }

  componentWillReceiveProps(nextProps) {
    this.getAllProducts(nextProps.company, nextProps.ware)
  }

  componentDidMount() {
    $('#mymodalmessage').appendTo('body')
    this.getAllProducts(this.props.company, this.props.ware)
    $('#mymodaltocket').appendTo('body')
  }

  render() {
    return (
      <div className="d-flex flex-inline flex-wrap justify-content-around p-2">
      <SaleTicket sale={this.state.saleTicket} close={this.closeTicket} />
      <BarActions display={this.state.viewBtn} state={this.state.stateSale} onClick={this.handleRegisterSale} />
      <MyMessageModal type="danger" title="Producto existente"
        message="El producto ya esta en el carrito, para editarlo seleccionalo desde el apartado del carrito" />
        <ListProducts products={this.state.products} filter={this.state.filter} action={this.state.action}
          changeFilter={this.handleChangeFilter} changeSearch={this.handleChangeSearch}
          selectProduct={this.handleSelectProduct} />

        <SaleDetail product={this.state.productSel} setDetail={this.getDetail} detail={this.state.detailToEdit}
          action={this.state.action} company={this.props.company} ware={this.props.ware}
          saveDetailEdit={this.hanldeSaveDetailEditing} />

        <CartShop details={this.state.sale.saleDetail} company={this.props.company} ware={this.props.ware}
          editProductDetail={this.handleEditSaleDetail} deleteProductFromCart={this.handleRemoveProduct}
          total={this.state.total} />
      </div>
    )
  }
}