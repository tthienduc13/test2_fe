import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Istate as Props } from "../App";

interface Iprops {
  playerList: Props["playerList"];
  numberOfRounds: Props["numberOfRounds"];
  setPlayerList: React.Dispatch<React.SetStateAction<Props["playerList"]>>;
  correctAnswer: Props["correctAnswer"];
  setCorrectAnswer: React.Dispatch<
    React.SetStateAction<Props["correctAnswer"]>
  >;
}
function Answer({
  playerList,
  numberOfRounds,
  setPlayerList,
  correctAnswer,
  setCorrectAnswer,
}: Iprops) {
  const navigate = useNavigate();
  const rounds = Array.from(Array(numberOfRounds).keys());
  const [winners, setWinners] = useState<string[]>([]);
  const getWinnerList = () => {
    const matches = [];
    for (let i = 0; i < rounds.length; i++) {
      matches.push(getCurrentWinner(i));
    }
    setWinners(matches);
  };
  console.log(playerList[0].answer);
  const getCurrentWinner = (i: number) => {
    const result: string[] = [];
    playerList.map((player) => {
      console.log(correctAnswer[i]);
      if (player.answer[i] === correctAnswer[i]) {
        result.push(player.playerName);
        console.log(result);
      }
    });

    return result.join(" , ");
  };

  useEffect(() => {
    localStorage.setItem("playerList", JSON.stringify(playerList));
    localStorage.setItem("correctAnswer", JSON.stringify(correctAnswer));
    getWinnerList();
  }, [correctAnswer, playerList]);
  const handleSummary = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    navigate("/result");
  };
  return (
    <>
      <div className="w-full h-full p-4 ">
        <div className="text-4xl my-16 sm:text-start text-center">
          Yes No Fucking Game
        </div>
        <div className="flex flex-row text-lg items-end justify-center sm:justify-start font-medium mb-16">
          <p className="text-lg">Player:</p>
          {playerList.map((player, index) => (
            <>
              <div
                className="text-lg"
                style={{ color: index === 0 ? "red" : "green" }}
              >
                {player.playerName}
                {index === 0 ? ", " : ""}
              </div>
            </>
          ))}
        </div>
        <div className="flex sm:flex-row flex-col flex-wrap w-full justify-start sm:gap-10 gap-2 sm:mb-8 mb-2">
          {rounds.map((round, index) => (
            <div
              key={index}
              className="sm:w-[30%] w-full flex flex-col justify-center"
            >
              <span> Round {index + 1}:</span>
              <div className="flex flex-col p-2 bg-[#d5d5d5] mt-1">
                <p className="text-lg uppercase">
                  Result: {correctAnswer[index]}
                </p>
                <div className="text-lg flex-row flex">
                  Winner: <p>{winners[index] || "Empty"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={(e) => handleSummary(e)}
          className="text-lg py-1 px-4 bg-black text-white mx-auto w-full sm:w-1/4"
        >
          Summary
        </button>
      </div>
    </>
  );
}

export default Answer;
