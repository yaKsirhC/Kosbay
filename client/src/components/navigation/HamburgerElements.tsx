import React from 'react'

export default function HamburgerElements({elements}: {elements: any[]}) {
  return (
    <div className='ham_elements'>
        {elements.map((el,i) =>{
            return <div key={i}>{el}</div>
        })}
    </div>
  )
}
