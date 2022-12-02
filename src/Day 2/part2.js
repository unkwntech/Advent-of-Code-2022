import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let file = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

let input = file.split("\n");

let score = 0;

const ROCK = 1;
const PAPER = 2;
const SCISORS = 3;
const LOSE = 0;
const DRAW = 3;
const WIN = 6;

for (let line of input) {
    let parts = line.trim().split(/\s/);
    let play = "";

    switch (parts[0]) {
        case "A": //rock
            switch (parts[1]) {
                case "X": //lose
                    score += SCISORS;
                    score += LOSE;
                    break;
                case "Y": //draw
                    score += ROCK;
                    score += DRAW;
                    break;
                case "Z": //win
                    score += PAPER;
                    score += WIN;
                    break;
            }
            break;
        case "B": //paper
            switch (parts[1]) {
                case "X": //lose
                    score += ROCK;
                    score += LOSE;
                    break;
                case "Y": //draw
                    score += PAPER;
                    score += DRAW;
                    break;
                case "Z": //win
                    score += SCISORS;
                    score += WIN;
                    break;
            }
            break;
        case "C": //scisors
            switch (parts[1]) {
                case "X": //lose
                    score += PAPER;
                    score += LOSE;
                    break;
                case "Y": //draw
                    score += SCISORS;
                    score += DRAW;
                    break;
                case "Z": //win
                    score += ROCK;
                    score += WIN;
                    break;
            }
            break;
    }
}

console.log(score);
