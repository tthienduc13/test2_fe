import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import SubmitAnswer from "./pages/SubmitAnswer";
import Answer from "./pages/Answer";
import Result from "./pages/Result";
export interface Istate {
  playerList: {
    playerName: string;
    answer: string[];
    createdAt: string;
    score: number;
  }[];
  numberOfRounds: number;
  correctAnswer: string[];
}
function App() {
  const [playerList, setPlayerList] = useState<Istate["playerList"]>(
    JSON.parse(localStorage.getItem("playerList") || "[]")
  );
  const [numberOfRounds, setNumberOfRounds] = useState<
    Istate["numberOfRounds"]
  >(Number(""));
  const [correctAnswer, setCorrectAnswer] = useState<Istate["correctAnswer"]>(
    JSON.parse(localStorage.getItem("correctAnswer") || "[]")
  );
  useEffect(() => {
    localStorage.setItem("playerList", JSON.stringify(playerList));
    localStorage.setItem("correctAnswer", JSON.stringify(correctAnswer));
  }, [playerList, correctAnswer]);

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
          element={
            <SubmitAnswer
              numberOfRounds={numberOfRounds}
              playerList={playerList}
              setCorrectAnswer={setCorrectAnswer}
              correctAnswer={correctAnswer}
              setPlayerList={setPlayerList}
            ></SubmitAnswer>
          }
        ></Route>
        <Route
          path="/answer"
          element={
            <Answer
              playerList={playerList}
              correctAnswer={correctAnswer}
              numberOfRounds={numberOfRounds}
            ></Answer>
          }
        ></Route>
        <Route
          path="/result"
          element={
            <Result
              playerList={playerList}
              correctAnswer={correctAnswer}
              numberOfRounds={numberOfRounds}
            ></Result>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
