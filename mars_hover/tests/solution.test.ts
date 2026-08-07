/*
Examples
 - given an input 'MMRMMLM' then the output should be '2:3:N'
 - given an input 'MMMMMMMMMM' gives output '0:0:N' (due to wrap-around)



Doing two commands in chain 

 Given I am on the position 0:0:N
 when I receive the command M
 then I should move to 0:1:N 

 Given I am on the position 0:0:N
 when I receive the command L
 then I should move to 0:0:W 

Given I am on the position 0:0:N
 when I receive the command R
 then I should move to 0:0:E 

 -> Parse the string
 -> Rotate and understand where we are facing
 -> Move forward to the right position
  
*/

import { MarsRover } from "../solution";

describe("MarsRover", () => {
    describe("execute a command", () => {
        it("receives the M command it should move forward", () => {
            const marsRover = MarsRover();

            const output = marsRover.execute("M");
            const expected = "0:1:N";

            expect(output).toEqual(expected);
        })

        it("receives the L command it should turn left", () => {
            const marsRover = MarsRover();

            const output = marsRover.execute("L");
            const expected = "0:0:W";

            expect(output).toEqual(expected);
        })

        it("receives the R command it should turn right", () => {
            const marsRover = MarsRover();

            const output = marsRover.execute("R");
            const expected = "0:0:E";

            expect(output).toEqual(expected);
        })

        it("receives the LL command it should face South", () => {
            const marsRover = MarsRover();

            const output = marsRover.execute("LL");
            const expected = "0:0:S";

            expect(output).toEqual(expected);
        })

        it("receives the RRR command it should face West", () => {
            const marsRover = MarsRover();

            const output = marsRover.execute("RRR");
            const expected = "0:0:W";

            expect(output).toEqual(expected);
        })

        it("receives the MM command it should move forward twice", () => {
            const marsRover = MarsRover();

            const output = marsRover.execute("MM");
            const expected = "0:2:N";

            expect(output).toEqual(expected);
        })

        it("receives the MMRMMLM command output should be '2:3:N'", () => {
            const marsRover = MarsRover();

            const output = marsRover.execute("MMRMMLM");
            const expected = "2:3:N";

            expect(output).toEqual(expected);
        })
        it("receives the MMMMMMMMMM command output should be '2:3:N'", () => {
            const marsRover = MarsRover();

            const output = marsRover.execute("MMMMMMMMMM");
            const expected = "0:0:N";

            expect(output).toEqual(expected);
        })


    })
});
