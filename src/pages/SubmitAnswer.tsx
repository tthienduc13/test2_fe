import React, { useState, useEffect, useMemo } from "react";
import { Istate as Props } from "../App";
import { useNavigate } from "react-router";
import axios from "axios";

interface Iprops {
  playerList: Props["playerList"];
  numberOfRounds: Props["numberOfRounds"];
  setPlayerList: React.Dispatch<React.SetStateAction<Props["playerList"]>>;
  correctAnswer: Props["correctAnswer"];
  setCorrectAnswer: React.Dispatch<
    React.SetStateAction<Props["correctAnswer"]>
  >;
}

function SubmitAnswer({
  playerList,
  numberOfRounds,
  setPlayerList,
  correctAnswer,
  setCorrectAnswer,
}: Iprops) {
  const navigate = useNavigate();
  const [playerIndex, setPlayerIndex] = useState<number>(0);
  const [userResponse, setUserResponse] = useState<string[]>(
    Array(numberOfRounds)
  );

  const [selectedChoices, setSelectedChoices] = useState<string[]>(
    Array(numberOfRounds).fill("")
  );
  const rounds = Array.from(Array(numberOfRounds).keys());
  console.log(playerIndex);
  const getAnswers = async () => {
    try {
      const responses = await Promise.all(
        rounds.map(() => axios.get("https://yesno.wtf/api"))
      );
      const data = responses.map((response) =>
        response.data.answer.toUpperCase()
      );
      setCorrectAnswer(data);
      setPlayerList((prevList) =>
        prevList.map((player, index) => ({
          ...player,
          result: data[index],
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (playerIndex < playerList.length - 1) {
      const updatedPlayerList = [...playerList];
      updatedPlayerList[playerIndex].answer = userResponse;
      setPlayerList(updatedPlayerList);
      setSelectedChoices([]);
      setPlayerIndex(playerIndex + 1);
      setUserResponse(Array.from({ length: numberOfRounds }, () => "Empty"));
    } else {
      const updatedPlayerList = [...playerList];
      updatedPlayerList[playerIndex].answer = userResponse;
      setPlayerList(updatedPlayerList);

      setPlayerIndex(0);
      setUserResponse(Array.from({ length: numberOfRounds }, () => "Empty"));

      getAnswers();
      navigate("/answer");
    }
  };
  console.log(playerList);
  const handleChoice = (index: number, choice: string) => {
    setSelectedChoices((prevSelectedChoices) => {
      const newSelectedChoices = [...prevSelectedChoices];
      newSelectedChoices[index] = choice;
      return newSelectedChoices;
    });
    let newList = [...userResponse];
    if (userResponse[index] === choice) {
      newList[index] = "Empty";
      setUserResponse(newList);
    } else {
      newList[index] = choice.toUpperCase();
      setUserResponse(newList);
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
                          className={`w-[49%] text-lg px-2 py-1 border-2 border-black ${
                            selectedChoices[index] === "Yes"
                              ? "bg-green-500 text-white"
                              : ""
                          }`}
                          onClick={() => handleChoice(index, "Yes")}
                        >
                          <i className="fa-solid fa-check mr-2"></i>
                          Yes
                        </button>
                        <button
                          className={`w-[49%] text-lg px-2 py-1 border-2 border-black ${
                            selectedChoices[index] === "No"
                              ? "bg-red-500 text-white"
                              : ""
                          }`}
                          onClick={() => handleChoice(index, "No")}
                        >
                          <i className="fa-solid fa-xmark mr-2"></i>
                          No
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={(e) => handleSubmit(e)}
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
