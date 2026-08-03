type Grid = number[][];

const UNSOLVABLE = "The Sudoku is not solvable.";
const NOT_GENERATABLE = "The Sudoku cannot be generated with those requirements.";

const parse = (csv: string): Grid =>
    csv
        .trim()
        .split("\n")
        .map((line) => line.split(",").map((cell) => Number(cell.trim()) || 0));

const format = (grid: Grid): string => grid.map((row) => row.join(",")).join("\n");

const boxSizeOf = (grid: Grid): number => Math.sqrt(grid.length);

const hasShape = (grid: Grid): boolean =>
    grid.length > 0 &&
    Number.isInteger(boxSizeOf(grid)) &&
    grid.every(
        (row) =>
            row.length === grid.length &&
            row.every((value) => Number.isInteger(value) && value >= 0 && value <= grid.length)
    );

const groupsOf = (grid: Grid): number[][] => {
    const box = boxSizeOf(grid);
    const columns = grid.map((_, col) => grid.map((row) => row[col]));
    const boxes = grid.map((_, index) =>
        grid.map(
            (_, cell) =>
                grid[Math.floor(index / box) * box + Math.floor(cell / box)][
                    (index % box) * box + (cell % box)
                ]
        )
    );
    return [...grid, ...columns, ...boxes];
};

const isValid = (grid: Grid): boolean =>
    hasShape(grid) &&
    groupsOf(grid).every((group) => {
        const filled = group.filter((value) => value > 0);
        return new Set(filled).size === filled.length;
    });

const isComplete = (grid: Grid): boolean => grid.every((row) => row.every((value) => value > 0));

const solves = (start: Grid, solution: Grid): boolean =>
    start.length === solution.length &&
    isValid(solution) &&
    isComplete(solution) &&
    start.every((row, r) => row.every((value, c) => value === 0 || value === solution[r][c]));

const canPlace = (grid: Grid, row: number, col: number, value: number): boolean => {
    const box = boxSizeOf(grid);
    const boxRow = Math.floor(row / box) * box;
    const boxCol = Math.floor(col / box) * box;

    return (
        !grid[row].includes(value) &&
        grid.every((cells) => cells[col] !== value) &&
        grid
            .slice(boxRow, boxRow + box)
            .every((cells) => !cells.slice(boxCol, boxCol + box).includes(value))
    );
};

const shuffled = (values: number[]): number[] => {
    for (let index = values.length - 1; index > 0; index--) {
        const other = Math.floor(Math.random() * (index + 1));
        [values[index], values[other]] = [values[other], values[index]];
    }
    return values;
};

// ponytail: backtracking on the first empty cell, no MRV/constraint propagation.
// Fine up to 9x9; add a heuristic if 16x16 grids show up.
const search = (grid: Grid, random: boolean): boolean => {
    const row = grid.findIndex((cells) => cells.includes(0));
    if (row === -1) return true;

    const col = grid[row].indexOf(0);
    const values = Array.from({ length: grid.length }, (_, index) => index + 1);

    for (const value of random ? shuffled(values) : values) {
        if (!canPlace(grid, row, col, value)) continue;
        grid[row][col] = value;
        if (search(grid, random)) return true;
        grid[row][col] = 0;
    }

    return false;
};

const solve = (grid: Grid, random = false): Grid | null => {
    if (!isValid(grid)) return null;

    const working = grid.map((row) => [...row]);
    return search(working, random) ? working : null;
};

const generate = (size: number, blanks: number): Grid | null => {
    if (!Number.isInteger(size) || size <= 0 || !Number.isInteger(Math.sqrt(size))) return null;
    if (!Number.isInteger(blanks) || blanks < 0 || blanks > size * size) return null;

    const grid = solve(
        Array.from({ length: size }, () => Array<number>(size).fill(0)),
        true
    );
    if (!grid) return null;

    shuffled(Array.from({ length: size * size }, (_, index) => index))
        .slice(0, blanks)
        .forEach((cell) => (grid[Math.floor(cell / size)][cell % size] = 0));

    return grid;
};

const solveCsv = (csv: string): string => {
    const solved = solve(parse(csv));
    return solved ? format(solved) : UNSOLVABLE;
};

const generateCsv = (size: number, blanks: number): string => {
    const grid = generate(size, blanks);
    return grid ? format(grid) : NOT_GENERATABLE;
};

export {
    Grid,
    UNSOLVABLE,
    NOT_GENERATABLE,
    parse,
    format,
    isValid,
    isComplete,
    solves,
    solve,
    generate,
    solveCsv,
    generateCsv
};
