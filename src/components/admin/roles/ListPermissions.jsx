import React from 'react'
import SimpleBar from 'simplebar-react'

import '../../../css/admin/roles/ListPermissions.css'

function List(props) {
  if(!props.permissions || props.permissions.length <= 0) {
    return <small>No hay permisos disponibles</small>
  }else {
    return(
      <SimpleBar style={{ maxHeight: '320px', minWidth : '170px' }}>
        {
          props.permissions.map((perm, i) => {
            return(
              <li key={i} className="list-group-item permission-item p-0">
                <small className="p-0">
                  <i id={i}
                    className="fas fa-chevron-circle-left fa-lg mr-1"
                    onClick={props.onclick} ></i>
                  <b>{perm.name+": "}</b>
                  {perm.description}
                </small>

              </li>
            )
          })
        }
      </SimpleBar>
    )
  }
}

export default function ListPermissions(props) {
  return (
    <div className={"mb-2 "+props.display}>
      <ul className="list-group p-0">
        <li className="list-group-item p-1 active">Permisos</li>
        <List permissions={props.permissions} onclick={props.selectPerm} />
      </ul>
    </div>
  )
}
