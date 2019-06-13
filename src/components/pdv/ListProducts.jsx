import React from 'react'
import SimpleBar from 'simplebar-react'

export default function ListProducts(props) {
  return (
    <div className="pdv-list-products border rounded bg-light mr-1 mb-2" style={{width:'500px'}}>
      <div className="list-products-header d-flex p-1">

        <strong>Productos</strong>
        <select value={props.filter} className="ml-4 form-control form-control-sm pt-0 pl-0"
          style={{height:'25px'}} onChange={props.changeFilter}>
          <option value="">Filtrar por...</option>
          <option value="name">Nombre</option>
          <option value="sku">Código (sku)</option>
          <option value="brand">Marca</option>
        </select>

        <input type="text" className=" ml-1 form-control form-control-sm p-0" style={{height:'25px'}}
          placeholder="Buscar..." onChange={props.changeSearch} />

      </div>
      <hr className="m-0 mb-1"/>
      <div className="list-products-container px-1">
        <div className="table-header d-flex flex-inline bg-light px-1"
          style={{borderTopLeftRadius:'5px', borderTopRightRadius:'5px',}}>
          <div className="col-table text-center" style={{width:'22%', borderRight:'1px solid'}}>
            <strong>Nombre</strong>
          </div>
          <div className="col-table text-center" style={{width:'28%', borderRight:'1px solid'}}>
            <strong>SKU</strong>
          </div>
          <div className="col-table text-center" style={{width:'12%', borderRight:'1px solid'}}>
            <strong>#</strong>
          </div>  
          <div className="col-table text-center" style={{width:'18%', borderRight:'1px solid'}}>
            <strong>$</strong>
          </div>
          <div className="col-table text-center" style={{width:'20%'}}>
            <strong>Marca</strong>
          </div>
        </div>
        <SimpleBar className="table-body" style={{maxHeight:'400px'}}>
        {
          props.products && props.products.length >= 1 ? 
          (
            props.products.map((product, i) =>{
              let bg = "exist"
              product.quantity <= 0 ? bg = "" : bg = "exist"
              return (
                <div key={i} id={i} className={"row-table d-flex flex-inline text-white text-center px-1 "+bg}
                  style={{borderBottom:'1px solid'}} onClick={props.selectProduct}>
                  <div id={i} className="col-table-row" style={{width:'22%', borderRight:'1px solid'}}>
                    <small id={i} className="text-white">{product.name}</small>
                  </div>
                  <div id={i} className="col-table-row" style={{width:'28%', borderRight:'1px solid'}}>
                    <small id={i} className="text-white">{product.sku}</small>
                  </div>
                  <div id={i} className="col-table-row" style={{width:'12%', borderRight:'1px solid'}}>
                    <small id={i} className="text-white">{product.quantity}</small>
                  </div>
                  <div id={i} className="col-table-row" style={{width:'18%', borderRight:'1px solid'}}>
                    <small id={i} className="text-white">{"$"+product.salePrice}</small>
                  </div>
                  <div id={i} className="col-table-row" style={{width:'20%'}}>
                    <small id={i} className="text-white">{product.brand.name}</small>
                  </div>
                </div>
              )
            })
          ) : <small className="d-block text-center text-white">No hay ningun producto registrado</small>
        }
        </SimpleBar>
      </div>
    </div>
  )
}
