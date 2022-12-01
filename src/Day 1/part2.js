import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let file = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

let input = file.split("\n");

let elves = [];
let calories = 0;

for (let line of input) {
    if (line.trim().length < 1) {
        elves.push(calories);
        calories = 0;
    } else {
        calories += parseInt(line.trim());
    }
}

console.log(
    elves
        .sort((a, b) => (a < b ? 1 : -1))
        .slice(0, 3)
        .reduce((a, b) => a + b)
);
