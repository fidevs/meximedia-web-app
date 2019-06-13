import React, { Component } from 'react'

export default class Slogan extends Component {
  render() {
    return (
      <div>
        <div className="slogan text-center mt-5">
          <h1 className="text-light text-wrap">{this.props.slogan}</h1>
          <h2 className="text-wrap mt-5 text_info">{this.props.sentence}</h2>
        </div>
      </div>
    )
  }
}
