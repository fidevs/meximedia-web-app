import React from 'react'

const COUNTRIES = ["MEX", "USA", "CAN",]
const STATES = ["HGO", "AGUSC", "PUE",]
const CIIIES = ["Tulancingo", "Santiago", "Singuilucan"]

export default function Form(props) {
  return (
    <div className="rounded bg-light mr-2 mb-2">
      <div className="headerAddress p-1 rounded-top" style={{background: '#CDCDCD'}}>
        <b>Dirección</b>
        <div className="header-options float-right">
          <i onClick={props.clean} className="fas fa-trash" style={{color: 'red', cursor:'pointer'}}></i>
        </div>
      </div>

      <div className="form px-2 pb-2">
        <div className="form-row">
          <div className="col-sm">
            <small htmlFor="country">País<strong style={{color:'red'}}>*</strong></small>
            <select
              onChange={props.get}
              value={props.p}
              name="country"
              className="form-control form-control-sm"
              id="country">
              {
                COUNTRIES.map((c, i)=>{
                  return(
                    <option key={i} value={c}>{c}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="col-sm">
          <small htmlFor="state">Estado<strong style={{color:'red'}}>*</strong></small>
            <select
              onChange={props.get}
              value={props.e}
              name="government"
              className="form-control form-control-sm"
              id="state">
              {
                STATES.map((c, i)=>{
                  return(
                    <option key={i} value={c}>{c}</option>
                  )
                })
              }
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="col-sm-8">
            <small htmlFor="city">Ciudad<strong style={{color:'red'}}>*</strong></small>
            <select
              onChange={props.get}
              value={props.c}
              name="city"
              className="form-control form-control-sm"
              id="city">
              {
                CIIIES.map((c, i)=>{
                  return(
                    <option key={i} value={c}>{c}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="col-sm">
            <small htmlFor="zipCode">Código<strong style={{color:'red'}}>*</strong></small>
            <input
              onChange={props.get} value={props.cod}
              name="code" className="form-control-sm form-control" type="text" id="zipCode" placeholder="Código Postal"/>
          </div>
        </div>
        <div className="form-row">
          <div className="col-sm">
            <small htmlFor="suburb">Colonia<strong style={{color:'red'}}>*</strong></small>
            <input 
              onChange={props.get} value={props.co}
              name="suburb" className="form-control-sm form-control" type="text" id="suburb"/>
          </div>
        </div>
        <div className="form-row">
          <div className="col-sm">
            <small htmlFor="street">Calle</small>
            <input
            onChange={props.get} value={props.s}
              name="street" className="form-control-sm form-control" type="text" id="street"/>
          </div>
        </div>
        <div className="form-row">
          <div className="col-sm">
            <small htmlFor="external"># externo</small>
            <input 
              onChange={props.get} value={props.ex}
              name="extNumber" className="form-control-sm form-control" type="text" id="external"/>
          </div>
          <div className="col-sm">
            <small htmlFor="internal"># interno</small>
            <input 
              onChange={props.get} value={props.in}
              name="intNumber" className="form-control-sm form-control" type="text" id="internal"/>
          </div>
        </div>
      </div>
    </div>
  )
}
