import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar, Main, Footer } from "./components";
import { Register } from "./pages/register";
import { Login } from "./pages/login";

function App() {
  return (
    <div className="container">
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
