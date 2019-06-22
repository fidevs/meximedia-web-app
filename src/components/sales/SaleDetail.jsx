import React, { Component } from 'react'
import SimpleBar from 'simplebar-react'

import { findById } from '../../services/my-api'
import { types, CID, WID } from '../../lib/constants'

export default class SaleDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      detail : ""
    }
  }

  componentDidMount() {
    let type = types.PRODUCTS.replace("$X", CID)
    type = type.replace("$Z", WID)
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
