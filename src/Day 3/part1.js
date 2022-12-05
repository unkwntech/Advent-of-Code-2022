import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let file = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

let input = file.split("\n");

let score = 0;

let commonLetters = [];

for (let line of input) {
    let compartment1 = line.slice(0, line.length / 2);
    let compartment2 = line.slice(line.length / 2);

    for (let letter of compartment1) {
        if (compartment2.includes(letter)) {
            let letterScore = letter.charCodeAt(0) - 96;

            if (letterScore < 0) letterScore += 58;

            score += letterScore;

            break;
        }
    }
}

console.log(score);
