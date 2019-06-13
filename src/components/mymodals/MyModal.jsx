import React from 'react'

import '../../css/modals.css'

export default function MyModal(props) {
  return (
    <div id="mymodalss" className="modal" tabindex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header p-1">
            <h5 className="modal-title">{props.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input className="form-control form-control-sm" value={props.value}
              type="text" placeholder={"Nombre del "+props.placeholder}
              onChange={props.saveText} />
          </div>
          <div className="modal-footer p-1">
            <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-primary btn-sm" onClick={props.save}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
