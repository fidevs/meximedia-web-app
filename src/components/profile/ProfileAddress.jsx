import React from 'react'
import SimpleBar from 'simplebar-react'

import '../../css/profile/profile_address.css'

export default function ProfileAddress(props) {
  return (
    <div className="profile-address border rounded bg-light mb-2" style={{width:'320px'}}>
      <div className="title_details text-center rounded-top bg-secondary text-white">
        Direcciones registradas
        <i className="fas fa-plus float-right mr-2 mt-1" style={{cursor:'pointer'}}
          onClick={props.addAddress}></i>
      </div>
      <SimpleBar className="container_address p-2" style={{maxHeight:'300px', maxWidth:'320px'}}>
        {
          props.address && props.address.map((item, i) => {
            return(
              <Address adrs={item} change={props.change} idx={i}
                changeCheckActive={props.changeCheckActive} changeCheckDefault={props.changeCheckDefault}
                delete={props.delete} />
            )
          })
        }
      </SimpleBar>
    </div>
  )
}

const COUNTRIES = ["", "MEX", "USA", "CAN",]
const STATES = ["", "HGO", "AGUSC", "PUE",]

function Address(props) {
  return(
    <div className="item_address pb-2 mb-2" style={{borderBottom:'1px solid #000000'}}>
  
      <div className="mb-2">
        Calle:
        <input id={props.idx} name="street" type="text" className="input_address_profile w-75 ml-2" style={{height:'23px'}}
          placeholder="Nombre de la calle" value={props.adrs.street} onChange={props.change} />
        <i id={props.idx} className="fas fa-trash-alt ml-2 text-danger" style={{cursor:'pointer'}}
          onClick={props.delete}></i>
      </div>

      <div className="mb-4">
        Ciudad:
        <input id={props.idx} name="city" type="text" className="input_address_profile w-75 float-right" style={{height:'23px'}}
          placeholder="Nombre de la ciudad" value={props.adrs.city} onChange={props.change} />
      </div>

      <div className="mb-1 d-flex flex-inline justify-content-between">
        <div>
          <label htmlFor=""><small>País</small></label>
          <div>
            <select id={props.idx} name="countryCode" className="custom-select p-0 pr-4" style={{height:'23px', width:'100px'}}
              value={props.adrs.countryCode} onChange={props.change} >
            {
              COUNTRIES.map((c, i) => {
                return <option key={i} value={c}>{c}</option>
              })
            }
            </select>
          </div>
        </div>
        <div>
          <label htmlFor=""><small>Estado</small></label>
          <div>
            <select id={props.idx} name="governmentCode" className="custom-select p-0 pr-4" style={{height:'23px', width:'100px'}}
              value={props.adrs.governmentCode} onChange={props.change} >
            {
              STATES.map((s, i) => {
                return <option key={i} value={s}>{s}</option>
              })
            }
            </select>
          </div>
        </div>
        <div>
          <label htmlFor=""><small>CP</small></label>
          <div>
            <input id={props.idx} name="zipCode" type="text" className="input_address_profile p-0 pr-4" style={{height:'23px', width:'100px'}}
              value={props.adrs.zipCode} onChange={props.change}/>
          </div>
        </div>
      </div>
      <div className="d-flex flex-inline justify-content-around mt-4">
        <div>
          <div># externo</div>
          <input id={props.idx} name="externalNumber" type="text" className="form-control p-0 pr-4" style={{height:'23px', width:'100px'}}
            value={props.adrs.externalNumber} onChange={props.change} />
        </div>
        <div>
          <div># interno</div>
          <input id={props.idx} name="internalNumber" type="text" className="form-control p-0 pr-4" style={{height:'23px', width:'100px'}}
            value={props.adrs.internalNumber} onChange={props.change} />
        </div>
      </div>
      <div class="custom-control custom-switch mt-3">
        <input id={props.idx} name="isDefault" type="checkbox" class="custom-control-input"
          checked={props.adrs.isDefault} />
        <label id={props.idx} name="isDefault" class="custom-control-label" style={{cursor:'pointer'}}
          onClick={props.changeCheckDefault}>
          <small>Direcciòn por defecto</small>
        </label>
      </div>
      <div className="mt-2 d-flex flex-inline justify-content-end">
        <div className="ml-2 custom-control custom-switch">
          <input id={props.idx} name="active" type="checkbox" class="custom-control-input"
            checked={props.adrs.active} />
          <label id={props.idx} name="active" class="custom-control-label" style={{cursor:'pointer'}}
            onClick={props.changeCheckActive}>Activa</label>
        </div>
      </div>
    </div>
  )
}