import React, { Component } from 'react'
import { findById, findAll } from '../../services/my-api'
import { types } from '../../lib/constants'

import '../../css/pdv/ticket.css'
import Axios from 'axios'

const OPTIONS_DATE = {year : "numeric", month : "numeric",
  day : "numeric", hour : "2-digit", minute : "2-digit", second : "2-digit"};

export default class SaleTicket extends Component {
  constructor(props) {
    super(props)

    this.state = { sale : null, company : null, address : null, products: [], ready : false, progress : 0 }
  }

  printTicket=()=>{
    window.print()
  }

  getProductName=(id)=>{
    const products = this.state.products
    const product = products.find(p =>{
      return p.uid === id
    })
    return product.name
  }

  getProductPrice=(id)=>{
    const products = this.state.products
    const product = products.find(p =>{
      return p.uid === id
    })
    return product.salePrice
  }

  getExtraData=(sale)=>{
    this.setState({progress : 70})

    let type = types.PRODUCTS.replace("$X", "40414a8c-94a9-4130-a50d-627653b10a6a")
    type = type.replace("$Z", "ab45404c-a037-4ba1-a153-aaa6528f85c5")

    let promises = []
    promises.push(findById(types.COMPANIES, sale.tenantUid))
    promises.push(findById(types.COMPANY_ADDRESS.replace("$X", sale.tenantUid), "e8c96075-6a94-4f21-8948-224858f3226a"))
    
    Axios.all(promises).then(res => {
      this.setState({
        company : res[0].data,
        address : res[1].data,
        progress : 95
      })
      let productsPromises = []
      sale.saleDetail.forEach(det => {
        productsPromises.push(findById(type, det.productUid))
      });

      Axios.all(productsPromises).then(res => {
        let products = []
        res.forEach(result =>{
          products.push(result.data)
        })
        this.setState({products : products, progress : 100, ready : true})
      })

    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.sale) {
      this.setState({sale : nextProps.sale, progress : 40})
      this.getExtraData(nextProps.sale)
    }
  }

  close = () =>{
    window.location.reload()
  }

  printicket = () =>{
    window.print()
  }

  render() {

    let companyName = ""
    let cityAddrs = ""
    let suburbAddrs = ""
    let dateComp = ""
    let totalSale = 0
    if(this.state.ready){
      companyName = this.state.company.name
      cityAddrs = this.state.address.cityHall
      suburbAddrs = this.state.address.suburb
      dateComp = this.state.sale.dateCreate
      totalSale = this.state.sale.total
    }

    return (
      <div className="ticket">
        <div className="modal fade ticket" id="mymodaltocket" tabIndex="-1" role="dialog"
          aria-labelledby="mymodaltocket ticket" aria-hidden="true" data-backdrop="static">
          <div className="modal-dialog ticket" role="document">
            <div className="modal-content p-1 ticket">

              <small className="d-block">
                Ticket de compra
                <div className="float-right text-danger">
                  <strong style={{cursor:'pointer'}} onClick={this.props.close}>X</strong>
                </div>
              </small>
              {
                !this.state.ready && (
                  <div>
                    <div className="progress">
                      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: this.state.progress+'%'}}
                        aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100">Generando ticket {this.state.progress}</div>
                    </div>
                  </div>
                )
              }

              {
                this.state.ready && (
                  <div className="ticket">
                    <p className="text-center m-0 t_company_name">
                      {companyName}
                    </p>

                    <p className="text-center m-0 t_address_company"><small>
                    {cityAddrs+", "+suburbAddrs}
                    </small></p>

                    <p className="t_sale_date"><small className="t_sale_date_sm">
                      {new Date(dateComp).toLocaleString("es-ES", OPTIONS_DATE)}
                    </small></p>

                    <table className="table table-sm table-borderless t_sale_table">

                      <thead>
                        <tr>
                          <th><small>Cant</small></th>
                          <th><small>Producto</small></th>
                          <th><small>Precio</small></th>
                          <th><small>Importe</small></th>
                        </tr>
                      </thead>

                      <tbody>
                        {
                          this.state.sale.saleDetail.map((d, i)=>{

                            let prname = this.getProductName(d.productUid)
                            let prprice = this.getProductPrice(d.productUid)-d.discount
                            let primport = parseFloat(prprice)*d.quantity
                            return(
                              <tr key={i}>
                                <th className="t_table_quantity">{d.quantity}</th>
                                <th className="t_table_product">
                                  <small> { prname } </small>
                                </th>
                                <th className="t_table_price">
                                  <small> { prprice } </small>
                                </th>
                                <th className="t_table_import">
                                  <small> { primport } </small>
                                </th>
                              </tr>
                            )
                          })
                        }
                        <tr>
                          <th></th>
                          <th></th>
                          <th colSpan="2">
                            <small className="t_table_total">
                              <strong>Total: {"$"+totalSale}</strong>
                            </small>
                          </th>
                          <th></th>
                        </tr>
                      </tbody>

                    </table>

                    <p className="text-center t_footer"><small>Gracias por su compra</small></p>
                    
                    <div>
                      <button type="button" className="btn-btn-sm btn-block bg-secondary text-white m-0 mt-1 p-0"
                        onClick={this.printTicket}>
                          Imprimir
                      </button>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
