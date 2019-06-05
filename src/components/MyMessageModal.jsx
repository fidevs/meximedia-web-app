import React, { Component } from 'react'

function Icons(props) {
  switch (props.type) {
    case "error" :
      return <i className="fas fa-exclamation-circle text-danger mr-2 fa-2x"></i>
      break;
    case "danger" :
      return <i className="fas fa-exclamation-triangle text-warning mr-2 fa-2x"></i>
      break;
    default :
      return <i className="fas fa-exclamation-circle text-danger mr-2 fa-2x"></i>
  }
}

export default class MyMessageModal extends Component {
  render() {
    return (
      <div className="modal fade" id="mymodalmessage" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header p-1">
              <Icons type={this.props.type} />
              <h5 className="modal-title mr-auto" id="exampleModalLabel">{this.props.title}</h5>
            </div>
            <div className="modal-body p-2 text-center">
              {this.props.message}
            </div>
            <div className="modal-footer p-2">
              <button type="button" className="btn btn-warning btn-sm" data-dismiss="modal">Entendido</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
