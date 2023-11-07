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
  const [pageType, setPageType] = useState("signin");
  const navigate = useNavigate();
  const handleSignin = (event) => {
    event.preventDefault();
    navigate("/dashboard", {
      state: { username: username, password: password },
    });
  };

  const handleClickShowPassword = () => setShowPassword(() => !showPassword);
  const checkValidUsername = () => {
    return username.length >= 1 && username.length <= 6;
  };
  const checkValidPassword = () => {
    return password.length >= 1 && password.length <= 6;
  };
  // const handleClickChangeToRegister = () => {
  //   navigate("/register");
  // };
  // const handleClickChangeToSignin = () => {
  //   navigate("/");
  // };
  return (
    <div className="App">
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
          sx={{ mt: 4 }}
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
          error={!password === confirmPassword}
          helperText={
            !password === confirmPassword ? "Please confirm password" : ""
          }
          hidden={pageType === "register" ? false : true}
          label="Confirm Password"
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
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
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
                color: "#44b8c7",
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
