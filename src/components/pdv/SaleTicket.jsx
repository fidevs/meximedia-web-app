import React, { Component } from 'react'
import { findById, findAll } from '../../services/my-api'
import { types } from '../../lib/constants'

import '../../css/pdv/ticket.css'

const OPTIONS_DATE = {year : "numeric", month : "numeric",
  day : "numeric", hour : "2-digit", minute : "2-digit", second : "2-digit"};

export default class SaleTicket extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sale : null, company : null, address : null, products: []
    }
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
    findById(types.COMPANIES, sale.tenantUid)
    .then(res => this.setState({company : res.data}))
    .catch(err => console.log(err))

    findById(types.COMPANY_ADDRESS.replace("$X", sale.tenantUid), "e8c96075-6a94-4f21-8948-224858f3226a")
    .then(res => this.setState({address : res.data}))
    .catch(err => console.log(err))

    let type = types.PRODUCTS.replace("$X", "40414a8c-94a9-4130-a50d-627653b10a6a")
    type = type.replace("$Z", "ab45404c-a037-4ba1-a153-aaa6528f85c5")
    findAll(type).then(res => this.setState({products : res.data}))
    .catch(err => console.log(err))
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.sale) {
      this.setState({sale : nextProps.sale})
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
    return (
      <div className="ticket">
        <div className="modal fade ticket" id="mymodaltocket" tabIndex="-1" role="dialog"
          aria-labelledby="mymodaltocket" aria-hidden="true" data-backdrop="static">
          <div className="modal-dialog ticket" role="document">
            <div className="modal-content p-1 ticket">

              <small className="d-block">
                Ticket de compra
                <div className="float-right text-danger">
                  <strong style={{cursor:'pointer'}} onClick={this.props.close}>X</strong>
                </div>
              </small>

              <p className="text-center m-0 t_company_name">
                {
                  this.state.company ? this.state.company.name : "Nombre de compañia:"
                }
              </p>

              <p className="text-center m-0 t_address_company"><small>
              {
                this.state.address ? 
                (this.state.address.cityHall+", "+this.state.address.suburb) : "Dirección:"
              }
              </small></p>

              <p className="t_sale_date">
                <small className="t_sale_date_sm">{this.state.sale ?
                (
                  new Date(this.state.sale.dateCreate).toLocaleString("es-ES", OPTIONS_DATE)
                ) : ""
                }
              </small></p>

              <table className="table table-sm table-borderless t_sale_table">

                <thead className="ticket_media_print">
                  <tr className="ticket_media_print">
                    <th className="ticket_media_print"><small>Cant</small></th>
                    <th className="ticket_media_print"><small>Producto</small></th>
                    <th className="ticket_media_print"><small>Precio</small></th>
                    <th className="ticket_media_print"><small>Importe</small></th>
                  </tr>
                </thead>

                <tbody className="ticket_media_print">
                  {
                    this.state.sale && this.state.products && this.state.products.length >= 1 ?
                    (
                      this.state.sale.saleDetail.map((d, i)=>{
                        return(
                          <tr>
                            <th className="t_table_quantity">{d.quantity}</th>
                            <th className="t_table_product">
                              <small>
                                {
                                  this.getProductName(d.productUid)
                                }
                              </small>
                            </th>
                            <th className="t_table_price">
                              <small>
                                {
                                  this.getProductPrice(d.productUid)
                                }
                              </small>
                            </th>
                            <th className="t_table_import">
                              <small>
                                {
                                  parseFloat(this.getProductPrice(d.productUid))*d.quantity
                                }
                              </small>
                            </th>
                          </tr>
                        )
                      })
                    ) : null
                  }
                  <tr>
                    <th className="ticket_media_print"></th>
                    <th className="ticket_media_print"></th>
                    <th colSpan="2">
                      <small className="t_table_total">
                        Total: {this.state.sale ? "$"+this.state.sale.total : "$"}
                      </small>
                    </th>
                    <th className="ticket_media_print"></th>
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
          </div>
        </div>
      </div>
    )
  }
}
