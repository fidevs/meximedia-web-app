import React, { Component } from 'react'

export default class MyModalEditProduct extends Component {
  constructor(props){
    super(props)

    this.state = {
      cant : 0
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleAccept = () =>{
    this.props.accept(this.state.cant)
  }

  handleChange(e) {
    this.setState({cant : e.target.value})
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.detail){
      this.setState({cant : nextProps.detail.quantity})
    }
  }

  render() {
    return (
      <div className="modal fade" id="mymodaleditproduct" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">

            <div className="modal-body p-0 text-center">
              <div className="form-group">
                <label htmlFor="cantprod" className="m-0">Cantidad a agregar:</label>
                <input id="cantprod" type="number" className="form-control form-control-sm m-auto"
                  style={{width:'100px', height:'25px'}} value={this.state.cant} onChange={this.handleChange} />
              </div>
            </div>
            <div className="modal-footer p-2">
              <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-success btn-sm" data-dismiss="modal"
                onClick={this.handleAccept}  >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
