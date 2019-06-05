import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import NavBarConfigs from './NavBarConfigs'
import ListItems from './ListItems'
import TablePermissions from './TablePermissions'
import ListPermissions from './ListPermissions'
import MyMessageModal from './MyMessageModal'
import MyModal from './MyModal'
import { findAll, findById, create, update , deleteById } from '../services/my-api'
import { types } from '../lib/constants'
import $ from 'jquery'

/* ------------------- Component Roles ------------------- */
export default class Roles extends Component {
  constructor(props) {
    super(props)

    this.state = 
    {
      roles: [], selectedRole: {uid: "", name: "", permissions: []}, rolePermissions: [],

      dOptions: "d-none", dPermissions: "d-none", dSave: "d-none",

      message: "", messageType: "", messageTitle: "", actionModal : "",

      modalTitle: "", modalValue: "", modalPlaceholder: ""
    }

    this.handleSelector = this.handleSelector.bind(this)
    this.handleDeletePermission = this.handleDeletePermission.bind(this)
    this.getValueInput = this.getValueInput.bind(this)
    this.handleAddPermission = this.handleAddPermission.bind(this)
  }





/*################ ACTIONS - API ################*/

  //Update role...
  updateRol = (role) => {
    update(types.ROLES, role.uid, role).then(() => {
      this.getAllRoles()
      this.setState({ rolePermissions: [], dPermissions: 'd-none', dSave: 'd-none', dOptions: 'd-none' })
      $('#myModal').modal('hide')
    }).catch(err => console.log(err))
  }

  //Create new Role...
  createRol = (role) => {
    create(types.ROLES, role).then((res) =>{
      this.getAllRoles()
      this.setState({ rolePermissions: [], dPermissions: 'd-none', dSave: 'd-none', dOptions: 'd-none' })
    }).catch(err => console.log(err))
  }
/*###############################################*/




/*################ ACTIONS - MODALS ################*/

  //Save value of input Role Name...
  getValueInput(e) {
    const value = e.target.value
    this.setState({ modalValue : value })
  }

  //Save action Modal...
  handleSaveActionModal = () => {
    const action = this.state.actionModal
    const value = this.state.modalValue
    if(action === "new") {
      if(value !== "") {
        const newRole = {uid: null, name: value, permissions: []}
        let roles = this.state.roles
        roles.push(newRole)
        this.setState({ roles : roles })
        this.changeRoleSelected(newRole)
        $('#mymodalss').modal('toggle')
        this.showBtnSave(true)
      }
    }else if(action === "rename") {
      if(value !== "") {
        const roleExist = this.state.selectedRole
        const permissions = []
        this.state.rolePermissions.forEach((p) => {
          permissions.push(p.uid)
        })
        const roleToSave = {uid:roleExist.uid, name:value, permissions:permissions}
        this.updateRol(roleToSave)
      }
    }
  }

  //Show message Permissions Empty...
  setMessageEmptyPermission = () => {
    this.setState({
      message : "Cada Rol necesita tener por lo menos 1 permiso",
      messageType : "error", messageTitle : "Error de Datos"
    })
    $('#mymodalmessage').modal('toggle')
  }
/*##################################################*/



/*################ ACTIONS - OPTIONS ################*/

  //Refresh Roles...
  refreshRoles = () => {
    const role = {uid:null, name:"", permissions:[]}
    this.changeRoleSelected(role)
    this.getAllRoles()
  }

  //Rename Rol...
  renameRol = () => {
    const role = this.state.selectedRole
    this.setState({ modalTitle : "Renombrar Rol", modalValue : role.name,
      modalPlaceholder : "Role", actionModal : "rename" })
    $('#mymodalss').modal('toggle')
  }

  //Delete rol...
  deleteRol = () => {
    const role = this.state.selectedRole
    deleteById(types.ROLES, role.uid).then((res) =>{
      this.setState({ selectedRole : {uid:"", name:"", permissions:[] } })
      this.getAllRoles()
    }).catch(err => console.log(err))
  }

