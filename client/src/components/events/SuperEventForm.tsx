import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { postEvent } from '../../features/secondarySlice'

export default function SuperEventForm() {
  const dispatch = useDispatch()
  const dateRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [data, setData] = useState({
    title: '',
    description: '',
    completionDate: Date.now()
  })

  function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    // @ts-ignore
    dispatch(postEvent(data))
  }

  function handleChange(e: React.ChangeEvent){
    const el = e.target as HTMLInputElement
    const elValue = el.id === 'completionDate' ? el.valueAsNumber : el.value
    

    setData(pre => ({
      ...pre, [el.id]: elValue
    }))
  }

  useEffect(() => {
    const date = new Date(data.completionDate as number)
    const a = date.toLocaleString('en-GB', {year: 'numeric', month: 'numeric', day: 'numeric'})
    const formats = a.split('/')
    const dateValue = [formats[2], formats[1], formats[0]]
    const final = dateValue.join('-')
    
    dateRef.current.value = final

  },[data.completionDate])

  return (
    <form onSubmit={e => handleSubmit(e)}>
        <input value={data.title} onChange={e => handleChange(e)} type="text" id='title' placeholder='Event Title' />
        <input value={data.description} onChange={e => handleChange(e)} type="text" id='description' placeholder='Event description' />
        <input ref={dateRef}  onChange={e => handleChange(e)} type="date" id='completionDate' placeholder="Place the event's date" />
        <button type='submit'>Post</button>
    </form>
  )
}
