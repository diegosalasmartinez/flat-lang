"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("./lexer");
const parser_1 = require("./parser");
const processor_1 = require("./processor");
const sourceCode = `
    page "My Website" {
        header {
            title = "Welcome to My Website"
            description = "This is a simple static site."
        }
        section {
            title = "About Me"
            content = "I am a web developer."
        }
        footer {
            text = "Created with my custom language."
        }
    }
`;
const tokens = (0, lexer_1.tokenize)(sourceCode);
console.log('[DIEGO] tokens', tokens);
const ast = (0, parser_1.parse)(tokens);
console.log('[DIEGO] ast', ast);
const output = (0, processor_1.processAST)(ast);
console.log('[DIEGO]out', output);
