import React, { Component } from 'react'
import $ from 'jquery'

export default class MyModalCompanyImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      image : {uid:null, name:"", content:"", contentType:""}, isValid : true
    }

    this.handleChangeImage = this.handleChangeImage.bind(this)
  }

  saveImage = () => {
    const img = this.state.image
    if(img.name !== "" && img.content !== "" && img.contentType !== "") {
      this.props.setImage(this.state.image)
      $('#imageCompanyModal').modal('hide')
    }else {
      this.setState({isValid : false})
    }
  }


  readFile = (img) => {
    let reader = new FileReader()
    reader.readAsBinaryString(img)
    reader.onload = () => {
      const imcontent = btoa(reader.result)
      this.setState({
        image:{
          uid:null,
          name:img.name,
          content:imcontent,
          contentType:img.type
        }
      })
    }
  }

  handleChangeImage(e) {
    if(e.target.files[0]) {
      this.readFile(e.target.files[0])
    }
  }

  componentDidMount() {
    if(this.props.image){
      this.setState({image:this.props.image})
    }
  }

  render() {
    return (
      <div>
        <div className="modal fade" id="imageCompanyModal" tabindex="-1" role="dialog"
          aria-labelledby="ModalCompanyImage" aria-hidden="true" data-backdrop="static" data-keyboard="false" >

          <div className="modal-dialog modal-dialog-centered modal-sm" role="document">

            {/*--------------CONTENT--------------*/}
            <div className="modal-content">

              {/*--------------HEADER--------------*/}
              <div className="modal-header p-1">
                <h5 className="modal-title w-100">
                  Imágen de Compañia
                  <i onClick={this.saveImage} className="fas fa-save float-right fa-sm mt-1" style={{color: '#006DA0', cursor:'pointer'}}></i>
                </h5>
              </div>

              {/*--------------BODY--------------*/}
              <div className="modal-body p-1">
                {
                  this.state.isValid ? <div></div> : (
                    <div className="alert alert-danger alert-dismissible fade show p-0" role="alert" id="myalertimage">
                      <strong className="mr-1">¡Error!</strong>Selecciona una imágen
                      <button type="button" className="close p-0 m-0" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  )
                }
                <div className="image-preview border m-2" style={{minHeight:'150px',maxHeight:'150px'}}>
                  <ImagePreview image={this.state.image} />
                </div>
              </div>

              <div className="image-company-name d-flex flex-inline px-2 mt-1">
                <small className="text-nowrap">Nombre de archivo</small>
                <input type="text" disabled className="form-control form-control-sm"
                  style={{height:'25px'}} value={this.state.image.name} />
              </div>

              <div className="button-select-file text-center pt-2">
                <label htmlFor="upImageCompany">
                  <h6 className="p-2 rounded bg-warning text-white" style={{cursor:'pointer'}}>
                    Cargar Imágen
                  </h6>
                </label>
                <input id="upImageCompany" type="file" className="form-control form-control-sm d-none" onChange={this.handleChangeImage} />
              </div>
              
              {/*--------------FOOTER--------------*/}
              <div className="modal-footer p-1">
                <button type="button" className="btn btn-dark btn-sm p-1" data-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function ImagePreview(props) {
  if(props.image.content && props.image.content !== "") {
    return <img
      src={"data:"+props.image.contentType+";base64,"+props.image.content}
      alt="data not found" width="290px" height="140px" className="m-auto" style={{objectFit:'contain'}} />
  }else {
    return <h1 className="text-center">Imágen no disponible</h1>
  }
}

