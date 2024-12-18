export enum TokenType {
    KEYWORD = "KEYWORD",
    PROP = "PROP",
    BRACE = "BRACE",
    EQUALS = "EQUALS",
    STRING = "STRING",
}

export interface Token {
    type: TokenType;
    value: string
};

export type ASTNode = {
    type: string;
    name?: string;
    properties?: Record<string, string>;
    children?: ASTNode[];
};
