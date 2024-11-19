import { ASTNode } from "./types";

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

        if (nodeType === "header" || nodeType === "section" || nodeType === "footer") {
            const properties = node.properties || {};
            const content = Object.entries(properties)
                .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
                .join("\n");

            // Optional: Add CSS for each block
            cssParts.push(`
                .${nodeType} {
                    padding: 20px;
                    border: 1px solid #ccc;
                    margin: 10px 0;
                }
            `);

            return `<div class="${nodeType}">${content}</div>`;
        }

        throw new Error(`Unsupported node type: ${node.type}`);
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
