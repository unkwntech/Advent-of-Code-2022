import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let file = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

let input = file.split("\n");

let score = 0;

for (let i = 0; i < input.length; i++) {
    let elf1 = input[i++].trim();
    let elf2 = input[i++].trim();
    let elf3 = input[i].trim();

    let commonLetter = findCommonLetters(
        findCommonLetters(elf1, elf2),
        elf3
    ).join();

    let letterScore = commonLetter.charCodeAt(0) - 96;

    if (letterScore < 0) letterScore += 58;

    score += letterScore;
}

function findCommonLetters(haystack1, haystack2) {
    let letters = [];
    for (let letter of haystack1) {
        if (haystack2.includes(letter) && !letters.includes(letter)) {
            letters.push(letter);
        }
    }
    return letters;
}

console.log(score);
