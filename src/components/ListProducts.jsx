import React from 'react'


const STYLE_ROW = {
  cursor : 'pointer'
}

export default function ListProducts(props) {
    return (
        <div className="container-list-products">
          <div className="container-list-products-title text-center">
            Productos
          </div>
          <table className="table table-sm rounded">
            <thead style={{ background:'#006DA0', color:'#ffffff' }}>
              <tr>
                <th>Nombre</th>
                <th>SKU</th>
                <th>Cantidad</th>
                <th>$Compra</th>
                <th>$Venta</th>
                <th>Marca</th>
                <th>Impuestos</th>
                <th>
                  <i className="fas fa-plus"
                    style={{cursor:'pointer'}}
                    onClick={props.addProducts}>
                  </i>
                </th>
              </tr>
            </thead>
            <tbody>
            {
              props.products && props.products.length >= 1 ? (
                props.products.map((prod, i)=>{
                  return(
                    <tr key={i}>
                      <th id={i} onClick={props.showProduct} style={STYLE_ROW}>{prod.name}</th>
                      <th id={i} onClick={props.showProduct} style={STYLE_ROW}>{prod.sku}</th>
                      <th id={i} onClick={props.showProduct} style={STYLE_ROW}>{prod.quantity}</th>
                      <th id={i} onClick={props.showProduct} style={STYLE_ROW}>{prod.purchasePrice}</th>
                      <th id={i} onClick={props.showProduct} style={STYLE_ROW}>{prod.salePrice}</th>
                      <th id={i} onClick={props.showProduct} style={STYLE_ROW}>{prod.brand}</th>
                      <th id={i} onClick={props.showProduct}>
                        {
                          prod.taxes && prod.taxes.length >= 1 ? prod.taxes.length : 0
                        }
                      </th>
                      <th>
                        <i id={i} onClick={props.delete} className="fas fa-trash-alt" style={{cursor:'pointer'}}></i>
                      </th>
                    </tr>
                  )
                })
              ) : <small>No hay ningun producto registrado</small>
            }
            </tbody>
          </table>
        </div>
    )
}
