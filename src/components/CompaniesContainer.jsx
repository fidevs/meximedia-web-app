import React, { Component } from 'react'
import Container from './ContainerComponents'
import Form from './AddressForm'
import WarehouseView  from './WarehouseView'

export default class CompaniesContainer extends Component {
  render() {
    return (
      <div className="d-flex flex-inline flex-wrap">
        <Container/>
        <Form />
        <WarehouseView />
      </div>
    )
  }
}
