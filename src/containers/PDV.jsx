import React, { Component } from 'react'
import SimpleBar from 'simplebar-react'
import Sidebar from '../components/Sidebar'
import PDVForm from '../components/pdv/PDVForm'
import Products from '../components/products/Products'
import Sales from '../components/sales/Sales'
import { Redirect } from 'react-router-dom'

import { findById } from '../services/my-api'
import { types } from '../lib/constants'

import '../css/pdv/pdv.css'

export default class PDV extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wsize : "", companyid : null, username : "", role : "", companyName : "", view : "pdv", ware : "ab45404c-a037-4ba1-a153-aaa6528f85c5"
    }

    this.handleDisplaySize = this.handleDisplaySize.bind(this)
    this.handleChangeMenu = this.handleChangeMenu.bind(this)
  }

  handleChangeMenu(e) {
    this.setState({view : e.target.id})
  }

  getUserRole = (user) => {
    findById(types.ROLES, user.userRoleId).then(res => {
      this.setState({role : res.data.name, username : user.username})
    })
  }

  getInfoProfile = (company) =>{
    const user = localStorage.getItem("user")
    findById(types.USERS, user).then(res =>{
      this.getUserRole(res.data)
    }).catch(er => console.log(er))
    findById(types.COMPANIES, company).then(res => {
      this.setState({companyName : res.data.name})
    })
  }

  handleDisplaySize(side) {
    const w = window.screen.width
    const size = w - parseInt(side)
    this.setState({wsize : size})
  }

  componentDidMount() {
    const w = window.screen.width
    this.setState({wsize : w-200})
    const { match: { params } } = this.props
    this.setState({companyid:params.companyid})
    this.getInfoProfile(params.companyid)
  }
  

  render() {
    if(!localStorage.getItem("user")) {
      return <Redirect to="/index/login"/>
    }
    if(this.state.companyid){
      return (
        <div className="d-flex">
          <Sidebar handleActive={this.handleDisplaySize} username={this.state.username} role={this.state.role}
            changeMenu={this.handleChangeMenu} />
          <SimpleBar className="display-main-pdv flex-fill" style={{maxWidth:+this.state.wsize+"px"}}>
            {
              this.state.view === "pdv" ?
              (
                <PDVForm company={this.state.companyid} ware={this.state.ware} />
              ) : this.state.view === "stock" ?
              (
                <Products title={this.state.companyName} company={this.state.companyid} ware={this.state.ware} /> 
              ) : this.state.view === "crop" ?
              (
                <Sales company={this.state.companyid} />
              ) : null
            }
          </SimpleBar>
        </div>
      )
    }else {
      return null
    }
  }
}
