import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import NavBarConfigs from '../../NavBarConfigs'
import ListItems from '../ListItems'
import TablePermissions from '../TablePermissions'
import MyMessageModal from '../../mymodals/MyMessageModal'
import MyModal from '../../mymodals/MyModal'
import ModalPermissions from './ModalPermissions'
import { findAll, create, update , deleteById } from '../../../services/my-api'
import { types } from '../../../lib/constants'
import $ from 'jquery'

export default class Modules extends Component {
  constructor(props) {
    super(props)

    this.state =
    {
      modules:[], modulePermissions:[], selectedModule:{uid:"",name:"",permissions:[]},
      messageType:"", messageTitle:"", message:"",
      modalTitle:"", modalValue:"", placeholder:"", actionModal : "",
      dOptions:"d-none", dSave:"d-none", namePermission:"", descPermission:""
    }

    this.getValueInput = this.getValueInput.bind(this)
    this.handleSelectModule = this.handleSelectModule.bind(this)
    this.handleDeletePermission = this.handleDeletePermission.bind(this)
  }

/*############### ACTIONS - API ###############*/

  //Update Module...
  updateModule = (module) => {
    update(types.MODULES, module.uid, module).then(() => {
      this.getAllModules()
      this.setState({ modulePermissions: [], dPermissions: 'd-none', dSave: 'd-none', dOptions: 'd-none' })
      $('#mymodalss').modal('hide')
    }).catch(err => console.log(err))
  }

  //Create new Module
  createNewModule = (module) => {
    create(types.MODULES, module).then((res) => {
      this.getAllModules()
      this.setState({ modulePermissions: [], dPermissions: 'd-none', dSave: 'd-none', dOptions: 'd-none' })
    }).catch(err => console.log(err))
  }
/*##############################################*/




/*############### ACTIONS - PERMISSIONS ###############*/

  //Delete permission of selected Module...
  handleDeletePermission(e) {
    const idx = e.target.id
    let permissions = this.state.modulePermissions
    if(permissions.length > 1) {
      permissions.splice(idx, 1)
      this.setState({ modulePermissions : permissions })
      this.showBtnSave(true)
    }
  }

  //Refresh state permissions of Module selected...
  refreshModulePermissions = (permissions) => {
    this.setState({ modulePermissions : permissions })
  }

  //Add permission to Module
  addPermission = () => {
    this.setState({ namePermission:"", descPermission:"" })
    $('#mymodalspermissions').modal('toggle')
  }
/*#####################################################*/





/*################# ACTIONS - MODULES #################*/

  //Control Module Selected...
  handleSelectModule(e) {
    e.preventDefault()
    const idx = e.target.id
    const modules = this.state.modules
    this.setState({ modulePermissions : [] })
    this.changeModuleSeleted(modules[idx])
  }

  //Get all Modules
  getAllModules = () => {
    findAll(types.MODULES).then((res) => {
      this.setState({ modules : res.data })
    }).catch(err => console.log(err))
  }

  //Change state selected Module...
  changeModuleSeleted = (module) => {
    this.setState({ selectedModule : module, dOptions : "d-inline" })
    this.refreshModulePermissions(module.permissions)
  }
/*#####################################################*/





/*################# ACTIONS - DISPLAY #################*/

  //Hiden- show button Save...
  showBtnSave = (show) => {
    let cls
    show ? cls = "d-inline" : cls = "d-none"
    this.setState({ dSave : cls })
  }
/*#####################################################*/





/*################# ACTIONS - OPTIONS #################*/

  //Create new Module...
  createModule = () => {
    this.setState({ modalTitle : "Crear nuevo Modulo", modalValue : "", placeholder : "Modulo", actionModal : "new" })
    $('#mymodalss').modal('toggle')
  }

  //Save changes...
  saveChanges = () => {
    const permissions = this.state.modulePermissions
    if(permissions.length <= 0) {
      this.setMessageEmptyPermission()
    }else {
      const module = this.state.selectedModule
      let permissionsNew = []
      permissions.forEach(p => {
        permissionsNew.push(p)
      })
      const moduleToSave = {
        uid:module.uid, name:module.name, permissions:permissionsNew
      }

      if(module.uid) {
        this.updateModule(moduleToSave)
      }else {
        this.createNewModule(moduleToSave)
      }
    }
  }

