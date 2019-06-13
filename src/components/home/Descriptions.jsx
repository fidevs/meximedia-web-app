import React, { Component } from 'react'

export default class Descriptions extends Component {
  render() {
    return (
      <div className="descriptions mt-5 p-5">
        <div className="row justify-content-around">
          {
              this.props.array.map((data, i) => {
                return (
                  <div className="col-sm-3 boxs" key={i}>
                    <div className="box text-center mb-2 rounded p-2">
                      <div className="box-title text-light text-wrap">
                        <h4>{data.title}</h4>
                      </div>
                      <hr className="text-light mb-4"/>
                      <div className="box-body text-primary text-wrap mb-3">
                        <h6>{data.desc}</h6>
                      </div>
                      <img className="img-fluid" src={data.imgroute} alt="imageNotFound"/>
                    </div>
                  </div>
                )
              })
          }
        </div>
      </div>
    )
  }
}
