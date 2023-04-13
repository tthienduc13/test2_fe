import React, { useState } from "react";
import { Istate as Props } from "../App";
import { useNavigate } from "react-router";
import { isValidInput, isValidNumberOfRounds } from "../utils";
interface Iprops {
  playerList: Props["playerList"];
  setPlayerList: React.Dispatch<React.SetStateAction<Props["playerList"]>>;
  numberOfRounds: Props["numberOfRounds"];
  setNumberOfRounds: React.Dispatch<
    React.SetStateAction<Props["numberOfRounds"]>
  >;
}
function CreateGame({
  playerList,
  setPlayerList,
  numberOfRounds,
  setNumberOfRounds,
}: Iprops) {
  const navigate = useNavigate();
  const [player, setPlayer] = useState<string>("");
  const [showPlayerTable, setShowPlayerTable] = useState<boolean>(false);
  const [showAddPlayerTable, setShowAddPlayerTable] = useState<boolean>(true);
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer(e.target.value);
  };
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    addPlayer();
  };
  const handleAddMore = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (playerList.length < 2) {
      setShowPlayerTable(!showPlayerTable);
      setShowAddPlayerTable(!showAddPlayerTable);
    }
  };
  const addPlayer = () => {
    if (isValidInput(player) && playerList.length < 2) {
      setPlayerList([...playerList, player]);
      setPlayer("");
      setShowPlayerTable(!showPlayerTable);
      setShowAddPlayerTable(!showAddPlayerTable);
    } else if (!isValidInput(player)) {
      alert("Player's name is not valid!");
    }
  };
  const handleStartGame = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (playerList.length === 2 && isValidNumberOfRounds(numberOfRounds)) {
      navigate("/submit-answer");
    } else if (!isValidNumberOfRounds(numberOfRounds)) {
      alert("Please enter a number!");
    }
  };
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowPlayerTable(!showPlayerTable);
    setShowAddPlayerTable(!showAddPlayerTable);
  };
  const handleDelete = (index: number) => {
    console.log(index);
    const newPlayerList = playerList.filter((value, id) => index !== id);
    setPlayerList(newPlayerList);
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      addPlayer();
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl mt-20">Yes No WTF Game</h1>
      <div className="text-xl mt-8 w-[800px] text-center">
        Yes or No is a fun and addicting game, perfect for playing on your own
        or with friends or family, This game contains hundreds of the best hand
        picked Yes or No questions. Vote which option you prefer and view real
        time statistics on what option was the most popular.
      </div>
      {/* Show player table */}
      {showPlayerTable && (
        <div className="flex flex-col w-[400px] mt-20">
          <div className="flex flex-row border-2 border-black">
            <div className="border-r-2 border-black w-1/2 py-2 text-center">
              No.
            </div>
            <div className="w-1/2 py-2 text-center">Player</div>
          </div>
          {playerList.map((player, index) => (
            <div className="flex flex-row border-2 border-t-0 border-black">
              <div className="border-r-2 border-black w-1/2 py-2 text-center relative">
                {index + 1}
                <div
                  className="flex justify-center items-center absolute top-0 right-[10px] h-full cursor-pointer"
                  onClick={() => handleDelete(index)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </div>
              </div>
              <div className="w-1/2 py-2 text-center">{player}</div>
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
      )}
      {/* Add player table */}
      {showAddPlayerTable && (
        <div className="flex flex-col border-2 border-black mt-20 w-[400px]">
          <p className="py-2 text-2xl text-center border-b-2 border-black ">
            Please Enter A New Game
          </p>
          <form className="p-4 flex flex-col">
            <label>New game</label>
            <input
              placeholder="Enter name..."
              className="border-[1px] border-black rounded-sm px-2 py-1 outline-none"
              onChange={(e) => handleOnchange(e)}
              value={player}
            ></input>
            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 border-[1px] border-slate-700"
                onClick={(e) => handleAdd(e)}
              >
                Ok
              </button>
              <button
                onClick={(e) => handleCancel(e)}
                className="flex-1 border-[1px] border-slate-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateGame;
