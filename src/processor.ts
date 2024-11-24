import { ASTNode } from "./types";

function generateRandomId(length = 8): string {
    return 's' + Math.random().toString(36).substr(2, length);
}

export function processAST(ast: ASTNode): { html: string; css: string; js?: string } {
    if (ast.type !== "Page") {
        throw new Error("The root node must be of type 'Page'");
    }

    const htmlParts: string[] = [];
    const cssParts: string[] = [];
    const jsParts: string[] = [];

    // Process children recursively
    function processNode(node: ASTNode): string {
        const nodeType = node.type.toLowerCase();
        const elementId = generateRandomId();
        const properties = node.properties || {};

        if (properties.style) {
            cssParts.push(`
                .${elementId} {
                    ${properties.style}
                }
            `);
        }

        if (nodeType === "header" || nodeType === "section" || nodeType === "footer") {
            const htmlTag = nodeType;

            return `<${htmlTag} class="${elementId}">${node.children?.map(processNode).join('')}</${htmlTag}>`;
        }

        if (nodeType === "title" || nodeType === "subtitle" || nodeType === "description") {
            const htmlTag = nodeType === "title" ? "h1" : nodeType === "subtitle" ? "h2" : "p";
            const text = properties.text || '';

            return `<${htmlTag} class="${elementId}" > ${text} </${htmlTag}>`;
        }

        throw new Error(`Unsupported node type: ${node.type}`);
    }

    const properties = ast.properties || {};
    if (properties.style) {

        cssParts.push(`
            body {
                ${properties.style}
            }
        `);
    }

    // Process the Page node
    htmlParts.push(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${ast.name}</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
                ${ast.children?.map(processNode).join("\n")}
            </body>
        </html>
    `);

    // Combine parts and return
    return {
        html: htmlParts.join("\n"),
        css: cssParts.join("\n"),
        js: jsParts.length > 0 ? jsParts.join("\n") : undefined,
    };
}
