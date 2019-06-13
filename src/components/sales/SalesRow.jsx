import React, { Component } from 'react'
import SimpleBar from 'simplebar-react'
import SaleDetail from './SaleDetail'

import { findById } from '../../services/my-api'
import { types } from '../../lib/constants'

const OPTIONS_DATE = {weekday: "long", year: "numeric", month: "long", day: "numeric"};

export default class SalesRow extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      seller : null, customer : null
    }
  }

  componentDidMount() {
    findById(types.USERS, this.props.sale.createdBy).then(res =>{
      this.setState({seller : res.data})
    }).catch(e => {
      console.log(e)
      this.setState({seller : null})
    })
    findById(types.USERS, this.props.sale.customerUid).then(res =>{
      this.setState({customer : res.data})
    }).catch(e =>{
      console.log(e)
      this.setState({customer : null})
    })
  }
  
  render() {
    const sale = this.props.sale
    return (
      <tr>
        <th>
          {
            this.state.seller === null ? 
            (
              <div className="seller-options">
                <div className="spinner-border spinner-border-sm text-primary" role="status">
                  <span className="sr-only">Loading seller...</span>
                </div>
              </div>
            ) : this.state.seller.username
          }
        </th>
        <th>
          {
            this.state.customer === null ?
            (
              <div className="customer-options">
                <div className="spinner-border spinner-border-sm text-primary" role="status">
                  <span className="sr-only">Loading customer...</span>
                </div>
              </div>
            ) : this.state.customer.username
          }
        </th>
        <th>{new Date(sale.dateCreate).toLocaleString("es-ES", OPTIONS_DATE)}</th>
        <th>{sale.state}</th>
        <th>${sale.total+sale.discount}</th>
        <th>${sale.discount}</th>
        <th>${sale.total}</th>
        <th>
          <SaleDetail details={sale.saleDetail} />
        </th>
      </tr>
    )
  }
}
