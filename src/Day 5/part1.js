import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let file = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

let input = file.split("\n");
let stacks = [];
let stackCount = Math.ceil(input[0].length / 4);

//Setup stacks
for (let i = 0; i < stackCount; i++) stacks.push([]);

let i = 0;
//parse current state
for (; input[i].includes("["); i++) {
    let value;
    for (let j = 0; j < stackCount; j++) {
        value = input[i].slice(4 * j, 4 * (j + 1)).trim();
        if (value.trim().length > 0) {
            stacks[j].push(value.replace("[", "").replace("]", ""));
        }
    }
}

//reverse the order of each stack so that Array.pop pulls the top item
for (let i = 0; i < stackCount; i++) stacks[i].reverse();

//skip lines until instructions begin
for (; !input[i].startsWith("move"); i++);

for (; i < input.length; i++) {
    let matches = input[i]
        .matchAll(/(?<qty>\d+)\s+from\s+(?<src>\d+)\s+to\s+(?<dst>\d+)/gi)
        .next().value.groups;
    for (let j = 0; j < matches.qty; j++) {
        if (crate)
            stacks[parseInt(matches.dst) - 1].push(
                stacks[parseInt(matches.src) - 1].pop()
            );
    }
}

let result = "";

for (let stack of stacks) {
    if (stack.length > 0) result += stack.pop();
}
console.log(result);
