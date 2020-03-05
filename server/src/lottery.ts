import * as csv from "csv-parser";
// @ts-ignore
import * as fs from "fs";

type RawEntry = {
  name: string;
  numbers: string;
};

type Entry = {
  name: string;
  numbers: Array<number>;
};

const readCSV = (pathToFile: string): Promise<Array<{}>> => new Promise((resolve, reject) => {
  const dataList: Array<{}> = []
  fs.createReadStream(pathToFile)
    .pipe(csv())
    .on("data", data => dataList.push(data))
    .on("error", error => reject(error))
    .on("end", () => resolve(dataList));
    
})

export const generateRandomLotteryNumbers = (): Array<number> => {
  const winningNumbers = [];
  for (let i = 0; i < 6; i++) {
    winningNumbers.push(Math.floor(Math.random() * Math.floor(9)) + 1);
  }
  return winningNumbers;
};

const getAmountMatches = (winningNumbers: Array<number>, selectedNumbers: Array<number>): number => selectedNumbers.reduce(
  (amountMatches, curNumber, idx) => {
    const isMatch = curNumber === winningNumbers[idx];  
    return isMatch ? amountMatches + 1 : amountMatches;
  },
  0
)

const turnRawEntryToEntry = (entry: RawEntry): Entry => ({
  ...entry,
  numbers: JSON.parse(entry.numbers)
})

export const getWinners = async (
  pathToEntries: string,
  winningsNumbers: Array<number>,
) => {
  console.log(pathToEntries)
  const rawEntries = await readCSV(pathToEntries) as Array<RawEntry>
  const entries = rawEntries.map(entry => turnRawEntryToEntry(entry))
  
  const winningEntries = entries.filter((entry: Entry) => getAmountMatches(winningsNumbers, entry.numbers) >= 3);
  return winningEntries
};

export default getWinners