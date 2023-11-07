import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import RegisterPage from "./Components/RegisterPage";
import SigninPage from "./Components/SigninPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<SigninPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
