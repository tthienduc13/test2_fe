import React from "react";

function CreateGame() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl mt-20">Yes No WTF Game</h1>
      <div className="text-xl mt-8 w-[800px] text-center">
        Yes or No is a fun and addicting game, perfect for playing on your own
        or with friends or family, This game contains hundreds of the best hand
        picked Yes or No questions. Vote which option you prefer and view real
        time statistics on what option was the most popular.
      </div>
      <div className="flex flex-col border-2 border-black mt-20 w-[400px]">
        <p className="py-2 text-2xl text-center border-b-2 border-black ">
          Please Enter A New Game
        </p>
        <form className="p-4 flex flex-col">
          <label>New game</label>
          <input
            placeholder="Enter name..."
            className="border-[1px] border-black rounded-sm px-2 py-1 outline-none"
          ></input>
          <div className="flex gap-2 mt-4">
            <button className="flex-1 border-[1px] border-slate-700">Ok</button>
            <button className="flex-1 border-[1px] border-slate-700">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGame;
