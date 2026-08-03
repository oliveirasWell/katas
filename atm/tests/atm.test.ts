/*
Test cases 

As a user
I withdraw 434€

Output:

2 bills of 200.
1 bill of 20.
1 bill of 10.
2 coins of 2.


----

Cases to cover bills

500 -> 1 bill of 500.
700 -> 1 bill of 500, 1 bill of 200.
400 -> 2 bills of 200.
150 -> 1 bill of 100, 1 bill of 50.
100 -> 1 bill of 100.
90 -> 1 bill of 50, 2 bills of 20.
65 -> 1 bill of 50, 1 bill of 10, 1 bill of 5.

Cases to cover both bills and coins


*/

import { Atm } from "../atm_machine";

describe("ATM", () => {
    describe("when user withdraw", () => {
        it.each([
        { withdrawAmount: 500, expectedOutput: "1 bill of 500."},
        { withdrawAmount: 700, expectedOutput: "1 bill of 500, 1 bill of 200."},
        { withdrawAmount: 400, expectedOutput: "2 bills of 200."},
        { withdrawAmount: 150, expectedOutput: "1 bill of 100, 1 bill of 50."},
        { withdrawAmount: 100, expectedOutput: "1 bill of 100."},
        { withdrawAmount: 90, expectedOutput: "1 bill of 50, 2 bills of 20."},
        { withdrawAmount: 65, expectedOutput: "1 bill of 50, 1 bill of 10, 1 bill of 5."},
        { withdrawAmount: 434, expectedOutput: "2 bills of 200, 1 bill of 20, 1 bill of 10, 2 coins of 2."},
    ])('should return 500 when user withdraw 500', ({ withdrawAmount, expectedOutput }) => {
            const atm = Atm();

            const output = atm.withdraw(withdrawAmount);

            expect(output).toBe(expectedOutput)    
        })
    })
});
