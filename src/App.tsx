import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import SubmitAnswer from "./pages/SubmitAnswer";
export interface Istate {
  playerList: string[];
}
function App() {
  const [playerList, setPlayerList] = useState<Istate["playerList"]>([]);
  console.log(playerList);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/create-game"
          element={
            <CreateGame
              playerList={playerList}
              setPlayerList={setPlayerList}
            ></CreateGame>
          }
        ></Route>
        <Route
          path="/submit-answer"
          element={<SubmitAnswer></SubmitAnswer>}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
