export function isValidInput(input: string): boolean {
  const regex = /^[A-Za-z0-9 ]+$/;
  if (!regex.test(input)) {
    return false;
  }
  if (/^[0-9]/.test(input)) {
    return false;
  }
  return true;
}

export const isValidNumberOfRounds = (value: number): boolean => {
  return typeof value === "number" && value > 0 && value <= 10;
};

 // useEffect(() => {
  //   const roundWinners = rounds.map((roundIndex) => {
  //     const correctAnswers = correctAnswer[roundIndex];
  //     const roundWinner: string[] = [];
  //     console.log(playerList);

  //     playerList.forEach((player) => {
  //       if (player.answer[roundIndex] === correctAnswers) {
  //         roundWinner.push(player.playerName);
  //       }
  //     });

  //     const winner = roundWinner.length > 0 ? roundWinner.join(" & ") : "Empty";

  //     return {
  //       playerName: winner,
  //       round: roundIndex + 1,
  //     };
  //   });
  //   console.log(roundWinners);
  //   setWinners(roundWinners);
  // }, []);
