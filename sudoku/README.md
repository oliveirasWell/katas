Summary
Sudoku is a number-placement puzzle: fill a 9x9 grid with digits so that each row, each column and each of the nine 3x3 regions contain all of the digits from 1 to 9, with no repetitions.

The kata grows in four levels, each one reusing the previous.

Level 0 - Warming up
Validate whether a given matrix complies with the Sudoku rules.

Level 1
Given a starting grid and a proposed solution, tell whether the solution solves it.

Level 2
Solve a partially filled grid, or answer "The Sudoku is not solvable."

Level 3
Generate a solvable grid given a dimension and a number of blank spaces, or answer that the requirements cannot be satisfied.

Hints
Start with a smaller grid (4x4) and generalise from there. Cover the rules with tests before optimising the algorithm.

Interface
```
parse(csv), format(grid)
isValid(grid)
solves(start, solution)
solve(grid) | solveCsv(csv)
generate(size, blanks) | generateCsv(size, blanks)
```
