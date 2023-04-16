import React from "react";

function Home() {
  return (
    <>
      <div className="max-w-[800px] flex flex-col items-center mx-auto">
        <h1 className="text-4xl py-20 text-center px-2">Yes No WTF Game</h1>
        <div className="text-center mb-20 px-2">
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
