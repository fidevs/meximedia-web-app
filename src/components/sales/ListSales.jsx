import SimpleBar from 'simplebar-react'
import { findById } from '../../services/my-api'
import { types } from '../../lib/constants'
import React, { Component } from 'react'

export default class ListSales extends Component {

  findName=(props) =>{
    const promise = findById(types.USERS, props)
    return promise.then(r => r.data.username)
  }

  render() {
    if(this.props.sales && this.props.sales.length >= 1) {
      return(
        <SimpleBar  style={{maxHeight:'800px'}}>
          <table className="table table-sm table-striped table-bordered mytable-products">
            <thead className="thead-light">
              <tr>
                <th>VENDEDOR</th>
                <th>FECHA</th>
                <th>TOTAL $</th>
                <th>ESTADO</th>
                <th>CLIENTE</th>
                <th># PRODUCTOS</th>
              </tr>
            </thead>
            <tbody>
            {
              this.props.sales.map((sale, i) =>{
                return(
                  <tr key={i}>
                    <th id={i} onClick={this.props.select} >
                      Nombre de Vendedor
                    </th>
  
                    <th id={i} onClick={this.props.select} >
                      {
                        sale.dateCreate
                      }
                    </th>
  
                    <th id={i} onClick={this.props.select} >$
                      {
                        sale.total
                      }
                    </th>
  
                    <th id={i} onClick={this.props.select} >
                      {
                        sale.state
                      }
                    </th>
  
                    <th id={i} onClick={this.props.select} >
                      Nombre del cliente
                    </th>
                    <th id={i} onClick={this.props.select} >
                      {
                        sale.saleDetail ? sale.saleDetail.length : 0
                      }
                    </th>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </SimpleBar>
      )
    }else {
      return <small>Aun no has registrado ninguna venta</small>
    }
  }
}

function findName(props) {
  findById(types.USERS, props)
  .then(res =>{
    return res.data.username
  }).catch(err => console.log(err))
}