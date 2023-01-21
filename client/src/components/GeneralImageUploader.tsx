import React, { CSSProperties, useRef } from "react";
import "../styles/generalImageUploader.scss";

export default function GeneralImageUploader({styles, onChange, required}: {styles?: CSSProperties, onChange?:Function, required?: boolean}) {
    const label = useRef() as React.MutableRefObject<HTMLLabelElement>
    function handleChange(e: React.FormEvent){
        onChange && onChange(e)
        const el = e.target as HTMLInputElement
        const image = (el.files as FileList)[0]
        console.log(image);
        const url = URL.createObjectURL(image)
        label.current.style.backgroundImage = `url(${url})`
    }
  return (
    <>
      <label id="aula" ref={label} style={styles} htmlFor="img">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30 5H10C8.67392 5 7.40215 5.52678 6.46447 6.46447C5.52678 7.40215 5 8.67392 5 10V30C5 31.3261 5.52678 32.5979 6.46447 33.5355C7.40215 34.4732 8.67392 35 10 35H30C31.3261 35 32.5979 34.4732 33.5355 33.5355C34.4732 32.5979 35 31.3261 35 30V10C35 8.67392 34.4732 7.40215 33.5355 6.46447C32.5979 5.52678 31.3261 5 30 5ZM10 8.33333H30C30.442 8.33333 30.866 8.50893 31.1785 8.82149C31.4911 9.13405 31.6667 9.55797 31.6667 10V23.9333L26.3333 19.3833C25.507 18.7034 24.4701 18.3317 23.4 18.3317C22.3299 18.3317 21.293 18.7034 20.4667 19.3833L8.33333 29.5V10C8.33333 9.55797 8.50893 9.13405 8.82149 8.82149C9.13405 8.50893 9.55797 8.33333 10 8.33333Z"
            fill="#231F20"
            fillOpacity="0.53"
          />
          <path
            d="M13.3333 16.6666C14.714 16.6666 15.8333 15.5473 15.8333 14.1666C15.8333 12.7859 14.714 11.6666 13.3333 11.6666C11.9526 11.6666 10.8333 12.7859 10.8333 14.1666C10.8333 15.5473 11.9526 16.6666 13.3333 16.6666Z"
            fill="#231F20"
            fillOpacity="0.53"
          />
        </svg>
      <input required={required} onChange={e => handleChange(e)} id="img" type="file" />
      </label>
    </>
  );
}