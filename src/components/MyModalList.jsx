import React from 'react'

export default function MyModalList(props) {
    return (
      <div className="modal fade" id="mymodallist" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header p-1">
              <h5 className="modal-title mr-auto" id="exampleModalLabel">{props.title}</h5>
            </div>
            <div className="modal-body p-2 text-center">
              {
                props.list ?
                (
                  props.list.map((tax, i) => {
                    return <p key={i}>{tax.description}</p>
                  })
                ) : <small>El producto no contiene impuestos</small>
              }
            </div>
            <div className="modal-footer p-2">
              <button type="button" className="btn btn-success btn-sm" data-dismiss="modal">Listo</button>
            </div>
          </div>
        </div>
      </div>
    )
}
