const SCORE_MAP: { [key: number]: string } = {
    0: "Love",
    1: "Fifteen",
    2: "Thirty",
    3: "Forty"
};

const TennisScoreCalculator = () => {
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;

    const setScore = (player1Points: number, player2Points: number) => {
        scorePlayer1 = player1Points;
        scorePlayer2 = player2Points;
    };

    const scoreToString = (score: number): string => {
        return SCORE_MAP[score];
    }

    const isLoveAll = (): boolean => {
        return scorePlayer1 === 0 && scorePlayer2 === 0;
    };

    const isDeuce = (): boolean => {
        return scorePlayer1 === scorePlayer2 && scorePlayer1 >= 3;
    };

    const isAdvantage = (): boolean => {
        return (scorePlayer1 >= 3 || scorePlayer2 >= 3) && Math.abs(scorePlayer1 - scorePlayer2) === 1;
    };

    const isWin = (): boolean => {
        return (scorePlayer1 > 3 || scorePlayer2 > 3) && Math.abs(scorePlayer1 - scorePlayer2) >= 2;
    };

    const getScore = (): string => {
        if (isLoveAll()) {
            return "Love-All";
        }
        if (isDeuce()) {
            return "Deuce";
        }
        if (isAdvantage()) {
            return "Advantage Player " + (scorePlayer1 > scorePlayer2 ? "1" : "2");
        }
        if (isWin()) {
            return "Win for Player " + (scorePlayer1 > scorePlayer2 ? "1" : "2");
        }

        return `${scoreToString(scorePlayer1)}-${scoreToString(scorePlayer2)}`;
    };

    return {
        setScore,
        getScore
    };
};

export { TennisScoreCalculator as TennisGame }