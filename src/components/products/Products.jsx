import React, { Component } from 'react'
import ListProducts from './ListProducts'
import ProductForm from './ProductsForm'
import NavBarConfigs from '../NavBarConfigs'
import { types } from '../../lib/constants'
import { findAll } from '../../services/my-api'
import $ from 'jquery'
import ModalConfirm from '../mymodals/ModalConfirm'

export default class Products extends Component {
  constructor(props) {
    super(props)

    this.state = {
      textNav : "Todos los productos", companyid : null, wareid : "ab45404c-a037-4ba1-a153-aaa6528f85c5", view : "list",
      products : [], productSel : null, idProd : null, filter : "name"
    }

    this.createNewProduct = this.createNewProduct.bind(this)
    this.handleSelectProduct = this.handleSelectProduct.bind(this)
    this.handleChangeFilter = this.handleChangeFilter.bind(this)
    this.handleChangeSearch = this.handleChangeSearch.bind(this)
  }

  handleChangeSearch(e){
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

  closeForm = () => {
    this.refresh()
    this.setState({view : "list"})
  }

  handleSelectProduct(e) {
    const id = e.target.id
    this.setState((state) =>{
      return {productSel : state.products[id], view : "show"}
    })
  }

  getAllProducts = (id, uid) =>{
    let type = types.PRODUCTS.replace("$X", id)
    type = type.replace("$Z", uid)
    findAll(type).then(res => this.setState({products:res.data}))
    .catch(err => console.log(err))
  }

  refresh = () => {
    this.getAllProducts(this.state.companyid, this.state.wareid)
    this.setState({view : "list"})
  }

  createNewProduct() {
    this.setState({view : "new"})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({companyid : nextProps.company})
    this.getAllProducts(nextProps.company, this.state.wareid)
  }

  componentDidMount() {
    this.setState({companyid : this.props.company})
    this.getAllProducts(this.props.company, this.state.wareid)
    $('#mymodalconfirm').appendTo('body')
  }


  render() {
      return (
        <div>
          <NavBarConfigs title={this.props.title} display="d-none" dSave="d-none" textState={this.state.textNav}
            onClickNew={this.createNewProduct} onClickRefresh={this.refresh} />

          <ModalConfirm title="Eliminar producto"
            message="¿Estas seguro de eliminar este producto?" agree={this.deleteProduct} />

          <div className="container-products px-2">
            {
              this.state.view === "list" ?
                (
                  <ListProducts products={this.state.products} selectRow={this.handleSelectProduct}
                    delete={this.handleDeleteProduct} changeFilter={this.handleChangeFilter}
                    changeSearch={this.handleChangeSearch} filter={this.state.filter} />
                ) :
                (
                  <ProductForm action={this.state.view} product={this.state.productSel} 
                    company={this.state.companyid} close={this.closeForm} ware={this.state.wareid} />
                )
            }
          </div>
        </div>
      )
  }
}