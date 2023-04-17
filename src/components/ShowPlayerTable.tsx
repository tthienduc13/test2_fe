import React from "react";
import { Istate as Props } from "../App";
interface ShowPlayerTableProps {
  playerList: Props["playerList"];
  setNumberOfRounds: React.Dispatch<
    React.SetStateAction<Props["numberOfRounds"]>
  >;
  handleAddMore: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleStartGame: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleDelete: (index: number) => void;
}
function ShowPlayerTable({
  playerList,
  handleDelete,
  handleAddMore,
  setNumberOfRounds,
  handleStartGame,
  handleEnter,
}: ShowPlayerTableProps) {
  return (
    <>
      <div className="flex flex-col w-[400px] mt-20">
        <div className="flex flex-row border-2 border-black">
          <div className="border-r-2 border-black w-1/2 py-2 text-center">
            No.
          </div>
          <div className="w-1/2 py-2 text-center">Player</div>
        </div>
        {playerList.map((player, index) => (
          <div
            key={index}
            className="flex flex-row border-2 border-t-0 border-black"
          >
            <div className="border-r-2 border-black w-1/2 py-2 text-center relative">
              {index + 1}
              <div
                className="flex justify-center items-center absolute top-0 right-[10px] h-full cursor-pointer"
                onClick={() => handleDelete(index)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </div>
            </div>
            <div className="w-1/2 py-2 text-center">{player.playerName}</div>
          </div>
        ))}
        <button
          onClick={(e) => handleAddMore(e)}
          className="py-2 w-[400px] text-center text-white bg-slate-600 mt-4 text-xl"
        >
          Add More Player
        </button>
        <form className="flex flex-col w-[400px] mt-4">
          <label>Total Round</label>
          <div className="flex flex-row">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNumberOfRounds(Number(e.target.value))
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                handleEnter(e)
              }
              placeholder="The Number Of Round..."
              className="w-4/5 border-[1px] border-black rounded-sm outline-none pl-2"
            ></input>
            <button
              onClick={(e) => handleStartGame(e)}
              className={
                playerList.length < 2
                  ? "w-1/5 bg-slate-600 text-white cursor-not-allowed "
                  : "w-1/5 bg-black text-white cursor-pointer"
              }
            >
              Start
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ShowPlayerTable;
