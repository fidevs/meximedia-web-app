import React from 'react'

export default function BarActions(props) {
  return (
    <div className="w-100 bg-primary rounded text-white p-1 mb-2 d-flex flex-inline justify-content-around">
      Punto de ventas
      {
        props.state === "waiting" ? 
        (
          <i className={"my-auto fas fa-file-invoice-dollar fa-lg "+props.display}
            style={{cursor:'pointer'}} onClick={props.onClick}></i>
        ) : 
        (
          <small className="my-auto">
            Registrando venta...
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </small>
        )
      }
    </div>
  )
}
