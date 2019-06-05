import React from 'react'
import SimpleBar from 'simplebar-react'

import '../../css/products.css'

export default function ListProducts(props) {
  if(props.products && props.products.length >= 1) {
    return (
      <SimpleBar  style={{maxHeight:'800px'}}>
        <table className="table table-sm table-striped table-bordered mytable-products">
          <thead className="thead-light">
            <tr>
              <th>NOMBRE</th>
              <th>SKU</th>
              <th>CANTIDAD</th>
              <th>$ COMPRA</th>
              <th>$ VENTA</th>
              <th>MARCA</th>
              <th>IMAGEN</th>
              <th>IMPUESTOS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            props.products.map((p , i) => {
              return(
                <tr key={i}>
                  <th id={i} onClick={props.selectRow}>
                    {p.name}
                  </th>

                  <th id={i} onClick={props.selectRow}>
                    {p.sku}
                  </th>

                  <th id={i} onClick={props.selectRow} className="text-center">
                    {p.quantity}
                  </th>

                  <th id={i} onClick={props.selectRow} className="text-center">
                    {parseFloat(p.purchasePrice)}
                  </th>

                  <th id={i} onClick={props.selectRow} className="text-center">
                    {parseFloat(p.salePrice)}
                  </th>

                  <th id={i} onClick={props.selectRow}>
                    {
                      p.brand ? p.brand.name : ""
                    }
                  </th>

                  <th id={i} onClick={props.selectRow}>
                    {
                      p.images && p.images.length >= 1 ?
                      (
                        <img
                          src={"data:"+p.images[0].contentType+";base64,"+p.images[0].content}
                          alt="Image invalide" width="50px" height="50px"
                          style={{objectFit:'contain'}} />
                      ) : <small>No image</small>
                    }
                  </th>

                  <th id={i} onClick={props.selectRow} className="text-center">
                    {
                      p.taxes && p.taxes.length >= 1 ?
                      p.taxes.length : 0
                    }
                  </th>

                  <th id={i}>
                    <i id={i} className="fas fa-trash text-danger" onClick={props.delete}></i>
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
    return <small className="m-auto text-center">No hay ningún productos registrado</small>
  }
}


