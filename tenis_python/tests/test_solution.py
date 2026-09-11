import pytest
from solution import solve

@pytest.mark.parametrize("score_1,score_2,expected", [
    (0, 0, "Love-All"),
    (1, 0, "Fifteen-Love"),
    (2, 0, "Thirty-Love"),
    (3, 3, "Deuce"),
    (4, 4, "Deuce"),
    (3, 4, "Advantage player 2"),
    (4, 5, "Advantage player 2"),
    (4, 3, "Advantage player 1"),
    (5, 4, "Advantage player 1"),
    (4, 0, "Player 1 wins"),
    (0, 4, "Player 2 wins"),
])
def test_returns_love_when_scores_are_zero(score_1, score_2, expected):
    assert solve(score_1, score_2) == expected