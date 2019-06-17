import React, { Component } from 'react'
import { findById, findAll } from '../../services/my-api'
import { types } from '../../lib/constants'
import '../../css/pdv/ticket.css'

export default class SaleTicket extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sale : null, company : null, address : null, products: []
    }
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
      <div className="ticket_media_print">
        <div className="modal fade ticket_media_print" id="mymodaltocket" tabIndex="-1" role="dialog"
          aria-labelledby="mymodaltocket" aria-hidden="true" data-backdrop="static">
          <div className="modal-dialog modal-sm ticket_media_print m-0" role="document">
            <div className="modal-content p-1 ticket_media_print">

              <small className="d-block ticket_media_print">
                Ticket de compra
                <div className="float-right text-danger">
                  <strong style={{cursor:'pointer'}} onClick={this.props.close}>
                    X
                  </strong>
                </div>
              </small>

              <p className="text-center m-0 ticket_media_print">
                {
                  this.state.company ? this.state.company.name : "Nombre de compañia:"
                }
              </p>

              <p className="text-center m-0 ticket_media_print"><small>
              {
                this.state.address ? 
                (this.state.address.cityHall+", "+this.state.address.suburb) : "Dirección:"
              }
              </small></p>

              <p className="ticket_media_print">
                <small className="ticket_media_print">
                  Fecha: {this.state.sale ? this.state.sale.dateCreate : ""}
                </small>
              </p>

              <table className="table table-sm table-borderless ticket_media_print">

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
                          <tr className="ticket_media_print">
                            <th className="ticket_media_print">{d.quantity}</th>
                            <th className="ticket_media_print">
                              <small>
                                {
                                  this.getProductName(d.productUid)
                                }
                              </small>
                            </th>
                            <th className="ticket_media_print">
                              <small>
                                {
                                  this.getProductPrice(d.productUid)
                                }
                              </small>
                            </th>
                            <th className="ticket_media_print">
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
                    <th className="ticket_media_print">
                      <small>
                        Total: {this.state.sale ? "$"+this.state.sale.total : "$"}
                      </small>
                    </th>
                    <th className="ticket_media_print"></th>
                  </tr>
                </tbody>

              </table>

              <p className="text-center ticket_media_print"><small>Gracias por su compra</small></p>
              <button onClick={this.printicket} className="btnPRINT">Imprimir</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
