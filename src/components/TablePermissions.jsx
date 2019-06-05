import React from 'react'
import SimpleBar from 'simplebar-react'

import '../css/TablePermissions.css'

const stylesName = {
  maxWidth: '90px',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

const stylesDesc = {
  maxWidth: '200px',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

function BodyTable(props) {
  if(!props.permissions || props.permissions.length <= 0) {
    return <small>Seleccione un Modulo para ver sus permisos</small>
  }else {
    return(
      props.permissions.map((perm, i) => {
        return(
          <tr key={i}>
            <td style={stylesName}><small><b>{perm.name}</b></small></td>
            <td style={stylesDesc}><small>{perm.description}</small></td>
            <td id={i} onClick={props.delete} className="btn-delete">&times;</td>
          </tr>
        )
      })
    )
  }
}

export default function TablePermissions(props) {

  return (
    <div className="bg-light p-2 mr-3 mb-2" style={{ minWidth : '450px' }}>
      <div className="title-list-permissions text-center border-bottom d-flex flex-inline justify-content-between">
        <h5>Permisos del {props.title}</h5>
        <i className={"fas fa-plus fa-sm mr-2 float-right "+props.dAdd} onClick={props.addPermission}></i>
      </div>
      <SimpleBar style={{ maxHeight: '300px', minWidth: '140px' }}>
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <BodyTable permissions={props.permissions} delete={props.delete} />
          </tbody>
        </table>
      </SimpleBar>
    </div>
  )
}