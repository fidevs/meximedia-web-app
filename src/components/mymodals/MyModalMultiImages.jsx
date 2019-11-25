import React, { Component } from 'react'
import SimpleBar from 'simplebar-react'

import '../../css/modals.css'

export default class MultiImages extends Component {
  constructor(props){
    super(props)

    this.state = {
      images : [], imgSelected : null, idxSelect : null
    }

    this.handleNewImage = this.handleNewImage.bind(this)
    this.changeImage = this.changeImage.bind(this)
    this.handleSelectImg = this.handleSelectImg.bind(this)
  }

  handleSelectImg(e) {
    const imgSelect = this.state.images[e.target.id]
    this.setState({imgSelected : imgSelect, idxSelect : e.target.id})
  }

  saveImages = () => {
    this.props.setImages(this.state.images)
  }

  changeImage(e) {
    if(e.target.files[0]) {
      const img = e.target.files[0]
      let {images, idxSelect} = this.state
      let reader = new FileReader()
      reader.readAsBinaryString(e.target.files[0])
      reader.onload = () => {
        const imcontent = btoa(reader.result)
        images[idxSelect] = {
          uid: images[idxSelect].uid,
          name : img.name,
          content : imcontent,
          contentType : img.type
        }
        this.setState({images : images, imgSelected : null})
      }
    }
  }

  handleNewImage(e) {
    if(e.target.files[0]) {
      const img = e.target.files[0]
      let images = this.state.images
      let reader = new FileReader()
      reader.readAsBinaryString(e.target.files[0])
      reader.onload = () => {
        const imcontent = btoa(reader.result)
        const newImg = {
          uid : null,
          name : img.name,
          content : imcontent,
          contentType : img.type
        }
        images.push(newImg)
        this.setState({images : images, imgSelected : null})
      }
    }
  }

  componentDidMount() {
    if(this.props.images && this.props.images.length >= 1) {
      this.setState({images : this.props.images})
    }else {
      this.setState({images : []})
    }
  }

  render() {
      return (
        <div className="modal-content" style={{maxWidth:'300px', margin : 'auto'}}>

          <div className="modal-header p-1">
            <h5 className="modal-title mr-auto w-100" id="exampleModalLabel">
              Imagenes del Producto
              <label className="float-right" htmlFor="newImage">
                <i className="fas fa-plus"
                    style={{cursor:'pointer'}}>
                </i>
              </label>
            </h5>
          </div>

          <div className="modal-body p-2 text-center">
            <SimpleBar style={{ height: '200px'}} className="border">
              Imagenes Subidas
              <div className="content-images-products d-flex flex-inline flex-wrap justify-content-center">
                {
                  this.state.images && this.state.images.length >= 1 ?
                  (
                    this.state.images.map((img, i) => {
                    return <ImagePreview image={img} ids={i} selectImg={this.handleSelectImg} />
                  })
                  ) : null
                }
              </div>
            </SimpleBar>
          </div>

          <div className="modal-body p-1 text-center">
            {
              this.state.imgSelected ? 
              (
                <div className="row p-2">
                  <div className="col-sm-8">
                    <input type="text" value={this.state.imgSelected.name} className="form-control form-control-sm"/>
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="changeImage" className="p-1 rounded bg-warning" style={{cursor:'pointer'}}>
                      Cambiar
                    </label>
                  </div>
                </div>
              ) : <small>Selecciona una imagen para ver su nombre</small>
            }
          </div>


          <input id="newImage" type="file" className="form-control form-control-sm d-none" onChange={this.handleNewImage} />
          <input id="changeImage" type="file" className="form-control form-control-sm d-none" onChange={this.changeImage} />

          <div className="modal-footer p-2">
            <button type="button" className="btn btn-block btn-success btn-sm"
              data-dismiss="modal" onClick={this.saveImages}>
                Aceptar
            </button>
          </div>

        </div>
      )
  }
}


function ImagePreview(props) {
  if(props.image.content && props.image.content !== "") {
    return <img
      src={"data:"+props.image.contentType+";base64,"+props.image.content}
      alt="invalide data" width="70px" height="70px" className="ml-1" id={props.ids}
      style={{objectFit:'contain', cursor:'pointer'}} onClick={props.selectImg} />
  }else {
    return <small className="text-center">Imágen no disponible</small>
  }
}