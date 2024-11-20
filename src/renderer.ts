import fs from "fs";

export function render(output: { html: string, css: string, js?: string }) {
    fs.mkdirSync('dist', { recursive: true });
    fs.writeFileSync('dist/index.html', output.html);
    fs.writeFileSync('dist/styles.css', output.css);

    if (output.js) {
        fs.writeFileSync('dist/scripts.js', output.js);
    }
}
