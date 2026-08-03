import {
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
} from "../sudoku_solver";

const PUZZLE = `
5,3,0,0,7,0,0,0,0
6,0,0,1,9,5,0,0,0
0,9,8,0,0,0,0,6,0
8,0,0,0,6,0,0,0,3
4,0,0,8,0,3,0,0,1
7,0,0,0,2,0,0,0,6
0,6,0,0,0,0,2,8,0
0,0,0,4,1,9,0,0,5
0,0,0,0,8,0,0,7,9`;

const SOLUTION = `
5,3,4,6,7,8,9,1,2
6,7,2,1,9,5,3,4,8
1,9,8,3,4,2,5,6,7
8,5,9,7,6,1,4,2,3
4,2,6,8,5,3,7,9,1
7,1,3,9,2,4,8,5,6
9,6,1,5,3,7,2,8,4
2,8,7,4,1,9,6,3,5
3,4,5,2,8,6,1,7,9`;

const UNSOLVABLE_PUZZLE = `
5,1,6,8,4,9,7,3,2
3,0,7,6,0,5,0,0,0
8,0,9,7,0,0,0,6,5
1,3,5,0,6,0,9,0,7
4,7,2,5,9,1,0,0,6
9,6,8,3,7,0,0,5,0
2,5,3,1,8,6,0,7,4
6,8,4,2,0,7,5,0,0
7,9,1,0,5,0,6,0,8`;

const FOUR_BY_FOUR = `
1,0,0,0
0,0,3,0
0,0,0,2
0,1,0,0`;

describe("Sudoku", () => {
    describe("level 0 - validating a matrix", () => {
        it("accepts a grid without repeated numbers", () => {
            expect(isValid(parse(PUZZLE))).toBe(true);
            expect(isValid(parse(SOLUTION))).toBe(true);
        });

        it("rejects a repeated number in a row, a column or a region", () => {
            const [row, column, region] = [parse(SOLUTION), parse(SOLUTION), parse(SOLUTION)];
            row[0][0] = row[0][1];
            column[0][0] = column[1][0];
            region[0][0] = region[1][1];

            expect(isValid(row)).toBe(false);
            expect(isValid(column)).toBe(false);
            expect(isValid(region)).toBe(false);
        });

        it("rejects grids that are not square, sized to a square, or in range", () => {
            expect(isValid([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).toBe(false);
            expect(isValid([[1, 2], [1, 2, 3, 4]])).toBe(false);
            expect(isValid([[5, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]])).toBe(false);
        });
    });

    describe("level 1 - checking a proposed solution", () => {
        it("accepts a complete solution that keeps the starting numbers", () => {
            expect(solves(parse(PUZZLE), parse(SOLUTION))).toBe(true);
        });

        it("rejects a solution that changes a starting number", () => {
            const tampered = parse(SOLUTION);
            tampered[0][0] = 0;
            tampered[0][2] = 5;

            expect(solves(parse(PUZZLE), tampered)).toBe(false);
        });

        it("rejects an incomplete solution", () => {
            expect(solves(parse(PUZZLE), parse(PUZZLE))).toBe(false);
        });
    });

    describe("level 2 - solving a grid", () => {
        it("solves a 9x9 grid", () => {
            const solved = solve(parse(PUZZLE))!;

            expect(solves(parse(PUZZLE), solved)).toBe(true);
            expect(format(solved)).toBe(SOLUTION.trim());
        });

        it("solves a 4x4 grid", () => {
            const solved = solve(parse(FOUR_BY_FOUR))!;

            expect(solves(parse(FOUR_BY_FOUR), solved)).toBe(true);
        });

        it("reports a grid that cannot be solved", () => {
            expect(solve(parse(UNSOLVABLE_PUZZLE))).toBeNull();
            expect(solveCsv(UNSOLVABLE_PUZZLE)).toBe(UNSOLVABLE);
        });

        it("reports a grid that already breaks the rules", () => {
            const broken = parse(PUZZLE);
            broken[0][2] = 5;

            expect(solveCsv(format(broken))).toBe(UNSOLVABLE);
        });
    });

    describe("level 3 - generating a grid", () => {
        it("generates a valid grid with the requested blanks", () => {
            const grid = generate(9, 40)!;
            const blanks = grid.flat().filter((value) => value === 0).length;

            expect(isValid(grid)).toBe(true);
            expect(blanks).toBe(40);
            expect(solves(grid, solve(grid)!)).toBe(true);
        });

        it("generates a complete grid when no blanks are requested", () => {
            expect(isComplete(generate(4, 0)!)).toBe(true);
        });

        it("reports requirements it cannot satisfy", () => {
            expect(generate(5, 0)).toBeNull();
            expect(generate(9, 82)).toBeNull();
            expect(generateCsv(9, 82)).toBe(NOT_GENERATABLE);
        });
    });
});
