const SCORE_MAP: { [key: number]: string } = {
    0: "Love",
    1: "Fifteen",
    2: "Thirty",
    3: "Forty"
};

type Score = { player1: number; player2: number };

type ScoreStrategy = {
    appliesTo: (score: Score) => boolean;
    format: (score: Score) => string;
};

const leader = ({ player1, player2 }: Score): string => (player1 > player2 ? "1" : "2");

const POINTS: ScoreStrategy = {
    appliesTo: () => true,
    format: ({ player1, player2 }) => `${SCORE_MAP[player1]}-${SCORE_MAP[player2]}`
};

const STRATEGIES: ScoreStrategy[] = [
    {
        appliesTo: ({ player1, player2 }) => player1 === 0 && player2 === 0,
        format: () => "Love-All"
    },
    {
        appliesTo: ({ player1, player2 }) => player1 === player2 && player1 >= 3,
        format: () => "Deuce"
    },
    {
        appliesTo: ({ player1, player2 }) =>
            (player1 >= 4 || player2 >= 4) && Math.abs(player1 - player2) === 1,
        format: (score) => `Advantage Player ${leader(score)}`
    },
    {
        appliesTo: ({ player1, player2 }) =>
            (player1 > 3 || player2 > 3) && Math.abs(player1 - player2) >= 2,
        format: (score) => `Win for Player ${leader(score)}`
    }
];

const TennisScoreCalculator = () => {
    let score: Score = { player1: 0, player2: 0 };

    return {
        setScore: (player1Points: number, player2Points: number) => {
            score = { player1: player1Points, player2: player2Points };
        },
        getScore: (): string =>
            (STRATEGIES.find((strategy) => strategy.appliesTo(score)) ?? POINTS).format(score)
    };
};

export { TennisScoreCalculator as TennisGame }
