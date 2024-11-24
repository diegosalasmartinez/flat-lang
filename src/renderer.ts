import fs from "fs";

export function render(output: { html: string, css: string, js: string | null, imageSources: string[] }) {
    fs.mkdirSync('dist', { recursive: true });

    fs.writeFileSync('dist/index.html', output.html);
    fs.writeFileSync('dist/styles.css', output.css);

    if (output.js) {
        fs.writeFileSync('dist/scripts.js', output.js);
    }

    if (output.imageSources.length > 0) {
        fs.mkdirSync('dist/assets', { recursive: true });
        fs.mkdirSync('dist/assets/images', { recursive: true });

        // TODO: Optimize image before writing to disk
        output.imageSources.forEach((src) => {
            const image = fs.readFileSync(`src/examples/${src}`);
            fs.writeFileSync(`dist/${src}`, image);
        });
    }
}
