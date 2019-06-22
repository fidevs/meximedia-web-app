import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import ProfileUserApp from './ProfileUserApp'
import ProfileDetails from './ProfileDetails'
import ProfileAddress from './ProfileAddress'
import ModalChangePass from '../mymodals/ModalChangePass'

import { types } from '../../lib/constants'
import { findById, update } from '../../services/my-api'

export default class Profile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user : null, profile : "", address : [],
      role : "Cargando...", dOptions : 'd-none', success : false, fail : false
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeCheckActive = this.handleChangeCheckActive.bind(this)
    this.handleChangeCheckDefault = this.handleChangeCheckDefault.bind(this)
    this.handleUploadProfileImage = this.handleUploadProfileImage.bind(this)
  }

  saveChanges = () => {
    let { user } = this.state
    update(types.USERS, user.id, user).then(res => {
      this.setState({ user : res.data, success : true, dOptions : 'd-none' })
    }).catch(e => {
      console.log(e)
      this.setState({ fail : true })
    })
  }

  handleDeleteProfileImage = () => {
    let { user } = this.state
    user.profile.avatarImg = null
    user.profile.avatarType = null
    this.setState({ user : user })
  }

  handleUploadProfileImage(e) {
    if(e.target.files[0]) {
      let user = this.state.user
      const img = e.target.files[0]
      let reader = new FileReader()
      reader.readAsBinaryString(img)
      reader.onload = () => {
        const imcontent = btoa(reader.result)
        user.profile.avatarImg = imcontent
        user.profile.avatarType = img.type
        this.setState({user : user, dOptions : 'd-block'})
      }
    }
  }

  handleChangeCheckActive(e) {
    const { id } = e.target
    let user = this.state.user
    let value = user.addressList[id].active ? false : true
    user.addressList[id].active = value
    this.setState({user : user, dOptions : 'd-block'})
  }

  handleChangeCheckDefault(e) {
    const { id } = e.target
    let user = this.state.user
    let value = user.addressList[id].isDefault ? false : true
    user.addressList[id].isDefault = value
    this.setState({user : user, dOptions : 'd-block'})
  }

  handleChange(e) {
    const { id, name, value } = e.target
    let user = this.state.user
    if(name === "username"){
      user.username = value
    }else if(id === "profile") {
      user[id][name] = value
    }else {
      user.addressList[id][name] = value
    }
    this.setState({ user : user, dOptions : 'd-block'})
  }

  getNewPass = (pass) => {
    let { user } = this.state
    user.password = pass
    this.setState({user : user, dOptions : 'd-block'})
  }

  getRole = uid => {
    findById(types.ROLES, uid).then(res => {
      let user = res.data
      // !res.data.profile && user
      this.setState({role : res.data.name})
    })
  }

  getUser = () => {
    const id = localStorage.getItem("user")
    findById(types.USERS, id).then(res => {
      this.setState({user : res.data})
      this.getRole(res.data.userRoleId)
    })
  }

  componentWillMount() {
    this.getUser()
  }
  
  
  render() {

    const user = this.state.user
    const profile = this.state.profile
    const address = this.state.address

    if(!localStorage.getItem("user"))
      return <Redirect to="/index/login" />

    
    if (user !== null) {
      return (
        <SimpleBar className="display-main-profile p-1 d-flex flex-wrap" style={{background : '#CBCBCB', height:'100vh'}}>
          <div className="profile-title bg-dark rounded text-white mb-2 d-flex flex-inline justify-content-between px-4" style={{padding:'2px'}}>
            <h4>Editar perfil</h4>
            <div className={"options my-auto "+this.state.dOptions}>
              <div className="save-changes d-inline-block mr-4" style={{cursor : 'pointer'}} onClick={this.saveChanges}>
                <i className="fas fa-save mr-1"></i>
                <small>Guardar</small>
              </div>
              <div className="cancel-changes d-inline-block" style={{cursor : 'pointer'}} onClick={()=> {
                this.setState({dOptions : 'd-none'})
                this.getUser()
              }}>
                <i className="far fa-window-close mr-1"></i>
                <small>Cancelar</small>
              </div>
            </div>
          </div>


          {
            this.state.success && (
              <div className="alert w-50 ml-auto alert-success alert-dismissible fade show p-0 text-center "
                role="alert">
                <strong>Operación exitosa</strong> Se actualizó correctamente el perfil
                <button type="button" className="close p-0" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )
          }
          

          {
            this.state.fail && (
              <div className={"alert w-50 ml-auto alert-danger alert-dismissible fade show p-0 text-center "+this.state.fail}
                role="alert">
                <strong>Operación fallida</strong> Ocurrió un error al actualizar el perfil
                <button type="button" className="close p-0" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )
          }


          <div className="profile-container d-flex flex-inline flex-wrap p-1 justify-content-center">

            <ProfileUserApp username={user.username} setName={this.handleChange} date={user.createdDate} role={this.state.role}
              image={
                user.profile ? user.profile.avatarImg : null
              }
              imageType={
                user.profile ? user.profile.avatarType : null
              } setImageProfile={this.handleUploadProfileImage} deleteImage={this.handleDeleteProfileImage} />

            <ProfileDetails detail={user.profile} change={this.handleChange} />

            <ProfileAddress address={user.addressList} change={this.handleChange} changeCheckActive={this.handleChangeCheckActive}
              changeCheckDefault={this.handleChangeCheckDefault} />

            <ModalChangePass setNewPass={this.getNewPass} />
          </div>
        </SimpleBar>
      ) 
    } return <h5>Cargando...</h5>
  }
}