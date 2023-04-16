import React from "react";
import { Istate as Props } from "../App";
import { Button, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
interface Irops {
  playerList: Props["playerList"];
  correctAnswer: Props["correctAnswer"];
}
interface IData {
  id: number;
  playerName: string;
  createAt: string;
  answers: string[];
  results: string[];
  score: number;
}
function Result({ playerList, correctAnswer }: Props) {
  const navigate = useNavigate();
  const [score, setScore] = useState({
    name: "",
    score: 0,
    count: 0,
  });
  const handleAgain = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    localStorage.clear();

    navigate("/");
  };
  const data: IData[] = playerList.map((player, index) => ({
    id: index + 1,
    playerName: player.playerName,
    createAt: player.createdAt,
    answers: player.answer,
    results: correctAnswer,
    score: player.score,
  }));
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      sorter: {
        compare: (a: IData, b: IData) => a.id - b.id,
        multiple: 0,
      },
    },
    {
      title: "Name",
      dataIndex: "playerName",
      sorter: {
        compare: (a: { playerName: string }, b: { playerName: string }) =>
          a.playerName.localeCompare(b.playerName),
        multiple: 1,
      },
    },
    {
      title: "Date",
      dataIndex: "createAt",
      sorter: {
        compare: (a: IData, b: IData) => a.createAt.localeCompare(b.createAt),
        multiple: 0,
      },
    },
    {
      title: "Answers",
      dataIndex: "answers",
      render: (answers: string[]) => answers.join(", "),
    },
    {
      title: "Results",
      dataIndex: "results",
      render: (results: string[]) => results.join(", "),
    },
    {
      title: "Score",
      dataIndex: "score",
      sorter: {
        compare: (a: IData, b: IData) => a.score - b.score,
        multiple: 0,
      },
    },
  ];
  return (
    <>
      <div className="p-2 w-screen flex flex-col gap-8">
        <div className="text-4xl my-16 sm:text-start text-center">
          Yes No Fucking Game
        </div>
        <div className="text-4xl text-center">Final Result</div>
        <div className="self-start flex flex-row sm:justify-start justify-center items-center w-full gap-2">
          <label>Search:</label>
          <input
            placeholder="Player's name"
            className="w-[300px] border-[1px] border-black rounded-md px-2 py-2 outline-none"
          ></input>
        </div>
        <div className="p-10">
          <Table columns={columns} dataSource={data}></Table>
        </div>
        <button
          onClick={(e) => handleAgain(e)}
          className="text-lg py-1 px-4 bg-black text-white mx-auto w-full sm:w-1/4"
        >
          Play again
        </button>
      </div>
    </>
  );
}

export default Result;
