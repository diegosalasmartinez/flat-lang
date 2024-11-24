import { tokenize } from './lexer'
import { parse } from './parser'
import { processAST } from './processor'
import { render } from './renderer'

const sourceCode = `
    page "My Website" {
        header {
            title {
                text = "Welcome to My Website"
                style = "color: red"
            }
            description {
                text = "This is a simple static site."
            }
        }
        section {
            subtitle {
                text = "About Me"
            }
            description {
                text = "I am a web developer."
            }
        }
        footer {
            title {
                text = "Contact Me"
                style = "color: blue"
            }
            description {
                text = "Created with my custom language."
            }
        }
    }
`;

const tokens = tokenize(sourceCode);
const ast = parse(tokens);
const output = processAST(ast);

render(output);
