import { tokenize } from './lexer'
import { parse } from './parser'
import { processAST } from './processor'
import { render } from './renderer'

import { sourceCode } from './examples/basic-template'

const tokens = tokenize(sourceCode);
const ast = parse(tokens);
const output = processAST(ast);

render(output);
