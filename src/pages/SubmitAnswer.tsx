import React, { useState, useEffect } from "react";
import { Istate as Props } from "../App";
import { useNavigate } from "react-router";
import { getResult } from "../apis";

interface Iprops {
  playerList: Props["playerList"];
  numberOfRounds: Props["numberOfRounds"];
  setCorrectAnswer: React.Dispatch<
    React.SetStateAction<Props["correctAnswer"]>
  >;
  correctAnswer: Props["correctAnswer"];
  setPlayerList: React.Dispatch<React.SetStateAction<Props["playerList"]>>;
}

function SubmitAnswer({
  playerList,
  numberOfRounds,
  setCorrectAnswer,
  correctAnswer,
  setPlayerList,
}: Iprops) {
  const navigate = useNavigate();
  const [playerIndex, setPlayerIndex] = useState<number>(0);
  const rounds = Array.from(Array(numberOfRounds).keys());
  const [userResponse, setUserResponse] = useState(
    rounds.map((index) => ({ index, response: "" }))
  );

  const handleClick = (index: number, response: string) => {
    const updatedUserResponse = [...userResponse];
    updatedUserResponse[index] = { index: index, response: response };
    setUserResponse(updatedUserResponse);

    const updatedPlayerList = [...playerList]; //get a copy array
    const currentPlayer = updatedPlayerList[playerIndex]; //choose the current player
    currentPlayer.answer = [...currentPlayer.answer];
    currentPlayer.answer[index] = response;
    updatedPlayerList[playerIndex] = currentPlayer;
    setPlayerList(updatedPlayerList);
  };

  const handleSubmit = async () => {
    const nextPlayerIndex = (playerIndex + 1) % playerList.length;
    setPlayerIndex(nextPlayerIndex);

    if (nextPlayerIndex === 0) {
      try {
        const correctAnswers: string[] = [];
        for (let i = 0; i < rounds.length; i++) {
          const answer = await getResult();
          correctAnswers.push(answer);
        }
        setCorrectAnswer(correctAnswers);
        navigate("/answer");
      } catch (error) {
        console.log(error);
        alert(
          "An error occurred while fetching the data. Please try again later."
        );
      }
    }
  };

  return (
    <>
      <div className="w-full h-full p-4 ">
        <div className="text-4xl my-16 sm:text-start text-center">
          Yes No Fucking Game
        </div>
        {playerList.map((player, index) => (
          <>
            {index === playerIndex && (
              <>
                <div
                  key={index}
                  className="text-lg mb-16 sm:text-start text-center"
                >
                  <p className="text-lg font-medium">
                    {player.playerName}'s turn
                  </p>
                </div>
                <div className="flex sm:flex-row flex-col flex-wrap w-full justify-start sm:gap-10 gap:2 sm:mb-8 mb-2">
                  {rounds.map((round, index) => (
                    <div className="sm:w-[30%] w-full flex flex-col sm:mb-8 mb-2">
                      <span>Round {index + 1}:</span>
                      <div className="flex flex-row justify-between">
                        <button
                          className="w-[49%] text-green-500 text-lg px-2 py-1 border-2 border-black"
                          onClick={() => handleClick(index, "Yes")}
                        >
                          <i className="fa-solid fa-check mr-2"></i>
                          Yes
                        </button>
                        <button
                          className="w-[49%] text-red-500 text-lg px-2 py-1 border-2 border-black"
                          onClick={() => handleClick(index, "No")}
                        >
                          <i className="fa-solid fa-xmark mr-2"></i>
                          No
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSubmit}
                  className="text-lg py-1 px-4 bg-black text-white mx-auto w-full sm:w-1/4"
                >
                  Submit Answer
                </button>
              </>
            )}
          </>
        ))}
      </div>
    </>
  );
}

export default SubmitAnswer;
