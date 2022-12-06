import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

let buffer = [];
let startPos = 0;
for (let char of input) {
    while (buffer.includes(char)) {
        buffer.shift();
    }

    buffer.push(char);

    startPos++;

    if (buffer.length == 4) break;
}

console.log(startPos);
