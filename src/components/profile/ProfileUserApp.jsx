import React from 'react'
import $ from 'jquery'

import { dateFormat } from '../../lib/constants'

import '../../css/profile/profile_user_app.css'

export default function ProfileUserApp(props) {  
  return (
    <div className="profile-avatar-info border rounded p-1 d-flex flex-column justify-content-around mr-2 bg-light mb-2"
      style={{width:'160px'}}>

      <div className="avatar text-center" style={{position:'relative'}}>
        {
          props.image && props.imageType ?
          (
            <img src={"data:"+props.imageType+";base64,"+props.image} width="100"
              alt="profile avatar" className="rounded-circle"
              style={{objectFit:'contain'}}/>
          ) :
          (
            <img src="https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png" width="100"
              alt="profile avatar" className="rounded-circle"
              style={{objectFit:'contain'}}/>
          )
        }
        <div className="dropdown" style={{position:'absolute', right:'25px', bottom:'5px'}}>
          <div id="dropimgsett" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false" style={{border:'nonde', cursor:'pointer'}}>
            <i className="fas fa-ellipsis-v"></i>
          </div>
          <div className="dropdown-menu dropdown-menu-right p-0" aria-labelledby="dropimgsett">
            <a className="dropdown-item p-0 pl-1" href="#" onClick={()=> {
              $('#upImageProfile').click()
            }}>Subir imagen</a>
            <a className="dropdown-item p-0 pl-1" href="#" onClick={props.deleteImage}>Eliminar</a>
          </div>
        </div>
        <input id="upImageProfile" type="file" className="d-none" accept="image/png, .jpeg, .jpg, image/gif"
          onChange={props.setImageProfile} />
      </div>

      <div className="username mt-1">
        <small className="m-0 p-0 text-primary"><strong>Usuario</strong></small>
        <input name="username" className="input_avatar" type="text" placeholder="Nombre de usuario" value={props.username} 
          onChange={props.setName} />
      </div>

      <a href="#" style={{marginTop:'10px'}} onClick={() => {
        $('#changepassmodal').appendTo('body')
        $('#changepassmodal').modal('show')
      }}>Cambiar Contraseña</a>

      <div className="date_create mt-2">
        <small className="m-0 p-0 text-primary"><strong>Fecha de creación</strong></small>
        <label className="d-block text-center" style={{fontSize:'13px'}}>
          {new Date(props.date).toLocaleString("es-ES", dateFormat)}
        </label>
      </div>

      <div className="role mt-2">
        <small className="m-0 p-0 text-primary"><strong>Rol</strong></small>
        <label className="d-block text-center" style={{fontSize:'13px'}}>{props.role}</label>
      </div>
    </div>
  )
}
