import { TennisGame as TennisScoreCalculator } from "../tennis_score_calculator";

describe('TennisScoreCalculator', () => {
  describe('should correctly calculate the score for a game in progress', () => {
    it.each([
      { player1Points: 0, player2Points: 0, expected: 'Love-All' },
      { player1Points: 1, player2Points: 0, expected: 'Fifteen-Love' },
      { player1Points: 2, player2Points: 0, expected: 'Thirty-Love' },
      { player1Points: 3, player2Points: 0, expected: 'Forty-Love' },
      { player1Points: 0, player2Points: 1, expected: 'Love-Fifteen' },
      { player1Points: 0, player2Points: 2, expected: 'Love-Thirty' },
      { player1Points: 0, player2Points: 3, expected: 'Love-Forty' },
      { player1Points: 3, player2Points: 3, expected: 'Deuce' },
      { player1Points: 4, player2Points: 4, expected: 'Deuce' },
      { player1Points: 4, player2Points: 3, expected: 'Advantage Player 1' },
      { player1Points: 3, player2Points: 4, expected: 'Advantage Player 2' },
      { player1Points: 5, player2Points: 3, expected: 'Win for Player 1' },
      { player1Points: 3, player2Points: 5, expected: 'Win for Player 2' },
    ])('should return "%s" when both players have %d points', ({expected, player1Points, player2Points}) => {
      const game = TennisScoreCalculator()
      game.setScore(player1Points, player2Points);

      expect(game.getScore()).toBe(expected);
    });
  });
});
