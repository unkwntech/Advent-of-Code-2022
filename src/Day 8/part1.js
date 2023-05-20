import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

let input = inputFile.split("\n");

let trees = [];
let visibleTreeCount = 0;

//left / right
for (let row = 1; row < input.length - 2; row++) {
    debugger;
    let localMax = 0;
    let tallestIndex = 0;
    //right to left
    for (let i = 0; i < input[row].length; i++) {
        if (input[row][i] >= localMax) {
            localMax = input[row][i];
            tallestIndex = i;
        }
    }
    visibleTreeCount += input[row].length - tallestIndex + 1;
    tallestIndex = 0;
    localMax = 0;
    //left to right
    for (let i = input[row].length - 1; i > -1; i--) {
        if (input[row][i] >= localMax) {
            localMax = input[row][i];
            tallestIndex = i + 1;
        }
    }
}

//top / bottom
//top to bottom
for (let r = 0; r < trees.length; r++) {
    for (let c = 0; c < trees[r].length; c++) {}
}

console.log(visibleTreeCount);
//579 too low
