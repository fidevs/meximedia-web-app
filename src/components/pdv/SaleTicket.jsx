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

    findById(types.COMPANY_ADDRESS.replace("$X", sale.tenantUid), "964c9ccc-5795-468d-976a-8507a55058a7")
    .then(res => this.setState({address : res.data}))
    .catch(err => console.log(err))

    let type = types.PRODUCTS.replace("$X", "b6a68ee9-0d3e-4561-8bd4-0211ea2c5672")
    type = type.replace("$Z", "897e7772-38b7-4c6c-b453-3da9eb209de7")
    findAll(type).then(res => this.setState({products : res.data}))
    .catch(err => console.log(err))
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.sale) {
      this.setState({sale : nextProps.sale})
      this.getExtraData(nextProps.sale)
    }
  }


  render() {
    return (
      <div>
        <div className="modal fade" id="mymodaltocket" tabIndex="-1" role="dialog"
          aria-labelledby="mymodaltocket" aria-hidden="true" data-backdrop="static">
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content p-1">

              <small className="d-block">
                Ticket de compra
                <div className="float-right text-danger">
                  <strong style={{cursor:'pointer'}} onClick={this.props.close}>X</strong>
                </div>
              </small>

              <p className="text-center m-0">
                {
                  this.state.company ? this.state.company.name : "Nombre de compañia:"
                }
              </p>

              <p className="text-center m-0"><small>
              {
                this.state.address ? 
                (this.state.address.cityHall+", "+this.state.address.suburb) : "Dirección:"
              }
              </small></p>

              <p><small>Fecha: {this.state.sale ? this.state.sale.dateCreate : ""}</small></p>

              <table className="table table-sm table-borderless">

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
                    this.state.sale && this.state.products && this.state.products.length >= 1 ?
                    (
                      this.state.sale.saleDetail.map((d, i)=>{
                        return(
                          <tr>
                            <th>{d.quantity}</th>
                            <th>
                              <small>
                                {
                                  this.getProductName(d.productUid)
                                }
                              </small>
                            </th>
                            <th>
                              <small>
                                {
                                  this.getProductPrice(d.productUid)
                                }
                              </small>
                            </th>
                            <th>
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
                    <th></th>
                    <th></th>
                    <th>
                      <small>
                        Total: {this.state.sale ? "$"+this.state.sale.total : "$"}
                      </small>
                    </th>
                    <th></th>
                  </tr>
                </tbody>

              </table>

              <p className="text-center"><small>Gracias por su compra</small></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
