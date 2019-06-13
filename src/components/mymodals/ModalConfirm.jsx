import React from 'react'

import '../../css/modals.css'

export default function ModalConfirm(props) {
  return (
    <div className="modal fade" id="mymodalconfirm" tabIndex="-1" role="dialog"
      aria-labelledby="modalConfirm" aria-hidden="true" data-backdrop="static">
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header p-1">
            <h5 className="modal-title mr-auto" id="exampleModalLabel">{props.title}</h5>
          </div>
          <div className="modal-body p-2 text-center">
            {props.message}
          </div>
          <div className="modal-footer p-2">
            <button type="button" className="btn btn-danger btn-sm"
              data-dismiss="modal">
                Cancelar
            </button>
            <button type="button" className="btn btn-success btn-sm"
              data-dismiss="modal" onClick={props.agree}>
                Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
