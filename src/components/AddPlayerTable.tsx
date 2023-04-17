import React from "react";

interface AddPlayerTableProps {
  player: string;
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
function AddPlayerTable({
  handleOnchange,
  handleAdd,
  handleCancel,
  player,
}: AddPlayerTableProps) {
  return (
    <>
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
    </>
  );
}

export default AddPlayerTable;
