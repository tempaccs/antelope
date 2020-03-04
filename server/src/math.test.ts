import { sum } from "./math"

describe("math", () => {
    it("should sum up", () => {
        const actualSum = sum(1, 3)
        expect(actualSum).toBe(4)
    })
})