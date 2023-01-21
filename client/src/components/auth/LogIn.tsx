import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../../styles/auth.scss";
import detectOutOfFocus from "../../utils/detectOutOfFocus";
import { login, setAuthBox, setToken } from "../../features/auth";

export default function LogIn() {
  const dispatch = useDispatch();
  const authBox = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleOutOfFocus(e: UIEvent) {
    const res = detectOutOfFocus(e.target as HTMLElement, authBox.current);
    if (!res) return dispatch(setAuthBox(""));
  }

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", handleOutOfFocus);
    }, 0);

    return () => {
      window.removeEventListener("click", handleOutOfFocus);
    };
  }, []);
  function updateCredentials(e: React.ChangeEvent) {
    const el = e.target as HTMLInputElement;
    const fieldName = el.placeholder.toLowerCase();
    setCredentials((pre) => ({
      ...pre,
      [fieldName]: el.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      // @ts-ignore
      dispatch(login(credentials))
  }

  return (
    <>
      <div ref={authBox} className="auth-box">
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField value={credentials.email} onChange={(e) => updateCredentials(e)} placeholder="Email" />
          <TextField value={credentials.password} onChange={(e) => updateCredentials(e)} placeholder="Password" />
          <Button type="submit">Log in</Button>
        </form>
        <div className="other">
          <div className="">
            Don't have an account? <Button onClick={(e) => dispatch(setAuthBox("sign-in"))}>Sign in</Button>.
          </div>
        </div>
      </div>
      <div className="shadow"></div>
    </>
  );
}