  //Delete selected Module...
  deleteModule = () => {
    const module = this.state.selectedModule
    deleteById(types.MODULES, module.uid).then(() => {
      this.setState({ selectedModule:{
        uid:"", name:"", permissions:[]
      } })
    }).catch(err => console.log(err))
  }

  //Rename Module selected...
  renameModule = () => {
    const module = this.state.selectedModule
    this.setState({ modalTitle: "Renombrar Modulo", modalValue: module.name,
      placeholder: "Modulo", actionModal: "rename" })
    $('#mymodalss').modal('toggle')
  }

  //Refresh all Modules...
  refreshModules = () => {
    const module = {uid:null, name:"", permissions:[]}
    this.setState({ selectedModule : module, modulePermissions : [] })
    this.getAllModules()
  }
/*#####################################################*/





/*################# ACTIONS - MODALS #################*/

  //Show message Permissions Empty...
  setMessageEmptyPermission = () => {
    this.setState({
      message : "Los Modulos necesitan tener al menos 1 permiso",
      messageType: "error", messageTitle: "Error de Datos"
    })
    $('#mymodalmessage').modal('toggle')
  }

  //Get value of Module name...
  getValueInput(e) {
    const value = e.target.value
    this.setState({ modalValue : value })
  }

  //Save action Modal
  saveActionModal = () => {
    const action  = this.state.actionModal
    const value = this.state.modalValue
    if(action === "new") {
      if(value !== "") {
        const newModule = {uid: null, name: value, permissions: []}
        let modules = this.state.modules
        modules.push(newModule)
        this.setState({ modules : modules })
        this.changeModuleSeleted(newModule)
        $('#mymodalss').modal("toggle")
        this.showBtnSave(true)
      }
    }else if(action === "rename") {
      if(value !== "") {
        const modulExist = this.state.selectedModule
        const permissions = []
        this.state.modulePermissions.forEach((p) => {
          permissions.push(p)
        })
        const moduleToSave = {uid:modulExist.uid, name:value, permissions:permissions}
        
        this.updateModule(moduleToSave)
      }
    }
  }

    //Get name from new Permission
    getPermissionName = (e) => {
      const value = e.target.value
      this.setState({ namePermission : value })
    }
  
    //Get description from new Permission
    getPermissionDescription = (e) => {
      const value = e.target.value
      this.setState({ descPermission : value })
    }

    //Save new Permission
    saveNewPermission = () => {
      const name = this.state.namePermission
      const desc = this.state.descPermission

      if(name !== "" && desc !== "") {
        const newPermission = {uid:null, name: name, description : desc}
        let permissionsExist = this.state.modulePermissions
        permissionsExist.push(newPermission)
        this.setState({ modulePermissions : permissionsExist, dSave : "d-inline" })
        $('#mymodalspermissions').modal('toggle')
      }
    }
/*####################################################*/





/*################# Lifecycle #################*/
  componentDidMount() {
    this.getAllModules()
  }


  render() {
    return (
      <Router>
        <ModalPermissions name={this.state.namePermission} desc={this.state.descPermission}
          saveName={this.getPermissionName} saveDescription={this.getPermissionDescription} save={this.saveNewPermission} />

        <MyMessageModal type={this.state.messageType} title={this.state.messageTitle} message={this.state.message} />

        <MyModal title={this.state.modalTitle} value={this.state.modalValue} placeholder={this.state.placeholder}
          saveText={this.getValueInput} save={this.saveActionModal} />

        <div className="container-main">

          <NavBarConfigs title="Modulos" display={this.state.dOptions} dSave={this.state.dSave}
            onClickNew={this.createModule} onClickSave={this.saveChanges} onClickDelete={this.deleteModule}
            onClickEdit={this.renameModule} onClickRefresh={this.refreshModules} />

            <div className="d-flex flex-inline flex-wrap justify-content-center">

              <ListItems items={this.state.modules} clickSelect={this.handleSelectModule} />

              <TablePermissions permissions={this.state.modulePermissions} delete={this.handleDeletePermission} title="Modulo"
                dAdd="d-block" addPermission={this.addPermission} />
            </div>

        </div>

      </Router>
    )
  }
}
