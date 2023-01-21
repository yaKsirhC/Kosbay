import React from 'react'

export default function ServerImage({path, className}: {path: string, className?: string}) {
  return (
    <img className={className} src={import.meta.env.VITE_SERVER_URL + "files/get/preview?iid=" + path}  />
  )
}
