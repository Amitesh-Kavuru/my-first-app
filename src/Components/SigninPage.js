import { IconButton, InputAdornment, TextField } from "@mui/material";
import "../ComponentStyles/SigninPage.css";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

export default function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [pageType, setPageType] = useState("signin");
  const [passwordError, setPasswordError] = useState();  
  const navigate = useNavigate();
  const handleSignin = (event) => {
    event.preventDefault();
    if(pageType==='register'){
      if(password===confirmPassword){
        navigate("/dashboard", {
          state: { username: username, password: password },
        });
      }else{
        setPasswordError("Both passwords does not matches!!!!");
      }
    }else{
      navigate("/dashboard", {
        state: { username: username, password: password },
      });
    }
  };

  const handleClickShowPassword = () => setShowPassword(() => !showPassword);
  const handleClickShowPassword2 = () => setShowPassword2(() => !showPassword2);
  const checkValidUsername = () => {
    return username.length >= 1 && username.length <= 6;
  };
  const checkValidPassword = () => {
    return password.length >= 1 && password.length <= 6;
    
    // setPasswordError("")
    // if ("" === password) {
    //   setPasswordError("Please enter a password")
    //   return false;
    // }

    // if (password.length < 7) {
    //     setPasswordError("The password must be 8 characters or longer")
    //     return false
    // }
    // return true;
  };
  const checkConfirmPassword = () => {
    return username.length >= 1 && username.length <= 6;
  };
  
  // const handleClickChangeToRegister = () => {
  //   navigate("/register");
  // };
  // const handleClickChangeToSignin = () => {
  //   navigate("/");
  // };
  return (
    <div className="form">
      <div className="imageComponent"></div>
      <form onSubmit={handleSignin} className="loginForm">
        <TextField
          error={checkValidUsername()}
          helperText={
            checkValidUsername()
              ? "Username must have atleast 6 characters!"
              : ""
          }
          label="Username"
          variant="outlined"
          className="textField"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          // error= "true"
          // helperText="Invalid"
          sx={{ mt: 4 ,width:"300px"}}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          error={checkValidPassword()}
          helperText={
            checkValidPassword()
              ? "Password must have atleast 6 characters!"
              : ""
          }
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          className="textField"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mt: 4 }}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          error={passwordError}
          helperText={
            passwordError ? "" : passwordError
          }
          hidden={pageType === "register" ? false : true}
          label="Confirm Password"
          type={showPassword2 ? "text" : "password"}
          variant="outlined"
          className="textField"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={handleClickShowPassword2}>
                  {showPassword2 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mt: 4,width:"300px" }}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        {/* <label className="errorLabel">{passwordError}</label> */}
        <input
          type="submit"
          value={pageType === "register" ? "Register" : "Login"}
        />
        <p style={{ marginTop: "10px" }}>
          {pageType === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span>
            <button
              onClick={(event) => {
                event.preventDefault();
                setPageType(() =>
                  pageType === "signin" ? "register" : "signin"
                );
              }}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "rgb(98, 162, 219)",
              }}
            >
              {pageType === "signin" ? "Register" : "Signin"}
            </button>
          </span>
        </p>
      </form>
    </div>
  );
}
