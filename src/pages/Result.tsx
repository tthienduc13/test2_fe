import React from "react";
import { Istate as Props } from "../App";
interface Irops {
  playerList: Props["playerList"];
  correctAnswer: Props["correctAnswer"];
}
function Result({ playerList, correctAnswer }: Props) {
  return (
    <>
      <div className="p-2 w-screen flex flex-col gap-8">
        <div className="text-4xl my-16 sm:text-start text-center">
          Yes No Fucking Game
        </div>
        <div className="text-4xl text-center">Final Result</div>
        <div className="self-start flex flex-row sm:justify-start justify-center items-center w-full gap-2">
          <label>Search:</label>
          <input
            placeholder="Player's name"
            className="w-[300px] border-[1px] border-black rounded-md px-2 py-2 outline-none"
          ></input>
        </div>
        {playerList.map((player, index) => (
          <>
            <div>name:{player.playerName}</div>
            <div>Answer:{player.answer}</div>
            <div>Result: {correctAnswer}</div>
          </>
        ))}
      </div>
    </>
  );
}

export default Result;
