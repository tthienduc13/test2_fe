import React from "react";
import { Istate as Props } from "../App";
import { Table } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
interface Iprops {
  playerList: Props["playerList"];
  correctAnswer: Props["correctAnswer"];
  setPlayerList: React.Dispatch<React.SetStateAction<Props["playerList"]>>;
}
interface IData {
  id: number;
  playerName: string;
  createAt: string;
  answers: string[];
  results: string[];
  score: number;
}
function Result({ playerList, correctAnswer, setPlayerList }: Iprops) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const calculateScore = (
    answers: string[],
    correctAnswers: string[]
  ): number => {
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === correctAnswers[i]) {
        score++;
      }
    }
    return score;
  };

  useEffect(() => {
    const storedPlayerList = localStorage.getItem("playerList");
    if (storedPlayerList) {
      setPlayerList(JSON.parse(storedPlayerList));
    }
  }, []);
  const data: IData[] = playerList.map((player, index) => {
    const score = calculateScore(player.answer, correctAnswer);
    return {
      id: index + 1,
      playerName: player.playerName,
      createAt: player.createdAt,
      answers: player.answer,
      results: correctAnswer,
      score: score,
    };
  });

  const filteredData: IData[] = playerList
    .map((player, index) => {
      const score = calculateScore(player.answer, correctAnswer);
      return {
        id: index + 1,
        playerName: player.playerName,
        createAt: player.createdAt,
        answers: player.answer,
        results: correctAnswer,
        score: score,
      };
    })
    .filter((item) => item.playerName.includes(searchQuery));
  const handleAgain = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    localStorage.clear();
    navigate("/");
  };
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

  const summaryColumns = [
    {
      title: "Summary",
      dataIndex: "playerName",
    },
    {
      title: "Correct percent",
      dataIndex: "score",
      render: (score: number) => {
        const percent = (score / correctAnswer.length) * 100;
        return `${percent.toFixed(2)}%`;
      },
      sorter: {
        compare: (a: IData, b: IData) => a.score - b.score,
        multiple: 1,
      },
    },
    {
      title: "Total score",
      dataIndex: "score",
      sorter: {
        compare: (a: IData, b: IData) => a.score - b.score,
        multiple: 1,
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px] border-[1px] border-black rounded-md px-2 py-2 outline-none"
          ></input>
        </div>
        <div className="p-10">
          <Table
            columns={columns}
            dataSource={searchQuery ? filteredData : data}
          ></Table>
        </div>
        <div className="p-10 w-1/2">
          <Table columns={summaryColumns} dataSource={data}></Table>
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
