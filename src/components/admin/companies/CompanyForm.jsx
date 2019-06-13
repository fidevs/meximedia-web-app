import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import SimpleBar from 'simplebar-react'

export default function CompanyForm(props) {
  return (
    <div className="bg-light rounded d-inline mr-2 mb-2" style={{minWidth: '350px', maxWidth: '350px'}}>
      <form className="px-3 pb-2 pt-1" >

        <div className="area mb-2">

          <b>Datos de la Compañia <strong style={{color:'red'}}>*</strong></b>
          <hr className="m-0 mb-1"/>

          {
            props.isValid ? <div></div> : (
              <div className="alert alert-danger alert-dismissible fade show p-0" role="alert">
                <strong className="ml-1">¡Error!</strong> Completa los campos requeridos
                <button type="button" className="close m-0 p-0" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )
          }

          <div>
            <div className="form-group row mb-1">
              <label for="companyname" className="col-sm-3 col-form-label col-form-label-sm">
                Nombre<strong style={{color:'red'}}>*</strong>
              </label>
              <div className="col-sm-9">
                <input
                  name="name"
                  type="text"
                  className={"form-control form-control-sm "+props.errors.name}
                  placeholder="Nombre"
                  onChange={props.handleChangeValidateInput}
                  value={props.name} />
              </div>
            </div>

            <div className="form-group row mb-1">
              <label for="companyrfc" className="col-sm-3 col-form-label col-form-label-sm">
                RFC<strong style={{color:'red'}}>*</strong>
              </label>
              <div className="col-sm-9">
                <input
                  name="rfc"
                  type="text"
                  className={"form-control form-control-sm "+props.errors.rfc}
                  placeholder="Registro Federal de Contribuyentes"
                  onChange={props.handleChangeValidateInput}
                  value={props.rfc} />
              </div>
            </div>

            <div className="form-group row mb-1">
              <label for="companyphone" className="col-sm-3 col-form-label col-form-label-sm">
                Teléfono<strong style={{color:'red'}}>*</strong>
              </label>
              <div className="col-sm-9">
                <input
                  name="phone"
                  type="number"
                  className={"form-control form-control-sm "+props.errors.phone}
                  placeholder="Número celular"
                  onChange={props.handleChangeValidateInput}
                  value={props.phone} />
              </div>
            </div>

            <div className="form-group row mb-1">
              <label className="col-sm-2 col-form-label col-form-label-sm">Fecha</label>
              <div className="col-sm-10">
                <input
                  name="createdDate"
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Date"
                  value={props.date} />
              </div>
            </div>

            <div className="form-group row mb-1">
              <label className="col-sm-2 col-form-label col-form-label-sm">Activa</label>
              <div className="custom-control custom-switch col-sm-4 mt-1">
                <input type="checkbox" id="switchActiveCompany" className="custom-control-input" checked={props.active} onChange={props.handleChangeActive} />
                <label className="custom-control-label" for="switchActiveCompany" style={{cursor:'pointer'}}></label>
              </div>
              <div className="col-sm-6">
                <i className="far fa-image fa-2x" style={{cursor:'pointer', color:'#FFC500'}} onClick={props.showImage} ></i>
                <strong style={{color:'red'}}>*</strong>
              </div>
            </div>

          </div>
        </div>
      </form>

      {
        props.withWares ? (
          <div className="warehouses-company-list m-auto" style={{maxWidth:'250px'}}>
            <div className="header-warehouses-list bg-success p-1 text-center text-white rounded">
            {
              props.id ? (
                <Link to={"/admin/company/"+props.id+"/warehouses/"} style={{textDecoration:'none', color:'#000000'}}>
                  Sucursales
                </Link>
              ) : "Sucursales"
            }
              <i className={"fas fa-plus float-right "+props.dWares} style={{cursor:'pointer'}}></i>
            </div>
            <div className="table-warehouses-list">
              <ListWareouses warehouses={props.wares} />
            </div>
          </div>
        ) : (
          <div></div>
        )
      }
    </div>
  )
}

function ListWareouses(props) {
  if(props.warehouses && props.warehouses.length >= 1) {
    return (
      <SimpleBar style={{maxWidth:'250px', maxHeight:'300px'}}>
        {
          props.warehouses.map(ware => {
            return (
              <ul className="list-group list-group-sm p-1">
                <li className="list-group-item p-1">{ware.name}</li>
              </ul>
            )
          })
        }
      </SimpleBar>
    )
  }else {
    return <small>No hay ninguna Sucursal Registrada</small>
  }
}