import getWinners, { generateRandomLotteryNumbers } from "./lottery"

describe("lottery", () => {
    it("generate random number", () => {
        const actualNumbers = generateRandomLotteryNumbers()
        expect(actualNumbers.length).toBe(6)
    })

    it("should determine winners", async () => {
        const actualWinningEntries = await getWinners("/home/belvos/antelope/server/src/entries.csv", [1,2,3,4,5,6])
        const expectedWinningEntries =     [
            { name: 'Cheyanne Jerde Jr.', numbers: [ 1, 2, 3, 8, 4, 9 ] },
            { name: 'Mrs. Jared Huel', numbers: [ 1, 2, 3, 4, 5, 6 ] },
            { name: 'Vincenzo Schinner', numbers: [ 1, 2, 6, 7, 5, 6 ] },
            { name: 'Taya Rodriguez', numbers: [ 1, 9, 3, 7, 5, 3 ] }
        ]        
        expect(actualWinningEntries).toEqual(expectedWinningEntries)  
    })
})