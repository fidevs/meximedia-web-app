import React from 'react'

export default function ProfileDetails(props) {
  let exist = false
  props.detail ? exist = true : exist = false
  return (
    <div className="profile-details border rounded mr-2 mb-2 bg-light" style={{width:'300px'}}>
      <div className="title_details text-center rounded-top bg-secondary text-white">
        Informaciòn Personal
      </div>
      <div className="container-details py-2 px-1">
        <div className="row w-100 m-0">
          <label><strong style={{fontSize:'15px', lineHeight:1}}>Nombre:</strong></label>
          <input id="profile" name="name" type="text" className="w-100 input_avatar" placeholder="Nombre completo"
            value={ exist ? props.detail.name : "" } onChange={props.change}
          />
        </div>
        <div className="row w-100 m-0 mt-3">
          <label><strong style={{fontSize:'15px', lineHeight:1}}>Email:</strong></label>
          <input id="profile" name="email" type="text" className="w-100 input_avatar" placeholder="Correo electrónico"
            value={ exist ? props.detail.email : "" } onChange={props.change}
          />
        </div>
        <div className="row w-100 m-0 mt-3">
          <label><strong style={{fontSize:'15px', lineHeight:1}}>Teléfono Celular:</strong></label>
          <input id="profile" name="mobilePhone" type="text" className="w-100 input_avatar" placeholder="Número de telefono celular" 
            value={ exist ? props.detail.mobilePhone : "" } onChange={props.change}
          />
        </div>
        <div className="row w-100 m-0 mt-3">
          <label><strong style={{fontSize:'15px', lineHeight:1}}>Teléfono:</strong></label>
          <input id="profile" name="phone" type="text" className="w-100 input_avatar" placeholder="Número de telefono"
            value={ exist ? props.detail.phone : "" } onChange={props.change}
          />
        </div>
      </div>
    </div>
  )
}