import React from "react";
import { useNavigate } from "react-router";
function Answer() {
  const navigate = useNavigate();
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
          <div className="text-lg text-red-500">duc</div>
          <div className="text-lg text-green-500">thang</div>
        </div>
        <div className="flex sm:flex-row flex-col flex-wrap w-full justify-start sm:gap-10 gap-2 sm:mb-8 mb-2">
          <div className="sm:w-[30%] w-full flex flex-col justify-center">
            <span> Round 1:</span>
            <div className="flex flex-col p-2 bg-[#d5d5d5] mt-1">
              <p className="text-lg">Result: NO</p>
              <div className="text-lg flex-row flex">
                Winner:
                <div className="text-lg text-red-500">duc</div>
                <div className="text-lg text-green-500">thang</div>
              </div>
            </div>
          </div>
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
