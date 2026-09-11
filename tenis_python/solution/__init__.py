
SCORE_MAP = {
    0: "Love",
    1: "Fifteen",
    2: "Thirty",
    3: "Forty"
}

def solve(score_1: int, score_2: int) -> str:
    if score_1 == score_2 and score_1 >= 3:
        return "Deuce"

    if score_1 == 0 and score_2 == 0:
        return "Love-All"

    if score_1 > 3 or score_2 > 3: 
        if score_1 - score_2 == 1:
            return "Advantage player 1"
        if score_2 - score_1 == 1:
            return "Advantage player 2"

    if score_1 >= 4 or score_2 >= 4:
        if score_1 - score_2 >= 2:
            return "Player 1 wins"
        if score_2 - score_1 >= 2:
            return "Player 2 wins"

    print_score_1 = SCORE_MAP.get(score_1, str(score_1))
    print_score_2 = SCORE_MAP.get(score_2, str(score_2))

    return f"{print_score_1}-{print_score_2}"
