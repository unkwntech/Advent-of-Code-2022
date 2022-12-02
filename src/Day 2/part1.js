import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let file = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

let input = file.split("\n");

let score = 0;

for (let line of input) {
    let parts = line.trim().split(/\s/);

    switch (parts[0]) {
        case "A": //rock
            if (parts[1] === "X") score += 3;
            if (parts[1] === "Y") score += 6;
            break;
        case "B": //paper
            if (parts[1] === "Y") score += 3;
            if (parts[1] === "Z") score += 6;
            break;
        case "C": //scisors
            if (parts[1] === "Z") score += 3;
            if (parts[1] === "X") score += 6;
            break;
    }

    switch (parts[1]) {
        case "Z": //siscors
            score++;
        case "Y": //paper
            score++;
        case "X": //rock
            score++;
            break;
    }
}

console.log(score);
