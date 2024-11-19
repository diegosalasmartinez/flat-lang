"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = void 0;
const types_1 = require("./types");
const regex = /\s*(page|header|section|footer|title|description|content|text|\{|\}|=|".*?")\s*/g;
const keywords = ["page", "header", "section", "footer", "title", "description", "content", "text"];
const tokenize = (input) => {
    const tokens = [];
    let match;
    while ((match = regex.exec(input)) !== null) {
        const [valueMatched] = match;
        const value = valueMatched.trim();
        if (value.length < 1)
            continue;
        if (keywords.includes(value)) {
            tokens.push({ type: types_1.TokenType.KEYWORD, value });
        }
        else if (value === "{" || value === "}") {
            tokens.push({ type: types_1.TokenType.BRACE, value });
        }
        else if (value === "=") {
            tokens.push({ type: types_1.TokenType.EQUALS, value });
        }
        else if (value.startsWith('"') || value.startsWith("'")) {
            tokens.push({ type: types_1.TokenType.STRING, value: value.slice(1, -1) });
        }
    }
    return tokens;
};
exports.tokenize = tokenize;
