import esbuild from "esbuild";
import fs from "fs";

const entryPoints = ["./dist/styles.css"];
if (fs.existsSync("./dist/scripts.js")) {
    entryPoints.push("./dist/scripts.js");
}

esbuild.build({
    entryPoints,
    outdir: "./dist",
    minify: true,
    bundle: true,
    allowOverwrite: true
}).then(() => {
    console.log("Assets optimized successfully!");
}).catch((error) => {
    console.error("Error during optimization:", error);
});
