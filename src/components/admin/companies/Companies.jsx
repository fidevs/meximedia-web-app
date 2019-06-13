import React, { Component } from 'react'
import { types } from '../../../lib/constants'
import {findAll, create, update} from '../../../services/my-api'
import NavBarConfigs from '../../NavBarConfigs'
import MyMessageModal from '../../mymodals/MyMessageModal'
import ListCompanies from './ListCompanies'
import ActionsCompany from './ActionsCompany'
import $ from 'jquery'

import '../../../css/company/company.css'



//const HISTORY = createBrowserHistory()

const COMPANY_EMPTY =
  {
    uid:null, name:"", active:false, createdDate:null, rfc:"", phone:"",
    image:null, adressList:[], warehouses:[]
  }

export default class Companies extends Component {
  constructor(props) {
    super(props)

    this.state = {
      companies : [], dOptions: 'd-none', dSave: 'd-none', action:"create",
      selectedCompany : null, return: false,
      stateView : "watch", stateNav : "Todas las compañias",
      messType:"error", messTitle:"Error en los datos", messMessg:"Llena todos los campos requeridos"
    }

    this.handleViewSelectedCompany = this.handleViewSelectedCompany.bind(this)
    this.handleDeleteCompany = this.handleDeleteCompany.bind(this)
  }

  updateCompany = (company) => {
    update(types.COMPANIES, company.uid, company)
    .then(this.refresh()).catch(err => console.log(err))
  }

  createCompany = (company) => {
    create(types.COMPANIES, company)
    .then(this.refresh()).catch(err => console.log(err))
  }

  filterDataCompany = (company) => {
    const namesC = ["name", "rfc", "phone"]
    let valid = true
    namesC.forEach(name => {
      if (!company[name] || company[name] === ""){
        valid = false
      }
    })

    if(!company.image){
      valid = false
    }else if(!company.image.name){
      valid = false
    }

    return valid
  }

  saveCompany = (company) => {
    if(!this.filterDataCompany(company)) {
      $('#mymodalmessage').modal('show')
    }else {
      company.uid ? this.updateCompany(company) : this.createCompany(company)
    }
    this.setState({return:false})
  }


/*################# ACTIONS - LIST_COMPANIES #################*/
  //View a selected company
  handleViewSelectedCompany(e) {
    const idx = e.target.id
    const companies  = this.state.companies
    const company = companies[idx]
    this.setState({selectedCompany:company, stateView:'view', stateNav:'Editar: '+company.name, action:'edit', dSave:''})
  }

  saveChanges = () => {
    this.setState({return:true})
  }

  //handle delete selected company
  handleDeleteCompany(e) {
    const idx = e.target.id
    const companies  = this.state.companies
    console.log(idx)
  }
/*############################################################*/

/*################# ACTIONS - API #################*/
  //Get all Companies
  getAllCompanies = () => {
    this.setState({companies:[]})
    findAll(types.COMPANIES).then(res =>{
      res.data.forEach(company => {
        const companies = this.state.companies
        companies.push(company)
        this.setState({ companies : companies })
      });
    })
  }
/*#################################################*/

/*################# ACTIONS - NAVBAR #################*/
  //State to new Company
  toNewCompany = () => {
    this.setState({dSave:''})
  }

  //State to show Companies
  toShowCompanies = () => {
    this.setState({dSave:'d-none', stateView:'watch', stateNav:'Todas las compañias'})
  }
/*#####################################################*/

/*################# ACTIONS - OPTIONS #################*/
  //Create a new Company
  createNewCompany = () => {
    this.setState({stateView:'view', stateNav:'Crear nueva', selectedCompany:COMPANY_EMPTY, action:"create"})
    this.toNewCompany()
  }

  //Refresh Companies
  refresh = () => {
    this.toShowCompanies()
    this.getAllCompanies()
  }
/*#####################################################*/

/*################# Lifecycle #################*/
  componentDidMount() {
    this.getAllCompanies()
    this.setState({ selectedCompany:COMPANY_EMPTY })
  }
/*#############################################*/

  render() {
    return (
      <div>
        <MyMessageModal type={this.state.messType} title={this.state.messTitle} message={this.state.messMessg} />

        <NavBarConfigs title="Compañias" display={this.state.dOptions} dSave={this.state.dSave} textState={this.state.stateNav}
          onClickNew={this.createNewCompany} onClickRefresh={this.refresh} onClickSave={this.saveChanges} />

          {
            this.state.stateView === "watch" ? (
              <ListCompanies companies={this.state.companies} onView={this.handleViewSelectedCompany} onDelete={this.handleDeleteCompany} />
            ) : this.state.stateView === "view" ? (
              <ActionsCompany return={this.state.return} company={this.state.selectedCompany} action={this.state.action}
                saveCompany={this.saveCompany} />
            ) : (
              <h5 className="m-auto text-center">!Algo salió mal :'(...!</h5>
            )
          }

      </div>
    )
  }
}
