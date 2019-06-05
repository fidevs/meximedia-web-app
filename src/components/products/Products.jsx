import React, { Component } from 'react'
import ListProducts from './ListProducts'
import ProductForm from './ProductsForm'
import NavBarConfigs from '../NavBarConfigs'
import { types } from '../../lib/constants'
import { findAll, deleteById } from '../../services/my-api'
import $ from 'jquery'
import ModalConfirm from '../ModalConfirm'

export default class Products extends Component {
  constructor(props) {
    super(props)

    this.state = {
      textNav : "Todos los productos", companyid : null, wareid : null, view : "list",
      products : [], productSel : null, idProd : null
    }

    this.createNewProduct = this.createNewProduct.bind(this)
    this.handleSelectProduct = this.handleSelectProduct.bind(this)
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
  }

  closeForm = () => {
    this.refresh()
    this.setState({view : "list"})
  }

  deleteProduct = () =>{
    let type = types.PRODUCTS.replace("$X", this.state.companyid)
    const { products, idProd } =this.state
    type = type.replace("$Z", this.state.wareid)
    deleteById(type, products[idProd].uid).then(res => {
      console.log(res.data)
      this.refresh()
    })
    .catch(err => console.log(err))
  }

  handleDeleteProduct(e) {
    const id = e.target.id
    this.setState({idProd : id})
    $('#mymodalconfirm').modal('show')
  }

  handleSelectProduct(e) {
    const id = e.target.id
    const products = this.state.products
    this.setState({productSel : products[id], view : "show"})
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

  componentDidMount() {
    const { match: { params } } = this.props
    this.setState({companyid:params.companyid, wareid:params.wareid})
    this.getAllProducts(params.companyid, params.wareid)
  }


  render() {
      return (
        <div>
          <NavBarConfigs title="Productos" display="d-none" dSave="d-none" textState={this.state.textNav}
            onClickNew={this.createNewProduct} onClickRefresh={this.refresh} />

          <ModalConfirm title="Eliminar producto"
            message="¿Estas seguro de eliminar este producto?" agree={this.deleteProduct} />

          <div className="container-products px-2">
            {
              this.state.view === "list" ?
                (
                  <ListProducts products={this.state.products} selectRow={this.handleSelectProduct}
                  delete={this.handleDeleteProduct} />
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