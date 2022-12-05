import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let file = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

let input = file.split("\n");
let score = 0;

for (let line of input) {
    let assignments = line.split(",");
    let elf1 = assignments[0].split("-").map((d) => parseInt(d));
    let elf2 = assignments[1].split("-").map((d) => parseInt(d));

    if (
        (elf1[0] >= elf2[0] && elf1[1] <= elf2[1]) ||
        (elf2[0] >= elf1[0] && elf2[1] <= elf1[1])
    )
        score++;

    // for (let letter of compartment1) {
    //     if (compartment2.includes(letter)) {
    //         let letterScore = letter.charCodeAt(0) - 96;

    //         if (letterScore < 0) letterScore += 58;

    //         score += letterScore;

    //         break;
    //     }
    // }
}

console.log(score);
