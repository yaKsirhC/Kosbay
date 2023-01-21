import React from 'react'

export default function DateBlock({date}: {date: Date}) {
  return (
    <div className='calendar_block'>{date.getDate()}</div>
  )
}
