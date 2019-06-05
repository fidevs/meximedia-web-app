import React, { Component } from 'react'
import CompanyForm from './CompanyForm'
import CompanyAddress from './CompanyAddress'
import $ from 'jquery'
import MyModalCompanyImage from './MyModalCompanyImage'
import {validateInputText} from '../lib/actions'
import AddressCompany from './MyModalAddressCompany'
import ModalConfirm from './ModalConfirm'

export default class CreateCompany extends Component {
  constructor(props){
    super(props)

    this.state=
    {
      theCompany : {uid:null, name:"", active:false, createdDate:"", rfc:"", phone:"",
        image:null, warehouses:[], adressList:[]},
      errors : {name:"", rfc:"", phone:""}, renderImg : false, companyIsValid:true,
      company : {uid:null, name:"", active:false, createdDate:"", rfc:"", phone:""},
      image : null, confirmTitle:"", confirmMessage:"",
      warehouses : [],
      adressList : [], adrsAction:"create", adrsSelect:"", adrIdx:null
    }

    this.handleInputValidate = this.handleInputValidate.bind(this)
    this.handleDeleteAddress = this.handleDeleteAddress.bind(this)
    this.handleEditAddress = this.handleEditAddress.bind(this)
  }


  getAddress = (adrs) => {
    if(this.state.adrsAction === "create") {
      let address = this.state.adressList
      address.push(adrs)
      this.setState({adressList:address})
    }else if(this.state.adrsAction === "edit") {
      let address = this.state.adressList
      address[this.state.adrIdx] = adrs
      this.setState({adressList:address})
    }

    this.setState({adrsAction:"create", adrsSelect:"", adrIdx:null})
  }


  showModalAddress = () => {
    $('#addressCompanyFormModal').modal('show')
  }

  addAddressToCompany = () => {
    this.setState({adrsAction:"create", adrsSelect:""})
    this.showModalAddress()
  }


  handleEditAddress(e) {
    const idx = e.target.id
    const address = this.state.adressList
    const adr = address[idx]
    this.setState({adrsAction:"edit", adrsSelect:adr, adrIdx:idx})
    this.showModalAddress()
  }


  handleDeleteAddress(e) {
    this.setState({confirmTitle:"Eliminar Dirección",
      confirmMessage:"¿Estas seguro de eliminar esta dirección?",
      adrIdx:e.target.id
    })
    $('#mymodalconfirm').modal('show')
  }


  saveCompany = () => {
    const company = this.state.company
    let newCompany = {uid:company.uid, name:company.name, active:company.active,
      createdDate:company.createdDate, rfc:company.rfc, phone:company.phone,
      image: this.state.image, adressList:this.state.adressList, warehouses:this.state.warehouses}
    this.props.saveCompany(newCompany)
  }

  renderImage = () => {
    this.setState({ renderImg : true })
  }

  getImage = (image) => {
    this.setState({image:image})
  }

  showImageCompany = () => {
    $('#imageCompanyModal').modal('show')
  }

  changeActive = () => {
    let company = this.state.company
    let isActive = company.active
    isActive ? isActive = false : isActive = true
    company.active = isActive
    this.setState({company : company})
  }

  handleInputValidate(e) {
    const {name, value} = e.target
    let {errors, company} = this.state
    company[name] = value
    const newErrors = validateInputText(name, value, errors)
    this.setState({errors : newErrors, company : company})
  }

  mapCompanyInState = (company) => {
    let address = []
    let wares = []
    company.adressList ? address = company.adressList : address = []
    company.warehouses ? wares = company.warehouses : wares = []
    this.setState({
      company:{uid:company.uid, name:company.name, active:company.active,
        createdDate:company.createdDate, rfc:company.rfc, phone:company.phone},
        image : company.image,
        adressList : address,
        warehouses : wares
      })
    this.renderImage()
  }

  confirm = () => {
    let address = this.state.adressList
    address.splice(this.state.adrIdx, 1)
    this.setState({adressList : address})
  }

/*################# Lifecycle #################*/
  componentDidMount() {
    this.mapCompanyInState(this.props.company)
  }  
/*#############################################*/


  render() {
    if(this.props.return) {
      this.saveCompany()
    }
    return (
      <div className="d-flex flex-inline flex-wrap">

        <ModalConfirm title={this.state.confirmTitle} message={this.state.confirmMessage} agree={this.confirm} />

        <CompanyForm name={this.state.company.name} active={this.state.company.active} date={this.state.company.createdDate}
          rfc={this.state.company.rfc} phone={this.state.company.phone} warehouses={this.state.warehouses} withWares={true}
          errors={this.state.errors} handleChangeValidateInput={this.handleInputValidate} handleChangeActive={this.changeActive}
          showImage={this.showImageCompany} isValid={this.state.companyIsValid} id={this.state.company.uid} />


        <CompanyAddress address={this.state.adressList} addAddress={this.addAddressToCompany}
          deleteAddress={this.handleDeleteAddress} editAddress={this.handleEditAddress} />

        <AddressCompany action={this.state.adrsAction} address={this.state.adrsSelect} setAddress={this.getAddress} />


        {
          this.state.renderImg ? <MyModalCompanyImage image={this.state.image} setImage={this.getImage} /> : <div></div>
        }

      </div>
    )
  }
}