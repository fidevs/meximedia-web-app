import React from 'react'
import SimpleBar from 'simplebar-react'

import '../../css/ListItems.css'

export default function ListItems(props) {
  return (
    <div className="mr-5 mb-2 container-list-items">
      <SimpleBar style={{ maxHeight: '340px', minWidth: '140px' }}>
        <div className="lists-items d-felx flex-column">
          {
            props.items.map((item,i) =>{
              return(
                <a
                  id={i}
                  key={i}
                  className="item-list d-block bg-primary w-100 text-white p-1 pl-2 border-bottom"
                  href="#"
                  onClick={props.clickSelect}>
                    {item.name}
                </a>
              )
            })
          }
        </div>
      </SimpleBar>
    </div>
  )
}
