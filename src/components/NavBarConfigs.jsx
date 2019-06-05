import React from 'react'

import '../css/NavBarConfigs.css'

export default function NavBarConfigs(props) {
  return (
    <div className="nav-options mb-3 bg-dark rounded-top pt-2 px-5 m-0 d-flex justify-content-between">
      <div className="title">
        <h5 className="text-white">{props.title}</h5>
      </div>
      <div className="state text-light">{props.textState}</div>
      <div className="options">
        <i className={"fas fa-save fa-lg mr-3 "+props.dSave} onClick={props.onClickSave}></i>
        <i className={"far fa-edit fa-lg mr-2 "+props.display} onClick={props.onClickEdit}></i>
        <i className={"far fa-trash-alt fa-lg mr-2 "+props.display} onClick={props.onClickDelete}></i>
        <i className="fas fa-plus fa-lg mr-2" onClick={props.onClickNew}></i>
        <i className="fas fa-sync-alt fa-lg ml-3" onClick={props.onClickRefresh}></i>
      </div>
    </div>
  )
}
