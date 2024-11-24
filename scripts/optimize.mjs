import esbuild from "esbuild";
import { minify } from "html-minifier-terser";
import fs from "fs";

async function optimizeHtml() {
    const htmlFile = "./dist/index.html";

    try {
        const htmlContent = fs.readFileSync(htmlFile, "utf-8");
        const optimizedHtml = await minify(htmlContent, {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            minifyCSS: true,
            minifyJS: true,
        });
        fs.writeFileSync(htmlFile, optimizedHtml);
        console.log('HTML optimized successfully!');
    } catch (e) {
        console.error("Error during HTML optimization:", e);
    }
}


async function optimizeAssets() {
    try {
        const entryPoints = ["./dist/styles.css"];
        if (fs.existsSync("./dist/scripts.js")) {
            entryPoints.push("./dist/scripts.js");
        }

        await esbuild.build({
            entryPoints,
            outdir: "./dist",
            minify: true,
            bundle: true,
            allowOverwrite: true,
            sourcemap: false
        });
        console.log('Assets optimized successfully!');
    } catch (e) {
        console.error("Error during assets optimization:", e);
    }
}

// Ejecutar optimización
await optimizeHtml();
await optimizeAssets();
