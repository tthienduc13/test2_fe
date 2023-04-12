import React from "react";

function Home() {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-3xl mt-20">Yes No WTF Game</h1>
        <div className="text-xl mt-8 w-[800px] text-center">
          Yes or No is a fun and addicting game, perfect for playing on your own
          or with friends or family, This game contains hundreds of the best
          hand picked Yes or No questions. Vote which option you prefer and view
          real time statistics on what option was the most popular.
        </div>
        <a href="/create-game">
          <button className="text-white bg-slate-800 px-4 py-2 hover:opacity-80 mt-14">
            Start Game
          </button>
        </a>
      </div>
    </>
  );
}

export default Home;
