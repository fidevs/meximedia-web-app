import React, { Component } from 'react'
import NavBarConfigs from '../NavBarConfigs'
import ListSales from './ListSales'
import SalesForm from './SalesForm'
import { findAll } from '../../services/my-api'
import { types } from '../../lib/constants'

export default class Sales extends Component {
  constructor(props) {
    super(props)

    this.state = {
      textNav : "Todas las ventas", view : "list",
      sales : [], saleSel : null
    }

    this.handleSelectSale = this.handleSelectSale.bind(this)
  }

  handleSelectSale(e) {
    this.setState({
      saleSel : this.state.sales[e.target.id],
      view : "show",
      textNav : "Detalles de la venta"
    })
  }

  refresh=()=>{
    this.getAllSales()
    this.setState({view : "list", textNav : "Todas las ventas"})
  }

  registerNewSale =()=>{
    this.setState({view : "new", textNav : "Registrar venta nueva"})
  }

  getAllSales=()=>{
    findAll(types.SALES).then(res => this.setState({sales : res.data}))
    .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getAllSales()
  }

  render() {
    return (
      <div>
        <NavBarConfigs title="Ventas" display="d-none" dSave="d-none" textState={this.state.textNav}
            onClickNew={this.registerNewSale} onClickRefresh={this.refresh} />

        <div className="sales-container-main">
        {
          this.state.view === "list" ?  
          (
            <ListSales sales={this.state.sales} select={this.handleSelectSale} />
          ) : 
          (
            <SalesForm action={this.state.view} sale={this.state.saleSel} />
          )
        }
        </div>
      </div>
    )
  }
}
