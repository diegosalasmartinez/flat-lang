import { Token, TokenType } from './types'

const regex = /\s*(page|header|section|footer|title|subtitle|description|image|text|style|src|alt|\{|\}|=|:[a-zA-Z][a-zA-Z0-9_-]*|".*?")\s*/g;
const keywords = ["page", "header", "section", "footer", "title", "subtitle", "description", "image", "text", "style", "src", "alt"];

export const tokenize = (input: string): Token[] => {
    const tokens: Token[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(input)) !== null) {
        const [valueMatched] = match;
        const value = valueMatched.trim();

        if (value.length < 1) continue;

        if (keywords.includes(value)) {
            tokens.push({ type: TokenType.KEYWORD, value });
        } else if (value === "{" || value === "}") {
            tokens.push({ type: TokenType.BRACE, value });
        } else if (value === "=") {
            tokens.push({ type: TokenType.EQUALS, value });
        } else if (value.startsWith('"') || value.startsWith("'")) {
            tokens.push({ type: TokenType.STRING, value: value.slice(1, -1) });
        } else if (value.startsWith(":")) {
            tokens.push({ type: TokenType.PROP, value: value.slice(1) });
        }
    }

    return tokens;
}

