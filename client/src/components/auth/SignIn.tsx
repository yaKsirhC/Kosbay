import { Button, Step, StepLabel, Stepper, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthBox, setToken, signInInitialization, signInVerification } from "../../features/auth";
import detectOutOfFocus from "../../utils/detectOutOfFocus";
import "../../styles/auth.scss";

export default function LogIn() {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    otp: "",
    name: "",
    img: undefined,
  });

  const authBox = useRef() as React.MutableRefObject<HTMLDivElement>;

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
    try {
      e.preventDefault();
      if (activeStep === 0) {
        dispatch(
          // @ts-ignore
          signInInitialization({
            email: credentials.email,
            password: credentials.password,
            name: credentials.name,
          })
        );
      }

      if (activeStep === 1) {
        
        dispatch(
          // @ts-ignore
          signInVerification({
            otp: credentials.otp,
            email: credentials.email,
          })
        );
      }

      if (activeStep === 2) {
        await axios.post(
          import.meta.env.VITE_SERVER_URL + "users/place-image-banner",
          { img: credentials.img },
          { headers: { "content-type": "multipart/form-data" } }
        );
        dispatch(setAuthBox(""));
      }

      setActiveStep((pre) => ++pre);
    } catch (error) {
      console.error(error);
    }
  }

  function updateFile(e: React.ChangeEvent) {
    const el = e.target as HTMLInputElement;
    // @ts-ignore
    setCredentials((pre) => ({
      ...pre,
      img: (el.files as FileList)[0],
    }));
    
  }

  return (
    <>
      <div ref={authBox} className="auth-box">
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>Provide Credentials</StepLabel>
          </Step>
          <Step>
            <StepLabel>Verify</StepLabel>
          </Step>
          <Step>
            <StepLabel>Optional</StepLabel>
          </Step>
        </Stepper>
        <form onSubmit={(e) => handleSubmit(e)} className="sign_in_form">
          {activeStep === 0 ? (
            <>
              <TextField value={credentials.name} onChange={(e) => updateCredentials(e)} placeholder="Name" />
              <TextField value={credentials.email} onChange={(e) => updateCredentials(e)} placeholder="Email" />
              <TextField value={credentials.password} onChange={(e) => updateCredentials(e)} placeholder="Password" />
              <Button type="submit">Request Sign in</Button>
            </>
          ) : activeStep === 1 ? (
            <>
              <TextField value={credentials.otp} onChange={(e) => updateCredentials(e)} type="text" placeholder="OTP" />
              <Button type="submit">Sign in</Button>
            </>
          ) : (
            <>
              <TextField name="img" onChange={(e) => updateFile(e)} type="file" />
              <Button type="submit">Upload Image</Button>
            </>
          )}
        </form>
        <div className="other">
          <div className="">
            Already have an account? <Button onClick={(e) => dispatch(setAuthBox("log-in"))}>Log in</Button>.
            {activeStep === 2 && <Button onClick={() => dispatch(setAuthBox(""))}>Skip</Button>}
          </div>
        </div>
      </div>
      <div className="shadow"></div>
    </>
  );
}
