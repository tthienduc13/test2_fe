import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import SubmitAnswer from "./pages/SubmitAnswer";
export interface Istate {
  playerList: string[];
  numberOfRounds: number;
}
function App() {
  const [playerList, setPlayerList] = useState<Istate["playerList"]>([]);
  const [numberOfRounds, setNumberOfRounds] = useState<
    Istate["numberOfRounds"]
  >(Number(""));
  console.log(playerList);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/create-game"
          element={
            <CreateGame
              numberOfRounds={numberOfRounds}
              playerList={playerList}
              setPlayerList={setPlayerList}
              setNumberOfRounds={setNumberOfRounds}
            ></CreateGame>
          }
        ></Route>
        <Route
          path="/submit-answer"
          element={<SubmitAnswer
          numberOfRounds={numberOfRounds}
          playerList={playerList}
          ></SubmitAnswer>}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
