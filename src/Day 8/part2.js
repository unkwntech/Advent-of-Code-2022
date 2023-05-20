import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

let input = inputFile.split("\n");

class file {
    size;
    name;
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
}
class dir {
    name;
    contents;
    parent;
    size;
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.size = 0;
        this.contents = [];
    }
}

let maximumSize = 70000000;
let neededSize = 30000000;

let rootDir = new dir("/", null);

let currentPositionPTR = rootDir;

let i = 0;
for (; i < input.length; i++) {
    if (input[i].trim()[0] == "$") parseCommand(input[i].trim());
}

function parseCommand(command) {
    let commandParts = command.split(" ");
    if (commandParts[1].trim() === "cd") {
        switch (commandParts[2].trim()) {
            case "..":
                currentPositionPTR = currentPositionPTR.parent;
                break;
            case "/":
                currentPositionPTR = rootDir;
                break;
            default:
                currentPositionPTR = currentPositionPTR.contents.find(
                    (c) => c.name === commandParts[2]
                );
                break;
        }
    }
    if (commandParts[1].trim() === "ls") {
        i++;
        //Read all output of ls, until next command
        while (input[i] && !input[i].startsWith("$") && i < input.length) {
            let entry = input[i].split(" ");
            if (entry[0] === "dir") {
                currentPositionPTR.contents.push(
                    new dir(entry[1].trim(), currentPositionPTR)
                );
            } else {
                currentPositionPTR.contents.push(
                    new file(entry[1].trim(), parseInt(entry[0]))
                );
                updateDIRSize(currentPositionPTR, parseInt(entry[0]));
            }
            i++;
        }
        i--;
    }
}

function updateDIRSize(dir, size) {
    dir.size += size;
    if (dir.parent !== null) updateDIRSize(dir.parent, size);
}

function findAllDirs(haystack) {
    let dirs = [];
    for (let d of haystack.contents.filter((e) => e instanceof dir)) {
        dirs.push(d);
        dirs = [...dirs, ...findAllDirs(d)];
    }
    return dirs;
}

let dirs = findAllDirs(rootDir);

dirs.sort((a, b) => (a.size < b.size ? -1 : 1));

for (let d of dirs) {
    if (maximumSize - rootDir.size + d.size >= neededSize) {
        console.log(d.size, d);
        break;
    }
}
