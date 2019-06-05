import React from 'react'
import SimpleBar from 'simplebar-react'

export default function ScrollingHoriz(props) {
  return (
    <div>
      <SimpleBar style={{ /*maxWidth: props.width,*/ padding: '10px' }}>
        <div className="d-flex flex-row flex-nowrap">
          {props.children}
        </div>
      </SimpleBar>
    </div>
  )
}
