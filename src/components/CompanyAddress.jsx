import React from 'react'

const STYLE_ROW = {
  cursor : 'pointer'
}

function ListAddress(props) {
  if(!props.address || props.address.length <= 0) {
    return <small className="text-center">No hay ninguna dirección disponible</small>
  }else {
    return (
      <table className="table table-sm">
        <thead className="thead-dark">
          <tr className="text-center">
            <th scope="col">Código Postal</th>
            <th scope="col">País</th>
            <th scope="col">Estado</th>
            <th scope="col">Ciudad</th>
            <th scope="col">Colonia</th>
            <th scope="col">Calle</th>
            <th scope="col">Activa</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          props.address.map((ad, i) => {
            return (
              <tr className="text-center" key={i}>
                <td id={i} onClick={props.clickColumn} style={STYLE_ROW}>{ad.zipCode}</td>
                <td id={i} onClick={props.clickColumn} style={STYLE_ROW}>{ad.countryCode}</td>
                <td id={i} onClick={props.clickColumn} style={STYLE_ROW}>{ad.governmentCode}</td>
                <td id={i} onClick={props.clickColumn} style={STYLE_ROW}>{ad.cityHall}</td>
                <td id={i} onClick={props.clickColumn} style={STYLE_ROW}>{ad.suburb}</td>
                <td id={i} onClick={props.clickColumn} style={STYLE_ROW}>{ad.street}</td>
                <td id={i} onClick={props.clickColumn} style={STYLE_ROW}>
                  {
                    ad.active ? "Si" : "No"
                  }
                </td>
                <td>
                  <i id={i}
                    className="fas fa-pen-square fa-sm"
                    style={{color:'#008CBC', cursor:'pointer'}}
                    onClick={props.onClickEdit}></i>
                  <i id={i}
                    className="fas fa-trash fa-sm ml-2"
                    style={{color:'#CF0000', cursor:'pointer'}}
                    onClick={props.onClickDelete}></i>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    )
  }
}

export default function CompanyAddress(props) {
    return (
      <div style={{minWidth:'700px'}}>
        <div className="header-address-company bg-success rounded p-1 text-center text-white">
          Direcciones
          <i onClick={props.addAddress} className="fas fa-plus float-right" style={{cursor:'pointer'}}></i>
        </div>
        <div className="table-content-list p-1 bg-light">
          <ListAddress address={props.address} onClickDelete={props.deleteAddress}
            onClickEdit={props.editAddress} clickColumn={props.selectRow} />
        </div>
      </div>
    )
}
