import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import SimpleBar from 'simplebar-react'
import SalesRow from './SalesRow'

import { findAll } from '../../services/my-api'
import { types } from '../../lib/constants'

const OPTIONS_DATE = {weekday: "long", year: "numeric", month: "long", day: "numeric"}

export default class Sales extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      dateSelect : new Date(), open : false, disabled : true, sales : [], loadView : "d-none",
      seller : null, customer : null
    }
    
    this.handleChangeDate = this.handleChangeDate.bind(this)
  }

  getTotalSales = () => {
    const {sales} = this.state
    
    let total = 0
    sales.forEach(sale =>{
      total = total + sale.total
    })

    return total
  }

  handleChangeDate(date) {
    this.setState({ dateSelect : date })
    this.getSales(date)
  }

  setDateNow = () => {
    this.setState({dateSelect : new Date()})
    this.getSales(new Date())
  }

  getSales = (date) => {
    this.setState({loadView : ""})
    let type = types.SALES+"/"+localStorage.getItem("user")
    type = type+"/"+date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()

    findAll(type).then(res => {
      this.setState({sales : res.data, loadView : "d-none"})
    })
    .catch(e => {
      console.log(e)
      this.setState({loadView : "d-none"})
    })
  }

  componentDidMount() {
    this.getSales(this.state.dateSelect)
  }
  
  render() {
    const theSales = this.state.sales
    return (
      <div className="p-2 container">

        <div className="bar-sales-actions rounded p-2 bg-light d-flex flex-inline justify-content-between border">
          <div className="date-select my-auto">
            Ventas de : <DatePicker
              customInput={<DatePickerCustom date={this.state.dateSelect} />}
              selected={this.state.dateSelect}
              onChange={this.handleChangeDate}
              showYearDropdown
              scrollableYearDropdown
              dateFormat="dd/MM/yyyy" />
            <button type="button" className="btn btn-info btn-sm p-0" onClick={this.setDateNow}>[HOY]</button>
          </div>
          <div className={"sales-options "+this.state.loadView}>
            <div className="spinner-border spinner-border-sm text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>

        {
          theSales.length >= 1 ?
          (
            <div>
              <SimpleBar className="list-sales" style={{height:'550px'}}>
                <table className="table table-sm table-hover">
                  <thead className="thead-success">
                    <tr>
                      <th>
                        Creada por
                      </th>
                      <th>
                        Cliente
                      </th>
                      <th>
                        Fecha
                      </th>
                      <th>
                        Estado
                      </th>
                      <th>
                        Importe
                      </th>
                      <th>
                        Descuento
                      </th>
                      <th>
                        Total
                      </th>
                      <th>
                        Productos
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    theSales.map((sale, i) =>{
                      return(
                        <SalesRow key={i} sale={sale} idx={i} />
                      )
                    })
                  }
                  </tbody>
                </table>
              </SimpleBar>

              <hr className="m-0 border"/>

              <div className="footer-total d-block text-center text-danger">
                <strong>Total: ${this.getTotalSales()}</strong>
              </div>
            </div>
          ) : <h2 className="text-center d-block text-secondary">No se ha registrado ninguna venta en este día</h2>
        }
      </div>
    )
  }
}

function DatePickerCustom(props) {

  return(
    <button type="button" className="btn btn-light btn-sm" onClick={props.onClick} >
      {props.date ? props.date.toLocaleString("es-ES", OPTIONS_DATE) : "Seleccionar fecha"}
    </button>
  )
}
