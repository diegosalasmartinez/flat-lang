import { tokenize } from './lexer'
import { parse } from './parser'
import { processAST } from './processor'

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

const tokens = tokenize(sourceCode);
console.log('tokens', tokens);

const ast = parse(tokens);
console.log('ast', ast);

const output = processAST(ast);
console.log('output', output);
