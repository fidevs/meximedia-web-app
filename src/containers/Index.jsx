import React, { Component } from 'react'

import MyNavBar from '../components/index/MyNavBar'
import ProductsContainer from '../components/index/ProductsContainer'

export default class Index extends Component {
    render() {
        return (
          <div>
            <MyNavBar />

            <div className="jumbotron jumbotron-fluid p-1 mb-2">
              <div className="container text-center">
                <h1 className="display-4">¡Los mejores productos!</h1>
                <p className="lead">
                  La calidad mas alta en todos los productos que necesites la encontraras aqui...
                </p>
              </div>
            </div>

            <ProductsContainer />
            
          </div>
        )
    }
}
