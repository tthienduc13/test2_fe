import React, { useState } from "react";
import { Istate as Props } from "../App";
import { useNavigate } from "react-router";
interface Iprops {
  playerList: Props["playerList"];
  numberOfRounds: Props["numberOfRounds"];
}
function SubmitAnswer({ playerList, numberOfRounds }: Iprops) {
  const navigate = useNavigate();
  const [playerIndex, setPlayerIndex] = useState<number>(1);
  const [active, setActive] = useState<boolean>(false);
  const rounds = Array.from(Array(numberOfRounds).keys());
  const handleSubmit = () => {
    const nextPlayerIndex = (playerIndex + 1) % playerList.length;
    setPlayerIndex(nextPlayerIndex);
    if (nextPlayerIndex === 0) {
      navigate("/");
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
                <div className="text-lg mb-16 sm:text-start text-center">
                  <p className="text-lg font-medium">{player}'s turn</p>
                </div>
                <div className="flex sm:flex-row flex-col flex-wrap w-full justify-start sm:gap-10 gap:2 sm:mb-8 mb-2">
                  {rounds.map((round, index) => (
                    <div className="sm:w-[30%] w-full flex flex-col sm:mb-8 mb-2">
                      <span>Round {index + 1}:</span>
                      <div className="flex flex-row justify-between">
                        <button className="w-[49%] text-green-500 text-lg px-2 py-1 border-2 border-black">
                          <i className="fa-solid fa-check mr-2"></i>
                          Yes
                        </button>
                        <button className="w-[49%] text-red-500 text-lg px-2 py-1 border-2 border-black">
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
