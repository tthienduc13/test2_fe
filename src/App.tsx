import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/create-game" element={<CreateGame></CreateGame>}></Route>
      </Routes>
    </>
  );
}

export default App;
