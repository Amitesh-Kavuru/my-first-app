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

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleRegisteration = (event) => {
    navigate("/dashboard", {
      state: { username: username, password: password },
    });
  };

  const handleClickShowPassword = () => setShowPassword(() => !showPassword);

  const handleClickChangeToSignin = () => {
    navigate("/");
  };
  return (
    <div className="App">
      <form onSubmit={handleRegisteration} className="loginForm">
        <TextField
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
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        
        <input type="submit" value="Register" />
        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <span>
            <button
              onClick={handleClickChangeToSignin}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#44b8c7",
              }}
            >
              Login
            </button>
          </span>
        </p>
      </form>
    </div>
  );
}
