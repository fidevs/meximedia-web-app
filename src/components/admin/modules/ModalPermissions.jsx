import React from 'react'

export default function ModalPermissions(props) {
  return (
    <div id="mymodalspermissions" className="modal" tabindex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header p-1">
            <h5 className="modal-title">Crear nuevo Permiso</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <label className="m-0" htmlFor="name">Nombre</label>
            <input id="name" className="mb-1 form-control form-control-sm" type="text" placeholder="Nombre del Permiso"
              onChange={props.saveName} value={props.name} />
            <label className="m-0" htmlFor="description">Descripción</label>
            <textarea class="mb-1 form-control" id="description" placeholder="Inserta una descripción para el permiso"
              onChange={props.saveDescription} value={props.desc} ></textarea>
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