import React, { Component } from 'react'

import { findAll } from '../../services/my-api'
import { types } from '../../lib/constants'

const COMPANYID = 'b6a68ee9-0d3e-4561-8bd4-0211ea2c5672'
const WAREHOUSEID = '897e7772-38b7-4c6c-b453-3da9eb209de7'

export default class ProductsContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      products: []
    }
  }

  fetchAllProducts = () => {
    const type = "/company/b6a68ee9-0d3e-4561-8bd4-0211ea2c5672/warehouse/897e7772-38b7-4c6c-b453-3da9eb209de7/products"
    findAll(type).then(res => this.setState({products : res.data}))
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchAllProducts()
  }

    render() {
        return (
            <div className="container px-1 pb-1 bg-light">

              <div className="header-products d-flex flex-inline justify-content-between">
                <h5>Productos</h5>
                <input type="text"
                  className="form-control form-control-sm"
                  style={{maxWidth:'200px'}}
                  placeholder="Buscar producto..."/>
              </div>


              <hr style={{margin:'0', marginTop:'5px'}}/>


              <div className="main-products p-2 d-flex flex-inline flex-wrap">

              {
                this.state.products ? (
                  this.state.products.map((p, i) =>{
                    return(
                      <div className="card shadow ml-2" style={{width:'150px'}}>
                        <div className="card-img-top text-center mt-1" style={{height:'100px'}}>
                          <img src={"data:"+p.images[0].contentType+";base64,"+p.images[0].content}
                            alt="img_product.jpg" width="140px" height="100px"
                            style={{objectFit:'contain', cursor:'pointer'}}/>
                        </div>
                        <div className="card-body p-1">
                          <h6 className="card-title d-block text-center"
                            style={{width:'100%',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>
                            {p.name}
                          </h6>
                          <label className="mb-0 p-0"
                            style={{fontSize:'15px',width:'100%',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>
                            Marca: {p.brand ? p.brand.name : "-"}
                          </label>
                          <label className="mb-0 p-0"
                            style={{fontSize:'15px',width:'100%',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>
                            Precio: <strong>${p.salePrice}</strong>
                          </label>
                          <a href="#" className="btn btn-success btn-block p-0">Al carrito</a>
                        </div>
                      </div>
                    )
                  })
                ) : <div></div>
              }
              </div>
            </div>
        )
    }
}
