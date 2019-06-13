import React, { Component } from 'react'
import SimpleBar from 'simplebar-react'

import { findById } from '../../services/my-api'
import { types } from '../../lib/constants'

export default class SaleDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      detail : ""
    }
  }

  componentDidMount() {
    let type = types.PRODUCTS.replace("$X", "b6a68ee9-0d3e-4561-8bd4-0211ea2c5672")
    type = type.replace("$Z", "897e7772-38b7-4c6c-b453-3da9eb209de7")
    this.props.details.forEach(detail => {
      findById(type, detail.productUid).then(res =>{
        let {detail} = this.state
        const name = res.data.name
        detail = detail+"* "+name+" \n"
        this.setState({detail : detail})
      }).catch(e => console.log(e))
    });
  }
  
  render(){
    return (
      <SimpleBar style={{maxHeight:'50px', width:'210px'}}>
        <textarea name="areaDetail" cols="30" style={{fontSize : '13px'}} readOnly value={this.state.detail} />
      </SimpleBar>
    )
  }
}
