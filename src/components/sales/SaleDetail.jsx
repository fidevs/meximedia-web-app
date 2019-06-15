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
    let type = types.PRODUCTS.replace("$X", "40414a8c-94a9-4130-a50d-627653b10a6a")
    type = type.replace("$Z", "ab45404c-a037-4ba1-a153-aaa6528f85c5")
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
