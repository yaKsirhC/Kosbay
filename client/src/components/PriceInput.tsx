import React, { useContext, useEffect, useState } from "react";
import "../styles/priceInput.scss";

export default function PriceInput({Attributes, onChange}: {Attributes?: React.HTMLAttributes<HTMLInputElement>, onChange:Function}) {
  const [showWarn, setWarn] = useState(false)
  function handleChange(e: React.ChangeEvent) {
    const el = e.target as HTMLInputElement;
    onChange(e)
    if (el.valueAsNumber <= 0) {
      setWarn(true);
      return;
    }
    setWarn(false);
  }


  return (
    <div className="price_warn">
      <div className="input_container">
        <span className="symbol">&euro;</span>
        <input onChange={e => handleChange(e)} {...Attributes} type="number" />
      </div>
      {showWarn && <span className="warn">Enter Valid Price.</span>}
    </div>
  );
}
