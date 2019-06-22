import React from 'react'
import SimpleBar from 'simplebar-react'

import '../../css/products/products.css'

export default function ListProducts(props) {
    return (
      <div>
        <div className="search-filter-products p-1 px-5 mb-1
          rounded bg-secondary text-white d-flex flex-inline">
          Busqueda filtrada:
          <select value={props.filter} className="ml-2 form-control form-control-sm pt-0 pl-0"
            style={{height:'25px', width:'120px'}} onChange={props.changeFilter}>
            <option value="name">Nombre</option>
            <option value="sku">Código (sku)</option>
            <option value="brand">Marca</option>
          </select>
          <input type="text" className="form-control form-control-sm w-25 ml-2" style={{height:'25px'}}
            onChange={props.changeSearch}  />
        </div>
        <SimpleBar  style={{maxHeight:'800px'}}>
          <table className="table table-sm table-hover table-bordered mytable-products">
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
              </tr>
            </thead>
            <tbody>
            {
              props.products && props.products.length >= 1 ?
              (
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
                            alt="invalid data" width="50px" height="50px"
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
                  </tr>
                )
              })
              ) : <small className="m-auto text-center">No hay ningún productos registrado</small>
            }
            </tbody>
          </table>
        </SimpleBar>
      </div>
    )
}