  //Save changes...
  saveChanges = () => {
    const permissions = this.state.rolePermissions
    if(permissions.length <= 0) {
      this.setMessageEmptyPermission()
    }else {
      const role = this.state.selectedRole
      let permissionsNew = []
      permissions.forEach(p => {
        permissionsNew.push(p.uid)
      })
      const roleToSave = {uid:role.uid, name:role.name, permissions:permissionsNew}

      if(role.uid) {
        this.updateRol(roleToSave)
      }else{
        this.createRol(roleToSave)
      }
    }
  }

  //New Role...
  createNewRol = () => {
    this.setState({ modalTitle : "Crear nuevo Rol", modalValue : "", modalPlaceholder : "Role", actionModal : "new" })
    $('#mymodalss').modal('toggle')
  }
/*###################################################*/




/*################ ACTIONS - DISPLAY ################*/

  //Show button Save...
  showBtnSave(show) {
    let cls = "d-none"
    if(show) {
      cls = "d-inline"
    }
    this.setState({ dSave : cls })
  }
/*###################################################*/




/*################ ACTIONS - PERMISSIONS ################*/

  //Add permission to Role...
  handleAddPermission(e) {
    const idx  = e.target.id
    const permission = this.state.permissions[idx]
    let permissions = this.state.rolePermissions
    
    let exist = permissions.find(p => {
      return p.uid === permission.uid
    })

    if(!exist) {
      permissions.push(permission)
      this.setState({ rolePermissions : permissions, dSave : "d-inline" })
    }
  }

  //Update state Permissions of Selected Role...
  refreshRolePermissions = (permissions) => {
    permissions.forEach(uid => {
      findById(types.PERMISSIONS, uid).then((res) => {
        let permissions = this.state.rolePermissions
        permissions.push(res.data)
        this.setState({ rolePermissions : permissions })
      })
    })
  }

  //Get all Permissions...
  getAllPermissions = () => {
    findAll(types.PERMISSIONS).then(res => {
      this.setState({ permissions : res.data })
    }).catch(err => console.log(err))
  }

  //Delete Permission of Selected Role...
  handleDeletePermission(e) {
    const idx = e.target.id
    let permissions = this.state.rolePermissions
    if(permissions.length > 1) {
      permissions.splice(idx, 1)
      this.setState({ rolePermissions : permissions })
      this.showBtnSave(true)
    }
  }
/*#######################################################*/



/*################### ACTIONS - ROLES ###################*/

  //Get all Roles...
  getAllRoles = () => {
    findAll(types.ROLES).then(res => {
      this.setState({ roles : res.data })
    })
  }

  //Get the Selected Role...
  handleSelector(e) {
    e.preventDefault()
    const idx = e.target.id
    const roles = this.state.roles
    this.changeRoleSelected(roles[idx])
    this.showBtnSave(false)
  }

  //Update state Selected Role...
  changeRoleSelected = (role) => {
    this.setState({ selectedRole : role, rolePermissions : [],
      dOptions : "d-inline", dPermissions : "d-block" })
    this.refreshRolePermissions(role.permissions)
  }
/*#######################################################*/





/*################### Lifecycle ###################*/
  componentDidMount() {
    this.getAllRoles()
    this.getAllPermissions()
  }
/*#################################################*/









  /*----------- RENDER ------------*/
  render() {
    return (
      <Router>
        <MyMessageModal type={this.state.messageType} title={this.state.messageTitle} message={this.state.message} />

        <MyModal title={this.state.modalTitle} value={this.state.modalValue} placeholder={this.state.modalPlaceholder}
                  saveText={this.getValueInput} save={this.handleSaveActionModal} />

        <div className="container-main">

          <NavBarConfigs title="Roles" display={this.state.dOptions} dSave={this.state.dSave}
            onClickNew={this.createNewRol} onClickSave={this.saveChanges} onClickDelete={this.deleteRol}
            onClickEdit={this.renameRol} onClickRefresh={this.refreshRoles} />
          <div className="d-flex flex-inline flex-wrap justify-content-center">

            <ListItems items={this.state.roles} clickSelect={this.handleSelector} />

            <TablePermissions permissions={this.state.rolePermissions} delete={this.handleDeletePermission} title="Rol"
              dAdd="d-none" />

            <ListPermissions permissions={this.state.permissions} display={this.state.dPermissions}
              selectPerm={this.handleAddPermission} />

          </div>
        </div>
      </Router>
    )
  }
}