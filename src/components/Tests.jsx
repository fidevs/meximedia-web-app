import React, { Component } from 'react'

const OPTIONS_DATE = {year: "numeric", month: "numeric",
  day: "numeric", hour : "2-digit", minute : "2-digit", second : "2-digit"};

export default class Tests extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      details : [
        {quant: 2, prod: "Nombre Producto", price: 120, import: 240},
        {quant: 2, prod: "Nombre Producto", price: 120, import: 240},
        {quant: 2, prod: "Nombre Producto", price: 120, import: 240},
        {quant: 2, prod: "Nombre Producto", price: 120, import: 240},
        {quant: 2, prod: "Nombre Producto", price: 120, import: 240},
        {quant: 2, prod: "Nombre Producto", price: 120, import: 240}
      ]
    }
  }
  

  render() {
    return (
      <div className="ticket border p-1" style={{position : 'absolute'}}>
        <small className="d-block">
          Ticket de compra
        </small>
        <div className="ticket">
          <p className="text-center m-0 t_company_name">
            {/* {this.props.compName} */}
            Meximedia
          </p>

          <p className="text-center m-0 t_address_company"><small>
            {/* {this.props.city+", "+this.props.suburb} */}
            Tulancingo, Centro
          </small></p>

          <p className="t_sale_date"><small className="t_sale_date_sm">
            {/* {new Date(this.props.date).toLocaleString("es-ES", OPTIONS_DATE)} */}
            2019/06/27 10:45:53
          </small></p>

          <table className="table table-sm table-borderless t_sale_table">

            <thead>
              <tr>
                <th><small>#</small></th>
                <th className="pl-2"><small>Detalle</small></th>
                <th className="pl-2"><small>Precio</small></th>
                <th className="pl-2"><small>Importe</small></th>
              </tr>
            </thead>

            <tbody>
              {
                this.state.details.map((d, i)=>{
                  return(
                    <tr key={i}>
                      <th className="t_table_quantity">
                        <small> { d.quant } </small>
                      </th>
                      <th className="t_table_product pl-2">
                        <small> { d.prod } </small>
                      </th>
                      <th className="t_table_price pl-2">
                        <small> { d.price } </small>
                      </th>
                      <th className="t_table_import pl-2">
                        <small> { d.import } </small>
                      </th>
                    </tr>
                  )
                })
              }
              <tr>
                <th></th>
                <th></th>
                <th colSpan="2">
                  <small className="t_table_total">
                    <strong>Total: 2340
                    {/* {"$"+this.props.total} */}
                    </strong>
                  </small>
                </th>
              </tr>
            </tbody>
          </table>
          <p className="text-center t_footer"><small>¡Gracias por su compra!</small></p>
        </div>
      </div>
    )
  }
}
