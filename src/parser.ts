import { Token, TokenType, ASTNode } from "./types";

export function parse(tokens: Token[]): ASTNode {
    let current = 0;

    function walk(): ASTNode {
        let token = tokens[current];

        // Parse "page" keyword
        if (token.type === TokenType.KEYWORD && token.value === "page") {
            current++;
            const pageNameToken = tokens[current];
            if (pageNameToken.type !== TokenType.STRING) {
                throw new Error(`Expected a string for the page name, got ${pageNameToken.type}`);
            }

            const node: ASTNode = {
                type: "Page",
                name: pageNameToken.value,
                children: [],
            };

            current++; // Skip the page name
            current++; // Skip the opening brace "{"

            while (tokens[current]?.type !== TokenType.BRACE || tokens[current]?.value !== "}") {
                node.children!.push(walk());
            }

            current++; // Skip the closing brace "}"
            return node;
        }

        // Parse section blocks (header, section, footer)
        if (
            token.type === TokenType.KEYWORD &&
            ["header", "section", "footer"].includes(token.value)
        ) {
            const blockType = token.value.charAt(0).toUpperCase() + token.value.slice(1); // Capitalize type
            current++;
            current++; // Skip the opening brace "{"

            const properties: Record<string, string> = {};

            while (tokens[current]?.type !== TokenType.BRACE || tokens[current]?.value !== "}") {
                const keyToken = tokens[current];
                current++; // Move to "="
                const equalsToken = tokens[current];
                if (equalsToken.type !== TokenType.EQUALS) {
                    throw new Error(`Expected '=', got ${equalsToken.type}`);
                }
                current++; // Move to value
                const valueToken = tokens[current];
                if (valueToken.type !== TokenType.STRING) {
                    throw new Error(`Expected a string value, got ${valueToken.type}`);
                }

                properties[keyToken.value] = valueToken.value;
                current++; // Move to the next key-value pair or the closing brace
            }

            current++; // Skip the closing brace "}"

            return {
                type: blockType,
                properties,
            };
        }

        throw new Error(`Unexpected token: ${token.type}`);
    }

    const ast = walk();

    if (current < tokens.length) {
        throw new Error("Parsing did not consume all tokens.");
    }

    return ast;
}
