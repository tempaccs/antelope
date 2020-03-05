import getWinners, {generateRandomLotteryNumbers} from "./lottery"

// @ts-ignore 
const pathToEntries = process.argv[2]

const winningNumbers = generateRandomLotteryNumbers()
getWinners(pathToEntries, winningNumbers)
  .then((winningEntries) => {
    const winnersOutput = winningEntries.map(entry => ({
        ...entry,
        price: "£100"
    }))
    console.log(winningNumbers)
    console.log(winnersOutput)
  }).catch(e => console.error(e))