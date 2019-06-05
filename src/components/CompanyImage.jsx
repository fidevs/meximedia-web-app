import React from 'react'

function ImagePreview(props) {
  if(props.image) {
    return <img src={props.image} alt="Image invalide" width="290px" height="140px" className="m-auto" />
  }else {
    return <h1 className="text-center">Imágen no disponible</h1>
  }
}

export default function CompanyImage(props) {
  return (
    <div className="rounded bg-light">
      <div className="header-img-company rounded-top p-1" style={{background: '#CDCDCD'}}>
        <b>Imágen</b><strong style={{color:'red'}}>*</strong>
      </div>

      <div className="image-preview border m-2" style={{minWidth:'300px',maxWidth:'300px',minHeight:'150px',maxHeight:'150px'}}>
        <ImagePreview image={props.srcImg} />
      </div>

      <div className="image-company-name d-flex flex-inline px-2 mt-1">
        <small className="text-nowrap">Nombre de archivo</small>
        <input type="text" disabled className="form-control form-control-sm"
          style={{height:'25px'}} value={props.nameImg} />
      </div>

      <div className="button-select-file text-center pt-2">
        <label htmlFor="upImageCompany">
          <h6 className="p-2 rounded bg-warning text-white" style={{cursor:'pointer'}}>
            Cargar Imágen
          </h6>
        </label>
        <input id="upImageCompany" type="file" className="form-control form-control-sm d-none" onChange={props.changeInput} />
      </div>
    </div>
  )
}