import React from 'react'

export default function ListCompanies(props) {
  return (
    <div className="container-list-companies px-2 bg-light rounded py-1">
      <table className="table table-striped table-sm">
        <thead style={{ background:'#006DA0', color:'#ffffff' }}>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Activa</th>
            <th scope="col">Fecha de Creación</th>
            <th scope="col">RFC</th>
            <th scope="col">Telefóno</th>
            <th scope="col col-sm">
              <i className="fas fa-map-marked-alt"></i>
            </th>
            <th scope="col col-sm">
              <i className="fas fa-warehouse"></i>
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            props.companies.map((company, i) => {
              let wares = 0
              if(company.warehouses)
                wares = company.warehouses.length

              let addrs = 0
              if(company.adressList)
                addrs = company.adressList.length

              let isActive = <i class="fas fa-times text-danger"></i>
              if(company.active)
                isActive = <i className="fas fa-check text-success"></i>
              
              return (
                <tr key={i}>
                  <th>{company.name}</th>
                  <th>{isActive}</th>
                  <th>{company.createdDate}</th>
                  <th>{company.rfc}</th>
                  <th>{company.phone}</th>
                  <th>{addrs}</th>
                  <th>{wares}</th>
                  <th>
                    <i id={i} className="fas fa-sign-out-alt mr-2 text-primary" style={{cursor:'pointer'}}
                      onClick={props.onView}></i>
                    <i id={i} className="fas fa-minus-circle text-danger" style={{cursor:'pointer'}}
                      onClick={props.onDelete}></i>
                  </th>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
