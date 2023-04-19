import React, { useState } from "react";
import { Istate as Props } from "../App";
import { useNavigate } from "react-router";
import { isValidInput, isValidNumberOfRounds } from "../utils";
import AddPlayerTable from "../components/AddPlayerTable";
import ShowPlayerTable from "../components/ShowPlayerTable";
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
      const createdAt =
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().toLocaleTimeString();
      setPlayerList([
        ...playerList,
        { playerName: player, answer: [], score: 0, createdAt, result: [] },
      ]);
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
      alert("Please enter a number between 0 and 10!");
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
        <ShowPlayerTable
          playerList={playerList}
          handleDelete={handleDelete}
          handleAddMore={handleAddMore}
          handleEnter={handleEnter}
          handleStartGame={handleStartGame}
          setNumberOfRounds={setNumberOfRounds}
        ></ShowPlayerTable>
      )}
      {/* Add player table */}
      {showAddPlayerTable && (
        <AddPlayerTable
          player={player}
          handleOnchange={handleOnchange}
          handleAdd={handleAdd}
          handleCancel={handleCancel}
        ></AddPlayerTable>
      )}
    </div>
  );
}

export default CreateGame;
